import './AddQuiz.scss';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import FileField from '../../../components/filefield/FileField';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import { Link } from 'react-router-dom';

class AddQuiz extends React.Component {
  render() {
    const {
      pristine,
      submitting,
      user,
      history,
      logout,
      handleChange,
      match: { params: { storyId } }
    } = this.props;

    return (
      <div className="page">
        <Navbar />
        <div className="add-module-container">
          <div className="add-module-box container">
            <h3> Add quiz for {storyId}</h3>
            <form onSubmit={this.props.handleSubmit(
              ({...fields, correct, other1, other2}) => {
                let o = firebaseDatabase
                    .ref('stories/')
                    .child(storyId);
                    o.child("modules")
                    .push({
                      contentType: "quiz",
                      options: {
                          correct,
                          other1,
                          other2
                      },
                      ...fields
                    })
                .then(() => history.push(`/teacher/dashboard/${storyId}`))
              })
            }>
              <div className="row">
                <div className="col">
                  <Field
                    name="question"
                    component={FormField}
                    type="text"
                    label="Question text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Field
                    name="correct"
                    component={FormField}
                    type="text"
                    label="Correct answer"
                    required
                  />
                </div>
                <div className="col">
                  <Field
                    name="other1"
                    component={FormField}
                    type="text"
                    label="Other answer"
                    required
                  />
                </div>
                <div className="col">
                  <Field
                    name="other2"
                    component={FormField}
                    type="text"
                    label="Other answer (2)"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Field
                    name="correctMessage"
                    component={FormField}
                    type="text"
                    label="Correction message"
                    required
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <Button type="submit" disabled={pristine || submitting}>Add quiz</Button>
              </div>
              <div className="row justify-content-center">
                  <Link to="../">Cancel</Link>
                </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
};

export default reduxForm({ form: 'addQuiz' })(AddQuiz);
