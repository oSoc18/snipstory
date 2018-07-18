import {actionTypes} from '../actions';

const initialState = {
    isLoading: true,
    stories: null,
    error: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.fetchStoriesDashboardListStarted:
            return Object.assign({}, state, {isLoading: true});

        case actionTypes.fetchStoriesDashboardListFulfilled:
            return Object.assign({}, state, {
                stories: action.stories,
                isLoading: false
            });


        case actionTypes.fetchStoriesDashboardListRejected:
            return Object.assign({}, state, {
                error: action.error,
                isLoading: false
            });

        default:
            return state;
    }
};
