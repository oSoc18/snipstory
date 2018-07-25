import './AddFunfact.css';

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseDatabase } from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import { Link } from 'react-router-dom';

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
            <Navbar logout={logout} user={user}/>
            <div className="add-module-container">
            <div className="add-module-box container">
                    <form onSubmit={this.props.handleSubmit(({text}) => {
                        return firebaseDatabase
                        .ref('stories/')
                        .child(storyId)
                        .child("modules")
                        .push({
                            text,
                            contentType: "funfact"
                        }).then(() => history.push(`/teacher/dashboard/${storyId}`));
                        })
                    }>
                        <div className="row justify-content-center">
                            <h3> Add weetje</h3>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <Field
                                    name="text"
                                    component={FormField}
                                    type="text"
                                    label="Weetje text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <Button type="submit" disabled={pristine || submitting}>Add weetje</Button>
                        </div>
                        <div className="row justify-content-center">
                            <Link to="../">Cancel</Link>
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
