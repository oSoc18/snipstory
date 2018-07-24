import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button'

class EditQuiz extends React.Component {
  render() {
    const {
      pristine,
      submitting,
      history,
      match: { params: { storyId, moduleId } }
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
                .child(moduleId)
                .update({
                  ...formData
                }).then(() => history.push(`/teacher/dashboard/${storyId}`));
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

            <Button type="submit" disabled={pristine || submitting}>Edit quiz</Button>
          </div>
        </form>
      </div>
    );
  };
};

const EditQuizForm = reduxForm({ form: 'editQuiz'})(EditQuiz);

export default connect((state, props) => {
  let {
    correct,
    other1,
    other2,
    correctMessage,
    text
  } = {};
  return {
    initialValues: state.story.story.modules[props.match.params.moduleId]
  }
})(EditQuizForm);
