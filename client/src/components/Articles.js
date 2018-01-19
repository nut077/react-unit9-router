import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Article, EditArticle } from '../containers'

const Articles = () => (
  <Switch>
    <Route exact path="/articles/:id(\d+)" component={Article} />
    <Route exact path="/articles/:id(\d+)/edit" component={EditArticle} />
  </Switch>
);

export default Articles