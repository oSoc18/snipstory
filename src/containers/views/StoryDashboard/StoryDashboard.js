import React from 'react';
import { connect } from 'react-redux';
import { fetchStory, deleteModule } from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import Button from '../../../components/button/Button'
import './StoryDashboard.css';


class StoryDashboard extends React.Component {
    componentWillMount() {
        const { fetchStory, match: { params: { storyId } } } = this.props;
        fetchStory(storyId);
    }

    render(){
        const { story, isLoading, deleteModule, currentlyDeletingId } = this.props;

        if (isLoading || !story ) {
            return <Spinner page size="large" />;
        }
        return (<div>
            <h1>Manage a story {story.id}</h1>
            <h2>{story.general.title}</h2>

            <Button to="/teacher/editstory" size="small">
                Edit Story
            </Button>
            <Button
                to={`/teacher/dashboard/${story.id}/addfunfact/`}
                size="small">
                    Add Fun fact
            </Button>
            <Button
                to={`/teacher/dashboard/${story.id}/addimagequiz/`}
                size="small">
                    Add Image quiz
            </Button>
            <Button
                to={`/teacher/dashboard/${story.id}/addquiz/`}
                size="small">
                    Add quiz
            </Button>

            {story.modules && Object.keys(story.modules).map((moduleId, index) => {
                let module = story.modules[moduleId];
                console.log(`module text ${module.text} ${module.type}`)
                switch (module.contentType){
                    // TODO set key={module.order}
                    case "funfact":
                        return (<div className="funfact-dashboard" key={moduleId}>
                            <h3>
                                Funfact
                            </h3>
                            <button
                            disabled={currentlyDeletingId != null}
                            onClick={() => deleteModule(story.id, moduleId)}
                              >Delete</button>
                            <p>
                                {module.text}
                            </p>
                        </div>);
                    case "imagequiz":
                        return (<div>
                          <h3>Image Quiz</h3>
                          <p>
                            { module.text }
                          </p>
                          <button
                            disabled={currentlyDeletingId != null}
                            onClick={() => deleteModule(story.id, moduleId)}
                              >Delete</button>
                          { module.resources.map((url, index) => <img key={moduleId} src={url} height="70" width="70" key={index}/>) }
                        </div>);
                    case "quiz":
                        return (<div>
                          <h3>Quiz</h3>
                          <button
                            disabled={currentlyDeletingId != null}
                            onClick={() => deleteModule(story.id, moduleId)}
                              >Delete</button>
                          <p> { module.text } </p>
                        </div>);
                    }
                })
            }
        </div>)
    }
};


const mapStateToProps = state => state.story;

export default connect(mapStateToProps, { fetchStory, deleteModule })(StoryDashboard);
