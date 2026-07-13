import React from "react";
import { Button } from "@mui/material";
import { NavLink, useLocation} from "react-router-dom";

function Header({ isLoggedIn, handleLogout }) {
  const location = useLocation();

  const landlordPortalPaths = [
    "/manageproperties",
    "/dashboard",
    "/all-listings",
    "/add-listing",
    "/login"
  ];

  const isLandlordPortal = landlordPortalPaths.includes(location.pathname) || location.pathname.startsWith("/edit-property/");

  return (
    <>
        <div className='nav'>
            <h1 className="logo">NestQuest</h1>
            <ul className="nav-links">
                <li className="navButton"><NavLink to="/"><Button>Home</Button></NavLink></li>
                <li className="navButton"><NavLink to="/findhousing"><Button>Find Housing</Button></NavLink></li>
                <li className="navButton"><NavLink to="/findroommates"><Button>Find Roommates</Button></NavLink></li>
                <li className="navButton"><NavLink to="/manageproperties"><Button>Manage Properties</Button></NavLink></li>
            </ul>
            {!isLandlordPortal && (
              isLoggedIn ? (
                <button className="login-button" onClick={handleLogout} style={{ backgroundColor: "#ef4444" }}>
                  Logout
                </button>
              ) : (
                <button className="login-button">Login</button>
              )
            )}
        </div>
    </>
  );
}

export default Header;