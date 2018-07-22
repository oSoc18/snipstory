import { actionTypes } from '../actions';

const initialState = {
    isLoading: true,
    stories: null,
    filteredStories: null,
    filters: {
        yearRange: [0, 2018]
    },
    minYear: 1800,
    maxYear: 2018,
    error: null
};

const getFilteredStories = (state, filters) => {
    return Object.keys(state.stories || {})
        .map(key => state.stories[key])
        .filter(story => {
            // minYear
            let [min, max] = filters.yearRange;
            let birthYear = new Date(story.general.dayOfBirth).getFullYear();
            return min <= birthYear && max >= birthYear;
        })
};

export const reducer = (state = initialState, action) => {
    let filters;
    switch (action.type) {
        case actionTypes.fetchStoriesStarted:
            return Object.assign({}, state, { isLoading: true });
        case actionTypes.fetchStoriesFulFilled:
            console.log(action.stories)
            return Object.assign({}, state, {
                isLoading: false,
                stories: action.stories,
                filteredStories: Object.keys(action.stories || {})
                    .map(k => action.stories[k])
            });
        case actionTypes.setFilterYearRange:
            filters = {
                ...state.filters,
                yearRange: action.range
            };

            return Object.assign({}, state, {
                filters,
                filteredStories: getFilteredStories(state, filters)
            });
        case actionTypes.fetchStoriesRejected:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.error
            });
        default:
            return state;
    }
};
