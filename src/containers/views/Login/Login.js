import React from 'react';
import Button from '../../../components/button/Button';
import { firebaseAuth, googleAuthProvider } from '../../../helpers/firebase';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';

import FormField from '../../../components/form/FormField';
import './Login.css';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';


const Login = ({ pristine, submitting, handleSubmit, error, showToast }) => {
  return (
    <div className="page">
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <div className="login-small-container">
            <h1 className="login-title">Inloggen</h1>
            <form
              onSubmit={handleSubmit(({ email, password }) => {
                return firebaseAuth
                  .signInWithEmailAndPassword(email, password)
                  .catch(_ => {
                    throw new SubmissionError({
                      _error: 'Sorry, e-mailadres of paswoord is niet correct'
                    });
                  });
              })}
            >
              {error &&
                <div className="form-field__error">
                  {error}
                </div>}
              <div className="input-field">
                <Field
                  name="email"
                  component={FormField}
                  type="email"
                  label="E-mailadres"
                />
              </div>
              <div className="input-field">
                <Field
                  name="password"
                  component={FormField}
                  type="password"
                  label="Wachtwoord"
                />
              </div>
              <div className="submit_div">

                <Button
                  className="submit_button"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Login
                </Button>
                  <span>Wachtwoord vergeten?<br />
                  <Link to="/teacher/resetpassword">Reset hier uw wachtwoord!</Link></span>
                </div>


            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default reduxForm({ form: 'login' })(Login);
