import "./Statistics.css";
import React, { useEffect, useState } from "react";
import TotalCard from "./TotalCard";
import axios from 'axios';
export default function Statistics() {
  const [totalConfirmed, setTotalConfirmed] = useState(undefined);
  const [totalDeaths, setTotalDeaths] = useState(undefined);
  const [totalRecovered, setTotalRecovered] = useState(undefined);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/world/total")
       .then((result) => {
        var res= result.data
        setTotalConfirmed(res.TotalConfirmed);
        setTotalDeaths(res.TotalDeaths);
        setTotalRecovered(res.TotalRecovered);
      })
      .catch((error) => console.log("error", error));
  });
  return (
    <div>
      <h1 className="header">World Total Statistics</h1>
      <div className="cardsHolder">
        <TotalCard title="Total Confirmed: " total={totalConfirmed} />
        <TotalCard title="Total Deaths: " total={totalDeaths} />
        <TotalCard title="Total Recovered: " total={totalRecovered} />
      </div>
    </div>
  );
}
