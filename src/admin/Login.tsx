
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '../components/NotificationProvider';
import api from '../api/api';

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
    <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f3 100%)' }}>
      <div className="admin-login-container" style={{ maxWidth: 400, width: '100%', padding: 32, border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 16px #e0e7ef', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#fff' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Login</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, width: '100%', maxWidth: 340 }}>
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'underline' }}>Back to survey</Link>
          <Link to="/answers/demo-token" style={{ color: '#1976d2', textDecoration: 'underline' }}>Consult answers</Link>
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="username" style={{ display: 'block', marginBottom: 6 }}>Username</label>
                <Field name="username" type="text" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
                <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                  <ErrorMessage name="username" />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
                <Field name="password" type="password" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
                <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                  <ErrorMessage name="password" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '12px 0', fontSize: 16, borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
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
