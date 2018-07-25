import { actionTypes } from '../actions';
import { isNumber } from 'util';

const initialState = {
  story: null,
  isLoading: true,
  error: null,
  isModuleLoading: false, // deleting
  isUploadingModules: false, // order upload
  isDirty: false,
  modules: []
};

const getArrayFrom = (modules) => Object.keys(modules || {}).map(k => modules[k])
.sort((a, b) => a.order - b.order);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.selectStory:
      return Object.assign({}, state, {
        isLoading: false,
        story: action.story,
        modules: getArrayFrom(action.story.modules)
      });
    case actionTypes.fetchStoryStarted:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.fetchStoryFulFilled:
      let modules = getArrayFrom(action.story.modules)
      .map(module => ({
        ...module,
        order: isNumber(module.order) ? module.order : modules.length - 1
      }));
      return Object.assign({}, state, {
        isLoading: false,
        story: action.story,
        modules,
        isDirty: false,
      });
    case actionTypes.fetchStoryRejected:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    case actionTypes.deleteLocationStarted:
      return Object.assign({}, state, {
        isModuleLoading: true
      });
    case actionTypes.deleteLocationRejected:
      return Object.assign({}, state, {
        isModuleLoading: false
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
      newState["modules"] = getArrayFrom(newState.story.modules)
      .map((module, index) => ({...module, order: index}));
      return newState;
    case actionTypes.deleteLocationFulFilled:
      let locations = Object.keys(state.story.locations)
      .reduce((newLocations, locationId) => {
        let location = state.story.locations[locationId];
        if (locationId !== action.locationId){
          newLocations[location.id] = location;
        }
        return newLocations;
      }, {});

      return Object.assign({}, state, {
        isModuleLoading: false,
        story: {
          ...state.story,
          locations
        }
      });
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
      modules = state.modules.slice();
      modules[action.indexA] = state.modules[action.indexB];
      modules[action.indexB] = state.modules[action.indexA];
      return Object.assign({}, state, {
        story: state.story,
        isDirty: true,
        modules
      });

    case actionTypes.resetModulesOrder:
      return Object.assign({}, state, {
        modules: getArrayFrom(state.story.modules)
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
        modules: getArrayFrom(storyModules)
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
