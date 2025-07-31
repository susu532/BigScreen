
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { surveyQuestions } from './SurveyQuestions';
import type { SurveyQuestion } from './SurveyQuestions';
import { useNotification } from '../components/NotificationProvider';
import api from '../api/api';
import '../radiant.css';

/**
 * Validation schema for the survey form using Yup.
 * All questions are required. Email is validated.
 */
const validationSchema = Yup.object(
  surveyQuestions.reduce((acc: Record<string, any>, q) => {
    if (q.number === 1) {
      acc[`q${q.number}`] = Yup.string()
        .email('Invalid email address')
        .required('Required');
    } else if (q.type === 'B') {
      acc[`q${q.number}`] = Yup.string().max(255, 'Max 255 characters').required('Required');
    } else {
      acc[`q${q.number}`] = Yup.string().required('Required');
    }
    return acc;
  }, {} as Record<string, any>)
);
const Survey: React.FC = () => {
  /**
   * Handles form submission
   * @param values Form values
   */
  const { notify } = useNotification();
  /**
   * Handles form submission and sends data to backend API
   */
  const handleSubmit = async (values: Record<string, string>, { setSubmitting, resetForm }: any) => {
    try {
      await api.post('/survey', values);
      notify('Thank you for your answers!', 'success');
      // Optionally: redirect or show token from response.data.token
      resetForm();
    } catch (error: any) {
      notify(error.response?.data?.message || 'Submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="survey-bg" style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
      <div className="survey-container radiant-glass" style={{ maxWidth: 600, width: '100%', margin: '0 auto', padding: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
        <h1 className="radiant-title" style={{ marginBottom: 18 }}>Bigscreen Survey</h1>
        <div className="radiant-subtitle" style={{ marginBottom: 28, fontSize: 18 }}>
          Please answer all questions. Your feedback is valuable!
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, width: '100%', maxWidth: 500 }}>
          <Link to="/answers/demo-token" className="radiant-link">Consult your answers</Link>
          <Link to="/admin/login" className="radiant-link">Admin login</Link>
        </div>
        <Formik
          initialValues={surveyQuestions.reduce((acc, q) => { acc[`q${q.number}`] = ''; return acc; }, {} as any)}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              {surveyQuestions.map((q: SurveyQuestion) => (
                <div key={q.number} className="radiant-form-group" style={{ marginBottom: 22, textAlign: 'left', background: 'var(--glass)', borderRadius: 16, boxShadow: '0 2px 12px 0 rgba(224,64,251,0.08)', padding: 18 }}>
                  <div className="radiant-label" style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 6, fontSize: 16 }}>Q{q.number}: {q.text}</div>
                  {q.type === 'A' && q.choices && (
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {q.choices.map((choice, i) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, color: 'var(--primary)' }}>
                          <Field type="radio" name={`q${q.number}`} value={choice} className="radiant-radio" /> {choice}
                        </label>
                      ))}
                    </div>
                  )}
                  {q.type === 'B' && (
                    <Field
                      type="text"
                      name={`q${q.number}`}
                      maxLength={255}
                      className="radiant-input"
                      style={{ width: '100%', marginTop: 6 }}
                    />
                  )}
                  {q.type === 'C' && (
                    <Field as="select" name={`q${q.number}`} className="radiant-input" style={{ width: '100%', marginTop: 6 }}>
                      <option value="">Select a value</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </Field>
                  )}
                  <div className="radiant-error" style={{ color: 'var(--accent)', fontSize: 13, marginTop: 2 }}>
                    <ErrorMessage name={`q${q.number}`} />
                  </div>
                </div>
              ))}
              <button type="submit" className="button radiant-btn" disabled={isSubmitting} style={{ width: '100%', marginTop: 18, fontSize: 18 }}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Survey;
