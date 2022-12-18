import "./App.css";
import React from "react";
import Home from "./Pages/Home";
import AllCountries from "./Pages/AllCountries";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyRecords from "./Pages/MyRecords";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allcountries" element={<AllCountries />} />
        <Route path="/myrecords" element={<MyRecords />} />
      </Routes>
    </>
  );
}
