import React from "react";

const DivGrid = ({ items }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "lightblue",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ccc",
            textAlign: "center",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DivGrid;