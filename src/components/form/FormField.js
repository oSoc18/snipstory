import React from 'react';
import './FormField.css';

const FormField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error },
  required = false
}) => {
  let before = <label>{label}</label>;
  let after = undefined;
  if (type == "checkbox") {
    after = before;
    before = undefined;
  }

  return <div className="form-field">
    {before}
    <input
      className="form-field__input"
      {...input}
      type={type}
      placeholder={placeholder}
      required={required} />
    {after}
    {touched &&
      error &&
      <span className="form-field__error">
        {error}
      </span>}
  </div>;
}

export default FormField;
