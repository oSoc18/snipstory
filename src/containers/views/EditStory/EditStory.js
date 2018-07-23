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
import FormField from '../../../components/form/FormField';
import './EditStory.css'

class EditStory extends React.Component {

    componentWillMount() {
        const { fetchStory, match: { params: { storyId } } } = this.props;
        fetchStory(storyId);

        console.log(fetchStory(storyId));
    }

    constructor() {
        super();
        this.state = {
            id:"",
            title:"",
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
                poperinge: false,
                brugge: false,
                ieper: false,
                food: false,
                sport: false,
                transportation: false
            }
        }
        // this.handleTag = this.handleTag.bind(this)
        // this.props.handleSubmit = this.props.handleSubmit.bind(this)
    }

    handleTag(e) {
        e.preventDefault;
        console.log(e.target.value);

        let tags = Object.keys(this.state.tags);
        let newState = Object.assign({}, this.state);
        for(let i = 0; i < tags.length; i++) {

            if(e.target.value === tags[i]) {
                let tag = tags[i];
                newState.tags[e.target.value] = !newState.tags[e.target.value]
                this.setState(newState)

            }
        }


        console.log(this.state.tags);

    }


    render() {
        const {
            pristine,
            submitting,
            user,
            logout,
            isLoading,
            story
        } = this.props;


        if (isLoading || !story ) {
            return <Spinner page size="large" />;
        }
        console.log({story});

        return (
            <div className="page">
                <Navbar />
                <h1>Pas uw verhaal aan</h1>
                <h2>{story.general.title}</h2>


                <form onSubmit={this.props.handleSubmit(({id,thirdYear,fourthYear,fifthYear,sixthYear,firstYearSecondary,secondYearSecondary,...fields}) => {
                    let o = firebaseDatabase.ref('stories/');

                    o.child(id).child("general").set({
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
                <div className="general-container container">
                    <div>
                        <Field
                            name="id"
                            component={FormField}
                            type="text"
                            label="Referentie nummer"
                            value="test"
                            required
                        />
                    </div>
                        <div>
                            <Field
                                name="title"
                                component={FormField}
                                type="text"
                                label="Naam personage"
                                placeholder="vb. Gerard Vanoosthuyze"
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="summary"
                                component={FormField}
                                type="text"
                                label="Korte omschrijving"
                                value={story.id}
                                placeholder=""
                                required
                            />
                        </div>
                        <div>
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
                                name="dayOfBirth"
                                component={FormField}
                                type="date"
                                label="Geboorte datum"
                                placeholder="vb. 24/05/1905"
                                // required
                            />
                        </div>
                        <div>
                            <Field
                                name="dayOfDeath"
                                component={FormField}
                                type="date"
                                label="Datum van overlijden"
                                placeholder="vb. 21/04/1963"
                                // required
                            />
                        </div>
                        <div>
                            <Field
                                name="age"
                                component={FormField}
                                type="number"
                                label="Leeftijd"
                                placeholder="vb. 23"
                                required
                            />
                        </div>
                        <legend>Geschikt voor welk leerjaar?</legend>
                        <div>
                        <Field name="thirdYear" component={FormField} type="checkbox" label="Derde leerjaar" id="thirdYear"/>
                        <Field name="fourthYear" component={FormField} type="checkbox" label="Vierde leerjaar" id="fourthYear"/>
                        <Field name="fifthYear" component={FormField} type="checkbox" label="Vijfde leerjaar" id="fifthYear"/>
                        <Field name="sixthYear" component={FormField} type="checkbox" label="Zesde leerjaar" id="sixthYear"/>
                        <Field name="firstYearSecondary" component={FormField} type="checkbox" label="Eerste middelbaar" id="firstYearSecondary"/>
                        <Field name="secondYearSecondary" component={FormField} type="checkbox" label="Tweede middelbaar" id="secondYearSecondary"/>
                        </div>

                        <div>
                            <Field
                                name="difficulty"
                                component="select"
                                type="text"
                                label="Moeilijkheidsgraad"
                                required
                            >
                            <option value="easy">Gemakkelijk</option>
                            <option value="rather-easy">Eerder gemakkelijk</option>
                            <option value="intermediary">Gemiddeld</option>
                            <option value="rather difficult">Eerder moeilijk</option>
                            <option value="difficult">Moeilijk</option>
                            </Field>

                        </div>
                        <div>
                            <Field
                                name="creationTips"
                                component={FormField}
                                type="text"
                                label="Knutseltips"
                                placeholder="vb. monument maken in plasticine"
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="link"
                                component={FormField}
                                type="text"
                                label="Linked website"
                                placeholder="vb. www.museum.be"
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="nationality"
                                component={FormField}
                                type="text"
                                label="Nationaliteit"
                                placeholder="vb. Belg"
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="copyright"
                                component={FormField}
                                type="checkbox"
                                label="Copyright"
                            />
                        </div>
                        <div>
                            <Field
                                name="visible"
                                component={FormField}
                                type="checkbox"
                                label="Zichtbaar"
                            />
                        </div>
                        <div>
                        <span>Belangrijke locaties</span>

                        <Button size="small" className={this.state.tags.brugge ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="brugge">Brugge</Button>
                        <Button size="small" className={this.state.tags.ieper ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="ieper">Ieper</Button>
                        <Button size="small" className={this.state.tags.poperinge ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="poperinge">Poperinge</Button>

                        </div>
                        <div>
                        <span>Categorie</span>

                        <Button size="small" className={this.state.tags.food ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="food">Voedsel</Button>
                        <Button size="small" className={this.state.tags.sport ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="sport">Sport</Button>
                        <Button size="small" className={this.state.tags.transportation ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="transportation">Transport</Button>

                        </div>

                        <Button type="submit" disabled={pristine || submitting}>Voeg een verhaal toe</Button>
                </div>
                </form>
                <Footer />
            </div>
            );
        };
    };

const s =  reduxForm({ form: 'editStory'})(EditStory);

const mapStateToProps = state => state.story;
// {
//         return (
//             {intialValue: {
//                 title: state.story.story.general.title
//             }
//         }
//     )
//     };

 export default connect(mapStateToProps, { fetchStory })(s);
