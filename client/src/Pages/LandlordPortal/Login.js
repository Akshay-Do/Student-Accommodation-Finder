import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simulating backend verification checks
    if (email && password) {
      onLoginSuccess();
    }
  };

  return (
    <div className="login-page-root" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div className="login-card-container" style={{ padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '12px', background: '#fff', textAlign: 'center', width: '360px' }}>
        <h2 style={{ marginBottom: '10px', color: '#111827', fontWeight: '700' }}>Landlord Portal</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Log in to manage your student housing properties.</p>
        
        <form onSubmit={handleFormSubmit}>
          <input 
            type="email" 
            placeholder="Landlord Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '12px', marginBottom: '14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ width: '100%', padding: '12px', marginBottom: '24px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#003f87', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Verify & Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;