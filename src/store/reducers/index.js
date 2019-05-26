const initialState = {
  filters: {}
};

function rootReducer(state = initialState, action) {
  if (action.type === 'SET_FILTERS') {
    return Object.assign({}, state, {
      filters: action.payload
    });
  }

  return state;
}

export default rootReducer;
