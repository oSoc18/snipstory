import React from 'react';
import ButtonSmall from '../../../components/button-small/ButtonSmall';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Spinner from '../../../components/spinner/Spinner';
import PopUp from 'reactjs-popup';


import { connect } from 'react-redux';
import { history } from '../../../redux/store';
import {
    fetchStoriesDashboardList,
    deleteStory,
    fetchStory
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
                            id = {story.id}
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
export default connect(mapStateToProps,
    {fetchStoriesDashboardList,
        deleteStory,
        fetchStory
    })(DashboardStoryList);
