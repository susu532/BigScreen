import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Sidebar navigation for the admin area
 */
const AdminSidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside style={{ width: 220, background: '#222', color: '#fff', minHeight: '100vh', padding: '32px 0', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <img src="/logo192.png" alt="Bigscreen Logo" style={{ width: 60, marginBottom: 12 }} />
        <div style={{ fontWeight: 700, fontSize: 22 }}>Bigscreen Admin</div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Link to="/admin/dashboard" style={{ color: location.pathname === '/admin/dashboard' ? '#fbc02d' : '#fff', textDecoration: 'none', fontWeight: 500, padding: '10px 24px', borderRadius: 6, background: location.pathname === '/admin/dashboard' ? '#333' : 'none' }}>Dashboard</Link>
        <Link to="/admin/questions" style={{ color: location.pathname === '/admin/questions' ? '#fbc02d' : '#fff', textDecoration: 'none', fontWeight: 500, padding: '10px 24px', borderRadius: 6, background: location.pathname === '/admin/questions' ? '#333' : 'none' }}>Questions</Link>
        <Link to="/admin/answers" style={{ color: location.pathname === '/admin/answers' ? '#fbc02d' : '#fff', textDecoration: 'none', fontWeight: 500, padding: '10px 24px', borderRadius: 6, background: location.pathname === '/admin/answers' ? '#333' : 'none' }}>Answers</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
