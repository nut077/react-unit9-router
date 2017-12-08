import React from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import {
  compose,
  setPropTypes,
  withState,
  withHandlers,
  lifecycle
} from 'recompose'
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap'

const ArticleForm = ({ formType, article: {title,content}, onFieldChange, onSubmit, isDirty }) => (
  <Form>
    <Prompt
      when={isDirty}
      message="Are you sure you want to leave this page?"
    />
    <h2 className="text-center">{formType} Article Form</h2>
    <hr />
    <FormGroup>
      <Label for="title">Title</Label>
      <Input
        name="title"
        id="title"
        placeholder="Enter title"
        value={title}
        onChange={onFieldChange}
      />
    </FormGroup>
    <FormGroup>
      <Label for="content">Content</Label>
      <Input
        name="content"
        id="content"
        placeholder="Enter content"
        value={content}
        onChange={onFieldChange}
      />
    </FormGroup>
    <Button color="primary" onClick={onSubmit}>{formType}</Button>
  </Form>
);

export default compose(
  setPropTypes({
    formType: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  }),
  withState('article', 'setArticle', {title: '', content: ''}),
  withState('isDirty', 'setDirty', false),
  withHandlers({
    onFieldChange: ({ article, setArticle, setDirty }) => ({ target: {name, value}}) => {
      setArticle({...article, [name]: value});
      setDirty(true);
    },
    onSubmit: ({ onSubmit, article }) => event => {
      event.preventDefault();
      onSubmit(article);
    }
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { title, content, setArticle } = this.props;
      if (title !== prevProps.title || content !== prevProps.content) {
        setArticle({title, content});
      }
    }
  })
)(ArticleForm)