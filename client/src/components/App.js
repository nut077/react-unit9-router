import React from 'react'
import { Content, Header } from '../components'
import { Signin, Signup } from '../containers'
import { Container } from 'reactstrap'
import { Route, Switch } from 'react-router-dom'

const App = () => (
  <div>
    <Header />
    <Container>
      <Switch>
        <Route path={'/sign-in'} component={Signin} />
        <Route path={'/sign-up'} component={Signup} />
        <Content />
      </Switch>
    </Container>
  </div>
);

export default App