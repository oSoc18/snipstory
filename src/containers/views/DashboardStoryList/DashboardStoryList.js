import React from 'react';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import CardMin from '../../../components/card-min/Card-min';
import Spinner from '../../../components/spinner/Spinner';


import { connect } from 'react-redux';
import { history } from '../../../redux/store';
import {
    fetchStoriesDashboardList,
    deleteStory,
    fetchStory,
    logout
 } from '../../../redux/actions';


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
            logout,
            deleteStory
        } = this.props;



        const deleteSt = (story) => {
            console.log(story.id);
            deleteStory(story);

        }


        if (isLoading || !stories || stories.length === 0) {
          return <Spinner page size="large" />;
        }

        const filteredStories = stories.filter(story =>
            story.general.userId === user.uid
        )
        return (
            <div className="page">
                <Navbar logout={logout} user={user}/>
                <div className="dashboard-story-container">
                    <div className="story-dashboard-header container">
                        <div className="row">
                            <div className="col">
                                <div className="row">Dag {user.name}</div>
                                <h1 className="row">List of your stories</h1>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <Button size="small" to="/teacher/addstory">Maak een nieuw verhaal aan</Button>
                                </div>
                            </div>
                        </div>

                     </div>
                    <div className="story-dashboard-body container">
                        <div className="row">
                            <div className="col">
                                <div className="row cards-grid">

                                {filteredStories && filteredStories.length > 0
                                ?
                                    filteredStories.map(story => {

                                        return (
                                            <CardMin
                                            id={story.general.id}
                                            title={story.general.title}
                                            picture={story.general.profilePicture}
                                            dateOfBirth={story.general.dayOfBirth}
                                            dateOfDeath={story.general.dayOfDeath}
                                            difficulty={story.general.difficulty}
                                            />
                                        )
                                    })
                                    : <div>
                                        Je hebt nog geen verhalen toegevoegd
                                        <span role="img" aria-label="Crying face">
                                        😢
                                        </span>
                                    </div>
                                }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.stories});
export default connect(mapStateToProps,
    {fetchStoriesDashboardList,
        deleteStory,
        fetchStory,
        logout
    })(DashboardStoryList);
