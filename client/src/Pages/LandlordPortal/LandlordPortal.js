import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowTrendUp, FaRegMoneyBill1, FaArrowRight, FaHouseChimney, } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";

import Sidebar from "../../Components/AdminSideBar/sidebar";
import { Link } from "react-router-dom";

const inquiriesData = [
  {
    id: 1,
    initials: "SM",
    name: "Sarah Mwangi",
    time: "2 hours ago",
    message: '"Hi! Is the Pine Breeze studio still available for next semester? I\'d like..."',
    property: "Pine Breeze Apartments",
    bgColor: "#fef3c7",
    textColor: "#d97706"
  },
  {
    id: 2,
    initials: "KO",
    name: "Kevin Otieno",
    time: "5 hours ago",
    message: '"Does the price include water and electricity?"',
    property: "Green Valley Studio",
    bgColor: "#dbeafe",
    textColor: "#1d4ed8"
  },
  {
    id: 3,
    initials: "AN",
    name: "Alice Njeri",
    time: "Yesterday",
    message: '"I am a female student looking for a shared room. Are there other female..."',
    property: "Pine Breeze Apartments",
    bgColor: "#d1fae5",
    textColor: "#065f46"
  }
];

function LandlordDashboard({ handleLogout }) {

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        // Calling active Node.js backend routing port
        const response = await axios.get("http://localhost:4000/api/properties");
        
        if (response.data.success) {
          setProperties(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to stream active listings from database.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getActiveUtilities = (amenities = {}) => {
    const labels = {
      wifi: "Free WiFi",
      water: "24/7 Water",
      generator: "Backup Power",
      shower: "Hot Shower"
    };
    return Object.keys(labels).filter(key => amenities[key]);
  };

  const getActiveFacilities = (amenities = {}) => {
    const labels = {
      laundry: "Laundry Room",
      kitchenette: "Kitchenette",
      desk: "Study Desk",
      balcony: "Balcony"
    };
    return Object.keys(labels).filter(key => amenities[key]);
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-layout-container">
        <Sidebar handleLogout={handleLogout} />
        <main className="portal-content-workspace">
          <div className="workspace-header-row">
            <div className="header-greeting-block">
              <h2 className="welcome-heading-text">Welcome</h2>
              <p className="welcome-subtitle-text">Manage your properties and stay updated on student inquiries.</p>
            </div>
            <Link to='/add-listing' style={{ textDecoration: 'none', borderBottom: 'none' }}>
              <button className="add-listing-action-btn">
                <span className="plus-sign">+</span> Add New Listing
              </button>
            </Link>
          </div>

          {/* Matrix Top Card Row */}
          <div className="metrics-cards-grid">
            <div className="metric-data-card">
              <div className="metric-card-top-line">
                <div className="metric-icon-box-view"><IoEyeOutline /></div>
                <span className="metric-percentage-label-view">+12% <FaArrowTrendUp className="metric-percentage-label-view-arrow"/></span>
              </div>
              <p className="metric-card-data-heading">Total Views</p>
              <h3 className="metric-card-grand-total">1,248</h3>
            </div>

            <div className="metric-data-card">
              <div className="metric-card-top-line">
                <div className="metric-icon-box-inquiry"><TbMessage /></div>
                <span className="metric-percentage-label-inquiry">+5 <RxEnvelopeClosed className="metric-percentage-label-inquiry-icon" /></span>
              </div>
              <p className="metric-card-data-heading">Active Inquiries</p>
              <h3 className="metric-card-grand-total">24</h3>
            </div>

            <div className="metric-data-card">
              <div className="metric-card-top-line">
                <div className="metric-icon-box-revenue"><FaRegMoneyBill1 /></div>
                <span className="metric-percentage-label-revenue">KES / mo</span>
              </div>
              <p className="metric-card-data-heading">Est. Monthly Revenue</p>
              <h3 className="metric-card-grand-total">145,000</h3>
            </div>
          </div>

          {/* Bottom Side-by-Side Deck Layout */}
          <div className="workspace-dual-deck-row">
            {/* Left Side: Property Management List */}
            <div className="panel-deck-card flex-2">
              <div className="panel-deck-header">
                <h4 className="panel-deck-title">My Listings</h4>
                <Link to='/all-listings' className="panel-deck-action-link">View All</Link>
              </div>

              <div className="table-responsive-container">
                {isLoading ? (
                  <div style={{ padding: "40px", textAlignment: "center", color: "#666" }}>
                    Streaming database entities...
                  </div>
                ) : error ? (
                  <div style={{ padding: "40px", textAlignment: "center", color: "red" }}>
                    {error}
                  </div>
                ) : properties.length === 0 ? (
                  <div style={{ padding: "40px", textAlignment: "center", color: "#666" }}>
                    No database properties found. Click "+ Add New Listing" to create one!
                  </div>
                ) : (
                  <table className="listings-portal-table">
                    <thead>
                      <tr>
                        <th>PROPERTY</th>
                        <th>PRICE</th>
                        <th>UTILITIES</th>
                        <th>FACILITIES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.slice(0,5).map((prop) => {
                        // Dynamically mapping active database fields into text arrays
                        const activeUtilities = getActiveUtilities(prop.amenities);
                        const activeFacilities = getActiveFacilities(prop.amenities);

                        return (
                          <tr key={prop._id}> 
                            <td>
                              <div className="table-cell-property-block">
                                {/* Using first uploaded photo path from Cloudinary array, falling back to placeholder if null */}
                                <img 
                                  src={prop.images && prop.images.length > 0 ? prop.images[0] : "https://via.placeholder.com/80"} 
                                  alt={prop.propertyName} 
                                  className="property-thumbnail-img" 
                                />
                                <div className="property-cell-meta">
                                  <p className="property-cell-title">{prop.propertyName}</p>
                                  <span className="property-cell-loc">{prop.location} • {prop.distance}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="property-cell-price-block">
                                <p className="price-bold-text">KES {Number(prop.price).toLocaleString()}</p>
                              </div>
                            </td>
                            
                            {/* Utilities processing loop */}
                            <td>
                              <div className="dashboard-amenity-tags-container" style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                {activeUtilities.length > 0 ? (
                                  activeUtilities.map((util, i) => (
                                    <span key={i} className="status-badge-pill verified" style={{ fontSize: "11px", padding: "3px 8px", whiteSpace: "nowrap" }}>
                                      {util}
                                    </span>
                                  ))
                                ) : (
                                  <span style={{ fontSize: "11px", color: "#999" }}>None selected</span>
                                )}
                              </div>
                            </td>

                            {/* Facilities processing loop */}
                            <td>
                              <div className="dashboard-amenity-tags-container" style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                {activeFacilities.length > 0 ? (
                                  activeFacilities.map((fac, i) => (
                                    <span key={i} className="status-badge-pill pending" style={{ fontSize: "11px", padding: "3px 8px", whiteSpace: "nowrap", color: "#4f46e5", backgroundColor: "#eeebff" }}>
                                      {fac}
                                    </span>
                                  ))
                                ) : (
                                  <span style={{ fontSize: "11px", color: "#999" }}>None selected</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Right Side: Interactive Inquiry Activity Stream */}
            <div className="panel-deck-card flex-1">
              <div className="panel-deck-header">
                <h4 className="panel-deck-title">Recent Inquiries</h4>
              </div>

              <div className="inquiry-stream-stack">
                {inquiriesData.map((inq) => (
                  <div key={inq.id} className="inquiry-feed-card">
                    <div className="feed-card-header-row">
                      <div className="feed-user-identity-block">
                        <div className="user-initials-avatar" style={{ backgroundColor: inq.bgColor, color: inq.textColor }}>
                          {inq.initials}
                        </div>
                        <div className="user-meta-title-block">
                          <h5 className="feed-user-fullname">{inq.name}</h5>
                          <span className="feed-timestamp-label">{inq.time}</span>
                        </div>
                      </div>
                      <span className="feed-arrow-indicator"><FaArrowRight /></span>
                    </div>
                    <p className="feed-message-body-text">{inq.message}</p>
                    <div className="feed-context-footer-pill">
                      <span className="home-mini-icon"><FaHouseChimney /></span> {inq.property}
                    </div>
                  </div>
                ))}
              </div>

              <button className="view-all-inquiries-block-btn">View All Inquiries</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandlordDashboard;