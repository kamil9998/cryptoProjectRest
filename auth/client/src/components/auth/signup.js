import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { required, email, confirmation } from 'redux-form-validators'
import _ from 'lodash';

const FIELDS = {
  email: {
    type: 'input',
    label: 'Email'
  },
  password: {
    type: 'input',
    label: 'Password'
  },
  passwordConfirm: {
    type: 'input',
    label: 'Password Confirm'
  },
  binancekey: {
    type: 'input',
    label: 'Binance Key'
  }
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`} >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="error">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm, binancekey }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {_.map(FIELDS, this.renderField.bind(this))}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

const validations = {
  email: [required({msg: "Pole wymagane"}), email({msg: "Podaj prawidłowy adres email"})],
  password: [required({msg: "Pole wymagane"})],
  passwordConfirm: [required({msg: "Pole wymagane"}), confirmation({ field: 'password', fieldLabel: 'Password:', msg: "Podane pola są różne" })]
}

const validate = (values) => {
  const errors = {}
  for (let field in validations) {
    let value = values[field]
    errors[field] = validations[field].map(validateField => {
      return validateField(value, values)
    }).find(x => x)
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: _.keys(FIELDS),
  validate
}, mapStateToProps, actions)(Signup);
