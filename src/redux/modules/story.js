import { actionTypes } from '../actions';

const initialState = {
  story: null,
  isLoading: true,
  error: null
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
    default:
      return state;
  }
};
