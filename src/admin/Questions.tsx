import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useNotification } from '../components/NotificationProvider';

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
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading questions...</div>;
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
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
          <h1 style={{ marginBottom: 32 }}>Questions Table</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px #eee' }}>
            <thead style={{ background: '#1976d2', color: '#fff' }}>
              <tr>
                <th style={{ padding: 12, textAlign: 'left' }}>#</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Question</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Type</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Choices</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.number} style={{ borderBottom: '1px solid #eee' }}>
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
  );
};

export default AdminQuestions;
