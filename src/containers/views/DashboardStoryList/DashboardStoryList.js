import React from 'react';
import Button from '../../../components/button-small/Button';
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
                <Navbar />
                <h1>Dag {user.firstname} {user.name}</h1>
                <Button className="createbutton" to="/teacher/addstory">Maak een nieuw verhaal aan</Button>
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
                                <div
                                    className="flex"
                                >
                                    <div className="">
                                        <h2>{story.general.title}</h2>
                                        <p>{story.general.summary}</p>
                                    </div>

                                    <div className="flex">
                                    <Button
                                    onClick={(e) => {
                                        this.props.fetchStory(story.id)
                                        .then(() => history.push(`/dashboardstorylist/${story.id}/edit`));
                                    }}
                                    >Aanpassen</Button>
                                    <Button onClick={(e) => {
                                        if (window.confirm('Are you sure you wish to delete this item?')) deleteSt(story) } }>
                                    Verwijder
                                    </Button>
                                    </div>

                                    <div className="flex">
                                    <Button onClick={(e) => this.handleVisibility(e)}>Maak onzichtbaar</Button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    : <div>
                        <p>U heeft nog geen verhalen toegevoegd, maak hierboven een nieuw verhaal aan</p>
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
