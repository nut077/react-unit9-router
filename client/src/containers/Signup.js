import React from 'react'
import { AuthForm } from '../components'
import { compose, withHandlers } from 'recompose'
import { withAuth } from '../lib'

const Signup = ({ handleFormSubmit }) => (
  <AuthForm formName="Signup" onSubmit={handleFormSubmit} />
);

export default compose(
  withAuth,
  withHandlers({
    handleFormSubmit: ({ history: {push}, auth: {setToken} }) => data => {
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