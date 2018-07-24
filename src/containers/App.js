import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import {
  showToast,
  destroyToast,
  logout,
  listenToFirebaseAuth
} from '../redux/actions';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Home from './views/Home/Home';
import TeacherArea from './views/TeacherArea';
import Login from '././views/Login/Login';
import ResetPassword from './views/ResetPassword/ResetPassword';
import Register from './views/Register/Register';
import CreateUser from './views/Admin/CreateUser/CreateUser';
import CreateRoom from './views/CreateRoom';
import KnutselTips from './views/KnutselTips/KnutselTips';
import StorySelect from './views/StorySelect/StorySelect';
import Toast from '../components/toast/Toast';
import Spinner from '../components/spinner/Spinner';
import Room from './views/Room/Room';
import CreateStory from './views/CreateStory';
import Snippers from './views/Snippers/Snippers';
import SnipperDetail from './views/SnipperDetail/SnipperDetail';
import Share from './views/Share/Share';
import deepEqual from 'deep-equal';
import ScrollToTop from '../components/util/ScrollToTop';

import AddStories from './views/AddStories/AddStories';
import DashboardStoryList from './views/DashboardStoryList/DashboardStoryList';
import EditStory from './views/EditStory/EditStory';
import Filter from './views/Filter/Filter';

import StoryDashboard from './views/StoryDashboard/StoryDashboard';
import FilterView from './views/FilterView/FilterView';


import './App.css';
import AddFunfact from './views/AddFunfact/AddFunfact';
import AddImageQuiz from './views/AddImageQuiz/AddImageQuiz';
import AddQuiz from './views/AddQuiz/AddQuiz';
import AddLocation from './views/AddLocation/AddLocation';
import Story from './views/Story/Story';

class App extends Component {
  componentDidMount() {
    this.props.listenToFirebaseAuth();
  }

  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps, { strict: true });
  }

  render() {
    const {
      history,
      user,
      toast: { toastActive, ...toast },
      showToast,
      logout,
      destroyToast
    } = this.props;
    const isAuthorized = user.isAuthorized;
    const adminOnly = user.isAdmin && isAuthorized;
    const confirmedUsersOnly = user.confirmed && isAuthorized;
    console.log(user);
    if (user.authPending) {
      return <Spinner page size="large" />;
    }
    return (
      <div id="app" className="app">
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <Switch>

              <Route
                path="/"
                exact
                render={props => <Home user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                isAuthorized={!isAuthorized}
                path="/teacher/register"
                redirectUrl="/"
                exact
                render={props => <Register user={user} logout={logout} {...props} />}
              />
              <Route
                path="/story/select"
                exact
                render={props => <StorySelect user={user} logout={logout} {...props} />}
              />
              <Route
                path="/story/share"
                exact
                render={props => <Share user={user} logout={logout} {...props} />}
              />
              <Route
                path="/rooms/create"
                exact
                render={props => <CreateRoom user={user} logout={logout} {...props} />}
              />
              <Route
                path="/rooms/:roomId"
                exact
                render={props => <Room user={user} logout={logout} {...props} />}
              />
              <Route
                path="/knutseltips"
                exact
                render={props => <KnutselTips user={user} logout={logout} {...props} />}
              />
              <Route
                path="/snippers"
                exact
                render={props => <Snippers user={user} logout={logout} {...props} />}
              />
              <Route
                path="/snippers/:snipperId"
                exact
                render={props =>
                  <SnipperDetail
                    showToast={showToast}
                    user={user} logout={logout}
                    {...props}
                  />}
              />
              <Route
                path="/story/:storyId"
                exact
                render={props => <Story user={user} logout={logout} {...props} />}
              />
              <Route
                path="/filter"
                exact
                render={props => <Filter user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                isAuthorized={confirmedUsersOnly}
                path="/dashboardstorylist/:storyId/edit"
                exact
                redirectUrl="/teacher/login"
                render={props => <EditStory user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                isAuthorized={confirmedUsersOnly}
                path="/teacher/dashboard/:storyId/addfunfact"
                exact
                redirectUrl="/teacher/login"
                render={props =>
                  <AddFunfact
                    user={user} logout={logout}
                    {...props}
                  />}
              />

              <ProtectedRoute
                isAuthorized={confirmedUsersOnly}
                path="/teacher/dashboard/:storyId/addimagequiz"
                exact
                redirectUrl="/teacher/login"
                render={props =>
                  <AddImageQuiz
                    user={user} logout={logout}
                    {...props}
                  />}
              />
              <ProtectedRoute
                isAuthorized={confirmedUsersOnly}
                path="/teacher/dashboard/:storyId/addlocation"
                exact
                redirectUrl="/teacher/login"
                render={props =>
                  <AddLocation
                    user={user} logout={logout}
                    {...props}
                  />}
              />
              <ProtectedRoute
                isAuthorized={confirmedUsersOnly}
                path="/teacher/dashboard/:storyId/addquiz"
                exact
                redirectUrl="/teacher/login"
                render={props =>
                  <AddQuiz
                    user={user} logout={logout}
                    {...props}
                  />}
              />
              <ProtectedRoute
                isAuthorized={confirmedUsersOnly}
                path="/teacher/dashboard/:storyId"
                exact
                redirectUrl="/teacher/login"
                render={props =>
                  <StoryDashboard
                    user={user} logout={logout}
                    {...props}
                  />}
              />
              <Route
                path="/filterview"
                exact
                render={props =>
                  <FilterView
                    user={user}
                    {...props}
                  />}
              />
              <ProtectedRoute
                path="/admin/createuser"
                isAuthorized={adminOnly}
                redirectUrl="/admin/login"
                exact
                render={props => <CreateUser user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                path="/teacher/addstory"
                isAuthorized={confirmedUsersOnly}
                redirectUrl="/teacher/login"
                render={props => <AddStories user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                path="/teacher/dashboardstorylist"
                isAuthorized={confirmedUsersOnly}
                redirectUrl="/teacher/login"
                render={props => <DashboardStoryList user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                path="/teacher/stories/create"
                isAuthorized={isAuthorized}
                redirectUrl="/teacher/login"
                exact
                render={props => <CreateStory user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                path="/teacher"
                isAuthorized={isAuthorized}
                redirectUrl="/teacher/login"
                exact
                render={props => <TeacherArea user={user} logout={logout} {...props} />}
              />
              <ProtectedRoute
                path="/teacher/login"
                isAuthorized={!isAuthorized}
                redirectUrl="/"
                exact
                render={props =>
                  <Login user={user} logout={logout} showToast={showToast} {...props} />}
              />
              <ProtectedRoute
                path="/teacher/resetpassword"
                isAuthorized={!isAuthorized}
                redirectUrl="/teacher"
                exact
                render={props =>
                  <ResetPassword user={user} logout={logout} showToast={showToast} {...props} />}
              />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </ScrollToTop>
        </ConnectedRouter>
        {toastActive && <Toast destroyToast={destroyToast} {...toast} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  room: state.room,
  toast: state.toast,
  modal: state.modal
});

export default connect(mapStateToProps, {
  showToast,
  destroyToast,
  logout,
  listenToFirebaseAuth
})(App);
