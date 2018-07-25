import React from 'react';
import { connect } from 'react-redux';
import {
    fetchStory,
    logout,
    fetchStoryModules,
  listenForRoomChange,
  updateModule,
  getRandomSuggestions,
  joinRoom,
  sendCreation,
  changeUsernameCurrentUser,
  showToast
} from '../../../redux/actions';
import { getReadableDate } from '../../../helpers/moment';
import Spinner from '../../../components/spinner/Spinner';
import ImageModule from '../../../components/modules/ImageModule';
import ImageQuizModule from '../../../components/modules/ImageQuizModule';
import ImageQuiz from '../../../components/ImageQuiz/ImageQuiz';

import MapModule from '../../../components/modules/MapModule';
import QuizModule from '../../../components/modules/QuizModule';
import SearchExerciseModule from '../../../components/modules/SearchExerciseModule';
import TextblockModule from '../../../components/modules/TextblockModule';
import VideoModule from '../../../components/modules/VideoModule';
import YoutubeModule from '../../../components/modules/YoutubeModule';
import FunFactModule from '../../../components/modules/FunFactModule';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';

import StepIndicator from '../../../components/step-indicator/StepIndicator';
import FloatingSteps from '../../../components/step-indicator/FloatingSteps';
import FloatingNext from '../../../components/step-indicator/FloatingNext';
import WorkTogether from '../../../components/work-together/WorkTogether';
import ModuleList from '../../../components/ModuleList/ModuleList';


import './StoryPreview.css';

class StoryPreview extends React.Component {
    componentWillMount() {
      const { fetchStory, match: { params: { storyId } } } = this.props;
      fetchStory(storyId);
    }

    handleChange(module) {
        console.log(module)
      // this.props.updateModule(module);
    }

    render () {
        const {
            user,
            story,
            modules,
            isLoading,
            showToast
        } = this.props;

    if (isLoading || !story) {
        return <Spinner page size="large" />;
    }

    console.log(story.modules)

    return (
        <div className="page">
          <Navbar />
          <div className=" room general-container container ">
            <h3 className="row">Voorbeeld van verhaal ({story.general.title})</h3>
            <div className="story-information__wrapper row">
              <div className="story-information card row">
                <div className="card-block block-width card-block--story-head">
                  <h2 className="card-title row">
                    {story.general.title}
                  </h2>

                  <p className="card-text row">
                    {story.general.summary}
                  </p>
                  <p className="card-text card-text--icon row">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <title>child_friendly</title>
                      <path d="M17.016 20.016c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM8.016 20.016c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM19.313 15.891c0.703 0.656 1.172 1.594 1.172 2.625 0 1.922-1.547 3.469-3.469 3.469-1.781 0-3.234-1.313-3.469-3h-2.109c-0.234 1.688-1.641 3-3.422 3-1.922 0-3.516-1.547-3.516-3.469 0-1.313 0.75-2.484 1.828-3.094-0.234-0.328-2.109-4.406-2.109-4.406h-2.203v-2.016h3.469l0.938 2.016h14.578c0 1.828-0.656 3.516-1.688 4.875zM12.984 2.016c4.406 0 8.016 3.563 8.016 7.969h-8.016v-7.969z" />
                    </svg>{' '}
                    {story.general.dayOfBirth}
                  </p>
                  <p className="card-text card-text--icon row">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <title>cross</title>
                      <path d="M5.979 10.974v5.021h7.041v11.99h5.042v-11.99h6.958v-5.021h-6.958v-6.958h-5.042v6.958h-7.041z" />
                    </svg>
                    {story.general.dayOfDeath}
                  </p>
                  <p className="card-text card-text--icon row">
                    <svg
                      style={{ transform: 'scale(0.8)' }}
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <title>flag</title>
                      <path d="M0 0h4v32h-4v-32z" />
                      <path d="M26 20.094c2.582 0 4.83-0.625 6-1.547v-16c-1.17 0.922-3.418 1.547-6 1.547s-4.83-0.625-6-1.547v16c1.17 0.922 3.418 1.547 6 1.547z" />
                      <path d="M19 1.016c-1.466-0.623-3.61-1.016-6-1.016-3.012 0-5.635 0.625-7 1.547v16c1.365-0.922 3.988-1.547 7-1.547 2.39 0 4.534 0.393 6 1.016v-16z" />
                    </svg>
                    {story.general.nationality}
                  </p>
                </div>
                <img
                  className="card-img-top-2 row"
                  src={story.general.profilePicture}
                  alt={story.general.title}
                />
              </div>
            </div>

            <div className="modules content-container">
              {this.props.modules
                ?
                  modules.map((module, i) => {
                  switch (module.contentType.toLowerCase()) {
                    case 'image':
                      return (
                        <ImageModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                        />
                      );
                    case 'imagequiz':
                      return (
                        <ImageQuizModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                          handleChange={this.handleChange.bind(this)}
                        />
                      );
                    case 'map':
                      return (
                        <MapModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                          handleChange={this.handleChange.bind(this)}
                        />
                      );
                    case 'quiz':
                      return (
                        <QuizModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                          handleChange={this.handleChange.bind(this)}
                        />
                      );
                    case 'searchex':
                      return (
                        <SearchExerciseModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                        />
                      );
                    case 'textblock':
                      return (
                        <TextblockModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                        />
                      );
                    case 'video':
                      return (
                        <VideoModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                        />
                      );
                    case 'youtube':
                      return (
                        <YoutubeModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                        />
                      );
                    case 'funfact':
                      return (
                        <FunFactModule
                          index={i}
                          key={i}
                          module={module}
                          user={user}
                        />
                      );
                    default:
                      return <div key={i} />;

                  }
                })
            :
        <div>Oeps dit werkt niet!</div>
        }



            </div>
            <Footer />
        </div>
        </div>
    );
};
};

const mapStateToProps = state => state.story;
export default connect(mapStateToProps,
    {fetchStory,
        updateModule
    })(StoryPreview);
