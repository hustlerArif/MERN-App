import {
    FETCH_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    EDIT_ITEM,
    UPDATE_ITEM,
    UPDATE_COUNT
  } from '../actions/types';
  
  const initialState = {
    items: [],
    editingItem: null,
  };
  
  const itemReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ITEMS:
        return { ...state, items: action.payload };
      case ADD_ITEM:
        return { ...state, items: [...state.items, action.payload] };
      case DELETE_ITEM:
        return { ...state, items: state.items.filter((item) => item._id !== action.payload) };
      case EDIT_ITEM:
        return { ...state, editingItem: action.payload };
      case UPDATE_ITEM:
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
          editingItem: null,
        };
      case UPDATE_COUNT:
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
          
        };
      default:
        return state;
    }
  };
  
  export default itemReducer;
  