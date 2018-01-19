import React from 'react'
import { ArticleForm } from '../components'
import {
  compose,
  withHandlers,
  setPropTypes
} from 'recompose'
import { withAuth, withAuthCheck } from '../lib'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'

const NewArticle = ({createArticle}) => (
  <ArticleForm
    formType='Create'
    onSubmit={createArticle}
  />
);

export default compose(
  withAuth,
  withAuthCheck,
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }),
  withHandlers({
    createArticle:
      ({
         match: {params: {categoryId}},
         history: {push},
         auth: {getToken}
       }) => article => {
        fetch('/articles', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
          },
          body: JSON.stringify({
            ...article,
            categoryId: categoryId
          })
        }).then(res => res.json())
          .then(({article: {id}}) => push(`/articles/${id}`))
      }
  })
)(NewArticle)