import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button'
import Navbar from '../../../components/nav/Navbar';
import { Link } from 'react-router-dom';

class EditQuiz extends React.Component {
  render() {
    const {
      pristine,
      submitting,
      history,
      user,
      logout,
      match: { params: { storyId, moduleId } }
    } = this.props;

    return (
      <div className="page">
        <Navbar logout={logout} user={user}/>
        <div className="add-module-container">
        <div className="add-module-box container">        
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
            <div className="row justify-content-center">
              <h1> Edit quizz for { storyId }</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <Field
                  name="text"
                  component={FormField}
                  type="text"
                  label="Question text"
                  required
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <Field
                  name="correct"
                  component={FormField}
                  type="text"
                  label="Correct answer"
                  required
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <Field
                  name="other1"
                  component={FormField}
                  type="text"
                  label="Other answer"
                  required
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <Field
                  name="other2"
                  component={FormField}
                  type="text"
                  label="Other answer (2)"
                  required
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
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
              <Button type="submit" disabled={pristine || submitting}>Edit quiz</Button>
            </div>
            <div className="row justify-content-center">
              <Link to="../../">Cancel</Link>
            </div>
        </form>
      </div>
      </div>
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
