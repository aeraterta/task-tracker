import React, { useEffect, useState } from 'react';
import { Navigate} from "react-router-dom";

import api from '../../middlewares/api';
import './Login.css';
import Logs from '../../components/logs/Logs';
import useAuth from '../../auth/useAuth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogsMessage, setLogsMessagePopup] = useState(false);
  const [LogsMessag, setLogsMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { setToken } = useAuth();

  useEffect(() => {
    document.title = "Login"
  }, [])

  const handleLogin = () => {

    if (!username || !password) {
      setLogsMessage('<b>Empty Credentials</b><br /> Provide both username and password.');
      setLogsMessagePopup(true);
      return;
    }

    const data = `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    api.post('/auth/token', data, headers)
    .then(response => {
      const token = response.data.token
      localStorage.setItem('token', token);
      setToken(token)
      setUsername('');
      setPassword('');

      //const token = localStorage.getItem('token');
      //console.log(`CurrentUser Saved: ${token}`)

      setLogsMessage('Login successfully!');
      setLogsMessagePopup(true);
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1500); // Wait for 1.5 seconds before redirecting
    })
    .catch(error => {
      console.log(error)
      if (error.response.status === 401) {
        setLogsMessage('<b>Wrong Credentials</b><br /> Invalid username or password.');
      }
      setLogsMessagePopup(true);
    })
  };

  if (isLoggedIn) {
    return <Navigate to="/landing-page" replace />;
  }

  return (
    <div className="App">
      <div className="login-container">
        <h2>React Task Management</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {showLogsMessage && <Logs message={LogsMessag} onClose={() => setLogsMessagePopup(false)} />}
      </div>
    </div>
  );
}

export default LoginPage;
