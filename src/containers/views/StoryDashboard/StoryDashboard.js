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
      <div className="dashboard-story-container">
        <div className="story-dashboard-header container">
            <div className="row">Manage a story</div>

            <h1 className="row">{story.id}</h1>
        </div>
        <div className="story-dashboard-body container">
          <div className="row justify-content-between">
            <div className="col-md-8">
              <div className="row">
                <Button
                  to="#" size="small" inverted="true">
                  Add textblock
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
            <div className="col-md-3">
              <div className="story-info">
              <div className="story-info-header row">
                <div className="col-md-7">
                  <h1 className="align-middle">{story.general.title.substr(0,story.general.title.indexOf(' '))}<br />{story.general.title.substr(story.general.title.indexOf(' ')+1)} </h1>
                </div>
                <div className="col-md-5"><img src="https://i.imgur.com/4yvB1No.jpg"/></div>
              </div>
              <div className="story-info-body row">
                <div className="col">
                  <div className="row">{story.general.dayOfBirth}</div>
                  <div className="row">{story.general.dayOfDeath}</div>
                  <div className="row">{story.general.nationality}</div>
                  <div className="row">{story.general.link}</div>
                  <div className="row">location</div>
                  <div className="row">tags</div>
                  <div className="row"><span className="blue-text">Age: </span> {story.general.age}</div>
                  <div className="row">
                    <div className="col">
                      <div className="row blue-text">Summary:</div>
                      <div className="row">{story.general.summary}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="row blue-text">Knutseltip:</div>
                      <div className="row">{story.general.creationTips}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="row blue-text">Bron:</div>
                      <div className="row">{story.general.source}</div>
                    </div>
                  </div>
                  <div className="row"><span className="blue-text">Copyrighted: </span> {story.general.copyright}</div>
                  <div className="row"><span className="blue-text">Level: </span> {story.general.level}</div>
                  <div className="row">
                    <div className="col story-info-button-container">
                      <Button
                        to="/teacher/editstory"
                        size="small"
                        inverted="true"
                        className="story-edit-button" 
                      >Edit</Button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
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
