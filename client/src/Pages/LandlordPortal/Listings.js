import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/AdminSideBar/sidebar";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";

function Listings({ handleLogout }) {

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        // Calling your active Node.js backend routing port
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

    // Handler to safely remove a property listing from the backend and frontend state
    const handleDelete = async (propertyId) => {
        if (window.confirm("Are you sure you want to permanently delete this property listing?")) {
            try {
            const response = await axios.delete(`http://localhost:4000/api/properties/${propertyId}`);
            
            if (response.data.success) { 
                alert("Property listing successfully deleted.");
                // Filter out the deleted property from state so the UI updates immediately without a page reload
                setProperties((prevProperties) => 
                prevProperties.filter((property) => property._id !== propertyId)
                );
            }
            } catch (err) {
            console.error("Error deleting property:", err);
            alert(err.response?.data?.error || "Server error occurred while attempting to delete this listing.");
            }
        }
    };

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
        <Sidebar handleLogout={handleLogout}/>
        <main className="portal-content-workspace">
          <div className="workspace-header-row">
            <div className="header-greeting-block">
              <h2 className="welcome-heading-text">All Listings</h2>
              <p className="welcome-subtitle-text">Manage your properties seamlessly.</p>
            </div>
            <Link to='/add-listing' style={{ textDecoration: 'none', borderBottom: 'none' }}>
              <button className="add-listing-action-btn">
                <span className="plus-sign">+</span> Add New Listing
              </button>
            </Link>
          </div>

          <div className="workspace-dual-deck-row">
            <div className="panel-deck-card flex-2">
              <div className="panel-deck-header">
                <h4 className="panel-deck-title">My Listings ({properties.length})</h4>
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
                        <th>LOCATION</th>
                        <th>DISTANCE</th>
                        <th>TYPE</th>
                        <th>PRICE</th>
                        <th>UTILITIES</th>
                        <th>FACILITIES</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((prop) => {
                        const activeUtilities = getActiveUtilities(prop.amenities);
                        const activeFacilities = getActiveFacilities(prop.amenities);

                        return (
                          <tr key={prop._id}>
                            <td>
                              <div className="table-cell-property-block">
                                <img 
                                  src={prop.images && prop.images.length > 0 ? prop.images[0] : "https://via.placeholder.com/80"} 
                                  alt={prop.propertyName} 
                                  className="property-thumbnail-img" 
                                />
                                <div className="property-cell-meta">
                                  <p className="property-cell-title">{prop.propertyName}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="property-cell-price-block">
                                <p className="price-bold-text">{prop.location}</p>
                              </div>
                            </td>
                            <td>
                              <div className="property-cell-price-block">
                                <p className="price-bold-text">{prop.distance}</p>
                              </div>
                            </td>
                            <td>
                              <div className="property-cell-price-block">
                                <p className="price-bold-text">{prop.propertyType}</p>
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

                            <td>
                                <div className="actions d-flex align-items-center">
                                    <Link to = {`/edit-property/${prop._id}`}><Button className="success" color='success'><FaPencilAlt /></Button></Link>
                                    <Button className="error" color='error' onClick={() => handleDelete(prop._id)} ><MdDelete /></Button>
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Listings;