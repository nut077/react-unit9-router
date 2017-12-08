import React from 'react'
import { AuthForm } from '../components'
import { compose, withHandlers } from 'recompose'
import { Auth } from '../lib'

const Signin = ({ handleFormSubmit }) => (
  <AuthForm formName="Signin" onSubmit={handleFormSubmit} />
);

export default compose(
  withHandlers({
    handleFormSubmit: ({ history: { push }}) => data => {
      fetch('/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(({ headers }) => {
        Auth.setToken(headers);
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