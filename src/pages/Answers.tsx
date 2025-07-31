
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { surveyQuestions } from './SurveyQuestions';
import { useNotification } from '../components/NotificationProvider';
import api from '../api/api';

/**
 * Represents the user's answers as a mapping from question number to answer string.
 */
type UserAnswers = Record<number, string>;

/**
 * Answers consultation page. Fetches and displays the user's answers for all questions.
 */
const Answers: React.FC = () => {
  // Unique token from URL
  const { token } = useParams<{ token: string }>();
  // State for user answers
  const [answers, setAnswers] = useState<UserAnswers | null>(null);
  // State for loading/error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches user answers from backend (simulated here)
   */
  const { notify } = useNotification();
  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(`/answers/${token}`)
      .then((res: any) => {
        setAnswers(res.data.answers);
        notify('Answers loaded successfully!', 'success');
      })
      .catch(() => {
        setError('Failed to load answers');
        notify('Failed to load answers', 'error');
      })
      .finally(() => setLoading(false));
  }, [token, notify]);


  // Loading state: centered spinner
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f3 100%)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="spinner" style={{ width: 48, height: 48, border: '6px solid #e3e9f3', borderTop: '6px solid #1976d2', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 18 }} />
          <div style={{ color: '#1976d2', fontWeight: 500, fontSize: 18 }}>Loading your answers...</div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  // Error state: centered error message
  if (error) {
    notify('Failed to load answers', 'error');
    return (
      <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f3 100%)' }}>
        <div style={{ color: 'red', fontWeight: 600, fontSize: 18 }}>{error}</div>
      </div>
    );
  }

  // Empty state: centered message
  if (!answers) {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f3 100%)' }}>
        <div style={{ color: '#888', fontWeight: 500, fontSize: 18 }}>No answers found.</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f3 100%)' }}>
      <div className="answers-container" style={{ maxWidth: 600, width: '100%', margin: '0 auto', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px 0 rgba(25,118,210,0.08)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 18, color: '#1976d2', letterSpacing: 1 }}>Your Survey Answers</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, width: '100%', maxWidth: 500 }}>
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>Back to survey</Link>
          <Link to="/admin/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>Admin login</Link>
        </div>
        <div style={{ marginBottom: 24, color: '#1976d2', fontWeight: 500, fontSize: 16 }}>
          Below are the answers you provided to the Bigscreen survey.
        </div>
        {surveyQuestions.map((q) => (
          <div key={q.number} style={{ marginBottom: 20, border: '1px dashed #bbb', borderRadius: 8, padding: 16, width: '100%', maxWidth: 420, background: '#fafcff', boxShadow: '0 2px 12px 0 rgba(25,118,210,0.06)', transition: 'box-shadow 0.2s', cursor: 'default' }}>
            <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center', color: '#1976d2' }}>
              Question {q.number}/20
            </div>
            <div style={{ marginBottom: 8, textAlign: 'center', color: '#222' }}>{q.text}</div>
            <div style={{ fontStyle: 'italic', color: '#333', background: '#f9f9f9', padding: 8, borderRadius: 4, textAlign: 'center', minHeight: 24 }}>
              {answers[q.number] || <span style={{ color: '#aaa' }}>No answer</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
