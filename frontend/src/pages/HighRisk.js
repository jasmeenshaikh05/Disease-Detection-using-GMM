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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function HighRisk(){

  const [patients,setPatients]=useState([]);
  const [headers,setHeaders]=useState([]);

  const handleFile=(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event)=>{
      const rows = event.target.result.split("\n");

      const head = rows[0].split(",");
      let highPatients=[];

      rows.slice(1).forEach(r=>{
        if(!r.trim()) return;
        const cols = r.split(",");

        if(cols[cols.length-1]==="1"){
          highPatients.push(cols);
        }
      });

      setHeaders(head);
      setPatients(highPatients.slice(0,5)); // top 5
    }

    reader.readAsText(file);
  }

  // DOWNLOAD REPORT
  const downloadReport=()=>{
    let csv="High Risk Patients\n";
    patients.forEach(p=>{
      csv+=p.join(",")+"\n";
    });

    const blob=new Blob([csv],{type:"text/csv"});
    const url=window.URL.createObjectURL(blob);

    const a=document.createElement("a");
    a.href=url;
    a.download="high_risk_report.csv";
    a.click();
  }

  return (
    <div style={{padding:"20px", color:"white"}}>
      <h1>🚨 High Risk Patient Analysis</h1>

      <input type="file" onChange={handleFile}/>

      {patients.length>0 && (
        <>
          <button onClick={downloadReport} style={btn}>
            ⬇️ Download Report
          </button>

          {/* TABLE */}
          <table style={table}>
            <thead>
              <tr>
                {headers.map((h,i)=><th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {patients.map((p,i)=>(
                <tr key={i}>
                  {p.map((v,j)=><td key={j}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          {/* INDIVIDUAL CHARTS */}
          <h3 style={{marginTop:"20px"}}>Individual Analysis</h3>

          {patients.map((p,i)=>(
            <div key={i} style={card}>
              <Bar
                data={{
                  labels: headers.slice(0,-1),
                  datasets:[{
                    data: p.slice(0,-1),
                    backgroundColor:"#3b82f6"
                  }]
                }}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

/* styles */

const btn={
  marginTop:"10px",
  padding:"10px",
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:"6px"
};

const table={
  width:"100%",
  marginTop:"20px",
  background:"white",
  color:"#111",
  borderCollapse:"collapse"
};

const card={
  marginTop:"20px",
  padding:"15px",
  background:"white",
  borderRadius:"10px"
};