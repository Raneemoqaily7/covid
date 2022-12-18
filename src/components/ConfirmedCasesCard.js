import React from "react";
import "./ConfirmedCasesCard.css";
export default function ConfirmedCasesCard(props) {
  return (
    <div className="confirmedCasesCard">
      {props.content}
    </div>
  );
}
