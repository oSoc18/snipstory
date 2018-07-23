import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button'

class EditFunfact extends React.Component {
    render() {
        const {
            pristine,
            submitting,
            history,
            match: { params: {storyId, moduleId} }
        } = this.props;

    return (
        <div className="page">
            <h1> Add weetje for { storyId }</h1>
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
            <div className="general-container">
                <div>
                    <Field
                        name="text"
                        component={FormField}
                        type="text"
                        label="Weetje text"
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

const EditFunfactForm = reduxForm({ form: 'addFunfact'})(EditFunfact);

export default connect((state, props) => ({
  initialValues: {
    text: state.story.story[props.match.params.moduleId].text
  }
}))(EditFunfactForm);
