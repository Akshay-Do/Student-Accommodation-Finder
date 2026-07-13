import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/AdminSideBar/sidebar";
import { RiInformationLine, RiGraduationCapLine, RiComputerLine } from "react-icons/ri";
import { 
  MdOutlineWaterDrop, 
  MdOutlineShower, 
  MdOutlineLocalLaundryService, 
  MdOutlineKitchen, 
  MdOutlineBalcony, 
  MdOutlineInsertPhoto, 
  MdOutlineAddPhotoAlternate, 
  MdUploadFile 
} from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { HiOutlineBolt } from "react-icons/hi2";
import { BiCheckShield } from "react-icons/bi";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";

function AddListing({ handleLogout }) {

  const navigate = useNavigate();

  const CLOUD_NAME = "dvtwufffw"; 
  const UPLOAD_PRESET = "nestquest preset";

  const [basicInfo, setBasicInfo] = useState({
    propertyName: "",
    propertyType: "Bedsitter",
    price: "",
    location: "",
    distance: "0.5km",
    about: ""
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

  const [images, setImages] = useState([]);
  const [verificationDocs, setVerificationDocs] = useState({
    proofOfOwnership: "",
    identityDoc: ""
  });

  const [isUploading, setIsUploading] = useState(false);

  const imageInputRef = useRef(null);
  const proofInputRef = useRef(null);
  const idInputRef = useRef(null);

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

  // Reusable direct Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    // Using auto permits smooth uploading for both images and PDF documents
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
    const response = await axios.post(endpoint, formData);
    return response.data.secure_url;
  };

  // Multiple Property Images Upload Handler
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const secureUrls = await Promise.all(uploadPromises);

      // Appending up to a max limit of 4 images for the preview layout array
      setImages((prev) => [...prev, ...secureUrls].slice(0, 4));
    } catch (error) {
      alert("Failed uploading images to Cloudinary. Check your credentials.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Document Upload Handler
  const handleDocChange = async (e, fieldKey) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const secureUrl = await uploadToCloudinary(file);
      setVerificationDocs((prev) => ({ ...prev, [fieldKey]: secureUrl }));
      alert("Document verified and attached successfully!");
    } catch (error) {
      alert("Failed uploading verification document.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Submitting collected layout to Express Endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Please upload at least 3 property photos (Interior, Exterior, Bathroom) before submitting.");
      return;
    }

    const listingPayload = {
      basicInfo,
      amenities,
      safety,
      images,
      verificationDocuments: verificationDocs
    };

    try {
      // Connecting to the backend running server on port 4000
      const response = await axios.post("http://localhost:4000/api/properties", listingPayload);
      if (response.data.success) {
        alert("Property Listing successfully submitted for admin verification!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Connection refused by the host API server.");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-layout-container">
        <Sidebar handleLogout={handleLogout}/>

        <div className="form-workspace-scrollbox">
          <div className="form-content-container">
            <header className="page-heading-block">
              <h1 className="page-main-title">Add New Property</h1>
              <p className="page-subtitle-desc">
                Create a high-quality listing to attract reliable university students. All listings are reviewed for safety.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="exact-wizard-form">
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
                    <label className="field-element-label">Area / Neighborhood</label>
                    <input 
                      type="text" 
                      name="location" 
                      placeholder="e.g. Juja, Thika, Near USIU campus" 
                      value={basicInfo.location}
                      onChange={handleInputChange}
                      className="field-text-box"
                      required
                    />
                  </div>

                  <div className="input-field-wrapper">
                    <label className="field-element-label">Distance to University</label>
                    <div className="select-dropdown-wrapper">
                      <select 
                        name="distance" 
                        value={basicInfo.distance}
                        onChange={handleInputChange}
                        className="field-select-box"
                      >
                        <option value="0.5km">0.5km</option>
                        <option value="1.0km">1.0km</option>
                        <option value="1.5km">1.5km</option>
                        <option value="2.0km">2.0km</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-field-wrapper full-width-cell">
                    <label className="field-element-label">About Housing and Detailed Directions</label>
                    <textarea 
                      name="about" 
                      rows="3"
                      placeholder="Describe the property and exactly how to find the property from the university landmark..." 
                      value={basicInfo.about}
                      onChange={handleInputChange}
                      className="field-textarea-box"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

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

              {/* Safety Features */}
              <div className="wizard-form-card safety-card-container">
                <div className="card-header-row">
                  <div className="icon-badge-box orange-theme">
                    <BiCheckShield />
                  </div>
                  <h2 className="card-header-title">Safety Features</h2>
                </div>

                <div className="safety-info-banner">
                  <span className="banner-shield-icon"><PiShieldCheckeredFill /></span>
                  <p className="banner-message-text">
                    Providing accurate safety information builds trust with students and guardians. Verified safety features are highlighted on your profile.
                  </p>
                </div>

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

              {/* Property Media */}
              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box primary-theme">
                    <MdOutlineInsertPhoto />
                  </div>
                  <h2 className="card-header-title">Property Media</h2>
                </div>

                <div className="dashed-upload-dropzone" onClick={() => !isUploading && imageInputRef.current.click()}>
                  <div className="cloud-icon-circle">
                    <AiOutlineCloudUpload />
                  </div>
                  <h3 className="upload-main-title-text">{isUploading ? "Uploading assets to Cloudinary..." : "Click to Upload Property Photos"}</h3>
                  <p className="upload-constraints-text">Support for JPG, PNG. Max size 5MB per image.</p>
                  <p className="upload-constraints-text">Minimum 3 photos required (Interior, Exterior, Bathroom).</p>

                  <input 
                    type="file"
                    multiple
                    accept="image/*"
                    ref={imageInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    disabled={isUploading}
                  />
                  <button type="button" className="browse-files-button-pill" disabled={isUploading}>Browse Files</button>
                </div>

                <div className="media-preview-thumbnails-row">
                  {images.map((url, idx) => (
                    <div key={idx} className="uploaded-thumbnail-box image-filled">
                      <img src={url} alt={`Property view ${idx + 1}`} />
                    </div>
                  ))}
                  
                  {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, i) => (
                    <div key={i} className="uploaded-thumbnail-box structural-placeholder">
                      <span className="camera-placeholder-icon"><MdOutlineAddPhotoAlternate /></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Documents */}
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
                    <p className="doc-subtext-description">
                      {verificationDocs.proofOfOwnership ? "Uploaded Securely" : "Title deed, Lease, or Utility Bill"}
                    </p>
                    <input 
                      type="file" 
                      accept=".pdf,image/*" 
                      ref={proofInputRef} 
                      style={{ display: "none" }} 
                      onChange={(e) => handleDocChange(e, "proofOfOwnership")}
                    />
                    <button type="button" className="document-outline-select-btn" onClick={() => proofInputRef.current.click()} disabled={isUploading}>
                      <span className="doc-btn-icon"><MdUploadFile /></span> Choose Document
                    </button>
                  </div>

                  <div className="document-action-card">
                    <div className="doc-meta-heading-row">
                      <h4 className="doc-type-title">ID / Business Registration</h4>
                    </div>
                    <p className="doc-subtext-description">
                      {verificationDocs.identityDoc ? "Uploaded Securely" : "KRA PIN or National ID Copy"}
                    </p>
                    <input 
                      type="file" 
                      accept=".pdf,image/*" 
                      ref={idInputRef} 
                      style={{ display: "none" }} 
                      onChange={(e) => handleDocChange(e, "identityDoc")}
                    />
                    <button type="button" className="document-outline-select-btn" onClick={() => idInputRef.current.click()} disabled={isUploading}>
                      <span className="doc-btn-icon"><MdUploadFile /></span> Choose Document
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Submit button and unsave changes buttons */}
              <div className="wizard-form-card form-submit-action">
                <button type="button" className="form-unsave-action-button">Unsave changes</button>
                <button type="submit" className="form-submit-action-button" disabled={isUploading}>
                  {isUploading ? "Uploading Listing" : "Submit Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddListing;