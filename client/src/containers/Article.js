import React from 'react'
import {
  compose,
  setPropTypes,
  withState,
  withProps,
  withHandlers,
  lifecycle
} from 'recompose'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { Auth } from '../lib'
import { Link } from 'react-router-dom'

const Article = ({ article: { title, content, authorId }, backToPreviousUrl, id }) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
    <Button
      color="primary"
      size="sm"
      onClick={backToPreviousUrl}
    >
      Back
    </Button>&nbsp;
    {
      (Auth.getToken() && Number(Auth.getUserId()) === authorId) && (
        <Link
          to={`/articles/${id}/edit`}
          className="btn btn-sm btn-secondary"
        >
          Edit
        </Link>
      )
    }
  </div>
);

export default compose(
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  }),
  withState('article', 'setArticle', {title: '', content: ''}),
  withProps(props => ({
    id: props.match.params.id
  })),
  withHandlers({
    loadArticle: ({ setArticle, id }) => () => {
      fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(({ article }) => setArticle({...article}))
    },
    backToPreviousUrl: ({ history: { goBack }}) => () => {
      goBack();
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadArticle();
    }
  })
)(Article)