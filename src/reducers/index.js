const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingState: 'idle',
  activeFilter: 'all',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
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

    case 'HERO_CREATED':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case 'HERO_DELETED':
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
