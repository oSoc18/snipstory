import {actionTypes} from '../actions';

const initialState = {
    isLoading: true,
    modules: null,
    error: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.fetchStoryModulesStarted:
            return Object.assign({}, state, {isLoading: true});

        case actionTypes.fetchStoryModulesFulfilled:
            return Object.assign({}, state, {
                modules: action.stories,
                isLoading: false
            });


        case actionTypes.fetchStoryModulesRejected:
            return Object.assign({}, state, {
                error: action.error,
                isLoading: false
            });

        default:
            return state;
    }
};
