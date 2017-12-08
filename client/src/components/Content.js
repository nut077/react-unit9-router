import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, Categories, Articles, NotFound } from '../components'
import { Sidebar } from '../containers'
import { Row, Col } from 'reactstrap'

const Content = () => (
  <Row>
    <Sidebar />
    <Col xs="7">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/categories/*" component={Categories} />
        <Route path="/articles/*" component={Articles} />
        <Route component={NotFound} />
      </Switch>
    </Col>
  </Row>
);

export default Content