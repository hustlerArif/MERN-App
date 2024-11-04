import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Posts.css";

function Posts() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [tags, setTags] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("https://mern-app-backend-z38n.onrender.com/posts/");
    setItems(response.data);
  };

  const addItem = async () => {
    if (title.trim()) {
      const response = await axios.post("https://mern-app-backend-z38n.onrender.com/posts/", {
        title,
        message,
        creator,
        tags,
      });
      setItems([...items, response.data]);
      setTitle("");
      setMessage("");
      setCreator("");
      setTags("");
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    setTitle(item.title);
    setMessage(item.message);
    setCreator(item.creator);
    setTags(item.tags);
  };

  const updateItem = async () => {
    if (editingItem && title.trim()) {
      const response = await axios.patch(
        `https://mern-app-backend-z38n.onrender.com/posts/${editingItem._id}`,
        { title, message, creator, tags }
      );
      setItems(
        items.map((item) =>
          item._id === editingItem._id ? response.data : item
        )
      );
      setTitle("");
      setMessage("");
      setCreator("");
      setTags("");
      setEditingItem(null);
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`https://mern-app-backend-z38n.onrender.com/posts/${id}`);
    setItems(items.filter((item) => item._id !== id));
  };

  const updateCount = async (id) => {
    const response = await axios.patch(
      `https://mern-app-backend-z38n.onrender.com/posts/${id}/likePost`,
      { id }
    );
    // setLikeCount(response.data) this will update like but we need to refresh the page/ also require separate state variable
    setItems(items.map((item) => (item._id === id ? response.data : item)));
  };

  return (
    <>
      <Link to="/">Home Page</Link>

      <h3> socail media post creation CRUD App</h3>

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
                <button onClick={() => editItem(item)}>Edit</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
                <button onClick={() => updateCount(item._id)}>Like</button>
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
              <button onClick={updateItem}>Update Item</button>
            ) : (
              <button onClick={addItem}>Add Item</button>
            )}
          </div>
        </div>
      </div>


    </>
  );
}
export default Posts;

