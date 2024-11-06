import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItems,
  addItem,
  deleteItem,
  editItem,
  updateItem,
  updateCount
} from '../redux/actions/itemActions';
import "./Posts.css";



function Posts() {
  // const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [tags, setTags] = useState("");
  // const [editingItem, setEditingItem] = useState(null);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemState.items);
  const editingItem = useSelector((state) => state.itemState.editingItem);


  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch]);

  // const fetchData = async () => {
  //   const response = await axios.get("http://localhost:4000/posts/");
  //   setItems(response.data);
  // };

  // const handleAddItem = async () => {
  //   if (title.trim()) {
  //     const response = await axios.post("http://localhost:4000/posts/", {
  //       title,
  //       message,
  //       creator,
  //       tags,
  //     });
  //     setItems([...items, response.data]);
  //     setTitle("");
  //     setMessage("");
  //     setCreator("");
  //     setTags("");
  //   }
  // };
  const handleAddItem = () => {
    dispatch(addItem(title,message,creator,tags));
  
      setTitle("");
      setMessage("");
      setCreator("");
      setTags("");
    }


  // const editItem = (item) => {
  //   setEditingItem(item);
  //   setTitle(item.title);
  //   setMessage(item.message);
  //   setCreator(item.creator);
  //   setTags(item.tags);
  // };
  const handleEditItem = (item) => {
    // setEditingItem(item);
    dispatch(editItem(item));
    setTitle(item.title);
    setMessage(item.message);
    setCreator(item.creator);
    setTags(item.tags);
  };

  // const updateItem = async () => {
  //   if (editingItem && title.trim()) {
  //     const response = await axios.patch(
  //       `http://localhost:4000/posts/${editingItem._id}`,
  //       { title, message, creator, tags }
  //     );
  //     setItems(
  //       items.map((item) =>
  //         item._id === editingItem._id ? response.data : item
  //       )
  //     );
  //     setTitle("");
  //     setMessage("");
  //     setCreator("");
  //     setTags("");
  //     setEditingItem(null);
  //   }
  // };
  const handleUpdateItem =  () => {
     dispatch(updateItem(editingItem._id, title,message,creator,tags));
      setTitle("");
      setMessage("");
      setCreator(""); 
      setTags("");
      // setEditingItem(null);
    }


  // const deleteItem = async (id) => {
  //   await axios.delete(`http://localhost:4000/posts/${id}`);
  //   setItems(items.filter((item) => item._id !== id));
  // };

  // const updateCount = async (id) => {
  //   const response = await axios.patch(
  //     `http://localhost:4000/posts/${id}/likePost`,
  //     { id }
  //   );
  //   // setLikeCount(response.data) this will update like but we need to refresh the page/ also require separate state variable
  //   setItems(items.map((item) => (item._id === id ? response.data : item)));
  // };

  return (
    <>
    

      <h3> socail media post creation CRUD App with state management Redux </h3>

      <div className="container">
        <div className="container1">
          <div className="box-item">
            {items.map((item) => (
              <li className="items" key={item._id}>
                {item.title}
                <br></br>
                <br></br>
                {item.message}
                <br></br>
                Like Count:{item.likeCount}
                <br></br>
                <br></br>
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => dispatch(deleteItem(item._id))}>Delete</button>
                <button onClick={() => dispatch(updateCount(item._id))}>Like</button>
                <br></br>
                <br></br>
                <b>Created by:</b> {item.creator}
              </li>
            ))}
            {/* {items.map((item) => (
              <li className="items" key={item._id}>
                {item.message}
  
              </li>
            ))} */}
          </div>
        </div>

        <div className="container2">
          <div className="item2">
            <h1>Fill below details to add Posts </h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your posts title here"
            />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here"
            />
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="Enter creator/Author name"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter Tags"
            />
            {editingItem ? (
              <button onClick={handleUpdateItem}>Update Item</button>
            ) : (
              <button onClick={handleAddItem}>Add Item</button>
            )}
          </div>
        </div>
      </div>


    </>
  );
}
export default Posts;

