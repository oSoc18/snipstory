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
}) => {
  let before = undefined;
  let after = undefined;
  if (type == "checkbox") {
    after = <label className="checkbox-label">{label}</label>;
  } else {
    before = <label>{label}</label>;
  }

  return <div className="form-field">
    {before}
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
}

export default FormField;
