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
import { Link } from 'react-router-dom';
import {Tag, ChevronLeft} from 'react-feather';

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
      history,
      story,
      isLoading,
      isModuleLoading,
      isUploadingModules,
      modules,
      user,
      logout,
      isDirty } = this.props;

    if (isLoading || !story) {
      return <Spinner page size="large" />;
    }
    return (<div className="page">
            <Navbar logout={logout} user={user}/>
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
                    to={`/teacher/dashboard/${story.id}/addtextblock/`}
                    size="small"
                    inverted="true">
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
                <Button
                  disabled={isModuleLoading}
                  to={`/teacher/dashboard/${story.id}/preview/`}
                  size="small"
                  inverted="true">
                  See preview
                </Button>
              </div>

              <div className="row">
                <ModuleList
                  onEdit={moduleId => {
                    let route = `/teacher/dashboard/${story.id}/edit/${story.modules[moduleId].contentType}/${moduleId}`;
                    history.push(route)}}
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
                <div className="col-md-5"><img src={story.general.profilePicture}/></div>
              </div>
              <div className="story-info-body row">
                <div className="col">
                  <div className="row">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <title>child_friendly</title>
                    <path d="M17.016 20.016c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM8.016 20.016c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM19.313 15.891c0.703 0.656 1.172 1.594 1.172 2.625 0 1.922-1.547 3.469-3.469 3.469-1.781 0-3.234-1.313-3.469-3h-2.109c-0.234 1.688-1.641 3-3.422 3-1.922 0-3.516-1.547-3.516-3.469 0-1.313 0.75-2.484 1.828-3.094-0.234-0.328-2.109-4.406-2.109-4.406h-2.203v-2.016h3.469l0.938 2.016h14.578c0 1.828-0.656 3.516-1.688 4.875zM12.984 2.016c4.406 0 8.016 3.563 8.016 7.969h-8.016v-7.969z" />
                  </svg>
                    <span className="head-metadata">{story.general.dayOfBirth}</span>
                  </div>
                  <div className="row">
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
                    <span className="head-metadata">{story.general.dayOfDeath}</span>
                  </div>
                  <div className="row">
                    <svg
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
                    <span className="head-metadata">{story.general.nationality}</span>
                  </div>
                  <div className="row">
                    <svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="m42.203 10.492c-10.699 2.125-19.84 8.5391-25.652 17.363h14.703c2.5195-7.8672 6.3789-14.031 10.949-17.363zm15.59 0c4.5703 3.332 8.3984 9.4961 10.949 17.363h14.668c-5.7734-8.8242-14.949-15.238-25.613-17.363zm-5.8125 1.4883v15.875h12.863c-2.8672-8.5742-7.3672-14.707-12.859-15.875zm-4 0.035156c-5.3867 1.2773-9.8164 7.3359-12.648 15.84h12.648zm-33.77 19.879c-2.4414 4.8906-3.9297 10.309-4.2148 16.086h18c0.14062-5.7383 0.88672-11.16 2.125-16.086zm19.984 0c-1.2383 4.8906-1.9492 10.383-2.0898 16.086h15.875v-16.086zm17.789 0v16.086h16.086c-0.14062-5.7031-0.85156-11.195-2.0898-16.086zm17.895 0c1.2031 4.9258 1.9844 10.348 2.125 16.086h18c-0.28516-5.7773-1.7734-11.195-4.2148-16.086zm-59.883 20.125c0.28516 5.7773 1.7734 11.23 4.2148 16.086h15.875c-1.2031-4.8906-1.9492-10.344-2.0898-16.086zm22.109 0c0.14062 5.7383 0.85156 11.195 2.0898 16.086h13.785v-16.086zm19.879 0v16.086h13.996c1.2383-4.8906 1.9844-10.348 2.0898-16.086zm20.02 0c-0.14062 5.7383-0.88672 11.195-2.0898 16.086h15.875c2.4453-4.8555 3.9336-10.312 4.2148-16.086zm-55.453 20.125c5.7773 8.8242 14.918 15.238 25.582 17.363-4.5352-3.332-8.3594-9.4961-10.875-17.363h-14.703zm18.781 0c2.8359 8.5391 7.2266 14.633 12.648 15.875v-15.875zm16.652 0v15.91c5.5273-1.168 10.027-7.2969 12.863-15.91zm16.762 0c-2.5156 7.8672-6.3438 14.031-10.879 17.363 10.664-2.125 19.809-8.5391 25.582-17.363z"/>
                    </svg>
                    <Link to={story.general.link}><span className="head-metadata">{story.general.link}</span></Link>
                  </div>
                  <div className="row">
                    <Tag/>
                    <span className="head-metadata">tags</span>
                  </div>
                  <div className="row"/>
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
