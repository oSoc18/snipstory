import React from 'react';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';


import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {firebaseAuth, googleAuthProvider, firebaseDatabase, firebaseStorage} from '../../../helpers/firebase';
import moment from 'moment';
import FileField from '../../../components/filefield/FileField';
import FormField from '../../../components/form/FormField';
import './AddStories.css'



class AddStories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            title: "",
            summary: "",
            source:"",
            dayOfBirth:"",
            dayOfDeath:"",
            age:"",
            level:"",
            difficulty:"",
            creationTips:"",
            link:"",
            nationality:"",
            tags: {
                locations: {
                    poperinge: false,
                    brugge: false,
                    ieper: false
                },
                categories: {
                    food: false,
                    sport: false,
                    transportation: false
                }
            }
        }
    }

    handleTag(e) {
        e.preventDefault;

        let newState = Object.assign({}, this.state);

        console.log(e.target.value)

        Object.entries(this.state.tags).map(([child,tagsOfChild]) => {
                Object.entries(tagsOfChild).map(([tag,value]) => {
                    if(e.target.value === tag) {
                        newState.tags[child][tag] = !value
                        this.setState(newState)
                    }
                })
            })
        }

    testMethod() {
        console.log(Object.entries(this.state.tags).map(([key,value]) => {
            return (
                <Button size="small" >{value}</Button>
            )
        }))
    }


    render() {
        const {
            pristine,
            submitting,
            user,
            history,
            handleChange,
            logout
        } = this.props;

        console.log(user.uid);
    return (

        <div className="page">
            <Navbar logout={logout} user={user}/>
            <h1>Voeg een verhaal toe</h1>

            <form onSubmit={this.props.handleSubmit(({id,thirdYear,fourthYear,fifthYear,sixthYear,firstYearSecondary,secondYearSecondary,profileImage,...fields,...props}) => {
                let name = ['profileimage'];

                let imagePromise = Promise.all([profileImage].map(
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
                let o = firebaseDatabase.ref('stories/');
                o.child(id).set({
                        id,
                        general: {
                            userId: user.uid,
                            schoolYear: {
                                thirdYear: thirdYear || false,
                                fourthYear: fourthYear || false,
                                fifthYear: fifthYear || false,
                                sixthYear: sixthYear || false,
                                firstYearSecondary: firstYearSecondary || false,
                                secondYearSecondary: secondYearSecondary || false
                            },
                            tags: {
                                locations: {
                                    poperinge: this.state.tags.locations.poperinge,
                                    brugge: this.state.tags.locations.brugge,
                                    ieper: this.state.tags.locations.ieper
                                },
                                categories: {
                                    food: this.state.tags.categories.food,
                                    sport: this.state.tags.categories.sport,
                                    transportation: this.state.tags.categories.transportation
                                }
                            },
                            profilePicture: urlArray,
                            ...fields
                        }
                    })
                })
                .then(() => history.push("/teacher/dashboardstorylist"))

            }
            )}>
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
                            required
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
                            label="Linked website"
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

                    <div>
                    <div className="row">Belangrijke locaties</div>
                    <div className="row">

                    {this.testMethod()}

                    {Object.entries(this.state.tags).map(([child,tagsOfChild]) => {
                            return Object.entries(tagsOfChild).map(([tag,value]) => {
                                return (
                                    <div key={tag}>
                                        <Button size="small" type="button" className={value ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value={tag}>{tag}</Button>
                                    </div>
                                )
                            })
                    })}

                    </div>
                </div>
                </div>




                    <Button className="submit_button" type="submit" disabled={pristine || submitting}>Voeg een verhaal toe</Button>
            </div>

            </form>
            <Footer />
        </div>
        );
    };
};

export default reduxForm({ form: 'addStories'})(AddStories);
