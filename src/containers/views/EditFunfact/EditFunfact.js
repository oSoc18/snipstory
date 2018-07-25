import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button'
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import { Link } from 'react-router-dom';

class EditFunfact extends React.Component {
    render() {
        const {
            pristine,
            submitting,
            history,
            reset,
            user,
            logout,
            match: { params: {storyId, moduleId} }
        } = this.props;

    return (
        <div className="page">
            <Navbar logout={logout} user={user}/>
            <div className="add-module-container">
            <div className="add-module-box container">
            <form onSubmit={this.props.handleSubmit(({text}) => {
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
                <div className="row justify-content-center">
                    <h1> Edit weetje for { storyId }</h1>
                </div>
                <div className="row justify-content-center">
                    <Field
                        name="text"
                        component={FormField}
                        type="text"
                        label="Weetje text"
                        required
                    />
                </div>
                <div className="row justify-content-center">
                     <Button type="submit" disabled={pristine || submitting}>Save</Button>
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

const EditFunfactForm = reduxForm({ form: 'editFunfact'})(EditFunfact);

export default connect((state, props) => ({
  initialValues: {
    text: state.story.story.modules[props.match.params.moduleId].text
  }
}))(EditFunfactForm);
