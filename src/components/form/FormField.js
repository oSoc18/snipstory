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
  let className = "";
  if (type == "checkbox") className = "checkbox-label";
  
return <div className="form-field">
    <label className={className}>{label}</label>
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
