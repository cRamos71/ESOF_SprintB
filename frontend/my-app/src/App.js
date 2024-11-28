import React from "react";
import Login from "./Login";
import Register from './Register';
import Logout from './Logout';
import Home from "./Home";
import RegisterOpportunity from './RegisterOpps';
import ListOpps from './ListOpps';
import OpportunityFilter from './FilterOpps';
import CandidaturesPage from './Cadidatures';
import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function App() {

  const token = sessionStorage.getItem("token");
  var decoded;
  var userRole;
  if(token){
    decoded = jwtDecode(token);
    userRole = decoded.role;
  }


  return (
      <>
        
        <Routes>  {/* Sending what i want */}
          <Route path= "/" element={<Home />} />
          <Route path= "/home" element={<Home />} />
          <Route path= "/login"  element={<Login />} />
          <Route path= "/register" element={<Register />} />
          <Route path= "/logout"  element={sessionStorage.getItem("token")? <Logout /> : <Navigate to="/login" />} />
          <Route path="/registeropportinity" 
          element={token && userRole === "company" ? <RegisterOpportunity /> : <Navigate to="/listopportunities" />}
          />
          <Route path= "/listopportunities" element={token ? <ListOpps /> : <Navigate to = "/login" />} />
          <Route path= "/filteropportunities" element={token ? <OpportunityFilter /> : <Navigate to = "/login" />} />
          <Route path= "/candidatures"
          element = {token && userRole === "company" ? <CandidaturesPage /> : <Navigate to="/login" />}
          />
        </Routes>
        
      </>
  );
}

export default App;

