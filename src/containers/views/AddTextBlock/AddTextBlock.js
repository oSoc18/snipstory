import './AddTextBlock.scss';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import FileField from '../../../components/filefield/FileField';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';

class AddImageQuiz extends React.Component {
  render() {
    const {
      pristine,
      submitting,
      user,
      history,
      handleChange,
      match: { params: { storyId } }
    } = this.props;

    return (
      <div className="page">
        <Navbar />
        <div className="add-module-container">
          <div className="add-module-box container">
            <h3> Add textblock for {storyId}</h3>
            <form onSubmit={this.props.handleSubmit(
              ({ text, textBlockImage }) => {

                let promise = new Promise((resolve, reject) => {
                  firebaseDatabase
                    .ref('stories/')
                    .child(storyId)
                    .child("modules")
                    .push({
                      text,
                      contentType: "textblock"
                    }).then(snap => {
                      let moduleId = snap.key;
                      firebaseStorage()
                        .ref()
                        .child(user.uid)
                        .child("story")
                        .child(storyId)
                        .child(moduleId)
                        .child('textblockimage')
                        .put(textBlockImage)
                        .then(task => {
                          /* tasks:
                          https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask
                          */
                          firebaseDatabase
                            .ref('stories/')
                            .child(storyId)
                            .child('modules')
                            .child(moduleId)
                            .child("resource")
                            .set(task.metadata.downloadURLs[0])
                            .catch(reject)
                            .then(resolve)
                        })
                        .catch(reject)
                    })
                });




                promise.then(() => history.push(`/teacher/dashboard/${storyId}`));

                return promise;
              })
            }>
              <div className="row">
                <div className="col-md-12">
                  <Field
                    name="text"
                    component={FormField}
                    type="textarea"
                    label="Informatie"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <Field
                  name="textBlockImage"
                  type="file"
                  label="Voeg een foto toe"
                  component={FileField}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row justify-content-center">
                <Button type="submit" disabled={pristine || submitting}>Voeg toe</Button>
              </div>
            </form>
          </div>
        </div>
        <Footer />

      </div>
    );
  };
};

export default reduxForm({ form: 'addImageQuiz' })(AddImageQuiz);
