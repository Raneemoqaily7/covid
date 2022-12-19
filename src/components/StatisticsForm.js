import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./StatisticsForm.css";
import LoadingSpinner from "./Loading";
import ConfirmedCasesCard from "./ConfirmedCasesCard";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function StatisticsForm() {
  const [options, setOptions] = useState([]);
  const [country, setCountry] = useState({ lable: "", value: "" });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allCountriesConfirmedCases, setAllCountriesConfirmedCases] = useState(
    []
  );

  useEffect(() => {
    fetch("https://api.covid19api.com/countries")
      .then((response) => response.text())
      .then((result) => CountryHandler(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  });

  function CountryHandler(countryData) {
    var countries = [];

    countryData.map((e) => countries.push({ label: e.Country, value: e.Slug }));
    setOptions(countries);
  }

  function confirmedCasesHandler(data) {
     var confirmedCases = [];
    data.map((e) => confirmedCases.push({ cases: e.Cases, date: e.Date }));
    setAllCountriesConfirmedCases(confirmedCases);
  }
  

  function searchHandler() {
    var countrySlug = country.value;
    if (countrySlug) {
      setIsLoading(true);
      var url = `http://127.0.0.1:8000/api/country/${countrySlug}/status/confirmed/from=${startDate}/to=${endDate}`;
      axios.get(url).then((result) => {
          confirmedCasesHandler(result.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage("Unable to fetch Data");
          setIsLoading(false);
        });
    } else {
      alert("Choose specific Country");
    }
  }

  return (
    <div>
      <h1 className="header">Get Statistics for a specific country</h1>
      <div className="formContainer">
        <div>
          <Select
            className="selectCountry"
            options={options}
            onChange={setCountry}
          />
        </div>

        <input
          type="date"
          name="datePickerStart"
          id="datePickerStart"
          onChange={(date) => {
            setStartDate(date.target.value);
          }}
        ></input>
        <input
          type="date"
          id="datePickerEnd"
          name="datePickerEnd"
          onChange={(date) => {
            setEndDate(date.target.value);
          }}
        ></input>

        <button
          className="searchButton"
          onClick={searchHandler}
          disabled={isLoading}
        >
          SEARCH
          <FaSearch style={{ marginLeft: "5px", marginTop: "5px" }} />
        </button>

      </div>
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid-container">
            {allCountriesConfirmedCases.map((e) => {
              return (
                <ConfirmedCasesCard
                  className="grid-item"
                  key={e.date}
                  content={
                    <>
                      <div className="date"> Date : {e.date}</div>
                      <div className="cases">
                        Number Of Confirmrd Cases : {e.cases}
                      </div>
                      <hr className="new"></hr>
                    </>
                  }
                />
              );
            })}
          </div>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
}
