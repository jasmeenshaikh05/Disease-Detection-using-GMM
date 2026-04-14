import React, { useState, useEffect } from "react";

export default function HistoryPage(){

  const [history, setHistory] = useState([]);

  // Load history
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>📜 Prediction History</h1>

      <button onClick={clearHistory} style={btn}>
        🗑️ Clear History
      </button>

      {history.length === 0 ? (
        <div style={emptyCard}>
          <p>No predictions yet</p>
          <p>Go to Prediction page and test the model 👇</p>
        </div>
      ) : (
        history.map((h, i) => (
          <div key={i} style={card}>
            <h3>Patient {i + 1}</h3>

            <p>
              <b>Risk:</b>{" "}
              <span style={{
                color:
                  h.risk === "High"
                    ? "#dc2626"
                    : h.risk === "Medium"
                    ? "#f59e0b"
                    : "#16a34a"
              }}>
                {h.risk}
              </span>
            </p>

            <p><b>Cluster:</b> {h.cluster}</p>

            {/* Probability Bars */}
            <div style={{ marginTop: "10px" }}>
              {h.probabilities?.map((p, idx) => (
                <div key={idx} style={{ marginBottom: "5px" }}>
                  <span>Cluster {idx}: </span>
                  <div style={barContainer}>
                    <div
                      style={{
                        ...barFill,
                        width: `${p * 100}%`,
                        background:
                          idx === 0
                            ? "#16a34a"
                            : idx === 1
                            ? "#f59e0b"
                            : "#dc2626"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* STYLES */

const card = {
  background: "rgba(255,255,255,0.95)",
  color: "#111",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
  maxWidth: "500px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const emptyCard = {
  background: "rgba(255,255,255,0.9)",
  color: "#111",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  maxWidth: "400px"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const barContainer = {
  height: "8px",
  background: "#ddd",
  borderRadius: "5px",
  overflow: "hidden",
  marginTop: "3px"
};

const barFill = {
  height: "100%"
};