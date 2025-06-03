import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../PageCSS/Login.css';
import { BASE_URL } from "../defaults";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigator = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BASE_URL}/login`, { username, password });
      console.log(response)
      const { token } = response.data;
      console.log(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', username);
      if(token == {}){
        throw new Error('Invalid email or password');
      }
      navigator('/home');
    } catch (error) {
      setError('Invalid email or password');
      // navigator('/home');
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          {/* TODO: Switch to required fields and validation*/}
          {/* <input type="string" value={username} onChange={handleUsernameChange} required /> */}
          <input type="string" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          {/* <input type="password" value={password} onChange={handlePasswordChange} required /> */}
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
