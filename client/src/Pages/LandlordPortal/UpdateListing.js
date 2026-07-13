import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function UpdateListing({ handleLogout }) {
  const navigate = useNavigate();
  const { id } = useParams(); // 2. Destructure the property ID from the URL path

  const CLOUD_NAME = "dvtwufffw"; 
  const UPLOAD_PRESET = "nestquest preset";

  // Form input states 
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
  const [isPageLoading, setIsPageLoading] = useState(true); 

  const imageInputRef = useRef(null);
  const proofInputRef = useRef(null);
  const idInputRef = useRef(null);

  // Fetching the existing property details when the page loads
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
        if (response.data.success) {
          const property = response.data.data;
          
          // Updating the form states with existing database data
          setBasicInfo({
            propertyName: property.propertyName || "",
            propertyType: property.propertyType || "Bedsitter",
            price: property.price || "",
            location: property.location || "",
            distance: property.distance || "0.5km",
            about: property.about || ""
          });

          if (property.amenities) setAmenities(property.amenities);
          if (property.safety) setSafety(property.safety);
          if (property.images) setImages(property.images);
          if (property.verificationDocuments) setVerificationDocs(property.verificationDocuments);
        }
      } catch (error) {
        console.error("Error loading property data:", error);
        alert("Failed to retrieve property details. Returning to dashboard.");
        navigate("/dashboard");
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchPropertyData();
  }, [id, navigate]);

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

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
    const response = await axios.post(endpoint, formData);
    return response.data.secure_url;
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const secureUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...secureUrls].slice(0, 4));
    } catch (error) {
      alert("Failed uploading images to Cloudinary.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocChange = async (e, fieldKey) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const secureUrl = await uploadToCloudinary(file);
      setVerificationDocs((prev) => ({ ...prev, [fieldKey]: secureUrl }));
      alert("Document updated successfully!");
    } catch (error) {
      alert("Failed updating verification document.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Submitting updated configuration to the express PUT endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Please upload at least 3 property photos before saving changes.");
      return;
    }

    const updatedPayload = {
      basicInfo: {
        propertyName: basicInfo.propertyName,
        propertyType: basicInfo.propertyType,
        price: basicInfo.price,
        location: basicInfo.location,
        distance: basicInfo.distance,
        about: basicInfo.about
      },
      amenities,
      safety,
      images,
      verificationDocuments: verificationDocs
    };

    try {
      // Appending the target ID context
      const response = await axios.put(`http://localhost:4000/api/properties/${id}`, updatedPayload);
      if (response.data.success) {
        alert("Property Listing successfully updated!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to update property records.");
      console.error(error);
    }
  };

  // Rendering basic placeholder while data resolves from API
  if (isPageLoading) {
    return (
      <div className="dashboard-root" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Loading Property Information...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      <div className="dashboard-layout-container">
        <Sidebar handleLogout={handleLogout}/>

        <div className="form-workspace-scrollbox">
          <div className="form-content-container">
            
            <header className="page-heading-block">
              <h1 className="page-main-title">Update Property Listing</h1>
              <p className="page-subtitle-desc">
                Modify your property specifications below. Changes will re-enter the queue for security verification.
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
                      placeholder="Describe the property and directions..." 
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
                  <div className="amenity-list-column">
                    <h3 className="column-group-caption">UTILITIES</h3>
                    
                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.wifi} onChange={() => toggleAmenity("wifi")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><FaWifi /></span> Free WiFi Included</span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.water} onChange={() => toggleAmenity("water")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><MdOutlineWaterDrop /></span> 24/7 Water Supply</span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.generator} onChange={() => toggleAmenity("generator")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><HiOutlineBolt /></span> Backup Power Generator</span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.shower} onChange={() => toggleAmenity("shower")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><MdOutlineShower /></span> Instant Hot Shower</span>
                    </label>
                  </div>

                  <div className="amenity-list-column">
                    <h3 className="column-group-caption">FACILITIES</h3>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.laundry} onChange={() => toggleAmenity("laundry")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><MdOutlineLocalLaundryService /></span> Shared Laundry Room</span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.kitchenette} onChange={() => toggleAmenity("kitchenette")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><MdOutlineKitchen /></span> Kitchenette Space</span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.desk} onChange={() => toggleAmenity("desk")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><RiComputerLine /></span> Study Desk Provided</span>
                    </label>

                    <label className="checkbox-row-label">
                      <input type="checkbox" checked={amenities.balcony} onChange={() => toggleAmenity("balcony")} className="native-checkbox-input" />
                      <span className="custom-checkbox-box"></span>
                      <span className="amenity-icon-text-row"><span className="ui-inline-icon"><MdOutlineBalcony /></span> Private Balcony</span>
                    </label>
                  </div>
                </div>
              </div>

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
                    Verified safety metrics remain required during alterations.
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
                      <p className="tile-desc-para">Controlled baseline entry</p>
                    </div>
                  </div>

                  <div className={`safety-option-tile ${safety.guard ? 'active' : ''}`} onClick={() => toggleSafety("guard")}>
                    <input type="checkbox" checked={safety.guard} readOnly className="tile-native-checkbox" />
                    <span className="tile-custom-box"></span>
                    <div className="tile-text-content">
                      <h4 className="tile-title-header">Security Guard</h4>
                      <p className="tile-desc-para">Uniformed personnel layout</p>
                    </div>
                  </div>

                  <div className={`safety-option-tile ${safety.lighting ? 'active' : ''}`} onClick={() => toggleSafety("lighting")}>
                    <input type="checkbox" checked={safety.lighting} readOnly className="tile-native-checkbox" />
                    <span className="tile-custom-box"></span>
                    <div className="tile-text-content">
                      <h4 className="tile-title-header">Well-lit Paths</h4>
                      <p className="tile-desc-para">Adequate pathway light layouts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box primary-theme">
                    <MdOutlineInsertPhoto />
                  </div>
                  <h2 className="card-header-title">Property Media</h2>
                </div>

                <div className="dashed-upload-dropzone" onClick={() => !isUploading && imageInputRef.current.click()}>
                  <div className="cloud-icon-circle"><AiOutlineCloudUpload /></div>
                  <h3 className="upload-main-title-text">{isUploading ? "Uploading to Cloudinary..." : "Click to Add More Photos"}</h3>
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
                    <div key={idx} className="uploaded-thumbnail-box image-filled" style={{ position: 'relative' }}>
                      <img src={url} alt={`View ${idx + 1}`} />
                      {/* Optional Remove button context could be implemented here */}
                    </div>
                  ))}
                  
                  {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, i) => (
                    <div key={i} className="uploaded-thumbnail-box structural-placeholder">
                      <span className="camera-placeholder-icon"><MdOutlineAddPhotoAlternate /></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wizard-form-card">
                <div className="card-header-row">
                  <div className="icon-badge-box blue-theme">
                    <IoDocumentTextOutline />
                  </div>
                  <h2 className="card-header-title">Verification Documents</h2>
                </div>

                <div className="document-upload-twin-grid">
                  <div className="document-action-card">
                    <h4 className="doc-type-title">Proof of Ownership</h4>
                    <p className="doc-subtext-description">
                      {verificationDocs.proofOfOwnership ? (
                        <>
                          <MdUploadFile /> Asset Attached (Click to Replace)
                        </>
                      ) : "Title deed, Lease, or Utility Bill"}
                    </p>
                    <input type="file" accept=".pdf,image/*" ref={proofInputRef} style={{ display: "none" }} onChange={(e) => handleDocChange(e, "proofOfOwnership")} />
                    <button type="button" className="document-outline-select-btn" onClick={() => proofInputRef.current.click()} disabled={isUploading}>Choose Document</button>
                  </div>

                  <div className="document-action-card">
                    <h4 className="doc-type-title">ID / Business Registration</h4>
                    <p className="doc-subtext-description">
                      {verificationDocs.identityDoc ? (
                        <>
                          <MdUploadFile /> Asset Attached (Click to Replace)
                        </>
                      ) : "KRA PIN or National ID Copy"}
                    </p>
                    <input type="file" accept=".pdf,image/*" ref={idInputRef} style={{ display: "none" }} onChange={(e) => handleDocChange(e, "identityDoc")} />
                    <button type="button" className="document-outline-select-btn" onClick={() => idInputRef.current.click()} disabled={isUploading}>Choose Document</button>
                  </div>
                </div>
              </div>

              <div className="wizard-form-card form-submit-action">
                <button type="button" className="form-unsave-action-button" onClick={() => navigate("/dashboard")}>Cancel Changes</button>
                <button type="submit" className="form-submit-action-button" disabled={isUploading}>
                  {isUploading ? "Processing..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateListing;