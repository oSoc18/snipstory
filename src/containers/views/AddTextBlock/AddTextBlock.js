import './AddTextBlock.scss';

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
        <h1> Add textblock for {storyId}</h1>
        <form onSubmit={this.props.handleSubmit(
          ({ text, textBlockImage }) => {
              let name = ['textblockimage'];

              let imagePromise = Promise.all([textBlockImage].map(
                (file, index) => {
                  return firebaseStorage()
                  .ref()
                  .child(user.uid)
                  .child("story")
                  .child(moment().format('YYYYMMDD_hhmmss'))
                  .child(name[index])
                  .put(file);
              })
          );

              let dbPromise = imagePromise.then(
              (tasks) /* <- type = UploadTaskSnapshot[] */ => {
                let urlArray = tasks.map(t => t.metadata.downloadURLs[0]);
                firebaseDatabase
                .ref('stories/')
                .child(storyId)
                .child("modules")
                .push({
                  text,
                  resources: urlArray,
                  contentType: "textblock"
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
                type="textarea"
                label="Informatie"
                required
              />
            </div>
            <div>
              <Field
                name="textBlockImage"
                type="file"
                label="Voeg een foto toe"
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
