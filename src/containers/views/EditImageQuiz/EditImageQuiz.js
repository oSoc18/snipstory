import './EditImageQuiz.css';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';



class EditImageQuiz extends React.Component {
  render() {
    const {
      pristine,
      submitting,
      history,
      resources,
      user,
      logout,
      match: { params: { storyId, moduleId } }
    } = this.props;

    return (
      <div className="page">
        <Navbar user={user} logout={logout}/>
        <div className="add-module-container">
          <div className="add-module-box container">
            <div className="row">
              <h3> Edit image quiz {storyId}</h3>
            </div>
            <form onSubmit={this.props.handleSubmit(
              ({ text }) => {
                return firebaseDatabase
                .ref('stories/')
                .child(storyId)
                .child("modules")
                .child(moduleId)
                .update({
                    text
                }).then(() => history.push(`/teacher/dashboard/${storyId}`));
              })
            }>
              <div className="row">
                <div>
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
                <Button type="submit" disabled={pristine || submitting}>Add image quiz</Button>
              </div>
            </form>
            {
              resources && resources.map((url, index) => <div>
                <img className="old-images" src={url} onClick={() => history.push(`/teacher/dashboard/${storyId}/edit/imagequiz/${moduleId}/replaceimage/${index}`)} />
              </div>)
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  };
};

const EditImageQuizForm = reduxForm({ form: 'editImageQuiz' })(EditImageQuiz);
export default connect((state, props) => {
  let module = state.story.story.modules[props.match.params.moduleId];
  return {
    initialValues: {
      text: module.text
    },
    resources: module.resources
  }
})(EditImageQuizForm);
