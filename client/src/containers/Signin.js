import React from 'react'
import { AuthForm } from '../components'
import { compose, withHandlers, flattenProp } from 'recompose'
import { withAuth } from '../lib'

const Signin = ({ handleFormSubmit }) => (
  <AuthForm formName="Signin" onSubmit={handleFormSubmit} />
);

export default compose(
  withAuth,
  flattenProp('auth'),
  withHandlers({
    handleFormSubmit: ({ history: {push}, setToken }) => data => {
      fetch('/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(({ headers }) => {
        setToken(headers);
        return !!headers.get('Authorization') ? '/' : '/sign-in'
      }).then(path => {
        push(path);
        if (path === '/sign-in') {
          alert('รหัสผู้ใช้งานไม่ถูกต้อง');
        }
      })
    }
  })
)(Signin)