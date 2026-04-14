import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Prediction() {

  const [form, setForm] = useState({
    age:"", sex:"", cp:"", trestbps:"", chol:"",
    fbs:"", restecg:"", thalach:"", exang:"",
    oldpeak:"", slope:"", ca:"", thal:""
  });

  const [result, setResult] = useState(null);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value === "" ? 0 : Number(e.target.value)
    });
  };

  // ================= DEMO BUTTONS =================
  const fillLow = () => {
    setForm({
      age: 30, sex: 0, cp: 1, trestbps: 110, chol: 180,
      fbs: 0, restecg: 1, thalach: 170, exang: 0,
      oldpeak: 0.5, slope: 2, ca: 0, thal: 2
    });
  };

  const fillHigh = () => {
    setForm({
      age: 65, sex: 1, cp: 3, trestbps: 160, chol: 300,
      fbs: 1, restecg: 2, thalach: 90, exang: 1,
      oldpeak: 3.5, slope: 3, ca: 2, thal: 3
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          features: Object.values(form)
        })
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      alert("Backend connection error");
    }
  };

  // ================= UI =================
  return (
    <div style={{ display: "flex", gap: "20px" }}>

      {/* INPUT PANEL */}
      <div style={panel}>
        <h2>🧪 Patient Input</h2>

        <div style={{ marginBottom: "10px" }}>
          <button onClick={fillLow} style={lowBtn}>Low Demo</button>
          <button onClick={fillHigh} style={highBtn}>High Demo</button>
        </div>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            style={input}
          />
        ))}

        <button onClick={handleSubmit} style={button}>
          Predict Risk
        </button>
      </div>

      {/* RESULT PANEL */}
      <div style={panel}>
        <h2>📊 Results</h2>

        {!result ? (
          <p>Enter patient data</p>
        ) : (
          <>
            {/* RISK */}
            <h2 style={{
              color: result.risk === "High" ? "#dc2626" : "#16a34a"
            }}>
              {result.risk} Risk
            </h2>

            {/* GRAPH */}
            <Bar
              data={{
                labels: ["Low Risk", "High Risk"],
                datasets: [{
                  label: "Risk Probability",
                  data: [result.low_prob, result.high_prob],
                  backgroundColor: ["#16a34a", "#dc2626"]
                }]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 1
                  }
                }
              }}
            />

            {/* EXPLANATION */}
            <div style={card}>
              <h3>🧠 Explanation</h3>
              <p>{result.explanation}</p>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const panel = {
  flex: 1,
  padding: "20px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.95)"
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "6px"
};

const button = {
  padding: "12px",
  width: "100%",
  marginTop: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const card = {
  marginTop: "20px",
  padding: "15px",
  background: "#f9fafb",
  borderRadius: "8px"
};

const lowBtn = {
  marginRight: "5px",
  padding: "8px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const highBtn = {
  padding: "8px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};