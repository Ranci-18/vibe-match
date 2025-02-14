import React, { useState } from "react";

const App = () => {
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (category && inputValue) {
      alert(`Searching for: ${inputValue} in ${category}`);
      // You can replace this with your actual search logic
    } else {
      alert("Please select a category and enter a name.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>VibeMatch</h1>
      <select
        value={category}
        onChange={handleCategoryChange}
        style={{
          padding: 10,
          fontSize: 16,
          marginBottom: 10,
          borderRadius: 5,
        }}
      >
        <option value="">Select a category</option>
        <option value="music">Music</option>
        <option value="movies">Movies</option>
        <option value="books">Books</option>
      </select>
      <input
        type="text"
        placeholder="Enter name"
        value={inputValue}
        onChange={handleInputChange}
        style={{
          padding: 10,
          fontSize: 16,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          borderRadius: 5,
          backgroundColor: "#ff4500",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default App;