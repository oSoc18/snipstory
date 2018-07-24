import React from 'react';
import Button from '../../../components/button/Button';
import { firebaseAuth, googleAuthProvider } from '../../../helpers/firebase';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';

import FormField from '../../../components/form/FormField';
import './Login.css';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';


const Login = ({ pristine, submitting, handleSubmit, user, error, showToast, logout }) => {
  return (
    <div className="page">
      <Navbar logout={logout} user={user}/>
      <div className="general-container container">
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
                <div className="form-field__error row">
                  {error}
                </div>}
              <div className="input-field row">
                <Field
                  name="email"
                  component={FormField}
                  type="email"
                  label="E-mailadres"
                />
              </div>
              <div className="input-field row">
                <Field
                  name="password"
                  component={FormField}
                  type="password"
                  label="Wachtwoord"
                />
              </div>
              <div className="submit_div row">

                  <Button
                    className="submit_button"
                    type="submit"
                    disabled={pristine || submitting}
                    size="small"
                  >
                    Login
                  </Button>
                </div>
              <div className="row submit_div">
                <p className="col">Wachtwoord vergeten?<br />
                  <Link to="/teacher/resetpassword">Reset hier uw wachtwoord!</Link>
                </p>
              </div>
              <div className="row submit_div">
                <div className="col">
                  <Link to="/teacher/register">Registreer</Link>
                </div>
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
