import React from 'react';
import { connect } from 'react-redux';
import { fetchStory } from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import FunFactModule from '../../../components/modules/FunFactModule';
import ImageQuiz from '../../../components/ImageQuiz/ImageQuiz';
import { gotoNextModule, gotoPrevModule } from '../../../redux/actions';

const NavModule = props => {
  let { module, index } = props;
  switch (module.contentType) {
    case 'funfact':
      return <FunFactModule
        index={index}
        key={index}
        module={module}
      />
    case 'imagequiz':
      return <ImageQuiz
        key={index}
        module={module} />
    default:
      return <div>Unknown module content type</div>
  }
};

class Story extends React.Component {
  componentWillMount() {
    const { fetchStory, story, match: { params: { storyId } } } = this.props;
    if (!story || (story.id || story.general.id) != storyId) {
      fetchStory(storyId);
    }
  }

  render() {
    const {
      story,
      isLoading,
      modules,
      nbOfModules,
      currentIndex,
      gotoNextModule,
      gotoPrevModule
    } = this.props;

    if (isLoading) {
      return <Spinner page size="large" />;
    }

    return <div className="story-root">
      <h1>{story.general.title}</h1>

      <div className="modules content-container">
        { modules &&
          modules.length &&
          <NavModule index={currentIndex} module={modules[currentIndex]}/> ||
          <div>This story is empty</div>}
      </div>
      <button onClick={gotoNextModule} disabled={currentIndex + 1 >= nbOfModules}>Next</button>
      {/* <button onClick={gotoPrevModule} disabled={currentIndex == 0}>Prev</button> */}
    </div>
  }
}

const mapStateToProps = state => ({
  ...state.story,
  ...state.browse
});

export default connect(
  mapStateToProps,
  { fetchStory, gotoNextModule, gotoPrevModule }
)(Story);
