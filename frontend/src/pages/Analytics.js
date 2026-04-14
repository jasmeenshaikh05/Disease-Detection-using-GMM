import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Analytics() {

  const [data, setData] = useState(null);

  const handleFile = (e) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const rows = event.target.result.split("\n").slice(1);

      let high = 0, low = 0;

      rows.forEach(r => {
        if (!r.trim()) return;
        const cols = r.split(",");
        if (cols[cols.length - 1] === "1") high++;
        else low++;
      });

      setData({ high, low });
    };

    reader.readAsText(e.target.files[0]);
  };

  const downloadReport = () => {
    let csv = "Risk Summary\n";
    csv += `Low,${data.low}\nHigh,${data.high}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics_report.csv";
    a.click();
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>📊 Dataset Analytics</h1>

      <input type="file" onChange={handleFile} />

      {!data && <p>Upload dataset to view insights</p>}

      {data && (
        <>
          <div style={panel}>
            <h3>Risk Distribution</h3>

            <Pie
              data={{
                labels: ["Low Risk", "High Risk"],
                datasets: [{
                  label: "Patients",   // ✅ FIXED
                  data: [data.low, data.high],
                  backgroundColor: ["#22c55e", "#ef4444"]
                }]
              }}
            />
          </div>

          <div style={panel}>
            <h3>Patient Count Comparison</h3>

            <Bar
              data={{
                labels: ["Low", "High"],
                datasets: [{
                  label: "Patient Count",  // ✅ FIXED
                  data: [data.low, data.high],
                  backgroundColor: ["#22c55e", "#ef4444"]
                }]
              }}
            />
          </div>

          <div style={panel}>
            <h3>🧠 Insight</h3>
            <p>
              High risk patients:{" "}
              {Math.round((data.high / (data.low + data.high)) * 100)}%
            </p>

            <button onClick={downloadReport} style={btn}>
              ⬇️ Download Report
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const panel = {
  background: "rgba(255,255,255,0.95)",
  color: "#111",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
  maxWidth: "500px"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};