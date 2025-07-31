

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { surveyQuestions } from '../pages/SurveyQuestions';
import api from '../api/api';
import { useNotification } from '../components/NotificationProvider';


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
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading answers...</div>;
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
          <h1 style={{ marginBottom: 32 }}>Survey Answers</h1>
          {allAnswers.map((user, idx) => (
            <div key={user.id} style={{ marginBottom: 40, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: 24 }}>
              <h3 style={{ color: '#1976d2', marginBottom: 16 }}>Participant {idx + 1}</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f5f5f5' }}>
                  <tr>
                    <th style={{ padding: 10, textAlign: 'left' }}>#</th>
                    <th style={{ padding: 10, textAlign: 'left' }}>Question</th>
                    <th style={{ padding: 10, textAlign: 'left' }}>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyQuestions.map((q) => (
                    <tr key={q.number} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 10 }}>{q.number}</td>
                      <td style={{ padding: 10 }}>{q.text}</td>
                      <td style={{ padding: 10 }}>{user.answers[q.number.toString()] || <span style={{ color: '#aaa' }}>No answer</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnswers;
