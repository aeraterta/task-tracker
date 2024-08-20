import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Privacy from './routes/Privacy';
import Tos from './routes/Tos';
import Layout from './components/Layout';
import RequireAuth from './auth/RequireAuth'
import LoginPage from './routes/login/Login';
import LandingPage from './routes/landingpage/LandingPage';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="tos" element={<Tos />} />
        <Route element={<RequireAuth />}>
          <Route path="landing-page" element={<LandingPage />} />
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;