import './AddImageQuiz.css';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import FileField from '../../../components/filefield/FileField';
import moment from 'moment';
import { resolve } from 'url';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';



class AddImageQuiz extends React.Component {
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
            <div className="row">
              <h3> Add image quiz for {storyId}</h3>
            </div>
            <form onSubmit={this.props.handleSubmit(
              ({ text, correctImage, otherImage1, otherImage2 }) => {
                let names = ['correct', 'other1', 'other2'];

                let imagePromises = Promise.all([correctImage, otherImage1, otherImage2].map(
                  (file, index) => {

                    return firebaseStorage()
                      .ref()
                      .child(user.uid)
                      .child("story")
                      .child(moment().format('YYYYMMDD_hhmmss'))
                      .child(names[index])
                      .put(file);
                  }
                ));

            let dbPromise = imagePromises.then(
              (tasks) /* <- type = UploadTaskSnapshot[] */ => {
                let urlArray = tasks.map(t => t.metadata.downloadURLs[0]);
                firebaseDatabase
                .ref('stories/')
                .child(storyId)
                .child("modules")
                .push({
                  text,
                  correctPlace,
                  resources: urlArray,
                  contentType: "imagequiz"
                })
              }
            );



                dbPromise.then(() => history.push(`/teacher/dashboard/${storyId}`));

                return dbPromise;
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
              <div className="row">
                <div>
                  <Field
                    name="correctImage"
                    type="file"
                    label="Correct image"
                    component={FileField}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <Field
                    name="otherImage1"
                    type="file"
                    label="Other image 1"
                    component={FileField}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <Field
                    name="otherImage2"
                    type="file"
                    label="Other image 2"
                    component={FileField}
                    onChange={handleChange}
                    required
                  />
                </div>
                </div>
                <div className="row justify-content-center">
                <Button type="submit" disabled={pristine || submitting}>Add image quiz</Button>
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
