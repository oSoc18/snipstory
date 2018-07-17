import { actionTypes } from '../actions';

const initialState = {
  story: null,
  isLoading: true,
  error: null,
  currentlyDeletingId: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.fetchStoryStarted:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.fetchStoryFulFilled:
      return Object.assign({}, state, {
        isLoading: false,
        story: action.story
      });
    case actionTypes.fetchStoryRejected:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    case actionTypes.deleteModuleStarted:
      return Object.assign({}, state, {
        currentlyDeletingId: action.moduleId
      });
    case actionTypes.deleteModuleRejected:
      return Object.assign({}, state, {
        currentlyDeletingId: null,
        error: action.error
      });
    case actionTypes.deleteModuleFulFilled:
      let newSate = Object.assign({}, state, {
        currentlyDeletingId: null,
        story: {
          ...state.story,
          modules: {
            ...state.story.modules
          }
        }
      });
      delete newSate.story.modules[action.moduleId];
      return newSate;
    default:
      return state;
  }
};
