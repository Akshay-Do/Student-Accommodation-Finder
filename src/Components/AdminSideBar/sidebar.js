import Button from "@mui/material/Button";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { LuShieldCheck } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { GoSignOut } from "react-icons/go";

const Sidebar = ({ handleLogout }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const handleTabClick = (index, hasSubmenu = false) => {
        setActiveTab(index);
        if (hasSubmenu) {
            setIsToggleSubmenu(!isToggleSubmenu);
        } else {
            setIsToggleSubmenu(false);
        }
    };

    return (
        <div className="sidebar">
            <aside className="portal-sidebar">
                <div className="sidebar-top-branding">
                    <span className="sidebar-brand-subtitle">Landlord Portal</span>
                </div>
    
                <nav className="sidebar-navigation">
                    <ul>
                        {/* Dashboard Link */}
                        <li>
                            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                <Button 
                                    className={`w-100 ${activeTab === 0 ? 'active' : ''}`} 
                                    onClick={() => handleTabClick(0)}
                                >
                                    <span className="nav-icon"><TbLayoutDashboard /></span>
                                    Dashboard
                                </Button>
                            </Link>
                        </li>

                        {/* My Listings Wrapper Item */}
                        <li>
                            <Button 
                                className={`w-100 ${activeTab === 1 ? 'active' : ''}`} 
                                onClick={() => handleTabClick(1, true)}
                            >
                                <span className="nav-icon"><FiClipboard /></span>
                                My Listings
                                <span className={`sidebar-arrow-indicator ${isToggleSubmenu ? 'rotated' : ''}`}>
                                    <FaAngleRight />
                                </span>
                            </Button>

                            {/* Conditional Dropdown Submenu */}
                            {isToggleSubmenu && (
                                <ul className="sidebar-submenu">
                                    <li>
                                        <Link to="/all-listings" className="sidebar-submenu-item">
                                            All Listings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/add-listing" className="sidebar-submenu-item">
                                            Add Listing
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Other Nav items */}
                        <li>
                            <a href="#inquiries" className="sidebar-nav-item label-dot-wrapper">
                                <AiOutlineMessage className="nav-icon" />
                                Student Inquiries
                            </a>
                        </li>
                        <li>
                            <a href="#verification" className="sidebar-nav-item">
                                <LuShieldCheck className="nav-icon" />
                                Verification Status
                            </a>
                        </li>
            
                        <hr className="sidebar-menu-divider" />
            
                        <li>
                            <a href="#settings" className="sidebar-nav-item text-secondary">
                                <IoMdSettings className="nav-icon" />
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="#logout" className="sidebar-nav-item text-danger" onClick={(e) => {
                                e.preventDefault(); // Prevents the page from appending '#' to URL
                                handleLogout();    // Clears state in App.js
                              }}>
                                <GoSignOut className="nav-icon" />
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;