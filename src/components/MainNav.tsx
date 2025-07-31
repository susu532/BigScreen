import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main navigation bar for the application
 */
const MainNav: React.FC = () => {
  const location = useLocation();
  return (
    <nav style={{ background: '#1976d2', padding: '12px 0', marginBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 700, fontSize: 20, textDecoration: 'none', marginRight: 32 }}>
          Bigscreen Survey
        </Link>
        <Link to="/" style={{ color: location.pathname === '/' ? '#fbc02d' : '#fff', textDecoration: 'none', fontWeight: 500 }}>Survey</Link>
        <Link to="/admin/login" style={{ color: location.pathname.startsWith('/admin') ? '#fbc02d' : '#fff', textDecoration: 'none', fontWeight: 500 }}>Admin</Link>
      </div>
    </nav>
  );
};

export default MainNav;
