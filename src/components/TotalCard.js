import React from "react";
import "./TotalCard.css";

export default function TotalCard(props) {
  return (
    <div className="cardContainer">
      <div>{props.title}</div>
      <div>{props.total}</div>
    </div>
  );
}
