import React from 'react';
import './FormField.css';

const FormField = ({
  input,
  label,
  type,
  placeholder,
  value,
  id,
  meta: { asyncValidating, touched, error },
  required = false
}) =>
  <div className="form-field">
    <label>{label}</label>
    <input
      className="form-field__input"
      {...input}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      id={id}
      required={required}
    />
    {touched &&
      error &&
      <span className="form-field__error">
        {error}
      </span>}
  </div>;

export default FormField;
