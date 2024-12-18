import axios from 'axios';
import {
  FETCH_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  UPDATE_ITEM,
  UPDATE_COUNT
} from './types';

export const fetchItems = () => async (dispatch) => {
  const response = await axios.get('https://tweets-backend-w76y.onrender.com/posts/');
  dispatch({ type: FETCH_ITEMS, payload: response.data });
};

export const addItem = (title,message,creator,tags) => async (dispatch) => {
  const response = await axios.post('https://tweets-backend-w76y.onrender.com/posts/', { title,message,creator,tags });
  dispatch({ type: ADD_ITEM, payload: response.data });
};

export const deleteItem = (id) => async (dispatch) => {
  await axios.delete(`https://tweets-backend-w76y.onrender.com/posts/${id}`);
  dispatch({ type: DELETE_ITEM, payload: id });
};

export const editItem = (item) => {
  return { type: EDIT_ITEM, payload: item };
};

export const updateItem = (id,title,message,creator,tags) => async (dispatch) => {
  const response = await axios.patch(`https://tweets-backend-w76y.onrender.com/posts/${id}`, { title,message,creator,tags });
  dispatch({ type: UPDATE_ITEM, payload: response.data });
};

export const updateCount  =(id) =>async (dispatch) => {
   const response= await axios.patch(`https://tweets-backend-w76y.onrender.com/posts/${id}/likePost`, {id});
  dispatch({ type: UPDATE_COUNT, payload: response.data });

}
