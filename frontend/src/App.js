import React,{useState} from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import HighRisk from "./pages/HighRisk";
import HistoryPage from "./pages/HistoryPage";
import "./App.css";

export default function App(){

  const [page,setPage]=useState("home");

  return (
    <div className="app-container">
      <div className="content">
        <Sidebar setPage={setPage}/>

        <div className="main">
          {page==="home" && <Home/>}
          {page==="predict" && <Prediction/>}
          {page==="analytics" && <Analytics/>}
          {page==="highrisk" && <HighRisk/>}
          {page==="history" && <HistoryPage/>}
        </div>
      </div>
    </div>
  )
}