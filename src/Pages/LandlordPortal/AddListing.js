import React, { useState } from "react";
import Sidebar from "../../Components/AdminSideBar/sidebar";
import { RiInformationLine, RiGraduationCapLine, RiComputerLine } from "react-icons/ri";
import { MdOutlineWaterDrop, 
  MdOutlineShower, 
  MdOutlineLocalLaundryService, 
  MdOutlineKitchen, MdOutlineBalcony, MdOutlineInsertPhoto, MdOutlineAddPhotoAlternate, MdUploadFile } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { HiOutlineBolt } from "react-icons/hi2";
import { BiCheckShield } from "react-icons/bi";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";


function AddListing() {
  // Form input states matching the screenshot specifications
  const [basicInfo, setBasicInfo] = useState({
    propertyName: "",
    propertyType: "Bedsitter",
    price: "",
    location: "Main Gate (0.5km)",
    address: ""
  });

  const [amenities, setAmenities] = useState({
    wifi: false,
    water: false,
    generator: false,
    shower: false,
    laundry: false,
    kitchenette: false,
    desk: false,
    balcony: false
  });

  const [safety, setSafety] = useState({
    cctv: false,
    gated: false,
    guard: false,
    lighting: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSafety = (key) => {
    setSafety((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { basicInfo, amenities, safety });
    alert("Listing submitted successfully!");
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-layout-container">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Scrollable Main Content Workspace */}
        <div className="form-workspace-scrollbox">
          <div className="form-content-container">
            
            {/* Top Heading Group */}
            <header className="page-heading-block">
              <h1 className="page-main-title">Add New Property</h1>
              <p className="page-subtitle-desc">
                Create a high-quality listing to attract reliable university students. All listings are reviewed for safety.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="exact-wizard-form">
              {/* Card 1: Basic Information */}
              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box blue-theme">
                    <RiInformationLine />
                  </div>
                  <h2 className="card-header-title">Basic Information</h2>
                </div>

                <div className="card-fields-grid">
                  <div className="input-field-wrapper">
                    <label className="field-element-label">Property Name</label>
                    <input 
                      type="text" 
                      name="propertyName" 
                      placeholder="e.g. Sunshine Heights" 
                      value={basicInfo.propertyName}
                      onChange={handleInputChange}
                      className="field-text-box"
                      required
                    />
                  </div>

                  <div className="input-field-wrapper">
                    <label className="field-element-label">Property Type</label>
                    <div className="select-dropdown-wrapper">
                      <select 
                        name="propertyType" 
                        value={basicInfo.propertyType}
                        onChange={handleInputChange}
                        className="field-select-box"
                      >
                        <option value="Bedsitter">Bedsitter</option>
                        <option value="Single Room">Single Room</option>
                        <option value="1 Bedroom">1 Bedroom</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-field-wrapper">
                    <label className="field-element-label">Monthly Rent (KES)</label>
                    <div className="prefix-input-container">
                      <span className="input-prefix-label">KES</span>
                      <input 
                        type="number" 
                        name="price" 
                        placeholder="12,000" 
                        value={basicInfo.price}
                        onChange={handleInputChange}
                        className="field-text-box prefixed"
                        required
                      />
                    </div>
                  </div>

                  <div className="input-field-wrapper">
                    <label className="field-element-label">Location (Near University Gate)</label>
                    <div className="select-dropdown-wrapper">
                      <select 
                        name="location" 
                        value={basicInfo.location}
                        onChange={handleInputChange}
                        className="field-select-box"
                      >
                        <option value="Main Gate (0.5km)">Main Gate (0.5km)</option>
                        <option value="Gate A (1.0km)">Gate A (1.0km)</option>
                        <option value="Gate B (1.2km)">Gate B (1.2km)</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-field-wrapper full-width-cell">
                    <label className="field-element-label">Full Address / Detailed Directions</label>
                    <textarea 
                      name="address" 
                      rows="3"
                      placeholder="Describe exactly how to find the property from the university landmark..." 
                      value={basicInfo.address}
                      onChange={handleInputChange}
                      className="field-textarea-box"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Card 2: Student Essentials & Amenities */}
              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box purple-theme">
                    <RiGraduationCapLine />
                  </div>
                  <h2 className="card-header-title">Student Essentials & Amenities</h2>
                </div>

                <div className="amenities-split-columns">
                  {/* Utilities Column */}
                  <div className="amenity-list-column">
                    <h3 className="column-group-caption">UTILITIES</h3>
                    
                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.wifi} onChange={() => toggleAmenity("wifi")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><FaWifi /></span> Free WiFi Included
                      </span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.water} onChange={() => toggleAmenity("water")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><MdOutlineWaterDrop /></span> 24/7 Water Supply
                      </span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.generator} onChange={() => toggleAmenity("generator")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><HiOutlineBolt /></span> Backup Power Generator
                      </span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.shower} onChange={() => toggleAmenity("shower")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><MdOutlineShower /></span> Instant Hot Shower
                      </span>
                    </label>
                  </div>

                  {/* Facilities Column */}
                  <div className="amenity-list-column">
                    <h3 className="column-group-caption">FACILITIES</h3>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.laundry} onChange={() => toggleAmenity("laundry")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><MdOutlineLocalLaundryService /></span> Shared Laundry Room
                      </span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.kitchenette} onChange={() => toggleAmenity("kitchenette")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><MdOutlineKitchen /></span> Kitchenette Space
                      </span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.desk} onChange={() => toggleAmenity("desk")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><RiComputerLine /></span> Study Desk Provided
                      </span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.balcony} onChange={() => toggleAmenity("balcony")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row">
                        <span className="ui-inline-icon"><MdOutlineBalcony /></span> Private Balcony
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Card 3: Safety Features */}
              <div className="wizard-form-card safety-card-container">
                <div className="card-header-row">
                  <div className="icon-badge-box orange-theme">
                    <BiCheckShield />
                  </div>
                  <h2 className="card-header-title">Safety Features</h2>
                </div>

                {/* Info Callout Banner */}
                <div className="safety-info-banner">
                  <span className="banner-shield-icon"><PiShieldCheckeredFill /></span>
                  <p className="banner-message-text">
                    Providing accurate safety information builds trust with students and guardians. Verified safety features are highlighted on your profile.
                  </p>
                </div>

                {/* Safety Blocks Grid */}
                <div className="safety-blocks-grid">
                  <div className={`safety-option-tile ${safety.cctv ? 'active' : ''}`} onClick={() => toggleSafety("cctv")}>
                    <input type="checkbox" checked={safety.cctv} readOnly className="tile-native-checkbox" />
                    <span className="tile-custom-box"></span>
                    <div className="tile-text-content">
                      <h4 className="tile-title-header">CCTV Surveillance</h4>
                      <p className="tile-desc-para">Active 24/7 in common areas</p>
                    </div>
                  </div>

                  <div className={`safety-option-tile ${safety.gated ? 'active' : ''}`} onClick={() => toggleSafety("gated")}>
                    <input type="checkbox" checked={safety.gated} readOnly className="tile-native-checkbox" />
                    <span className="tile-custom-box"></span>
                    <div className="tile-text-content">
                      <h4 className="tile-title-header">Gated Community</h4>
                      <p className="tile-desc-para">Secure perimeter with controlled access</p>
                    </div>
                  </div>

                  <div className={`safety-option-tile ${safety.guard ? 'active' : ''}`} onClick={() => toggleSafety("guard")}>
                    <input type="checkbox" checked={safety.guard} readOnly className="tile-native-checkbox" />
                    <span className="tile-custom-box"></span>
                    <div className="tile-text-content">
                      <h4 className="tile-title-header">Security Guard</h4>
                      <p className="tile-desc-para">Uniformed guard present at night/day</p>
                    </div>
                  </div>

                  <div className={`safety-option-tile ${safety.lighting ? 'active' : ''}`} onClick={() => toggleSafety("lighting")}>
                    <input type="checkbox" checked={safety.lighting} readOnly className="tile-native-checkbox" />
                    <span className="tile-custom-box"></span>
                    <div className="tile-text-content">
                      <h4 className="tile-title-header">Well-lit Paths</h4>
                      <p className="tile-desc-para">Adequate lighting from gate to room</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Property Media */}
              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box primary-theme">
                    <MdOutlineInsertPhoto />
                  </div>
                  <h2 className="card-header-title">Property Media</h2>
                </div>

                {/* Dropzone Upload Layout */}
                <div className="dashed-upload-dropzone">
                  <div className="cloud-icon-circle">
                    <AiOutlineCloudUpload />
                  </div>
                  <h3 className="upload-main-title-text">Drag & Drop Property Photos</h3>
                  <p className="upload-constraints-text">Support for JPG, PNG. Max size 5MB per image.</p>
                  <p className="upload-constraints-text">Minimum 3 photos required (Interior, Exterior, Bathroom).</p>
                  <button type="button" className="browse-files-button-pill">Browse Files</button>
                </div>

                {/* Media Thumbnails Row Layout */}
                <div className="media-preview-thumbnails-row">
                  <div className="uploaded-thumbnail-box image-filled">
                    <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=150&q=80" alt="Interior View" />
                  </div>
                  <div className="uploaded-thumbnail-box image-filled">
                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80" alt="Exterior View" />
                  </div>
                  <div className="uploaded-thumbnail-box structural-placeholder">
                    <span className="camera-placeholder-icon"><MdOutlineAddPhotoAlternate /></span>
                  </div>
                  <div className="uploaded-thumbnail-box structural-placeholder">
                    <span className="camera-placeholder-icon"><MdOutlineAddPhotoAlternate /></span>
                  </div>
                </div>
              </div>

              {/* Card 5: Verification Documents */}
              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box blue-theme">
                    <IoDocumentTextOutline />
                  </div>
                  <h2 className="card-header-title">Verification Documents</h2>
                </div>
                <p className="verification-section-disclaimer">
                  These documents are used strictly for internal verification and will not be visible to students.
                </p>

                <div className="document-upload-twin-grid">
                  <div className="document-action-card">
                    <div className="doc-meta-heading-row">
                      <h4 className="doc-type-title">Proof of Ownership</h4>
                    </div>
                    <p className="doc-subtext-description">Title deed, Lease, or Utility Bill</p>
                    <button type="button" className="document-outline-select-btn">
                      <span className="doc-btn-icon"><MdUploadFile /></span> Choose Document
                    </button>
                  </div>

                  <div className="document-action-card">
                    <div className="doc-meta-heading-row">
                      <h4 className="doc-type-title">ID / Business Registration</h4>
                    </div>
                    <p className="doc-subtext-description">KRA PIN or National ID Copy</p>
                    <button type="button" className="document-outline-select-btn">
                      <span className="doc-btn-icon"><MdUploadFile /></span> Choose Document
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* Submit button and unsave changes buttons */}
            <div className="wizard-form-card form-submit-action">
              <button className="form-unsave-action-button">Unsave changes</button>
              <button type="submit" onClick={handleSubmit} className="form-submit-action-button">
                Submit Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddListing;
