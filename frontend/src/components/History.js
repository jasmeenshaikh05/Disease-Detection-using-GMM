import React from "react";

export default function History({history}){
  return (
    <div>
      <h3>History</h3>
      {history.map((h,i)=>(
        <p key={i}>{h.risk}</p>
      ))}
    </div>
  );
}