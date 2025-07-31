

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { surveyQuestions } from '../pages/SurveyQuestions';
import api from '../api/api';
import { useNotification } from '../components/NotificationProvider';
import '../radiant.css';


// Type for answers map
type AnswersMap = { [key: string]: string };

const AdminAnswers: React.FC = () => {
  const [allAnswers, setAllAnswers] = useState<{ id: string; answers: AnswersMap }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/admin/answers')
      .then((res: any) => {
        setAllAnswers(res.data.answers);
        notify('Answers loaded successfully!', 'success');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load answers');
        notify('Failed to load answers', 'error');
        setLoading(false);
      });
  }, [notify]);

  if (loading) {
    return <div className="radiant-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: 22 }}>Loading answers...</div>;
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
          <h1 className="radiant-title" style={{ marginBottom: 32 }}>Survey Answers</h1>
          {allAnswers.map((user, idx) => (
            <div key={user.id} className="card radiant-glass" style={{ marginBottom: 40, padding: 24 }}>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: 16 }}>Participant {idx + 1}</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="radiant-table" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px var(--primary-dark)' }}>
                  <thead style={{ background: 'linear-gradient(90deg, #e040fb 0%, #ff4081 100%)', color: '#fff' }}>
                    <tr>
                      <th style={{ padding: 12, textAlign: 'left' }}>#</th>
                      <th style={{ padding: 12, textAlign: 'left' }}>Question</th>
                      <th style={{ padding: 12, textAlign: 'left' }}>Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveyQuestions.map((q) => (
                      <tr key={q.number} style={{ borderBottom: '1px solid #f8bbd0' }}>
                        <td style={{ padding: 10 }}>{q.number}</td>
                        <td style={{ padding: 10 }}>{q.text}</td>
                        <td style={{ padding: 10 }}>{user.answers[q.number.toString()] || <span style={{ color: '#aaa' }}>No answer</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnswers;
