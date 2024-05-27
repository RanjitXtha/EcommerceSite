// categoryReducer.js
export const sortReducer = (state, action) => { // state = current state so it can change , so send original
    switch (action.type) {                      //products array as products accessed by action.products
      case 'FILTER_BY_CATEGORY':
        if (action.payload === 'ALL') {
          return action.products; 
        } else {
          return action.products.filter(item => item.category.toUpperCase() === action.payload);
        }
      default:
        return state;
    }
  };