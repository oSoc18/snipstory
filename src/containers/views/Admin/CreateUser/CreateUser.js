import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/button/Button';
import ButtonSmall from '../../../../components/button-small/Button';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form';
import {
    firebaseAuth,
    firebaseDatabase
} from '../../../../helpers/firebase';

import RoomIdGenerator from '../../../../helpers/RandomHelpers';

import FormField from '../../../../components/form/FormField';
import './CreateUser.css';
import Navbar from '../../../../components/nav/Navbar';
import Footer from '../../../../components/footer/Footer.js';




const CreateUser = ({
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
      <Navbar logout={props.logout} user={props.user}/>
      <div className="container">
      <div className="register-box">
            <form
              onSubmit={handleSubmit(
                ({ name, email, password, typeOfUser, institution, ...rest }) => {

                const randomPass = RoomIdGenerator.generate();
                console.log(randomPass)
                return firebaseAuth
                  .createUserWithEmailAndPassword(email, randomPass)
                  .then(user => {
                    return firebaseDatabase
                      .ref(`/users/${user.uid}`)
                      .set({ ...user.providerData[0],
                          name,
                          email,
                          emailVerified: false,
                          typeOfUser:"contentpartner",
                          institution,
                          disabled: false
                      })
                      .then(function() {
                          console.log("message is sent")
                        firebaseAuth.sendPasswordResetEmail(email)
                      })
                      .then(function() {
                          console.log("sendEmailVerification is sent")
                        firebaseAuth.sendEmailVerification(email)
                      })

                      // .then(_ => {
                      //   history.push('/contentpartner');
                      // });
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
            <div className="flex_container_vertical">
            <h1 className="register-title">Registreer een nieuwe content partner</h1>
              <div className="name-container">
                  <Field
                    name="id"
                    component={FormField}
                    type="text"
                    label="Content partner code"
                    className="name_in"
                    required
                  />
                  <Field
                    name="name"
                    component={FormField}
                    type="text"
                    label="Naam content partner"
                    className="name_in"
                    required
                  />
              </div>
              <div className="etc-container">
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
                  component="select"
                  label="Soort content partner"
                  required
                >
                  <option value="overheid">Overheid</option>
                  <option value="erfgoedcel">Erfgoedcel</option>
                  <option value="museum">Museum</option>
                  <option value="andere">Andere</option>
                </Field>

                </div>

              <div className="submit_div">
              <Button
                className="submit_button"
                type="submit"
                disabled={pristine || submitting}
                >Submit</Button>


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

const formName = 'createUser';
const selector = formValueSelector(formName);

export default reduxForm({ form: formName, validate })(CreateUser);
