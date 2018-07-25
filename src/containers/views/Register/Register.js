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
  user,
  logout,
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
      <Navbar user={user}/>
      <div className="general-container container">
      <div className="register-box">
            <form
              onSubmit={handleSubmit(
                ({ firstname, name, email, password, typeOfUser, institution, password1, ...rest }) => {
                if (typeOfUser != "contentPartner"){
                  rest = {};
                }

                return firebaseAuth
                  .createUserWithEmailAndPassword(email, password)
                  .then(user => {

                    return firebaseDatabase
                      .ref(`/users/${user.uid}`)
                      .set({ ...user.providerData[0],
                        firstname,
                        name,
                        typeOfUser: "teacher",
                        institution,
                        ...rest
                      })
                      .then(_ => {
                        history.push('/teacher/dashboardstorylist');
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
            <div className="container">
            <h1 className="register-title">Registreer</h1>

              {/*<div className="toggle-container">
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
                  </div>*/}
              <div className="row">
                  <div className="col-md-6">
                    <Field
                      name="firstname"
                      component={FormField}
                      type="text"
                      label="Voornaam"
                      className="name_in"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="name"
                      component={FormField}
                      type="text"
                      label="Familienaam"
                      className="name_in"
                      required
                    />
                  </div>
              </div>

              <div className="row">
                  <div className="col">
                  <Field
                    name="email"
                    component={FormField}
                    type="email"
                    label="Email"
                    required
                  />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                  <Field
                  name="institution"
                  label={selectedTypeOfUsers == "contentPartner" ?
                  "Institution": "School"}
                  type="text"
                  component={FormField}
                  required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="password"
                    component={FormField}
                    type="password"
                    label="Wachtwoord"
                  />
                  <p className="notice">Password must contain at least 8 characters</p>
                </div>
              </div>
              <div className="submit_div">
                    <div>
                      {selectedTypeOfUsers == 'contentPartner' ? 
                          (ContentPartnerOnly): undefined}
                    </div>
                    {error &&
                      <div>
                        {error}
                      </div>}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <Button
                      className="submit_button"
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      Submit
                    </Button>
                    <span className="login-span">Heb je al een account?<br />
                    <Link to="/teacher/login">Log hier in!</Link></span>
                  </div>
                </div>

            </form>
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
