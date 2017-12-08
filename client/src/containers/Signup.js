import React from 'react'
import { AuthForm } from '../components'
import { compose, withHandlers } from 'recompose'
import { Auth } from '../lib'

const Signup = ({ handleFormSubmit }) => (
  <AuthForm formName="Signup" onSubmit={handleFormSubmit} />
);

export default compose(
  withHandlers({
    handleFormSubmit: ({ history: { push }}) => data => {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(({ headers }) => Auth.setToken(headers))
        .then(() => push('/'))
    }
  })
)(Signup)