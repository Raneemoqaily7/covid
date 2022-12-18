import "./Statistics.css";
import React, { useEffect, useState } from "react";
import TotalCard from "./TotalCard";

export default function Statistics() {
  const [totalConfirmed, setTotalConfirmed] = useState(undefined);
  const [totalDeaths, setTotalDeaths] = useState(undefined);
  const [totalRecovered, setTotalRecovered] = useState(undefined);

  useEffect(() => {
    fetch("https://api.covid19api.com/world/total")
      .then((response) => response.text())
      .then((result) => {
        var res = JSON.parse(result);
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
