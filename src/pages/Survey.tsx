
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { surveyQuestions } from './SurveyQuestions';
import type { SurveyQuestion } from './SurveyQuestions';
import { useNotification } from '../components/NotificationProvider';
import api from '../api/api';

/**
 * Validation schema for the survey form using Yup.
 * All questions are required. Email is validated.
 */
const validationSchema = Yup.object(
  surveyQuestions.reduce((acc, q) => {
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

/**
 * Initial values for the survey form.
 */
const initialValues = surveyQuestions.reduce((acc, q) => {
  acc[`q${q.number}`] = '';
  return acc;
}, {} as Record<string, string>);

/**
 * Survey form UI for Bigscreen
 */
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
      const response = await api.post('/survey', values);
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
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="survey-container" style={{ maxWidth: 600, width: '100%', margin: '0 auto', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
        <h1>Bigscreen Survey</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, width: '100%', maxWidth: 500 }}>
          <Link to="/answers/demo-token" style={{ color: '#1976d2', textDecoration: 'underline' }}>Consult your answers</Link>
          <Link to="/admin/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>Admin login</Link>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {surveyQuestions.map((q: SurveyQuestion) => (
                <div key={q.number} style={{ marginBottom: 24, border: '1px dashed #bbb', borderRadius: 8, padding: 16, width: '100%', maxWidth: 420, background: '#fafcff', boxShadow: '0 2px 12px 0 rgba(25,118,210,0.06)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
                    Question {q.number}/20
                  </div>
                  <div style={{ marginBottom: 8, textAlign: 'center' }}>{q.text}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {q.type === 'A' && q.choices && (
                      <div style={{ width: '100%' }}>
                        {q.choices.map((choice, i) => (
                          <label key={i} style={{ display: 'block', marginBottom: 4, textAlign: 'left' }}>
                            <Field type="radio" name={`q${q.number}`} value={choice} /> {choice}
                          </label>
                        ))}
                      </div>
                    )}
                    {q.type === 'B' && (
                      <Field
                        type="text"
                        name={`q${q.number}`}
                        maxLength={255}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1.5px solid #ccc', textAlign: 'center' }}
                      />
                    )}
                    {q.type === 'C' && (
                      <Field as="select" name={`q${q.number}`} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1.5px solid #ccc', textAlign: 'center' }}>
                        <option value="">Select a value</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </Field>
                    )}
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                      <ErrorMessage name={`q${q.number}`} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" disabled={isSubmitting} style={{ padding: '12px 32px', fontSize: 16, borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer', margin: '0 auto' }}>
                Finalize
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Survey;
