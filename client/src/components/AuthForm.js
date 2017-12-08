import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import {
  compose,
  setPropTypes,
  withState,
  withHandlers
} from 'recompose'
import PropTypes from 'prop-types'

const AuthForm = ({ formName, onSubmitForm, onFieldChange, onSubmitEnter }) => (
  <Form>
    <h2 className="text-center">{formName}</h2>
    <hr />
    <FormGroup>
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        placeholder="Enter email"
        onChange={onFieldChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="password">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Enter password"
        onChange={onFieldChange}
        onKeyPress={onSubmitEnter}
      />
    </FormGroup>
    <Button color="primary" onClick={onSubmitForm}>{formName}</Button>
  </Form>
);

function submitForm(onSubmit, formValues) {
  const { email, password } = formValues;
  if (!!email && !!password) {
    onSubmit(formValues);
  } else {
    alert('คุณกรอกข้อมูลไม่ครบ');
    if (!email) {
      document.getElementById('email').focus();
    } else if (!password) {
      document.getElementById('password').focus();
    }
  }
}

export default compose(
  setPropTypes({
    formName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func
  }),
  withState('formValues', 'setFormValues', {email: '', password: ''}),
  withHandlers({
    onSubmitForm: ({ onSubmit, formValues }) => event => {
      event.preventDefault();
      submitForm(onSubmit, formValues);
    },
    onFieldChange: ({ formValues, setFormValues }) => ({ target: { name, value } }) => {
      setFormValues({ ...formValues, [name]: value })
    },
    onSubmitEnter: ({ onSubmit, formValues }) => event => {
      if (event.key === 'Enter') {
        submitForm(onSubmit, formValues);
      }
    }
  })
)(AuthForm)