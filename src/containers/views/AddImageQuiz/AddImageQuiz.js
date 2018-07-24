import './AddImageQuiz.scss';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import FileField from '../../../components/filefield/FileField';
import moment from 'moment';
import { resolve } from 'url';

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
        <h1> Add image quiz for {storyId}</h1>
        <form onSubmit={this.props.handleSubmit(
          ({ correctPlace, text, correctImage, otherImage1, otherImage2 }) => {
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
                name="correctPlace"
                component={FormField}
                type="number"
                label="Welke foto is juist?"
                required
              />
            </div>
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
            <Button type="submit" disabled={pristine || submitting}>Add weetje</Button>
          </div>
        </form>
      </div>
    );
  };
};

export default reduxForm({ form: 'addImageQuiz' })(AddImageQuiz);
