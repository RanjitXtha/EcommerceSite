export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return [...state, action.payload];
      case 'REMOVE_ITEM':
        return state.filter((item, index) => index !== action.payload);
      case 'CLEAR_CART':
        return [];
      case 'UPDATE_CART_ITEM':
        return action.payload;
      default:
        return state;
    }
  };

