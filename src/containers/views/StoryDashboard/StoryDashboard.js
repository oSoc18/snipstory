import React from 'react';
import { connect } from 'react-redux';
import { fetchStory } from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import './StoryDashboard.css';


class StoryDashboard extends React.Component {
    componentWillMount() {
        const { fetchStory, match: { params: { storyId } } } = this.props;

        fetchStory(storyId);
    }

    render(){
        const { story, isLoading } = this.props;

        console.log(JSON.stringify(story));
        console.log(story);
        if (isLoading || !story ) {
            return <Spinner page size="large" />;
        }
        return (<div>
            <h1>Manage a story {story.id}</h1>
            <h2>{story.general.title}</h2>
        </div>)
    }
};


const mapStateToProps = state => state.story;

export default connect(mapStateToProps, { fetchStory })(StoryDashboard);
