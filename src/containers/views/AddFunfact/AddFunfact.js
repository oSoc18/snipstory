import './AddFunfact.css';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';

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
            <Navbar />
           
            <div className="add-module-container">
                <div className="container">
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
                        <div className="row">
                            <h1> Add weetje for { storyId }</h1>
                        </div>
                        <div className="row">
                            <Field
                                name="text"
                                component={FormField}
                                type="text"
                                label="Weetje text"
                                required
                            />
                        </div>
                        <div className="row">
                            <Button size="small" type="submit" disabled={pristine || submitting}>Add weetje</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
        );
    };
};

export default reduxForm({ form: 'addFunfact'})(AddFunfact);
