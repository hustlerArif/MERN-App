//App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  addItem,
  deleteItem,
  editItem,
  updateItem,
  updateCount,
} from "./features/post/postSlice";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const editingItem = useSelector((state) => state.item.editingItem);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = () => {
    dispatch(addItem({ title, message, creator, tags })); // Wrap arguments in an object

    setTitle("");
    setMessage("");
    setCreator("");
    setTags("");
  };

  const handleEditItem = (item) => {
    // setEditingItem(item);
    dispatch(editItem(item));
    setTitle(item.title);
    setMessage(item.message);
    setCreator(item.creator);
    setTags(item.tags);
  };

  const handleUpdateItem = () => {
    dispatch(
      updateItem({ id: editingItem._id, title, message, creator, tags })
    ); // Wrap arguments in an object
    setTitle("");
    setMessage("");
    setCreator("");
    setTags("");
  };

  return (
    <>
      <h3> social media post creation CRUD App with state management Redux Tookit </h3>

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
                <button onClick={() => dispatch(deleteItem(item._id))}>
                  Delete
                </button>
                <button onClick={() => dispatch(updateCount(item._id))}>
                  Like
                </button>
                <br></br>
                <br></br>
                <b>Created by:</b> {item.creator}
              </li>
            ))}
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
export default App;
