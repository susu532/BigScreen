import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useNotification } from '../components/NotificationProvider';
import '../radiant.css';

/**
 * Admin questions table page. Displays all survey questions in a table.
 */

const AdminQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/admin/questions')
      .then((res: any) => {
        setQuestions(res.data.questions);
        notify('Questions loaded!', 'success');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load questions');
        notify('Failed to load questions', 'error');
        setLoading(false);
      });
  }, [notify]);

  if (loading) {
    return <div className="radiant-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: 22 }}>Loading questions...</div>;
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
        <div className="admin-card radiant-glass" style={{ maxWidth: 900, margin: '0 auto', padding: 32, marginTop: 24, marginBottom: 24 }}>
          <h1 className="radiant-title" style={{ marginBottom: 32 }}>Questions Table</h1>
          <div style={{ overflowX: 'auto' }}>
            <table className="radiant-table" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px var(--primary-dark)' }}>
              <thead style={{ background: 'linear-gradient(90deg, #e040fb 0%, #ff4081 100%)', color: '#fff' }}>
                <tr>
                  <th style={{ padding: 14, textAlign: 'left' }}>#</th>
                  <th style={{ padding: 14, textAlign: 'left' }}>Question</th>
                  <th style={{ padding: 14, textAlign: 'left' }}>Type</th>
                  <th style={{ padding: 14, textAlign: 'left' }}>Choices</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.number} style={{ borderBottom: '1px solid #f8bbd0' }}>
                    <td style={{ padding: 12 }}>{q.number}</td>
                    <td style={{ padding: 12 }}>{q.text}</td>
                    <td style={{ padding: 12 }}>{q.type}</td>
                    <td style={{ padding: 12 }}>{q.choices ? q.choices.join(', ') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestions;
