import React from 'react';
import { connect } from 'react-redux';
import {
  fetchStory,
  deleteModule,
  resetOrder,
  uploadModules,
  upOrder,
  deleteLocation,
  downOrder
} from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import Button from '../../../components/button/Button'
import './StoryDashboard.css';

import ModuleList from '../../../components/ModuleList/ModuleList';
import LocationList from '../../../components/LocationList/LocationList';


class StoryDashboard extends React.Component {
  componentWillMount() {
    const { fetchStory, match: { params: { storyId } } } = this.props;
    fetchStory(storyId);
  }

  render() {
    const {
      // dipatcher
      deleteModule,
      upOrder,
      downOrder,
      resetOrder,
      uploadModules,
      deleteLocation,
      // rest
      story,
      isLoading,
      isModuleLoading,
      isUploadingModules,
      modules,
      isDirty } = this.props;

    if (isLoading || !story) {
      return <Spinner page size="large" />;
    }
    return (<div>
      <h1>Manage a story {story.id}</h1>
      <h2>{story.general.title}</h2>

      <Button
        to="/teacher/editstory" size="small">
        Edit Story
            </Button>
        <Button
        to={`/teacher/dashboard/${story.id}/preview/`}
        size="small">
        Preview
            </Button>
      <Button
        disabled={isModuleLoading}
        to={`/teacher/dashboard/${story.id}/addfunfact/`}
        size="small">
        Add Fun fact
            </Button>
      <Button
        disabled={isModuleLoading}
        to={`/teacher/dashboard/${story.id}/addlocation/`}
        size="small">
        Add location
            </Button>
      <Button
        disabled={isModuleLoading}
        to={`/teacher/dashboard/${story.id}/addimagequiz/`}
        size="small">
        Add Image quiz
            </Button>
      <Button
        disabled={isModuleLoading}
        to={`/teacher/dashboard/${story.id}/addquiz/`}
        size="small">
        Add quiz
            </Button>
      <ModuleList
        canDelete={!isDirty && !isModuleLoading}
        canChangeOrder={!isModuleLoading && !isUploadingModules}
        canSaveOrReset={isDirty && !isUploadingModules}
        onReset={resetOrder}
        onSaveOrder={() => uploadModules(story.id, modules)}
        upOrder={moduleId => upOrder(modules.findIndex(module => moduleId == module.id))}
        downOrder={moduleId => downOrder(modules.findIndex(module => moduleId == module.id))}
        story={story}
        modules={modules}
        onDelete={moduleId => deleteModule(story.id, moduleId)}
        isLoading={isModuleLoading} />

        <LocationList
          canDelete={!isModuleLoading}
          locations={Object.keys(story.locations || {}).map(k => story.locations[k])}
          onDelete={locationId => deleteLocation(story.id, locationId)}
        />
    </div>)
  }
};


const mapStateToProps = state => state.story;

export default connect(mapStateToProps, {
  fetchStory,
  deleteModule,
  resetOrder,
  uploadModules,
  downOrder,
  upOrder,
  deleteLocation,
})(StoryDashboard);
