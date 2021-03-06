import React from 'react'
import {
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Collapse
} from 'reactstrap'
import {
  compose,
  setPropTypes,
  withStateHandlers,
  withHandlers,
  branch,
  renderComponent,
  flattenProp
} from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import { withAuth } from '../lib'
import PropTypes from 'prop-types'

const pointer = {
  cursor: 'pointer'
};

const MainMenu = ({ children }) => (
<Navbar color="faded" light expand="md">
  <Link to={'/'} className="navbar-brand">Home</Link>
  {children}
</Navbar>
);

const UserMenu = ({ isOpen, onClickOpen, logout, auth: {getUser} }) => (
  <MainMenu>
    <NavbarToggler onClick={onClickOpen}/>
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <a className="nav-link" style={pointer} >{getUser()}</a>
        </NavItem>
        <NavItem>
          <a className="nav-link" onClick={logout} style={pointer} >logout</a>
        </NavItem>
      </Nav>
    </Collapse>
  </MainMenu>
);

const GuestMenu = ({ isOpen, onClickOpen }) => (
  <MainMenu>
    <NavbarToggler onClick={onClickOpen}/>
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/sign-in" className="nav-link">Login</Link>
        </NavItem>
        <NavItem>
          <Link to="/sign-up" className="nav-link">Register</Link>
        </NavItem>
      </Nav>
    </Collapse>
  </MainMenu>
);

export default compose(
  withRouter,
  withAuth,
  flattenProp('auth'),
  setPropTypes({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onClickOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withHandlers({
    logout: ({ history: { push }, removeToken }) => () => {
      removeToken();
      push('/')
    }
  }),
  branch(
    ({ auth: {getToken} }) => getToken(),
    renderComponent(UserMenu),
    renderComponent(GuestMenu)
  )
)()