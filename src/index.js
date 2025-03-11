import React, { useState } from "react";
import ReactDOM from "react-dom/client";
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
  const [Item, setitem] = useState([]);
  const totalItems = Item.length;
  const totaPackedItems = Item.filter((item) => item.packed).length;
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
      <div className="main-box">
        <Logo />
        <Form onAddItems={handleItems} />
        <PackingList
          item={Item}
          onDelete={handleDeletedItem}
          onCheck={handleCheck}
        />
        <Stats len={totalItems} packedItems={totaPackedItems} />
      </div>
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
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            ondelete={onDelete}
            oncheck={onCheck}
          />
        ))}
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
