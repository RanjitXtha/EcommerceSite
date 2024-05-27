export const wishReducer = (state, action) => {
  console.log(state);
    switch (action.type) {
      case 'ADD_WISH':
        return [...state, action.payload];
      case 'REMOVE_WISH':
        return state.filter((item, index) => index !== action.payload);
      case 'CLEAR_WISH':
        return [];
      default:
        return state;
    }
  };

