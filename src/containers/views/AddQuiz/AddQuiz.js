import './AddQuiz.scss';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import FileField from '../../../components/filefield/FileField';

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
        <h1> Add quiz for {storyId}</h1>
        <form onSubmit={this.props.handleSubmit(
          (formData) => {
            return firebaseDatabase
                .ref('stories/')
                .child(storyId)
                .child("modules")
                .push({
                  contentType: "quiz",
                  ...formData
                })
            .then(() => history.push(`/teacher/dashboard/${storyId}`))
          })
        }>
          <div className="general-container">
            <div>
              <Field
                name="text"
                component={FormField}
                type="text"
                label="Question text"
                required
              />
            </div>
            <div>
              <Field
                name="correct"
                component={FormField}
                type="text"
                label="Correct answer"
                required
              />
            </div>
            <div>
              <Field
                name="other1"
                component={FormField}
                type="text"
                label="Other answer"
                required
              />
            </div>
            <div>
              <Field
                name="other2"
                component={FormField}
                type="text"
                label="Other answer (2)"
                required
              />
            </div>
            <div>
              <Field
                name="correctMessage"
                component={FormField}
                type="text"
                label="Correction message"
                required
              />
            </div>

            <Button type="submit" disabled={pristine || submitting}>Add quiz</Button>
          </div>
        </form>
      </div>
    );
  };
};

export default reduxForm({ form: 'addQuiz' })(AddQuiz);
