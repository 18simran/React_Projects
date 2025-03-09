import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { use } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Socks", quantity: 12, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: false },
  { id: 5, description: "Socks", quantity: 12, packed: false },
  { id: 6, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [Item, setitem] = useState([]);
  function handleItems(item) {
    setitem((Item) => [...Item, item]);
  }
  function handleDeletedItem(id) {
    setitem((Item) => Item.filter((item) => item.id !== id));
  }
  function handleCheck(id) {
    setitem((Item) =>
      Item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <>
      {" "}
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        item={Item}
        onDelete={handleDeletedItem}
        onCheck={handleCheck}
      />
      <Stats />
    </>
  );
}
function Logo() {
  return (
    <>
      <div className="logo">
        <img alt="logo" src="./Logo1.png" />
        <img alt="logo" src="./Logo.png" />
        <img alt="logo" src="./Logo1.png" />
      </div>
    </>
  );
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [option, setOption] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, option, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setOption(1);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip ?</h3>
        <select
          value={option}
          onChange={(e) => {
            setOption(Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          className="bar"
          value={description}
          placeholder="Add items..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="btn">ADD</button>
      </form>
    </>
  );
}
function PackingList({ item, onDelete, onCheck }) {
  return (
    <>
      <div className="list">
        {item.map((item) => (
          <Item
            key={item.id}
            item={item}
            ondelete={onDelete}
            oncheck={onCheck}
          />
        ))}
      </div>
    </>
  );
}
function Item({ item, ondelete, oncheck }) {
  return (
    <>
      <ul className="list-items">
        <li>
          <input
            className="checkbox"
            value={item.packed}
            type="checkbox"
            onChange={(e) => oncheck(item.id)}
          />
          <div
            className="list-item"
            style={item.packed ? { textDecoration: "line-through" } : {}}
          >
            <span>{item.option} </span>
            {item.description}
            <p className="cut" onClick={() => ondelete(item.id)}>
              ❌
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}
function Stats() {
  return (
    <footer>
      <em>You have X items on your list,and you already packed(X%)</em>
    </footer>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
