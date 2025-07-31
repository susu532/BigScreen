import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import api from '../api/api';
import { useNotification } from '../components/NotificationProvider';
import '../radiant.css';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

// State for chart data
const defaultPie = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
const defaultRadar = { labels: [], datasets: [{ label: '', data: [], backgroundColor: '', borderColor: '', pointBackgroundColor: '' }] };

/**
 * Admin dashboard page with survey statistics
 */
const AdminDashboard: React.FC = () => {
  const [pieDataQ6, setPieDataQ6] = useState(defaultPie);
  const [pieDataQ7, setPieDataQ7] = useState(defaultPie);
  const [pieDataQ10, setPieDataQ10] = useState(defaultPie);
  const [radarData, setRadarData] = useState(defaultRadar);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/admin/statistics')
      .then((res: any) => {
        setPieDataQ6(res.data.pieDataQ6);
        setPieDataQ7(res.data.pieDataQ7);
        setPieDataQ10(res.data.pieDataQ10);
        setRadarData(res.data.radarData);
        notify('Statistics loaded!', 'success');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load statistics');
        notify('Failed to load statistics', 'error');
        setLoading(false);
      });
  }, [notify]);

  if (loading) {
    return <div className="radiant-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: 22 }}>Loading statistics...</div>;
  }
  if (error) {
    return <div className="radiant-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: 22 }}>{error}</div>;
  }
  return (
    <div className="radiant-bg" style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ marginLeft: 220, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '24px 32px 0 0' }}>
          <Link to="/admin/login" className="radiant-link">Logout</Link>
        </div>
        <div className="admin-card radiant-glass" style={{ maxWidth: 1200, margin: '0 auto', padding: 32, marginTop: 24, marginBottom: 24 }}>
          <h1 className="radiant-title" style={{ marginBottom: 32 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 48, justifyContent: 'center' }}>
            <div className="card radiant-glass" style={{ flex: 1, minWidth: 300, margin: 8, padding: 18 }}>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: 12 }}>VR Headset Usage (Q6)</h3>
              <Pie data={pieDataQ6} />
            </div>
            <div className="card radiant-glass" style={{ flex: 1, minWidth: 300, margin: 8, padding: 18 }}>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: 12 }}>VR App Store (Q7)</h3>
              <Pie data={pieDataQ7} />
            </div>
            <div className="card radiant-glass" style={{ flex: 1, minWidth: 300, margin: 8, padding: 18 }}>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: 12 }}>Main Usage (Q10)</h3>
              <Pie data={pieDataQ10} />
            </div>
          </div>
          <div className="card radiant-glass" style={{ maxWidth: 600, margin: '0 auto', padding: 18 }}>
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: 12 }}>Quality Scores (Q11–Q15)</h3>
            <Radar data={radarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
