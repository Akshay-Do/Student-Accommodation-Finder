import React from "react";
import Header from '../../Components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FiShield, FiMap, FiUsers, FiChevronLeft, FiChevronRight, FiWifi, FiLock } from "react-icons/fi"; 
import { IoSearch } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar, FaBolt, FaWater, FaBicycle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdOutlineVerified, MdVerified, MdOutlineShower, MdLocalGasStation, MdLocalLaundryService, MdFitnessCenter } from "react-icons/md";

function Home() {
  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <div className="home-wrapper">
            <div className="content-column">

              <div className="badge-top">
                <VscWorkspaceTrusted className="trusted-icon" />
                Trusted by 10k+ Students
              </div>
              
              <h1 className="main-heading">
                Your Safe Haven <br />
                <span className="highlight-text">Near Campus</span>
              </h1>

              <p className="description">
                Find verified student apartments and safe neighborhoods in Nairobi, Juja, and Eldoret. 
                We help you transition from anxiety to confidence.
              </p>

              {/* Main Search Bar Card */}
              <div className="search-card">
                <div className="search-field">
                  <IoSearch className="field-icon"/>
                  <input 
                    type="text" 
                    placeholder="Enter University or Town" 
                    className="search-input"
                  />
                </div>

                <div className="divider" />

                <div className="dropdown-field">
                  <div className="dropdown-left">
                    <HiOutlineLocationMarker className='field-icon' />
                    <span className="dropdown-label">Select Location</span>
                  </div>
                  <MdKeyboardArrowDown className='arrow-icon'/>
                </div>

                <button className="search-button">Search</button>
              </div>

              <div className="badges-row">
                <div className="footer-badge">
                  <FaStar className="star-icon" />
                  Crowdsourced Safety Ratings
                </div>
                <div className="footer-badge">
                  <MdOutlineVerified className='verified-icon'/>
                  500+ Verified Landlords
                </div>
              </div>
            </div>

            {/* Image Display Card */}
            <div className="image-column">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80" 
                  alt="Modern student apartment building" 
                  className="main-image"
                />

                <div className="safety-badge">
                  <div className="safety-icon-box">
                    <FiShield className="safety-icon"/>
                  </div>
                  <div>
                    <p className="safety-label">Safety Score</p>
                    <p className="safety-score">9.8/10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES BENEFITS GRID */}
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Built for Student Peace of Mind</h2>
            <p className="features-subtitle">
              We solve the biggest challenges in Kenyan student housing with transparency and verification.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card standard-card">
              <div className="card-icon-wrapper badge-blue">
                <MdVerified className="card-icon text-blue" />
              </div>
              <h3 className="card-title">Verified Listings</h3>
              <p className="card-description">
                Every room is physically inspected by our team to ensure it matches the photos and descriptions.
              </p>
              <a href="#learn" className="card-link link-blue">
                Learn more <span className="arrow-span">→</span>
              </a>
            </div>

            <div className="feature-card highlighted-card">
              <div className="card-icon-wrapper badge-green">
                <FiMap className="card-icon text-white" />
              </div>
              <h3 className="card-title text-white">Safe Neighborhoods</h3>
              <p className="card-description text-light-green">
                Filter by safety scores based on student feedback and lighting, security guards, and crime data.
              </p>
              <a href="#maps" className="card-link link-white">
                View Safety Maps <span className="arrow-span">→</span>
              </a>
            </div>

            <div className="feature-card standard-card">
              <div className="card-icon-wrapper badge-gold">
                <FiUsers className="card-icon text-gold" />
              </div>
              <h3 className="card-title">Find Your Best Roommate</h3>
              <p className="card-description">
                Match with students who share your habits, values, and budget through our proprietary pairing system.
              </p>
              <a href="#match" className="card-link link-blue">
                Get Matched <span className="arrow-span">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* FEATURED LISTINGS */}
        <div className="listings-container">
          <div className="listings-header-row">
            <div className="listings-header-left">
              <h2 className="listings-title">Featured Listings</h2>
              <p className="listings-subtitle">Premium student hubs in Nairobi, Juja, and Eldoret.</p>
            </div>
            <div className="listings-slider-controls">
              <button className="slider-btn"><FiChevronLeft /></button>
              <button className="slider-btn active"><FiChevronRight /></button>
            </div>
          </div>

          <div className="listings-grid">
            {/* Card 1 */}
            <div className="listing-card">
              <div className="listing-image-wrapper">
                <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" alt="Skyline Heights" className="listing-img" />
                <span className="price-badge">KES 18,500/mo</span>
                <span className="safety-level-badge"><FiShield className="safety-level-icon"/> Safety Level: High</span>
              </div>
              <div className="listing-content">
                <div className="listing-title-row">
                  <h3 className="listing-card-title">Skyline Heights</h3>
                  <span className="verified-tag"><MdVerified className="inline-verified" /> Verified</span>
                </div>
                <p className="listing-location"><HiOutlineLocationMarker className='listing-location-icon'/> Westlands, Nairobi (Near UoN)</p>
                <hr className="listing-divider" />
                <div className="listing-amenities">
                  <span><FiWifi className="amenity-icon" /> Free WiFi</span>
                  <span><MdOutlineShower className="amenity-icon" /> Instant Shower</span>
                  <span><FiLock className="amenity-icon" /> 24/7 Security</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="listing-card">
              <div className="listing-image-wrapper">
                <img src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80" alt="Juja Commons" className="listing-img" />
                <span className="price-badge">KES 12,000/mo</span>
                <span className="safety-level-badge"><FiShield className="safety-level-icon"/> Safety Level: Best</span>
              </div>
              <div className="listing-content">
                <div className="listing-title-row">
                  <h3 className="listing-card-title">Juja Commons</h3>
                  <span className="verified-tag"><MdVerified className="inline-verified" /> Verified</span>
                </div>
                <p className="listing-location"><HiOutlineLocationMarker className='listing-location-icon'/> Juja (2 mins from JKUAT Gate A)</p>
                <hr className="listing-divider" />
                <div className="listing-amenities">
                  <span><FaBolt className="amenity-icon" /> Solar Power</span>
                  <span><FaWater className="amenity-icon" /> Borehole</span>
                  <span><MdFitnessCenter className="amenity-icon" /> Mini Gym</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="listing-card">
              <div className="listing-image-wrapper">
                <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80" alt="Elgon View Suites" className="listing-img" />
                <span className="price-badge">KES 9,500/mo</span>
                <span className="safety-level-badge"><FiShield className="safety-level-icon"/> Safety Level: Solid</span>
              </div>
              <div className="listing-content">
                <div className="listing-title-row">
                  <h3 className="listing-card-title">Elgon View Suites</h3>
                  <span className="verified-tag"><MdVerified className="inline-verified" /> Verified</span>
                </div>
                <p className="listing-location"><HiOutlineLocationMarker className='listing-location-icon'/> Eldoret (Near Moi University)</p>
                <hr className="listing-divider" />
                <div className="listing-amenities">
                  <span><MdLocalGasStation className="amenity-icon" /> Gas Included</span>
                  <span><MdLocalLaundryService className="amenity-icon" /> Laundry Area</span>
                  <span><FaBicycle className="amenity-icon" /> Bike Parking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BANNER */}
        <div className="stats-banner">
          <div className="stats-banner-wrapper">
            <div className="stat-item">
              <h2 className="stat-number">500+</h2>
              <p className="stat-label">Verified Landlords</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-number">10k+</h2>
              <p className="stat-label">Student Users</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-number">100%</h2>
              <p className="stat-label">Safety Guarantee</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-number">24h</h2>
              <p className="stat-label">Support Response</p>
            </div>
          </div>
        </div>

        {/* CTA BOX */}
        <div className="cta-container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to find your <span className="cta-highlight">Safe Haven?</span></h2>
            <p className="cta-subtitle">
              Join thousands of students who have found secure, affordable housing near campus.
            </p>
            <div className="cta-buttons-row">
              <button className="cta-btn-primary">Start Searching Now</button>
              <button className="cta-btn-secondary">Become a Landlord</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;