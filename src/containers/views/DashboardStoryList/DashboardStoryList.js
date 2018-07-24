import React from 'react';
<<<<<<< HEAD
import ButtonSmall from '../../../components/button-small/ButtonSmall';
=======
import Button from '../../../components/button/Button';
>>>>>>> develop
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
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
                <h1>Dag {user.name}</h1>
                <Button to="/teacher/addstory">Maak een nieuw verhaal aan</Button>
                <div className="row">

                {filteredStories && filteredStories.length > 0
                  ?
                    filteredStories.map(story => {

                        return (
                            <div
                                key={story.general.id}
                                className="storyCards"
                                id = {story.general.id}
                            >
<<<<<<< HEAD
                                <div className="">
                                    <h2>{story.general.title}</h2>
                                    <p>{story.general.summary}</p>
                                </div>

                                <div className="flex">
                                <ButtonSmall
                                onClick={(e) => {
                                    this.props.fetchStory(story.id)
                                    .then(() => history.push(`/dashboardstorylist/${story.id}/edit`));
                                }}
                                >Aanpassen</ButtonSmall>
                                <ButtonSmall onClick={(e) => {
                                    if (window.confirm('Are you sure you wish to delete this item?')) deleteSt(story) } }>
                                Verwijder
                                </ButtonSmall>
                                </div>

                                <div className="flex">
                                <ButtonSmall>Maak onzichtbaar</ButtonSmall>
=======
                                <div
                                    className="flex"
                                >
                                    <div className="">
                                        <h2>{story.general.title}</h2>
                                        <p>{story.general.summary}</p>
                                    </div>

                                    <div className="flex">
                                    <Button
                                    size="small"
                                    onClick={(e) => {
                                        this.props.fetchStory(story.id)
                                        .then(() => history.push(`/dashboardstorylist/${story.id}/edit`));
                                    }}
                                    >Aanpassen</Button>
                                    <Button 
                                    size="small"
                                    onClick={(e) => {
                                        if (window.confirm('Are you sure you wish to delete this item?')) deleteSt(story) } }>
                                    Verwijder
                                    </Button>
                                    </div>

                                    <div className="flex">
                                    <Button size="small" onClick={(e) => this.handleVisibility(e)}>Maak onzichtbaar</Button>
                                    </div>

>>>>>>> develop
                                </div>
                            </div>
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
                <Button onClick={logout}>Uitloggen</Button>
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
