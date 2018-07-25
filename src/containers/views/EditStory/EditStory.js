import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Spinner from '../../../components/spinner/Spinner';


import { fetchStory } from '../../../redux/actions';

import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {firebaseAuth, googleAuthProvider, firebaseDatabase} from '../../../helpers/firebase';
import FileField from '../../../components/filefield/FileField';
import FormField from '../../../components/form/FormField';
import './EditStory.css'

class EditStory extends React.Component {

    render() {
        const {
            pristine,
            submitting,
            user,
            logout,
            isLoading,
            fetchStory,
            handleChange,
            history,
            story,
            match: { params: { storyId, moduleId } }
        } = this.props;




        return (
            <div className="page">
                <Navbar logout={logout} user={user}/>
                <h1>Pas uw verhaal aan</h1>
                <h2>{storyId}</h2>


                <form onSubmit={this.props.handleSubmit(({id,thirdYear,fourthYear,fifthYear,sixthYear,firstYearSecondary,secondYearSecondary,...fields}) => {
                    let o = firebaseDatabase.ref('stories/');

                    o.child(storyId).child("general").update({
                            schoolYear: {
                                thirdYear,
                                fourthYear,
                                fifthYear,
                                sixthYear,
                                firstYearSecondary,
                                secondYearSecondary
                            },
                            ...fields
                    })
                })
                }>
                <div className="general-container">
                    <div className="form-box container">
                        <h1>Voeg een verhaal toe</h1>
                        <div className="row">
                            <div className="col-md-3">
                            <Field
                                name="id"
                                component={FormField}
                                type="text"
                                label="Referentie&#8239;nummer"
                            />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <Field
                                name="title"
                                component={FormField}
                                type="text"
                                label="Naam personage"
                                placeholder="vb. Gerard Vanoosthuyze"
                                required
                            />
                            </div>
                            <div className="col-md-6">
                            <Field
                                name="nationality"
                                component={FormField}
                                type="text"
                                label="Nationaliteit"
                                placeholder="vb. Belg"
                                required
                            />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                            <Field
                                name="summary"
                                component={FormField}
                                type="text"
                                label="Korte omschrijving"
                                placeholder=""
                                required
                            />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                            <Field
                                name="dayOfBirth"
                                component={FormField}
                                type="date"
                                label="Geboorte&#8239;datum"
                                placeholder="vb. 24/05/1905"
                                required
                            />
                            </div>
                            <div className="col-md-5">
                            <Field
                                name="dayOfDeath"
                                component={FormField}
                                type="date"
                                label="Datum&#8239;van&#8239;overlijden"
                                placeholder="vb. 21/04/1963"

                                required
                            />
                            </div>
                            <div className="col-md-2">
                            <Field
                                name="age"
                                component={FormField}
                                type="number"
                                label="Leeftijd"
                                placeholder="23"
                                required
                            />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col"><legend>Geschikt voor welk leerjaar?</legend></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <Field name="thirdYear" component={FormField} type="checkbox" label="Derde leerjaar" id="thirdYear"/>
                            </div>
                            <div className="col-md-6">
                            <Field name="fourthYear" component={FormField} type="checkbox" label="Vierde leerjaar" id="fourthYear"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <Field name="fifthYear" component={FormField} type="checkbox" label="Vijfde leerjaar" id="fifthYear"/>
                            </div>
                            <div className="col-md-6">
                            <Field name="sixthYear" component={FormField} type="checkbox" label="Zesde leerjaar" id="sixthYear"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <Field name="firstYearSecondary" component={FormField} type="checkbox" label="Eerste middelbaar" id="firstYearSecondary"/>
                            </div>
                            <div className="col-md-6">
                            <Field name="secondYearSecondary" component={FormField} type="checkbox" label="Tweede middelbaar" id="secondYearSecondary"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Field
                                    name="difficulty"
                                    component="select"
                                    type="text"
                                    label="Moeilijkheidsgraad"
                                    required
                                >
                                    <option value="1">Gemakkelijk</option>
                                    <option value="2">Eerder gemakkelijk</option>
                                    <option value="3">Gemiddeld</option>
                                    <option value="4">Eerder moeilijk</option>
                                    <option value="5">Moeilijk</option>
                                </Field>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            <Field
                                name="creationTips"
                                component={FormField}
                                type="text"
                                label="Knutseltips"
                                placeholder="vb. monument maken in plasticine"
                                required
                            />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            <Field
                                name="link"
                                component={FormField}
                                type="text"
                                label="Interessante site"
                                placeholder="vb. www.museum.be"
                                required
                            />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            <Field
                                name="source"
                                component={FormField}
                                type="text"
                                label="Bron"
                                placeholder=""
                                required
                            />
                            </div>
                            <div>
                              <Field
                                name="profileImage"
                                type="file"
                                label="Voeg een foto toe"
                                component={FileField}
                                onChange={handleChange}
                                required
                              />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Field
                                    name="copyright"
                                    component={FormField}
                                    type="checkbox"
                                    label="Copyright"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="visible"
                                    component={FormField}
                                    type="checkbox"
                                    label="Zichtbaar"
                                />
                            </div>
                        </div>

                    <Button type="submit" disabled={pristine || submitting}>Voeg een verhaal toe</Button>
                    </div>
                </div>
                </form>
                <Footer />
            </div>
            );
        };
    };

const EditStoryForm =  reduxForm({ form: 'editStory'})(EditStory);


 export default connect((state, props) => {
     let {
            id,
            title,
            summary,
            source,
            dayOfBirth,
            dayOfDeath,
            age,
            difficulty,
            creationTips,
            link,
            nationality,
            copyright,
            visible,
            schoolYear,
            tags
     } = {};
     return {
         initialValues: state.story.story.general
     }
 })(EditStoryForm);
