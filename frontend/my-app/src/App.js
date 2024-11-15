import React from "react";
import Login from "./Login";
import Register from './Register';
import Logout from './Logout';
import Home from "./Home";
import RegisterOpportunity from './RegisterOpps';
import ListOpps from './ListOpps';
import OpportunityFilter from './FilterOpps';
import OpportunityApplicants from './ViewCandidatesToOpps';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
      <>
        
        <Routes>  {/* Sending what i want */}
          <Route path= "/" element={<Home />} />
          <Route path= "/home" element={<Home />} />
          <Route path= "/login"  element={<Login />} />
          <Route path= "/register" element={<Register />} />
          <Route path="/registeropps" 
          element={sessionStorage.getItem("role") === "company" ? <RegisterOpportunity /> : <Navigate to="/login" />}
        />
          <Route path= "/filteropps" element={<ListOpps />} />
          <Route path= "/viewcandidatestoopps" element={<OpportunityApplicants />} />
          <Route path= "/register" element={<Register />} />
        </Routes>
        
      </>
  );
}

export default App;

