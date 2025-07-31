

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Survey from './pages/Survey';
import Answers from './pages/Answers';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import AdminQuestions from './admin/Questions';
import AdminAnswers from './admin/Answers';
import MainNav from './components/MainNav';
import { NotificationProvider } from './components/NotificationProvider';
import './modern.css';


const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Router>
        <MainNav />
        <Routes>
          <Route path="/" element={<Survey />} />
          <Route path="/answers/:token" element={<Answers />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/answers" element={<AdminAnswers />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
};

export default App;
