import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Socks", quantity: 12, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: false },
  { id: 5, description: "Socks", quantity: 12, packed: false },
  { id: 6, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("tripItems");
    return stored ? JSON.parse(stored) : [];
  });

  const totalItems = items.length;
  const totalPackedItems = items.filter((item) => item.packed).length;

  function handleItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeletedItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleCheck(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("tripItems", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-box">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        item={items}
        onDelete={handleDeletedItem}
        onCheck={handleCheck}
      />
      <Stats len={totalItems} packedItems={totalPackedItems} />
    </div>
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
        <div className="input-select">
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
        </div>
        <button className="btn">ADD</button>
      </form>
    </>
  );
}
function PackingList({ item, onDelete, onCheck }) {
  const [sort, setSort] = useState("input");
  let sortedItems = item;
  function clearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the whole list ?"
    );
    if (confirmed) item.map((i) => onDelete(i.id));
  }
  if (sort === "input") sortedItems = item;
  if (sort === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sort === "packed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <>
      <div className="list">
        <ul className="list-items">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              ondelete={onDelete}
              oncheck={onCheck}
            />
          ))}
        </ul>
        <div className="sorting">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="input">Sort by input</option>
            <option value="description">Sort by description</option>
            <option value="packed"> Sort by packed items</option>
          </select>
          <button onClick={clearList}>Clear List</button>
        </div>
      </div>
    </>
  );
}
function Item({ item, ondelete, oncheck }) {
  return (
    <>
      <li className="list-item">
        <div className="list-part-one">
          <input
            className="checkbox"
            value={item.packed}
            type="checkbox"
            onChange={(e) => oncheck(item.id)}
          />
          <div
            className="list-content"
            style={item.packed ? { textDecoration: "line-through" } : {}}
          >
            <span>
              {item.option} &nbsp; {item.description}
            </span>
          </div>
        </div>
        <span className="list-part-two" onClick={() => ondelete(item.id)}>
          <FontAwesomeIcon icon={faTimes} className="cross-icon" />
        </span>
      </li>
    </>
  );
}
function Stats({ len, packedItems }) {
  const percentage = Number(Math.round((packedItems / len) * 100));

  return (
    <footer>
      {}
      <em>
        {!isNaN(percentage) && percentage !== null
          ? `You have ${len} items on your list, and you already packed ${packedItems} 
     items, which is ${percentage} %`
          : `You have ${len} items on your list, and you already packed ${packedItems} 
     items, so percentage is invalid.`}
      </em>
    </footer>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
