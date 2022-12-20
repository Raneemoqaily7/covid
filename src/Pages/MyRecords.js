import React , {useEffect, useState} from "react";
import axios from 'axios';
import ConfirmedCasesCard from "../components/ConfirmedCasesCard";
import LoadingSpinner from "../components/Loading";
import '../components/ConfirmedCasesCard.css'
export default function MyRecords() {
  const [records, setRecords]= useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleAllRecords(data) {
     setRecords(data);
  }
 async function deleteRecordByID(record){
   var filteredRecords = records.filter(r => { return r.id != record.id} )
   await axios.delete(`http://127.0.0.1:8000/api/delete/${record.id}`).then(res=> console.log(res,"resss")).catch(err=> console.log(err, "err"))
    setRecords(filteredRecords)
 

}
async function getRecordsAPI() {
  try{
   const result =  await axios.get("http://127.0.0.1:8000/api/getAllRecords")
   if (records !=[]) {
    setIsLoading(false);
    handleAllRecords(result.data);
  } else {
    setIsLoading(false);
    setErrorMessage("Can't Load Data , Please try later..."  );
  }
  }catch(error){

    setIsLoading(false);
    console.log(error,"error fetching data")
    setErrorMessage(  "Can't Load Data , Please try later ...");
  }}
  useEffect( () => {
    getRecordsAPI()
  }, [records]);
  return(  
  <>
    {errorMessage && <div className="error">{errorMessage}</div>}
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="grid-container">
        {records.map((e) => {
          return (
            <>
              <ConfirmedCasesCard
                className="grid-item"
                key={e.ID}
                content={
                  <>
                    <div className="countryName">
                      Country : {e.Country} 
                    </div>
                    
                    <div className="datet">
                      Date: {new Date().toLocaleDateString()}
                    </div>
                    <hr className="new"></hr>
                    <button
                      className="deleteButton"
                      onClick={()=> deleteRecordByID(e)}
                      >
                      Delete
                    </button>
                     
                  </>
                }
              />
            </>
          );
        })}
      </div>
    )}
  </>);
}
