import React from 'react'
import {
  compose,
  setPropTypes,
  withState,
  withProps,
  withHandlers,
  lifecycle
} from 'recompose'
import { Nav, Pagination, PaginationItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { withAuth } from '../lib'

const Articles = ({ articles, pagination: { page, totalPages }, categoryId, auth: { getToken } }) => (
  <div>
    {
      getToken() && (
        <Link
          to={`/categories/${categoryId}/articles/new`}
          className='btn btn-sm btn-secondary'
        >
          Create Article
        </Link>
      )
    }
    <Nav vertical={true}>
      {
        articles.map(({ id, title }) => (
          <Link
            key={id}
            to={`/articles/${id}`}
            className="nav-link"
          >
            {title}
          </Link>
        ))
      }
    </Nav>
    <Pagination>
      {
        Array.from({ length: totalPages}).map((_, index) => {
          const currentIndex = index + 1;
          return (
            <PaginationItem key={currentIndex} active={currentIndex === Number(page)}>
              <Link
                to={`/categories/${categoryId}/articles?page=${currentIndex}`}
                className="page-link"
              >
                {currentIndex}
              </Link>
            </PaginationItem>
          )
        })
      }
    </Pagination>
  </div>
);

export default compose(
  withAuth,
  withState('articles', 'setArticles', []),
  withState('pagination', 'setPagination', {}),
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: numericString().isRequired
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }).isRequired
  }),
  withProps(props => ({
    categoryId: props.match.params.categoryId
  })),
  withHandlers({
    loadArticles: ({ setArticles, categoryId, setPagination, location: { search } }) => () => {
      const page = new URLSearchParams(search).get('page');
      fetch(`/articles?categoryId=${categoryId}&page=${page || 1}`)
        .then(res => res.json())
        .then(({ articles: { articles, meta: pagination } }) => {
          setArticles(articles);
          setPagination(pagination);
        })
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadArticles();
    },
    componentDidUpdate(prevProps) {
      const { match, location } = this.props;
      const { match: prevMatch, location: prevLocation} = prevProps;
      if ((match.params.categoryId !== prevMatch.params.categoryId)
        || (location.search !== prevLocation.search)) {
        this.props.loadArticles();
      }
    }
  })
)(Articles)