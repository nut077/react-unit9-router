import React from 'react'
import { AuthForm } from '../components'
import { compose, withHandlers, flattenProp } from 'recompose'
import { withAuth } from '../lib'

const Signup = ({ handleFormSubmit }) => (
  <AuthForm formName="Signup" onSubmit={handleFormSubmit} />
);

export default compose(
  withAuth,
  flattenProp('auth'),
  withHandlers({
    handleFormSubmit: ({ history: {push}, setToken }) => data => {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(({ headers }) => setToken(headers))
        .then(() => push('/'))
    }
  })
)(Signup)