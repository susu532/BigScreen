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
      .then(res => {
        setPieDataQ6(res.data.pieDataQ6);
        setPieDataQ7(res.data.pieDataQ7);
        setPieDataQ10(res.data.pieDataQ10);
        setRadarData(res.data.radarData);
        notify('Statistics loaded!', 'success');
      })
      .catch(() => {
        setError('Failed to load statistics');
        notify('Failed to load statistics', 'error');
      })
      .finally(() => setLoading(false));
  }, [notify]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading statistics...</div>;
  }
  if (error) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>{error}</div>;
  }
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: 220, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '24px 32px 0 0' }}>
          <Link to="/admin/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>Logout</Link>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
          <h1 style={{ marginBottom: 32 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 48 }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h3>VR Headset Usage (Q6)</h3>
              <Pie data={pieDataQ6} />
            </div>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h3>VR App Store (Q7)</h3>
              <Pie data={pieDataQ7} />
            </div>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h3>Main Usage (Q10)</h3>
              <Pie data={pieDataQ10} />
            </div>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h3>Quality Scores (Q11–Q15)</h3>
            <Radar data={radarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
