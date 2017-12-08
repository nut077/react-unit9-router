import React from 'react'
import { compose, withState, lifecycle } from 'recompose'
import { NavLink } from 'react-router-dom'
import { Col, ListGroup } from 'reactstrap'

const Sidebar = ({ categories }) => (
  <Col xs="5">
    <ListGroup>
      {
        categories.map(({ id, title }) =>
          <NavLink
            key={id}
            to={`/categories/${id}/articles`}
            className="list-group-item"
          >
            {title}
          </NavLink>
        )
      }
    </ListGroup>
  </Col>
);

export default compose(
  withState('categories', 'setCategories', []),
  lifecycle({
    componentWillMount() {
      const { setCategories } = this.props;
      fetch('/categories')
        .then(res => res.json())
        .then(({ categories }) => setCategories(categories))
    }
  })
)(Sidebar)