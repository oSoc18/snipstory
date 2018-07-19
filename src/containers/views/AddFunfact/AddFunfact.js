import './AddFunfact.scss';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button'

class AddFunfact extends React.Component {
    render() {
        const {
            pristine,
            submitting,
            user,
            history,
            logout,
            match: { params: {storyId} }
        } = this.props;

    return (
        <div className="page">
            <h1> Add weetje for { storyId }</h1>
            <form onSubmit={this.props.handleSubmit(({text}) => {
                let o = firebaseDatabase
                .ref('stories/')
                .child(storyId);
                o.child("modules")
                .push({
                    text,
                    contentType: "funfact"
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

export default reduxForm({ form: 'addFunfact'})(AddFunfact);
