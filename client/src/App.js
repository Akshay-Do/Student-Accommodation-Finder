import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from 'react';
import Home from './Pages/Home/Home';
import FindHousing from './Pages/FindHousing/FindHousing';
import LandlordDashboard from './Pages/LandlordPortal/LandlordPortal';
import AddListing from './Pages/LandlordPortal/AddListing';
import Listings from './Pages/LandlordPortal/Listings';
import UpdateListing from './Pages/LandlordPortal/UpdateListing';
import Login from './Pages/LandlordPortal/Login'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUserRole("landlord");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const GuardedRoute = ({ element }) => {
    return isLoggedIn && userRole === "landlord" ? element : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/findhousing" exact={true} element={<FindHousing />} />
        
        {/* Route pointing directly to dashboard */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Protected Dashboard Routes */}
        <Route path="/manageproperties" exact={true} element={<GuardedRoute element={<LandlordDashboard handleLogout={handleLogout}/>} />} />
        <Route path="/dashboard" exact={true} element={<GuardedRoute element={<LandlordDashboard handleLogout={handleLogout}/>} />} />
        <Route path="all-listings" exact={true} element={<GuardedRoute element={<Listings handleLogout={handleLogout}/>} />} />
        <Route path="/add-listing" exact={true} element={<GuardedRoute element={<AddListing handleLogout={handleLogout}/>} />} />
        <Route path="/edit-property/:id" exact={true} element={<GuardedRoute element={<UpdateListing handleLogout={handleLogout}/>} />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;