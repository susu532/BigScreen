import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../radiant.css';

/**
 * Sidebar navigation for the admin area
 */
const AdminSidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="radiant-sidebar" style={{ width: 240, minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, #e040fb 0%, #ff4081 100%)', color: '#fff', boxShadow: 'var(--shadow)', borderRadius: '0 32px 32px 0', padding: '38px 0', backdropFilter: 'blur(10px)' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <img src="/logo192.png" alt="Bigscreen Logo" style={{ width: 70, marginBottom: 16, filter: 'drop-shadow(0 2px 12px #e040fb88)' }} />
        <div style={{ fontWeight: 900, fontSize: 26, letterSpacing: '-1px', textShadow: '0 2px 8px #ff408188' }}>Bigscreen Admin</div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%', alignItems: 'center' }}>
        <Link
          to="/admin/dashboard"
          className="radiant-link"
          style={{
            color: location.pathname === '/admin/dashboard' ? '#fff' : '#f8bbd0',
            background: location.pathname === '/admin/dashboard' ? 'rgba(255,255,255,0.18)' : 'none',
            fontWeight: 700,
            padding: '12px 32px',
            borderRadius: 14,
            fontSize: 18,
            width: 180,
            textAlign: 'center',
            transition: 'background 0.2s',
            textDecoration: 'none',
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/questions"
          className="radiant-link"
          style={{
            color: location.pathname === '/admin/questions' ? '#fff' : '#f8bbd0',
            background: location.pathname === '/admin/questions' ? 'rgba(255,255,255,0.18)' : 'none',
            fontWeight: 700,
            padding: '12px 32px',
            borderRadius: 14,
            fontSize: 18,
            width: 180,
            textAlign: 'center',
            transition: 'background 0.2s',
            textDecoration: 'none',
          }}
        >
          Questions
        </Link>
        <Link
          to="/admin/answers"
          className="radiant-link"
          style={{
            color: location.pathname === '/admin/answers' ? '#fff' : '#f8bbd0',
            background: location.pathname === '/admin/answers' ? 'rgba(255,255,255,0.18)' : 'none',
            fontWeight: 700,
            padding: '12px 32px',
            borderRadius: 14,
            fontSize: 18,
            width: 180,
            textAlign: 'center',
            transition: 'background 0.2s',
            textDecoration: 'none',
          }}
        >
          Answers
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
