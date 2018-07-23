import { actionTypes } from '../actions';

const initialState = {
  nbOfModules: 0,
  currentIndex: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.fetchStoryFulFilled:
      return Object.assign({}, state, {
        nbOfModules: Object.keys(action.story.modules||{}).length
      });
    case actionTypes.nextModule:
      if (state.currentIndex < state.nbOfModules - 1){
        return Object.assign({}, state, {
          currentIndex: state.currentIndex + 1
        });
      }
      return state;
    case actionTypes.prevModule:
      if (state.currentIndex > 0){
        return Object.assign({}, state, {
          currentIndex: state.currentIndex - 1
        })
      }
      // no break
    default:
      return state;
  }
};
