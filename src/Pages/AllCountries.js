import React, { useEffect, useState } from "react";
import ConfirmedCasesCard from "../components/ConfirmedCasesCard";
import "../components/ConfirmedCasesCard.css";
import LoadingSpinner from "../components/Loading";
export default function AllCountries() {
  const [countries, setcountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleAllCountriesResponse(data) {
    var countriesData = data.Countries;
    setcountries(countriesData);
  }
  useEffect(() => {
    setIsLoading(true);

    fetch("https://api.covid19api.com/summary")
      .then((response) => response.text())
      .then((result) => {
        console.log(result, "22222");
        if (JSON.parse(result).Countries) {
          setIsLoading(false);
          handleAllCountriesResponse(JSON.parse(result));
        } else {
          setIsLoading(false);

          setErrorMessage(
            "Can't Load Data , Please try later...     \n" +
              JSON.parse(result).Message
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Can't Load Data , Please try later ...");
      });
  }, []);
  console.log(isLoading, "isLoading");
  return (
    <>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid-container">
          {countries.map((e) => {
            return (
              <>
                <ConfirmedCasesCard
                  className="grid-item"
                  key={e.ID}
                  content={
                    <>
                      <div className="countryName">
                        Country : {e.Country} , {e.CountryCode}
                      </div>
                      <div className="confirmed">
                        Total Confirmed Cases : {e.TotalConfirmed}
                      </div>

                      <div className="deathes">
                        Total Deathes Cases : {e.TotalDeaths}
                      </div>
                      <div className="recoverd">
                        Total Recoverd Cases : {e.TotalRecovered}
                      </div>
                      <div className="datet">
                        Date: {new Date().toLocaleDateString()}
                      </div>
                      <hr className="new"></hr>

                      <button className="AddToMyRecords">
                        ADD TO MY RECORDS
                      </button>
                    </>
                  }
                />
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
