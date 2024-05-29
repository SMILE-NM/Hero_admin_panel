const initialState = {
  filters: [],
  filtersLoadingState: 'idle',
  activeFilter: 'all',
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_FETCHING':
      return {
        ...state,
        filtersLoadingState: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingState: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return { ...state, filtersLoadingState: 'error' };

    case 'ACTIVE_FILTER_CHANGED':
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default filters;
