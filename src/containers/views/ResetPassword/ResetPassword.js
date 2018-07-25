import React from 'react';
import Button from '../../../components/button/Button';
import { firebaseAuth, googleAuthProvider } from '../../../helpers/firebase';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';

import FormField from '../../../components/form/FormField';
import './ResetPassword.css';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';

// resetPassword(e) {
//     e.preventDefault;
//
// }

const ResetPassword = ({ pristine, submitting, logout, user, handleSubmit, error, showToast }) => {
  return (
    <div className="page">
      <Navbar logout={logout} user={user}/>
      <div className="container">
        <div className="login-box">
          <div className="login-small-container">
            <h1 className="login-title">Inloggen</h1>
            <form
              onSubmit={handleSubmit(({ email }) => {
                return firebaseAuth
                    .sendPasswordResetEmail(email)
                    .then(function() {
                        showToast({
                            text: `We hebben naar "${email}" een link gestuurd om uw wachtwoord te vernieuwen.`
                        })
                    })
                    .catch(function(error) {
                      // Error occurred. Inspect error.code.
                    })
                  })
              }
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
              <div className="submit_div">
                <Button
                  className="submit_button"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Vraag nieuw wachtwoord aan
                </Button>
                </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default reduxForm({ form: 'resetPassword' })(ResetPassword);
