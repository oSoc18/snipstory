import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/button/Button';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form';
import {
  firebaseAuth,
  firebaseDatabase
} from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import './Register.css';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';


const Register = ({
  pristine,
  submitting,
  handleSubmit,
  history,
  error,
  change,
  selectedTypeOfUsers,
  ...props
}) => {
  const ContentPartnerOnly = (
    <div>
      <Field
      name="contact"
      type="text"
      label="Contact coordinates"
      component={FormField} />
      <Field
      name="homepage"
      type="text"
      component={FormField}
      label="Website homepage" />
    </div>
  );

  return (
    <div className="page">
      <Navbar/>
      <div className="register-box">
          <h1 className="register-title">Registreer</h1>
          <div>
            <form
              onSubmit={handleSubmit(
                ({ name, email, password, typeOfUser, institution, password1, ...rest }) => {
                if (typeOfUser != "contentPartner"){
                  rest = {};
                }

                return firebaseAuth
                  .createUserWithEmailAndPassword(email, password)
                  .then(user => {

                    return firebaseDatabase
                      .ref(`/users/${user.uid}`)
                      .set({ ...user.providerData[0],
                        displayName: name,
                        typeOfUser,
                        institution,
                        ...rest
                      })
                      .then(_ => {
                        history.push('/teacher');
                      });
                  })
                  .catch(err => {
                    if (err.code === 400 || err.code === 'auth/weak-password') {
                      throw new SubmissionError({
                        _error: 'Paswoord is niet sterk genoeg'
                      });
                    } else if (err.code === 'auth/email-already-in-use') {
                      throw new SubmissionError({
                        email:
                          'Er is al een account geregistreerd met dit e-mailadres'
                      });
                    }
                    throw new SubmissionError({
                      _error: 'Er is iets fout gegaan, probeer het opnieuw'
                    });
                  });
              })}
            >
              <div className="name-container flex_1">
                <div>
                  <Field
                    name="name"
                    component={FormField}
                    type="text"
                    label="Voornaam"
                    required
                  />
                </div>
              </div>

              <div className="toggle-container">
                <div>
                  <Field
                    name="typeOfUser"
                    component="select"
                    label="Type of account"
                    onChange={(e, value) => {
                      change('typeOfUser', value);
                      console.log(value)
                    }}
                    required
                  >
                    <option value="teacher">Teacher</option>
                    <option value="contentPartner">Content Partner</option>
                  </Field>
                </div>
              </div>

              <div className="password-container ">
                <div>
                  <Field 
                    name="password"
                    component={FormField}
                    type="password"
                    label="Wachtwoord"
                  />
                </div>
                <div>
                  <Field
                    name="password1"
                    component={FormField}
                    type="password"
                    label="Wachtwoord herhalen"
                  />
                </div>
              </div>

              <div className="etc-container">
                <div>
                  <Field
                    name="email"
                    component={FormField}
                    type="email"
                    label="Email"
                    required
                  />
                </div>
                <div>
                  <Field
                  name="institution"
                  label={selectedTypeOfUsers == "contentPartner" ?
                  "Institution": "School"}
                  type="text"
                  component={FormField} />
                </div>
              </div>
              <div>
                {selectedTypeOfUsers == 'contentPartner' ? 
                    (ContentPartnerOnly): undefined}
              </div>
              {error &&
                <div>
                  {error}
                </div>}

              <Button
                className="test"
                type="submit"
                disabled={pristine || submitting}
              >
                Submit
              </Button>
            </form>
          </div>
          <div>
            <span>Heb je al een account?</span>
            <Link to="/teacher/login">Log hier in!</Link>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

const validate = ({ password, password1, email }) => {
  const errors = {};
  if (password !== password1) {
    errors.password1 = 'Paswoorden zijn niet gelijk';
  }
  return errors;
};

const formName = 'login';
const selector = formValueSelector(formName);

const RegisterForm = reduxForm({ form: formName, validate })(Register);
export default connect(state => ({
  selectedTypeOfUsers: selector(state, 'typeOfUser')
}))(RegisterForm);