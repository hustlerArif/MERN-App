import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem } from "./features/item/itemSlice";

function App() {
  // const [items, setItems] = useState(() => {
  //   const storedItems = localStorage.getItem("items");
  //   return storedItems ? JSON.parse(storedItems) : [];
  // });

  const dispatch = useDispatch();
  // const items= useSelector((state)=>state.item.items)
  const items = useSelector((state) => state.item);

  //// const [items, setItems] = useState([])

  const [input, setInput] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    ////setItems(items.filter((item) => item.id !== id));
    // localStorage.setItem("items", JSON.stringify(items));
  };

  const handleAdd = () => {
    dispatch(addItem({ id: Math.floor(Math.random() * 1000), text: input }));
    // console.log('clicked')
    //// const newItem = { id: Math.floor(Math.random() * 1000), text: input };
    //// setItems([...items, newItem]);
    // console.log(items)
    // localStorage.setItem("items", JSON.stringify(items));
    setInput("");
  };

  return (
    <div>
      just practing hard...
      <div className="container">
        <input
          type="text"
          placeholder="type something"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button onClick={() => handleAdd()}>Add</button>
      </div>
      <div className="container2">
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.text}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default App;
