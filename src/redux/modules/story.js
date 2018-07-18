import { actionTypes } from '../actions';
import changeOrder from '../../helpers/ordering';

const initialState = {
  story: null,
  isLoading: true,
  error: null,
  isModuleLoading: false, // deleting
  isUploadingModules: false, // order upload
  isDirty: false,
  modules: []
};

const getArrayFrom = (modules) => Object.keys(modules || {}).map(k => modules[k]);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.fetchStoryStarted:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.fetchStoryFulFilled:
      return Object.assign({}, state, {
        isLoading: false,
        story: action.story,
        modules: getArrayFrom(action.story.modules).sort((a, b) => a.order - b.order),
        isDirty: false,
      });
    case actionTypes.fetchStoryRejected:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    case actionTypes.deleteModuleStarted:
      return Object.assign({}, state, {
        isModuleLoading: true
      });
    case actionTypes.deleteModuleRejected:
      return Object.assign({}, state, {
        isModuleLoading: false,
        error: action.error
      });
    case actionTypes.deleteModuleFulFilled:
      let newState = Object.assign({}, state, {
        isModuleLoading: false,
        story: {
          ...state.story,
          modules: {
            ...state.story.modules
          }
        }
      });
      delete newState.story.modules[action.moduleId];
      newState["modules"] = getArrayFrom(newState.story.modules);
      return newState;
    case actionTypes.switchModules:
      if (
        state.modules.length <= action.indexA ||
        state.modules.length <= action.indexB ||
        action.indexA < 0 ||
        action.indexB < 0
      ) {
        console.log("No changes");
        return state;
      }
      let modules = state.modules.slice();
      modules[action.indexA] = state.modules[action.indexB];
      modules[action.indexB] = state.modules[action.indexA];
      return Object.assign({}, state, {
        story: state.story,
        isDirty: true,
        modules
      });

    case actionTypes.uploadModuleStarted:
      return Object.assign({}, state, { isUploadingModules: true });

    case actionTypes.uploadModuleFulFilled:
      const storyModules = state.modules.reduce((newModules, mod, index) => {
        return Object.assign(newModules, {
          [mod.id]: {
            ...mod,
            order: index
          }
        })
      }, {});
      return Object.assign({}, state, {
        isUploadingModules: false,
        isDirty: false,
        story: {
          ...state.story,
          modules: storyModules
        },
        modules: getArrayFrom(state.story.modules).sort((a, b) => a.order - b.order)
      });

    case actionTypes.uploadModuleRejected:
      return Object.assign({}, state, {
        isUploadingModules: false,
        error: action.error
      })
    default:
      return state;
  }
};
