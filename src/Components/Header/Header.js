import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function Header() {
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
            <button className="login-button">Login</button>
        </div>
    </>
  );
}

export default Header;
