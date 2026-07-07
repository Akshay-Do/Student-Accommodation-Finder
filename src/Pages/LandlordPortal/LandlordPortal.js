import React from "react";
import { FaArrowTrendUp, FaRegMoneyBill1, FaRegEyeSlash, FaArrowRight, FaHouseChimney, } from "react-icons/fa6";
import { TbMessage, TbLayoutDashboard} from "react-icons/tb";
import { IoEyeOutline, IoReload} from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";
import { FiClipboard } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { LuShieldCheck } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { GoSignOut } from "react-icons/go";


const propertiesData = [
  {
    id: 1,
    name: "Pine Breeze Apartments",
    location: "Near Juja Campus",
    price: "15,500 KES",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: 2,
    name: "Green Valley Studio",
    location: "Madaraka Estate",
    price: "12,000 KES",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: 3,
    name: "Skyline Heights",
    location: "Roysambu",
    price: "18,000 KES",
    status: "Inactive",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=80&q=80"
  }
];

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

function LandlordDashboard() {
  return (
    <div className="dashboard-root">
      <div className="dashboard-layout-container">
        {/* Left Hand Sidebar Navigation Panel */}
        <aside className="portal-sidebar">
          <div className="sidebar-top-branding">
            <span className="sidebar-brand-subtitle">Landlord Portal</span>
          </div>

          <nav className="sidebar-navigation">
            <a href="#dashboard" className="sidebar-nav-item active">
              <TbLayoutDashboard className="nav-icon" />
              Dashboard
            </a>
            <a href="#listings" className="sidebar-nav-item">
              <FiClipboard className="nav-icon" />
              My Listings
            </a>
            <a href="#inquiries" className="sidebar-nav-item label-dot-wrapper">
              <AiOutlineMessage className="nav-icon" />
              Student Inquiries
              <span className="notification-red-dot"></span>
            </a>
            <a href="#verification" className="sidebar-nav-item">
              <LuShieldCheck className="nav-icon" />
              Verification Status
            </a>

            <hr className="sidebar-menu-divider" />

            <a href="#settings" className="sidebar-nav-item text-secondary">
              <IoMdSettings className="nav-icon" />
              Settings
            </a>
            <a href="#logout" className="sidebar-nav-item text-danger">
              <GoSignOut className="nav-icon" />
              Sign Out
            </a>
          </nav>

          <div className="sidebar-profile-footer-box">
            <div className="profile-avatar-circle">JK</div>
            <div className="profile-identity-details">
              <p className="profile-user-fullname">John Kamau</p>
              <span className="profile-badge-pill-verified"><GiCheckMark /> VERIFIED</span>
            </div>
          </div>
        </aside>

        {/* Right Hand Dynamic Content Frame Workspace */}
        <main className="portal-content-workspace">
          
          {/* Top Welcome Banner & Action Row */}
          <div className="workspace-header-row">
            <div className="header-greeting-block">
              <h2 className="welcome-heading-text">Welcome</h2>
              <p className="welcome-subtitle-text">Manage your properties and stay updated on student inquiries.</p>
            </div>
            <button className="add-listing-action-btn">
              <span className="plus-sign">+</span> Add New Listing
            </button>
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
                <a href="#view-all-listings" className="panel-deck-action-link">View All</a>
              </div>

              <div className="table-responsive-container">
                <table className="listings-portal-table">
                  <thead>
                    <tr>
                      <th>PROPERTY</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                      <th className="text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertiesData.map((prop) => (
                      <tr key={prop.id}>
                        <td>
                          <div className="table-cell-property-block">
                            <img src={prop.img} alt={prop.name} className="property-thumbnail-img" />
                            <div className="property-cell-meta">
                              <p className="property-cell-title">{prop.name}</p>
                              <span className="property-cell-loc">{prop.location}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="property-cell-price-block">
                            <p className="price-bold-text">{prop.price}</p>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge-pill ${prop.status.toLowerCase()}`}>
                            {prop.status === "Verified" && <GiCheckMark />}
                            {prop.status === "Pending" && <IoReload />}
                            {prop.status === "Inactive" && <FaRegEyeSlash />}
                            {prop.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="table-row-menu-dots">⋮</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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