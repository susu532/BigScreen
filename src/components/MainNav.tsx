import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main navigation bar for the application
 */
const MainNav: React.FC = () => {
  const location = useLocation();
  return (
    <nav
      style={{
        background: 'linear-gradient(90deg, #e040fb 0%, #ff4081 100%)',
        padding: '14px 0',
        marginBottom: 36,
        boxShadow: '0 4px 24px 0 rgba(224,64,251,0.10)',
        borderRadius: '0 0 22px 22px',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          style={{
            color: '#fff',
            fontWeight: 900,
            fontSize: 24,
            textDecoration: 'none',
            marginRight: 36,
            letterSpacing: '-1px',
            textShadow: '0 2px 8px #e040fb88',
          }}
        >
          Bigscreen Survey
        </Link>
        <div style={{ display: 'flex', gap: 18 }}>
          <Link
            to="/"
            style={{
              color: location.pathname === '/' ? '#fff' : '#f8bbd0',
              background: location.pathname === '/' ? 'rgba(255,255,255,0.12)' : 'none',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '8px 22px',
              borderRadius: 12,
              transition: 'background 0.2s',
            }}
          >
            Survey
          </Link>
          <Link
            to="/admin/login"
            style={{
              color: location.pathname.startsWith('/admin') ? '#fff' : '#f8bbd0',
              background: location.pathname.startsWith('/admin') ? 'rgba(255,255,255,0.12)' : 'none',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '8px 22px',
              borderRadius: 12,
              transition: 'background 0.2s',
            }}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
