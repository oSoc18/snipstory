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
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer.js';


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
      // rest  <h2 className="row">{story.general.title}</h2>

      story,
      isLoading,
      isModuleLoading,
      isUploadingModules,
      modules,
      isDirty } = this.props;

    if (isLoading || !story) {
      return <Spinner page size="large" />;
    }
    return (<div className="page">
      <Navbar />
      <div className="container dashboard-story-container">
        <div className="story-dashboard-header row">
          <div className="col">
            <span className="row">Manage a story</span>
            <h1 className="row">{story.id}</h1>
          </div>
        </div>
        <div className="story-dashboard-body row">
          <div className="col-md-7">
            <div className="row">
            <Button
              to="/teacher/editstory" size="small" inverted="true">
              Edit Story
                  </Button>

            <Button
              disabled={isModuleLoading}
              to={`/teacher/dashboard/${story.id}/addfunfact/`}
              size="small"
              inverted="true">
              Add Fun fact
                  </Button>

            <Button
              disabled={isModuleLoading}
              to={`/teacher/dashboard/${story.id}/addlocation/`}
              size="small"
              inverted="true">
              Add location
                  </Button>

            <Button
            disabled={isModuleLoading}
            to={`/teacher/dashboard/${story.id}/addimagequiz/`}
            size="small"
            inverted="true">
            Add Image quiz
                </Button>

            <Button
              disabled={isModuleLoading}
              to={`/teacher/dashboard/${story.id}/addquiz/`}
              size="small"
              inverted="true">
              Add quiz
                  </Button>
            </div>
            <div className="row">
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
            </div>
            <div className="row">
          <LocationList
            canDelete={!isModuleLoading}
            locations={Object.keys(story.locations || {}).map(k => story.locations[k])}
            onDelete={locationId => deleteLocation(story.id, locationId)}
          />
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4 story-info">
            <div className="story-info-header">
              <h1 className="col-md-8">Jean-Michel<br />Nomdefamillelong</h1>
              <div className="col-md-4"></div>
            </div>
          </div>

        </div>
        
        </div>
        <Footer />
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
