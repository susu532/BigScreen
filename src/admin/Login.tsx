
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '../components/NotificationProvider';
import api from '../api/api';
import '../radiant.css';

/**
 * Validation schema for admin login form
 */
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

/**
 * Admin login page UI
 */
const AdminLogin: React.FC = () => {
  /**
   * Handles admin login form submission
   * @param values Form values
   */
  const { notify } = useNotification();

  /**
   * Handles admin login form submission and authenticates with Laravel backend
   * @param values Form values
   */
  const navigate = useNavigate();
  const handleSubmit = async (values: { username: string; password: string }, { setSubmitting }: { setSubmitting: (b: boolean) => void }) => {
    try {
      await api.post('/admin/login', values);
      notify('Login successful!', 'success');
      // Optionally store token/session here
      navigate('/admin/dashboard');
    } catch (error: any) {
      notify(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="radiant-bg" style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
      <div className="admin-login-container radiant-glass" style={{ maxWidth: 420, width: '100%', margin: '0 auto', padding: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
        <h1 className="radiant-title" style={{ marginBottom: 18 }}>Admin Login</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, width: '100%', maxWidth: 340 }}>
          <Link to="/" className="radiant-link">Back to survey</Link>
          <Link to="/answers/demo-token" className="radiant-link">Consult answers</Link>
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <div className="radiant-form-group" style={{ marginBottom: 22, textAlign: 'left' }}>
                <label htmlFor="username" className="radiant-label" style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 6, display: 'block' }}>Username</label>
                <Field name="username" type="text" className="radiant-input" style={{ width: '100%' }} />
                <div className="radiant-error" style={{ color: 'var(--accent)', fontSize: 13, marginTop: 2 }}>
                  <ErrorMessage name="username" />
                </div>
              </div>
              <div className="radiant-form-group" style={{ marginBottom: 22, textAlign: 'left' }}>
                <label htmlFor="password" className="radiant-label" style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 6, display: 'block' }}>Password</label>
                <Field name="password" type="password" className="radiant-input" style={{ width: '100%' }} />
                <div className="radiant-error" style={{ color: 'var(--accent)', fontSize: 13, marginTop: 2 }}>
                  <ErrorMessage name="password" />
                </div>
              </div>
              <button type="submit" className="button radiant-btn" disabled={isSubmitting} style={{ width: '100%', marginTop: 18, fontSize: 18 }}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
