import React from 'react'
import { ArticleForm } from '../components'
import {
  compose,
  withState,
  withHandlers,
  setPropTypes,
  withProps,
  lifecycle
} from 'recompose'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { withAuth, withAuthCheck } from '../lib'

const EditArticle = ({ article, editArticle }) => (
  <ArticleForm
    formType="Edit"
    {...article}
    onSubmit={editArticle}
  />
);

export default compose(
  withAuth,
  withAuthCheck,
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }),
  withProps(props => ({
    id: props.match.params.id,
    push: props.history.push
  })),
  withState('article', 'setArticle', {title: '', content: ''}),
  withHandlers({
    editArticle: ({ id, push, auth: { getToken } }) => article => {
      fetch(`/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': getToken()
        },
        body: JSON.stringify({
          ...article
        })
      }).then(res => res.json())
        .then(({ article: {id}}) => push(`/articles/${id}`))
    },
    loadArticle: ({ id, setArticle }) => () => {
      fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(({ article}) => setArticle(article))
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadArticle()
    }
  })
)(EditArticle)