import React from 'react';
import { connect } from 'react-redux';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import {
  logout,
  showToast,
  addClass,
  deleteClass,
  listenForClassesChange,
  stopListeningForClassesChange
} from '../../redux/actions';
import TeacherClasses from '../../components/teacher/TeacherClasses';
import Spinner from '../../components/spinner/Spinner';

import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';

class TeacherArea extends React.Component {
  componentWillMount() {
    this.props.listenForClassesChange();
  }

  componentWillUnmount() {
    this.props.stopListeningForClassesChange();
  }
  render() {
    const {
      user,
      logout,
      showToast,
      classes,
      addClass,
      deleteClass
    } = this.props;

    return (
      <div className="page">
        <Navbar logout={this.props.logout} user={user}/>
        <h1>Leerkrachtenplatform</h1>
        <div>
          <Avatar
            size="large"
            src={user.photoURL}
            alt={`${user.displayName}'s profielfoto`}
          />
          <div>
            {user.displayName}
          </div>
          <div>
            {user.email}
          </div>
          <Button onClick={logout}>Uitloggen</Button>
        </div>
        <Button to="/teacher/stories/add">Voeg een verhaal toe</Button>
        {classes.isPending
          ? <Spinner />
          : <TeacherClasses
              showToast={showToast}
              classes={classes}
              addClass={addClass}
              deleteClass={deleteClass}
            />}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ classes: state.classes });

export default connect(mapStateToProps, {
  logout,
  showToast,
  addClass,
  deleteClass,
  listenForClassesChange,
  stopListeningForClassesChange
})(TeacherArea);
