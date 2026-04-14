import React from "react";

export default function Sidebar({ setPage }) {
  return (
    <div style={side}>
      <h2>🧠 Health AI</h2>

      <p onClick={()=>setPage("home")} style={item}>🏠 Home</p>
      <p onClick={()=>setPage("predict")} style={item}>🧪 Prediction</p>
      <p onClick={()=>setPage("analytics")} style={item}>📊 Analytics</p>
      <p onClick={()=>setPage("highrisk")} style={item}>🚨 High Risk</p>
      <p onClick={()=>setPage("history")} style={item}>📜 History</p>
    </div>
  );
}

const side = {
  width: "240px",
  background: "#0f172a",
  color: "white",
  padding: "20px"
};

const item = {
  cursor: "pointer",
  marginTop: "15px"
};