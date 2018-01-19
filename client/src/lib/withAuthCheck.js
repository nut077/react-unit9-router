import React from 'react'
import {
  compose,
  setDisplayName,
  branch,
  renderComponent
} from 'recompose'
import { withAuth } from './'
import { Redirect } from 'react-router-dom'

const RedirectToHome = () => <Redirect to='/' />;
const withAuthCheck = WrappedComponent => props => (
  <WrappedComponent {...props} />
);

export default WrappedComponent => compose(
  setDisplayName('withAuthCheck'),
  withAuth,
  branch(({ auth: { getToken } }) => getToken(),
    withAuthCheck,
    renderComponent(RedirectToHome)
  )
)(WrappedComponent)