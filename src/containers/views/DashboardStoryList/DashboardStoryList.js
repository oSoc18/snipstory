import React from 'react';
import Button from '../../../components/button-small/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Spinner from '../../../components/spinner/Spinner';
import PopUp from 'reactjs-popup';


import { connect } from 'react-redux';
import { history } from '../../../redux/store';
import { fetchStoriesDashboardList } from '../../../redux/actions';


import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {firebaseAuth, googleAuthProvider, firebaseDatabase} from '../../../helpers/firebase';
import FormField from '../../../components/form/FormField';
import './DashboardStoryList.css'

class DashboardStoryList extends React.Component {
    componentWillMount() {
        this.props.fetchStoriesDashboardList();
    }

    render() {
        const {
            stories,
            isLoading,
            pristine,
            submitting,
            user,
            logout
        } = this.props;

        const deleteStory = (e) => {
            console.log("delete");
        //     return (
        //     // <Popup trigger={<button> Trigger</button>} position="right center">
        //     //     <div>Popup content here !!</div>
        //     // </Popup>
        // )
        }


        if (isLoading || !stories || stories.length === 0) {
          return <Spinner page size="large" />;
        }

        // if (isLoading) {
        //     console.log("isLoading");
        // }
        // if (!stories) {
        //     console.log("NOT STORIES");
        // }
        // else if (stories.length === 0) {
        //     console.log("LENGTH IS 0");
        // }

        return (
            <div className="page">
                <Navbar />
                <h1>Beheer uw verhalen</h1>
                <div className="row">
                {stories.map(story => {
                    return (
                        <div
                            key={story.id}
                            className="storyCards"
                            // onClick= { => {
                            //     history.push('/stories/' + story.id);
                            // }}
                        >
                            <div
                                className="flex"
                            >
                                <div className="">
                                    <h2>{story.general.title}</h2>
                                    <p>{story.general.summary}</p>
                                </div>

                                <div className="flex">
                                <Button>Aanpassen</Button>
                                <button  onClick={(e) => {
                                    if (window.confirm('Are you sure you wish to delete this item?')) deleteStory(e) } }>
                                Verwijder
                                </button>
                                </div>

                                <div className="flex">
                                <Button>Maak onzichtbaar</Button>
                                </div>

                            </div>
                        </div>
                    );
                })}
                </div>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.stories});
export default connect(mapStateToProps, {fetchStoriesDashboardList})(DashboardStoryList);
