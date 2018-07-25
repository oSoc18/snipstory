import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';
import Button from '../../../components/button/Button';
import FileField from '../../../components/filefield/FileField';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import { connect } from 'react-redux';

class ImageReplace extends React.Component {
  render() {
    const {
      match: { params: { storyId, moduleId, index } },
      handleChange,
      oldImg,
      user,
      pristine,
      submitting,
      history,
    } = this.props;

    return (
      <div className="page">
        <Navbar />
        <div className="add-module-container">
          <div className="add-module-box container">
            <h3> Change an image in {storyId}</h3>
            <img src={oldImg} />
            <form onSubmit={this.props.handleSubmit(
              ({ file }) => {
                let names = ['correct', 'other1', 'other2'];

                let promise = new Promise((resolve, reject) => {
                  firebaseStorage()
                    .ref()
                    .child(user.uid)
                    .child("story")
                    .child(storyId)
                    .child(moduleId)
                    .child(names[index])
                    .put(file)
                    .then(task => {
                      /* tasks:
                      https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask
                      */
                      firebaseDatabase
                        .ref('stories/')
                        .child(storyId)
                        .child('modules')
                        .child(moduleId)
                        .child("resources")
                        .child(index)
                        .set(task.metadata.downloadURLs[0])
                        .catch(reject)
                        .then(resolve)
                    })
                })

                promise.then(() => history.push(`/teacher/dashboard/${storyId}`));

                return promise;
              })
            }>
              <div className="row">
                <Field
                  name="file"
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

const ImageReplaceForm = reduxForm({ form: 'imageReplace' })(ImageReplace);
export default connect((state, props) => {
  let {match: { params: { moduleId, index } }} = props;
  return {
    oldImg: state.story.story.modules[moduleId].resources[index]
  }
})(ImageReplaceForm)
