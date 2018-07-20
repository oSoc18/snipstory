import {
  firebaseAuth,
  firebaseDatabase,
  firebaseStorage
} from '../helpers/firebase';
import { push } from 'connected-react-router';
import moment from 'moment';
import { shuffle } from '../helpers/RandomHelpers';

export const actionTypes = {
  listenToFirebaseAuth: 'LISTEN_FIREBASE_AUTH',
  authStarted: 'AUTH_STARTED',
  authFulfilled: 'AUTH_FULFILLED',
  authRejected: 'AUTH_REJECTED',
  logout: 'LOGOUT',
  fetchRandomStoriesFulfilled: 'FETCH_RANDOM_STORIES_FULFILLED',
  fetchRandomStoriesRejected: 'FETCH_RANDOM_STORIES_REJECTED',
  fetchRandomStoriesStarted: 'FETCH_RANDOM_STORIES_STARTED',
  selectStory: 'SELECT_STORY',
  checkTeacherCodeRejected: 'CHECK_TEACHER_CODE_REJECTED',
  checkTeacherCodeFulfilled: 'CHECK_TEACHER_CODE_FULFILLED',
  checkingTeacherCode: 'CHECKING_TEACHER_CODE',
  createRoomStarted: 'CREATE_ROOM_STARTED',
  createRoomFulfilled: 'CREATE_ROOM_FULFILLED',
  createRoomRejected: 'CREATE_ROOM_REJECTED',
  fetchRoomDataStarted: 'FETCH_ROOM_DATA_STARTED',
  fetchRoomDataFulfilled: 'FETCH_ROOM_DATA_FULFILLED',
  fetchRoomDataRejected: 'FETCH_ROOM_DATA_REJECTED',
  listenForRoomChangeStarted: 'LISTEN_FOR_ROOM_CHANGE_STARTED',
  listenForRoomChangeFulfilled: 'LISTEN_FOR_ROOM_CHANGE_FULFILLED',
  listenForRoomChangeRejected: 'LISTEN_FOR_ROOM_CHANGER_REJECTED',
  updateModuleStarted: 'UPDATE_MODULE_STARTED',
  updateModuleFulfilled: 'UPDATE_MODULE_FULFILLED',
  updateModuleRejected: 'UPDATE_MODULE_REJECTED',
  showToast: 'SHOW_TOAST',
  destroyToast: 'DESTROY_TOAST',
  showModal: 'SHOW_MODAL',
  destroyModal: 'DESTROY_MODAL',
  fetchSuggestionsFulfilled: 'FETCH_SUGGESTIONS_FULFILLED',
  fetchSuggestionsRejected: 'FETCH_SUGGESTIONS_REJECTED',
  getRandomSuggestionsFulfilled: 'GET_RANDOM_SUGGESTIONS_FULFILLED',
  getRandomSuggestionsStarted: 'GET_RANDOM_SUGGESTIONS_STARTED',
  startListenForClassesChange: 'START_LISTEN_FOR_CLASSES_CHANGE',
  receiveClasses: 'RECEIVE_CLASSES',
  receiveClassesError: 'RECEIVE_CLASSES_ERROR',
  setClassesListener: 'SET_CLASSES_LISTENER',
  addClass: 'ADD_CLASS',
  uploadFileStarted: 'UPLOAD_FILE_STARTED',
  uploadFileRejected: 'UPLOAD_FILE_REJECTED',
  uploadFileFulfilled: 'UPLOAD_FILE_FULFILLED',
  setUserDisplayName: 'SET_USER_DISPLAY_NAME',
  pushModifiedUserToFirebaseFulfilled:
    'PUSH_MODIFIED_USER_TO_FIREBASE_FULFILLED',
  pushModifiedUserToFirebaseRejected: 'PUSH_MODIFIED_USER_TO_FIREBASE_REJECTED',
  pushModifiedUserToFirebaseStarted: 'PUSH_MODIFIED_USER_TO_FIREBASE_STARTED',
  joinRoomStarted: 'JOIN_ROOM_STARTED',
  joinRoomFulfilled: 'JOIN_ROOM_FULFILLED',
  joinRoomRejected: 'JOIN_ROOM_REJECTED',
  setLocalUID: 'SET_LOCAL_UID',
  sendCreationStarted: 'SEND_CREATION_STARTED',
  sendCreationFulfilled: 'SEND_CREATION_FULFILLED',
  sendCreationRejected: 'SEND_CREATION_REJECTED',
  addDescriptionToCreationFulfilled: 'ADD_DESCRIPTION_TO_CREATION_FULFILLED',
  fetchKnutselTipsStarted: 'FETCH_KNUTSEL_TIPS_STARTED',
  fetchKnutselTipsFulfilled: 'FETCH_KNUTSEL_TIPS_FULFILLED',
  fetchKnutselTipsRejected: 'FETCH_KNUTSEL_TIPS_REJECTED',
  fetchSnipperStarted: 'FETCH_SNIPPER_STARTED',
  fetchSnipperFulfilled: 'FETCH_SNIPPER_FULFILLED',
  fetchSnipperError: 'FETCH_SNIPPER_ERROR',
  fetchSnippersStarted: 'FETCH_SNIPPERS_STARTED',
  fetchSnippersFulfilled: 'FETCH_SNIPPERS_FULFILLED',
  fetchRandomSnippersFulfilled: 'FETCH_RANDOM_SNIPPERS_FULFILLED',
  fetchSnippersError: 'FETCH_SNIPPERS_ERROR',
  snipperNotFound: 'SNIPPER_NOT_FOUND',
  addCreatorsToCreationFulfilled: 'ADD_CREATORS_TO_CREATION_FULFILLED',
  changeUsernameCurrentUserFulfilled: 'CHANGE_USERNAME_CURRENT_USER_FULFILLED',
  updateUsersStarted: 'UPDATE_USERS_STARTED',
  updateUsersFulfilled: 'UPDATE_USERS_FULFILLED',
  updateUsersRejected: 'UPDATE_USERS_REJECTED',

  clearState: 'CLEAR_STATE',

  //new actions
  fetchStoriesDashboardList: 'FETCH_STORIES_DASHBOARD_LIST',
  fetchStoriesDashboardListStarted: 'FETCH_STORIES_DASHBOARD_LIST_STARTED',
  fetchStoriesDashboardListFulfilled: 'FETCH_STORIES_DASHBOARD_LIST_FULFILLED',
  fetchStoriesDashboardListRejected: 'FETCH_STORIES_DASHBOARD_LIST_REJECTED',

  fetchStoryModulesStarted: 'FETCH_STORY_MODULES_STARTED',
  fetchStoryModulesFulfilled: 'FETCH_STORY_MODULES_FULFILLED',
  fetchStoryModulesRejected: 'FETCH_STORY_MODULES_REJECTED',

  fetchStoryStarted: 'FETCH_STORY_STARTED',
  fetchStoryFulFilled: 'FETCH_STORY_FULFILLED',
  fetchStoryRejected: 'FETCH_STORY_REJECTED',
  deleteModuleStarted: 'DELETE_MODULE_STARTED',
  deleteModuleFulFilled: 'DELETE_MODULE_FULFILLED',
  deleteModuleRejected: 'DELETE_MODULE_REJECTED',
  uploadModuleStarted: 'UPLOAD_MODULE_STARTED',
  uploadModuleFulFilled: 'UPLOAD_MODULE_FULFILLED',
  uploadModuleRejected: 'UPLOAD_MODULE_REJECTED',
  resetModulesOrder: 'RESET_MODULES_ORDER',
  switchModules: 'SWITCH_MODULES',
  clearState: 'CLEAR_STATE'

};

export const showToast = toast => ({ type: actionTypes.showToast, toast });
export const destroyToast = () => ({ type: actionTypes.destroyToast });
export const showModal = id => ({ type: actionTypes.showModal, id });
export const destroyModal = () => ({ type: actionTypes.destroyModal });

export const fetchRandomStoriesStarted = () => ({
  type: actionTypes.fetchRandomStoriesStarted
});
export const fetchRandomStoriesFulfilled = stories => ({
  type: actionTypes.fetchRandomStoriesFulfilled,
  stories
});
export const fetchRandomStoriesRejected = error => ({
  type: actionTypes.fetchRandomStoriesRejected,
  error
});

export const fetchRandomStories = () => {
  return dispatch => {
    dispatch(fetchRandomStoriesStarted());
    firebaseDatabase
      .ref('/stories')
      .once('value')
      .then(snapshot => {
        let randomStories = shuffle(snapshot.val());

        dispatch(fetchRandomStoriesFulfilled(randomStories.splice(0, 3)));
      })
      .catch(err => {
        dispatch(fetchRandomStoriesRejected(err));
      });
  };
};

export const fetchStory = storyId => {
  return dispatch => {
    dispatch(fetchStoryStarted());
    console.log(`The story id is ${storyId}`)
    return firebaseDatabase
      .ref("/stories")
      .child(storyId)
      .once('value')
      .then(story => {
        dispatch(fetchStoryFulFilled(story.val()));
      })
      .catch(err => {
        console.error(err);
        dispatch(fetchStoryRejected(err));
      });
  };
};

export const fetchStoryStarted = () => ({
  type: actionTypes.fetchStoryStarted
});

export const fetchStoryFulFilled = story => ({
  type: actionTypes.fetchStoryFulFilled,
  story
});

export const fetchStoryRejected = err => ({
  type: actionTypes.fetchStoryRejected,
  err
});

export const deleteModuleStarted = () => ({
  type: actionTypes.deleteModuleStarted,
});

export const deleteModuleFulFilled = moduleId => ({
  type: actionTypes.deleteModuleFulFilled,
  moduleId
});

export const deleteModuleRejected = error => ({
  type: actionTypes.deleteModuleRejected,
  error
});

export const deleteModule = (storyId, moduleId) => {
  return dispatch => {
    dispatch(deleteModuleStarted());

    firebaseDatabase
      .ref("/stories")
      .child(storyId)
      .child("modules")
      .child(moduleId)
      .remove()
      .then(story => {
        dispatch(deleteModuleFulFilled(moduleId));
      })
      .catch(err => {
        console.log(err);
        dispatch(deleteModuleRejected(err));
      });
  };
};

export const upOrder = (index) => {
  return dispatch => {
    if (index <= 0) return;
    dispatch(switchModules(index, index - 1));
  };
};

export const downOrder = (index) => {
  return dispatch => {
    dispatch(switchModules(index, index + 1));
  };
};

export const storySaveModules = () => ({
  type: actionTypes.storySaveStarted
});

export const switchModules = (indexA, indexB) => ({
  type: actionTypes.switchModules,
  indexA,
  indexB // ofc | indexA - indexB | = 1
});

export const story = () => ({
  type: actionTypes.storySaveStarted
});

export const storySaveModulesStarted = () => ({
  type: actionTypes.storySaveModulesStarted
});

export const resetOrder = () => {
  return dispatch => {
    dispatch(resetModulesOrder());
  };
}

export const resetModulesOrder = () => ({
  type: actionTypes.resetModulesOrder
});

export const uploadModuleStarted = () => ({
  type: actionTypes.uploadModuleStarted
});

export const uploadModuleFulFilled = () => ({
  type: actionTypes.uploadModuleFulFilled
});

export const uploadModuleRejected = error => ({
  type: actionTypes.uploadModuleRejected,
  error
});

export const uploadModules = (storyId, modules) => {
  return dispatch => {
    dispatch(uploadModuleStarted());
    Promise.all(modules.map((module, index) => firebaseDatabase
      .ref(`/stories/${storyId}/modules/${module.id}`)
      .child("order").set(index)
    ))
    .then(() => dispatch(uploadModuleFulFilled()))
    .catch(error => {
      console.log(error)
      dispatch(uploadModuleRejected(error))}
    );
  };
};

export const receiveClasses = classes => ({
  type: actionTypes.receiveClasses,
  classes
});
export const receiveClassesError = error => ({
  type: actionTypes.receiveClassesError,
  error
});

export const setClassesListener = listener => ({
  type: actionTypes.setClassesListener,
  listener
});

export const startListenForClassesChange = () => ({
  type: actionTypes.startListenForClassesChange
});

export const listenForClassesChange = () => {
  return (dispatch, getState) => {
    dispatch(startListenForClassesChange());
    const listener = firebaseDatabase
      .ref(`/users/${getState().user.uid}/classes`)
      .on('value', snapshot => {
        const classes = Object.keys(snapshot.val() || {}) || [];
        if (!classes || !classes.length) {
          dispatch(receiveClasses([]));
          return;
        }

        const classPromises = classes.map(classId =>
          firebaseDatabase.ref(`/classes/${classId}`).once('value')
        );

        Promise.all(classPromises)
          .then(classes => {
            dispatch(receiveClasses(classes.map(c => c.val())));
          })
          .catch(err => {
            dispatch(receiveClassesError(err));
          });
      });

    dispatch(setClassesListener(listener));
  };
};

export const stopListeningForClassesChange = () => {
  return (dispatch, getState) => {
    firebaseDatabase.ref().off('value', getState().classes.listener);
  };
};

export const addClass = newClass => {
  return (dispatch, getState) => {
    const oldClasses = getState().classes.classes;
    const userId = getState().user.uid;
    const newClassKey = firebaseDatabase.ref('/classes').push().key;
    newClass = { ...newClass, id: newClassKey, code: newClassKey };
    const newClasses = oldClasses ? [...oldClasses, newClass] : [newClass];
    const newClassIds = newClasses.reduce((acc, c) => {
      acc[c.id] = true;
      return acc;
    }, {});

    dispatch(receiveClasses(newClasses));
    const updates = {
      [`/tokens/${newClass.code}`]: { classId: newClassKey, userId },
      [`/classes/${newClassKey}`]: {
        id: newClassKey,
        token: newClass.code,
        userId,
        name: newClass.name
      },
      [`/users/${getState().user.uid}/classes`]: newClassIds
    };
    firebaseDatabase.ref().update(updates);
  };
};

export const deleteClass = classObj => {
  return (dispatch, getState) => {
    Promise.all([
      firebaseDatabase.ref(`/classes/${classObj.id}`).remove(),
      firebaseDatabase.ref(`/tokens/${classObj.token}`).remove(),
      firebaseDatabase
        .ref(`/users/${getState().user.uid}/classes/${classObj.id}`)
        .remove()
    ])
      .then(() => {
        dispatch(
          showToast({ text: `Klas "${classObj.name}" werd verwijderd` })
        );
      })
      .catch(_ =>
        showToast({
          text: `Klas kon niet verwijderd worden, probeer het opnieuw`
        })
      );
  };
};

export const selectStory = story => ({
  type: actionTypes.selectStory,
  story
});

export const checkTeacherCode = event => {
  return dispatch => {
    dispatch(checkingTeacherCode());
    const code = event.target.value;
    if (code === '')
      return dispatch(checkTeacherCodeRejected('No empty string allowed'));
    firebaseDatabase
      .ref('/tokens')
      .child(code)
      .once('value')
      .then(snapshot => {
        const val = snapshot.val();
        if (val) dispatch(checkTeacherCodeFulfilled(snapshot.val()));
        else dispatch(checkTeacherCodeRejected('No such code'));
      })
      .catch(err => {
        dispatch(checkTeacherCodeRejected('No such code'));
      });
  };
};

export const checkingTeacherCode = () => ({
  type: actionTypes.checkingTeacherCode
});

export const checkTeacherCodeFulfilled = ({ classId, userId }) => ({
  type: actionTypes.checkTeacherCodeFulfilled,
  error: '',
  classId,
  userId
});

export const checkTeacherCodeRejected = errorString => ({
  type: actionTypes.checkTeacherCodeRejected,
  error: errorString
});

export const createRoom = userName => {
  return (dispatch, getState) => {
    dispatch(createRoomStarted());
    firebaseAuth
      .signInAnonymously()
      .then(user => {})
      .then(() => {
        const roomKey = firebaseDatabase.ref().child('rooms').push().key;
        const data = {
          ...getState().room
        };
        data.id = roomKey;
        let updates = {};
        updates['/rooms/' + roomKey] = data;
        firebaseDatabase
          .ref()
          .update(updates)
          .then(result => {
            dispatch(createRoomFulfilled(data));
            dispatch(push(`/rooms/${roomKey}`));
          })
          .then(() => {
            dispatch(setUserDisplayName(userName));
          })
          .then(() => {
            dispatch(pushModifiedUserToFirebase());
          })
          .catch(err => {
            dispatch(createRoomRejected(err.message));
          });
      })
      .catch(err => {
        dispatch(createRoomRejected(err.message));
      });
  };
};

export const logout = () => {
  firebaseAuth.signOut();
  return { type: actionTypes.logout };
};

export const authStarted = () => ({ type: actionTypes.authStarted });

export const authFulfilled = user => ({
  type: actionTypes.authFulfilled,
  user
});
export const authRejected = error => ({
  type: actionTypes.authRejected,
  error
});
export const listenToFirebaseAuth = () => {
  return dispatch => {
    dispatch(authStarted());
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const path = `users/${user.uid}`;
        const userData = Object.assign({}, user.providerData[0], {
          uid: user.uid
        });
        const userRef = firebaseDatabase.ref(path);

        dispatch(authFulfilled(userData));

        userRef.once('value').then(snapshot => {
          const val = snapshot.val();
          const newVal = { ...val, ...userData };
          userRef.set(newVal);
          dispatch(authFulfilled(newVal));
        });
      } else {
        dispatch(authRejected(''));
      }
    });
  };
};

export const createRoomStarted = () => ({
  type: actionTypes.createRoomStarted
});

export const createRoomFulfilled = newRoom => ({
  type: actionTypes.createRoomFulfilled,
  newRoom: newRoom
});

export const createRoomRejected = err => ({
  type: actionTypes.createRoomRejected,
  error: err
});

export const fetchRoomData = () => {
  return (dispatch, getState) => {
    dispatch(fetchRoomDataStarted());
    const roomId = getState().router.location.pathname.split('/rooms/')[1];

    firebaseDatabase
      .ref()
      .child('rooms')
      .child(roomId)
      .once('value')
      .then(response => {
        dispatch(fetchRoomDataFulfilled(response.val()));
      })
      .then(r => {
        dispatch(listenForRoomChange());
      })
      .catch(err => {
        dispatch(fetchRoomDataRejected(err));
      });

    firebaseDatabase
      .ref()
      .child('suggestions')
      .once('value')
      .then(response => {
        dispatch(fetchSuggestionsFulfilled(response.val()));
      })
      .then(r => {
        dispatch(getRandomSuggestions());
      })
      .catch(err => {
        dispatch(fetchSuggestionsRejected(err));
      });
  };
};

export const fetchRoomDataStarted = () => ({
  type: actionTypes.fetchRoomDataStarted
});

export const fetchRoomDataFulfilled = data => ({
  type: actionTypes.fetchRoomDataFulfilled,
  newRoom: data
});

export const fetchRoomDataRejected = err => ({
  type: actionTypes.fetchRoomDataRejected,
  error: err
});

export const listenForRoomChange = () => {
  return (dispatch, getState) => {
    dispatch(listenForRoomChangeStarted());
    const roomId = getState().router.location.pathname.split('/rooms/')[1];
    firebaseDatabase.ref('/rooms/' + roomId).on('value', snapshot => {
      dispatch(listenForRoomChangeFulfilled(snapshot.val()));
    });
  };
};

export const listenForRoomChangeStarted = () => ({
  type: actionTypes.listenForRoomChangeStarted
});

export const listenForRoomChangeFulfilled = data => ({
  type: actionTypes.listenForRoomChangeFulfilled,
  newRoomData: data
});

export const listenForRoomChangeRejected = errorMessage => ({
  type: actionTypes.listenForRoomChangeRejected,
  error: errorMessage
});

export const updateModule = module => {
  return (dispatch, getState) => {
    dispatch(updateModuleStarted());
    firebaseDatabase
      .ref()
      .child('rooms')
      .child(getState().room.id)
      .child('modules')
      .child(module.id)
      .set({
        ...module,
        clickedBy: getState().user.uid
      })
      .then(snapshot => {
        dispatch(updateModuleFulfilled());
      })
      .catch(err => {
        dispatch(updateModuleRejected(err.message));
      });
  };
};

export const updateModuleStarted = () => ({
  type: actionTypes.updateModuleStarted
});

export const updateModuleFulfilled = () => ({
  type: actionTypes.updateModuleFulfilled
});

export const updateModuleRejected = errorMessage => ({
  type: actionTypes.updateModuleRejected,
  error: errorMessage
});

export const fetchSuggestionsFulfilled = data => ({
  type: actionTypes.fetchSuggestionsFulfilled,
  data: data
});

export const fetchSuggestionsRejected = err => ({
  type: actionTypes.fetchSuggestionsRejected,
  error: err.message
});

export const getRandomSuggestions = () => {
  return (dispatch, getState) => {
    dispatch(getRandomSuggestionsStarted());
    let randomNumbers = [];
    let randomSuggestions = [];

    if (getState().suggestions.suggestions.length < 4) {
      return dispatch(
        getRandomSuggestionsFulfilled(getState().suggestions.suggestions)
      );
    }

    while (randomNumbers.length !== 4) {
      let n = Math.floor(
        Math.random() * getState().suggestions.suggestions.length
      );
      if (randomNumbers.indexOf(n) === -1) {
        randomNumbers.push(n);
      }
    }

    let i = 0;
    while (randomSuggestions.length !== 4) {
      randomSuggestions.push(
        getState().suggestions.suggestions[randomNumbers[i]]
      );
      i++;
    }

    dispatch(getRandomSuggestionsFulfilled(randomSuggestions));
  };
};

export const getRandomSuggestionsStarted = () => ({
  type: actionTypes.getRandomSuggestionsStarted
});

export const getRandomSuggestionsFulfilled = suggestions => ({
  type: actionTypes.getRandomSuggestionsFulfilled,
  suggestions: suggestions
});

export const uploadFile = file => {
  return (dispatch, getState) => {
    dispatch(uploadFileStarted());
    firebaseStorage()
      .ref()
      .child('creations')
      .child('' + getState().room.classId)
      .child(moment().format('YYYYMMDD_hhmmss') + '_' + getState().user.uid)
      .put(file)
      .then(snapshot => {
        dispatch(
          uploadFileFulfilled(
            snapshot,
            getState().room,
            file.type.split('/')[0]
          )
        );
      })
      .catch(err => {
        dispatch(uploadFileRejected(err));
      });
  };
};

export const uploadFileStarted = () => ({
  type: actionTypes.uploadFileStarted
});

export const uploadFileFulfilled = (snapshot, room, type) => ({
  type: actionTypes.uploadFileFulfilled,
  photoURL: snapshot.metadata.downloadURLs[0],
  contentType: snapshot.metadata.contentType.split('/')[0],
  storyId: room.storyId,
  creators: room.users.map(user => user.displayName),
  fileType: type
});

export const uploadFileRejected = error => ({
  type: actionTypes.uploadFileRejected,
  error: error.message
});

export const setUserDisplayName = (displayName = 'newUser') => ({
  type: actionTypes.setUserDisplayName,
  displayName: displayName
});

export const pushModifiedUserToFirebase = () => {
  return (dispatch, getState) => {
    dispatch(pushModifiedUserToFirebaseStarted());
    const val = {
      uid: getState().user.uid,
      displayName: getState().user.displayName
    };
    firebaseDatabase.ref('users').child(getState().user.uid).set(val, () => {
      return dispatch(pushModifiedUserToFirebaseFulfilled());
    });
  };
};

export const pushModifiedUserToFirebaseStarted = () => ({
  type: actionTypes.pushModifiedUserToFirebaseStarted
});

export const pushModifiedUserToFirebaseFulfilled = () => ({
  type: actionTypes.pushModifiedUserToFirebaseFulfilled
});

export const pushModifiedUserToFirebaseRejected = () => ({
  type: actionTypes.pushModifiedUserToFirebaseRejected
});

export const joinRoom = () => {
  return (dispatch, getState) => {
    dispatch(joinRoomStarted());
    if (!getState().user.isAuthorized) {
      firebaseAuth
        .signInAnonymously()
        .then(user => {
          dispatch(setLocalUID(user.uid));
        })
        .then(() => {
          dispatch(setUserDisplayName('Anonieme gebruiker'));
        })
        .then(() => {
          dispatch(pushModifiedUserToFirebase());
        })
        .then(() => {
          dispatch(joinRoomFulfilled());
        })
        .catch(err => {
          dispatch(joinRoomRejected(err));
        });
    } else if (getState().user.displayName.trim().length === 0) {
      dispatch(setUserDisplayName('Anonieme gebruiker'));
      dispatch(pushModifiedUserToFirebase());
    }
  };
};

export const joinRoomStarted = () => ({
  type: actionTypes.joinRoomStarted
});
export const joinRoomFulfilled = () => ({
  type: actionTypes.joinRoomFulfilled
});
export const joinRoomRejected = err => ({
  type: actionTypes.joinRoomRejected,
  error: err.message
});

export const setLocalUID = userId => ({
  type: actionTypes.setLocalUID,
  uid: userId
});

export const sendCreation = type => {
  return (dispatch, getState) => {
    dispatch(sendCreationStarted());
    let creationId = firebaseDatabase.ref().child('creations').push().key;
    let creationData = {
      id: creationId,
      description: getState().creation.description,
      creators: getState().creation.creators,
      photoURL: getState().creation.photoURL,
      storyId: getState().creation.storyId,
      fileType: getState().creation.fileType
    };
    firebaseDatabase
      .ref()
      .child('creations')
      .child(creationId)
      .set(creationData, snapshot => {
        dispatch(sendCreationFulfilled(creationData));
      });
  };
};

export const sendCreationStarted = () => ({
  type: actionTypes.sendCreationStarted
});
export const sendCreationRejected = () => ({
  type: actionTypes.sendCreationRejected
});
export const sendCreationFulfilled = data => ({
  type: actionTypes.sendCreationFulfilled,
  creation: data
});

export const addDescriptionToCreation = event => {
  return (dispatch, getState) => {
    dispatch(addDescriptionToCreationFulfilled(event.target.value));
  };
};

export const addDescriptionToCreationFulfilled = descriptionData => ({
  type: actionTypes.addDescriptionToCreationFulfilled,
  description: descriptionData
});

export const fetchKnutselTips = () => {
  return dispatch => {
    dispatch(fetchKnutselTipsStarted());
    firebaseDatabase
      .ref('suggestions')
      .once('value')
      .then(snapshot => {
        dispatch(fetchKnutselTipsFulfilled(snapshot.val()));
      })
      .catch(err => {
        dispatch(fetchKnutselTipsRejected(err));
      });
  };
};

export const fetchSnippersStarted = () => ({
  type: actionTypes.fetchSnippersStarted
});
export const fetchSnippersRejected = error => ({
  type: actionTypes.fetchSnippersError,
  error
});
export const fetchSnippersFulfilled = snippers => ({
  type: actionTypes.fetchSnippersFulfilled,
  snippers
});

export const fetchSnipperStarted = () => ({
  type: actionTypes.fetchSnipperStarted
});
export const fetchSnipperRejected = error => ({
  type: actionTypes.fetchSnipperError,
  error
});
export const fetchSnipperFulfilled = snipper => ({
  type: actionTypes.fetchSnipperFulfilled,
  snipper
});

export const fetchSnipper = id => {
  return dispatch => {
    dispatch(fetchSnipperStarted());
    firebaseDatabase
      .ref(`/creations/${id}`)
      .once('value')
      .then(snipper => {
        const val = snipper.val();
        if (!val) {
          dispatch(snipperNotFound());
          throw new Error('Snipper not foundsn');
        }
        return val;
      })
      .then(snipper => {
        return Promise.all([
          Promise.resolve(snipper),
          firebaseDatabase
            .ref(`/stories/${snipper.storyId}`)
            .once('value')
            .then(snapshot => snapshot.val())
        ]);
      })
      .then(([snipper, story]) => {
        dispatch(fetchSnipperFulfilled({ ...snipper, story }));
      })
      .catch(error => {
        dispatch(fetchSnipperRejected(error));
      });
  };
};

export const fetchKnutselTipsStarted = () => ({
  type: actionTypes.fetchKnutselTipsStarted
});

export const fetchKnutselTipsFulfilled = knutselTips => ({
  type: actionTypes.fetchKnutselTipsFulfilled,
  knutselTips: knutselTips
});

export const fetchKnutselTipsRejected = err => ({
  type: actionTypes.fetchKnutselTipsRejected,
  error: err.message
});

export const fetchSnippers = () => {
  return dispatch => {
    dispatch(fetchSnippersStarted());
    firebaseDatabase
      .ref(`/creations`)
      .once('value')
      .then(snippers => {
        const val = snippers.val();
        const keys = Object.keys(val);
        dispatch(fetchSnippersFulfilled(keys.map(snipperId => val[snipperId])));
      })
      .catch(error => {
        dispatch(fetchSnippersRejected(error));
      });
  };
};

export const fetchRandomSnippers = () => {
  return dispatch => {
    dispatch(fetchSnippersStarted());
    firebaseDatabase.ref(`/creations`).once('value').then(snippers => {
      const val = snippers.val();
      if (val) {
          const keys = Object.keys(val);
            let randomSnippers = shuffle(keys.map(key => val[key]));
            // keys.map(id => val[id])
            dispatch(fetchRandomSnippersFulfilled(randomSnippers.splice(0, 4)));
        }

    });
  };
};
export const fetchRandomSnippersFulfilled = snippers => ({
  type: actionTypes.fetchRandomSnippersFulfilled,
  snippers
});
export const snipperNotFound = () => ({ type: actionTypes.snipperNotFound });
export const addCreatorsToCreation = event => {
  return (dispatch, getState) => {
    dispatch(addCreatorsToCreationFulfilled(event.target.value));
  };
};

export const addCreatorsToCreationFulfilled = creatorsData => ({
  type: actionTypes.addCreatorsToCreationFulfilled,
  creators: creatorsData
});

export const changeUsernameCurrentUser = event => {
  return (dispatch, getState) => {
    const uid = getState().user.uid;
    let users = getState().room.users;
    users[uid] = event.target.value;
    dispatch(changeUsernameCurrentUserFulfilled(users));
    dispatch(updateUsers());
  };
};

export const changeUsernameCurrentUserFulfilled = users => ({
  type: actionTypes.changeUsernameCurrentUserFulfilled,
  newUsersArr: users
});

export const updateUsers = () => {
  return (dispatch, getState) => {
    dispatch(updateUsersStarted());
    firebaseDatabase
      .ref()
      .child('rooms/' + getState().room.id)
      .set({
        ...getState().room,
        users: getState().room.users
      })
      .then(snapshot => {
        dispatch(updateUsersFulfilled());
      })
      .catch(err => {
        dispatch(updateUsersRejected(err.message));
      });
  };
};

export const updateUsersStarted = () => ({
  type: actionTypes.updateUsersStarted
});

export const updateUsersFulfilled = () => ({
  type: actionTypes.updateUsersFulfilled
});

export const updateUsersRejected = error => ({
  type: actionTypes.updateUsersRejected,
  error: error
});

export const clearState = () => ({
  type: actionTypes.clearState
});


// new actionFunctions

export const fetchStoriesDashboardListStarted = () => ({
    type: actionTypes.fetchStoriesDashboardListStarted
});

export const fetchStoriesDashboardListFulfilled = stories => ({
    type: actionTypes.fetchStoriesDashboardListFulfilled,
    stories
});

export const fetchStoriesDashboardListRejected = error => ({
    type: actionTypes.fetchStoriesDashboardListRejected,
    error
})

export const fetchStoriesDashboardList = () => {
    return dispatch => {
        dispatch(fetchStoriesDashboardListStarted());
        firebaseDatabase
            .ref('/stories')
            .once('value')
            .then(stories => {
                const val = stories.val();
                const keys = Object.keys(val);
                dispatch(fetchStoriesDashboardListFulfilled(keys.map(id => val[id])));
            })
            .catch(err => {
                dispatch(fetchStoriesDashboardListRejected(err));
            });
    };
};

export const fetchStoryModules = storyId => {
  return dispatch => {
    dispatch(fetchStoryModulesStarted());
    firebaseDatabase
      .ref("/stories")
      .child()
      .child(storyId)
      .child("modules")
      .then(modules => {
          const val = modules.val();
          const keys = Object.keys(val);
          dispatch(fetchStoryModulesFulfilled(keys.map(id => val[id])));
      })
      .catch(err => {
        dispatch(fetchStoryModulesRejected(err.message));
      });
  };
};

export const fetchStoryModulesStarted = () => ({
  type: actionTypes.fetchStoryModulesStarted
});

export const fetchStoryModulesFulfilled = () => ({
  type: actionTypes.updateModuleFulfilled
});

export const fetchStoryModulesRejected = errorMessage => ({
  type: actionTypes.updateModuleRejected,
  error: errorMessage
});


export const deleteStory = storyObj => {
    return (dispatch, getState) => {
        Promise.all([
            firebaseDatabase.ref(`/stories/${storyObj.id}`).remove(),
        ])
        .then(() => {
            dispatch(
                showToast({
                    text: `Het verhaal van "${storyObj.general.title}" werd verwijderd`
                })
            );
        })
        .catch(_ =>
          showToast({
            text: `Verhaal kon niet verwijderd worden, probeer het opnieuw`
          })
        );
    }
}
