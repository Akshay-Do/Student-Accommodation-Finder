import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { RiMap2Line } from "react-icons/ri";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { MdShield } from "react-icons/md";
import { PiMapPinAreaBold } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";


// mock data
const listingsData = [
  {
    id: 1,
    title: "Blue Sapphire Heights",
    price: "12,500 KES/mo",
    safety: "4.8 Safety",
    location: "5 mins walk from Gate A",
    verified: true,
    amenities: ["WiFi", "Instant Shower", "24/7 Guard"],
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Juja Executive Studios",
    price: "8,000 KES/mo",
    safety: "4.2 Safety",
    location: "12 mins walk from Gate C",
    verified: true,
    amenities: ["Borehole", "Backup Power"],
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Hostel 101 - Shared",
    price: "6,500 KES/mo",
    safety: "4.9 Safety",
    location: "2 mins walk from Gate B",
    verified: true,
    amenities: ["Laundry", "Cafeteria"],
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "The Residency Juja",
    price: "15,000 KES/mo",
    safety: "4.6 Safety",
    location: "8 mins walk from Gate A",
    verified: true,
    amenities: ["CCTV", "Parking"],
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80",
  },
];

const recentlyViewed = [
  { id: 1, title: "Apex Suites", price: "11,000 KES/mo", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=120&q=80" },
  { id: 2, title: "Oakwood Flats", price: "9,500 KES/mo", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=120&q=80" },
];

const studentFavorites = [
  { label: "Near Gate A", count: "12 Properties" },
  { label: "Bedsitters < 10k", count: "8 Properties" },
  { label: "Female Hostels", count: "15 Properties" },
];

function FindHousing() {
  return (
    <div className="search-page-container">
      <div className="breadcrumb-area">
        <span className="breadcrumb-text">Search Results - JKUAT Area</span>
      </div>

      {/* Search & Filters Dashboard Panel */}
      <div className="search-control-panel">
        <div className="search-input-wrapper">
          <IoSearch className="panel-icon" />
          <input type="text" defaultValue="Search near JKUAT, Juja..." className="panel-search-input" />
          <button className="panel-search-btn">Search</button>
        </div>
        
        <div className="filters-row-wrapper">
          <div className="filter-pills-group">
            <button className="filter-pill dropdown">Price: 5k - 20k KES <IoIosArrowDown className="filters-icons"/></button>
            <button className="filter-pill dropdown">Room: Bed-sitter <IoIosArrowDown className="filters-icons"/></button>
            <button className="filter-pill dropdown">Safety: 4.0+ <IoIosArrowDown className="filters-icons"/></button>
            <button className="filter-pill active"><MdOutlineVerified className="filters-icons" />Verified Only</button>
          </div>
          <button className="map-toggle-btn">
            <RiMap2Line className="map-icon" />
            Show Map
          </button>
        </div>
      </div>

      <div className="search-results-layout">        
        {/* Results Counter & Listing Grid */}
        <div className="listings-column-left">
          <div className="results-meta-header">
            <h3 className="results-count-title">32 Results near JKUAT</h3>
            <button className="sort-dropdown-trigger">
              Sort by: Recommended 
              <HiMiniArrowsUpDown className="sort-icon" />
            </button>
          </div>

          <div className="search-listings-grid">
            {listingsData.map((listing) => (
              <div key={listing.id} className="search-listing-card">
                <div className="card-image-container">
                  <img src={listing.img} alt={listing.title} className="card-main-img" />
                  <span className="card-price-tag">{listing.price}</span>
                  <span className="card-safety-badge"><MdShield className="card-safety-badge-icon"/> {listing.safety}</span>
                  <div className="card-dots-indicator">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>

                <div className="card-body-content">
                  <div className="card-title-row">
                    <h4 className="card-main-title">{listing.title}</h4>
                    {listing.verified && (
                      <span className="card-verified-lbl">
                        <MdVerified className="checkmark-icon" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="card-location-text"><PiMapPinAreaBold className="card-location-text-icon"/> {listing.location}</p>
                  
                  <hr className="card-inner-divider" />
                  
                  <div className="card-amenities-row">
                    {listing.amenities.map((amenity, i) => (
                      <span key={i} className="amenity-tag-pill">{amenity}</span>
                    ))}
                  </div>

                  <div className="card-actions-footer">
                    <button className="details-action-btn">View Details</button>
                    <button className="bookmark-action-btn">
                      <CiBookmark className="bookmark-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informational Context Sidebar */}
        <div className="sidebar-column-right">
          
          {/* Recently Viewed */}
          <div className="sidebar-widget-card">
            <h4 className="widget-header-title">Recently Viewed</h4>
            <div className="recently-viewed-list">
              {recentlyViewed.map((item) => (
                <div key={item.id} className="recent-item-row">
                  <img src={item.img} alt={item.title} className="recent-thumb-img" />
                  <div className="recent-item-info">
                    <h5 className="recent-item-title">{item.title}</h5>
                    <p className="recent-item-price">{item.price}</p>
                    <span className="recent-verified-badge"><MdVerified className="recent-verified-badge-icon"/> Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety First Callout Banner */}
          <div className="sidebar-safety-banner">
            <h4 className="safety-banner-title">Safety First</h4>
            <p className="safety-banner-body">
              All listings near JKUAT are physically verified by our campus ambassadors.
            </p>
            <button className="safety-banner-btn">Learn about Safety</button>
          </div>

          {/* Student Favorites Pill list */}
          <div className="sidebar-widget-card">
            <h4 className="widget-header-title">Student Favorites</h4>
            <div className="favorites-pills-list">
              {studentFavorites.map((fav, i) => (
                <div key={i} className="favorite-pill-row">
                  <span className="fav-label">{fav.label}</span>
                  <span className="fav-count-badge">{fav.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindHousing;