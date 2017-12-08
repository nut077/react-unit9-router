import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Articles, NewArticle } from '../containers'

const Categories = () => (
  <Switch>
    <Route
      path="/categories/:categoryId(\d+)/articles/new"
      component={NewArticle}
    />
    <Route
      path="/categories/:categoryId(\d+)/articles"
      component={Articles}
    />
    <Route
      path="/categories/:categoryId(\d+)"
      render={({ match: {params: {categoryId}}}) => (
        <Redirect
          to={`/categories/${categoryId}/articles`}
        />
      )}
    />
  </Switch>
);

export default Categories