import React from "react";
import "./Home.css";

const features = [
  
  
  {name:"Chest Pain", normal:"0–3", risk:"Type 3 critical"},
  {name:"Resting BP", normal:"90–120", risk:">140"},
  {name:"Cholesterol", normal:"<200", risk:">240"},
  {name:"FBS", normal:"<120", risk:">120"},
  {name:"Rest ECG", normal:"0–2", risk:"Abnormal"},
  {name:"Max HR", normal:">150", risk:"<100"},
  {name:"Exercise Angina", normal:"0", risk:"1"},
  {name:"Oldpeak", normal:"<1", risk:">2"},
  {name:"Slope", normal:"1–2", risk:"3"}
];

export default function Home(){
  return (
    <div className="home">
      <h1>🏥 Health Guidelines</h1>

      <div className="grid">
        {features.map((f,i)=>(
          <div key={i} className="card">
            <h3>{f.name}</h3>
            <p><b>Normal:</b> {f.normal}</p>
            <p><b>Risk:</b> {f.risk}</p>
          </div>
        ))}
      </div>
    </div>
  );
}