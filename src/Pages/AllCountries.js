import axios from "axios";
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

    axios.get("http://127.0.0.1:8000/api/world/summary")
       .then((result) => {
          if (result.data.Countries) {
          setIsLoading(false);
          handleAllCountriesResponse(result.data);
        } else {
          setIsLoading(false);

          setErrorMessage(
            "Can't Load Data , Please try later...     \n"           );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error,"error fetching data")
        setErrorMessage(  "Can't Load Data , Please try later ...");
      });
  }, []);
 
  function AddToMyRecordsHandler(data){

    axios.post(`http://127.0.0.1:8000/api/addtomyrecords/${JSON.stringify(data)}`).then(res=> console.log(res,"res")).catch(err => console.log(err, "err"))
  }
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
                      <button
                        className="AddToMyRecords"
                        onClick={()=> AddToMyRecordsHandler(e)}
                      >
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
