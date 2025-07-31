
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { surveyQuestions } from './SurveyQuestions';
import { useNotification } from '../components/NotificationProvider';
import api from '../api/api';
import '../radiant.css';

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
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load answers');
        notify('Failed to load answers', 'error');
        setLoading(false);
      });
  }, [token, notify]);


  // Loading state: centered spinner
  if (loading) {
    return (
      <div className="radiant-bg" style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="spinner" style={{ width: 48, height: 48, border: '6px solid #f8bbd0', borderTop: '6px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 18 }} />
          <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 18 }}>Loading your answers...</div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  // Error state: centered error message
  if (error) {
    notify('Failed to load answers', 'error');
    return (
      <div className="radiant-bg" style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 18 }}>{error}</div>
      </div>
    );
  }

  // Empty state: centered message
  if (!answers) {
    return (
      <div className="radiant-bg" style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#888', fontWeight: 600, fontSize: 18 }}>No answers found.</div>
      </div>
    );
  }

  return (
    <div className="radiant-bg" style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
      <div className="answers-container radiant-glass" style={{ maxWidth: 600, width: '100%', margin: '0 auto', padding: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
        <h1 className="radiant-title" style={{ marginBottom: 18 }}>Your Survey Answers</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, width: '100%', maxWidth: 500 }}>
          <Link to="/" className="radiant-link">Back to survey</Link>
          <Link to="/admin/login" className="radiant-link">Admin login</Link>
        </div>
        <div className="radiant-subtitle" style={{ marginBottom: 24, fontSize: 16 }}>
          Below are the answers you provided to the Bigscreen survey.
        </div>
        {surveyQuestions.map((q) => (
          <div key={q.number} className="radiant-form-group" style={{ marginBottom: 20, background: 'var(--glass)', borderRadius: 16, boxShadow: '0 2px 12px 0 rgba(224,64,251,0.08)', padding: 18 }}>
            <div className="radiant-label" style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 6, fontSize: 16 }}>Q{q.number}: {q.text}</div>
            <div style={{ fontStyle: 'italic', color: 'var(--primary)', background: 'var(--surface)', padding: 8, borderRadius: 8, textAlign: 'center', minHeight: 24, fontWeight: 600 }}>
              {answers[q.number] || <span style={{ color: '#aaa' }}>No answer</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
