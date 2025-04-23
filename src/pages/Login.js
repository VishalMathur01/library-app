import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === 'adm' && trimmedPassword === 'admin123') {
      navigate('/admin-home');
    } else if (trimmedUsername === 'user' && trimmedPassword === 'user123') {
      navigate('/user-home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2f7, #cdd8d4)',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        maxWidth: '90%',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2.8em',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '35px',
        }}>
          Library Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '14px 18px',
            marginBottom: '20px',
            border: '1px solid #bdc3c7',
            borderRadius: '8px',
            fontSize: '1.1em',
            width: '100%',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#3498db')}
          onBlur={(e) => (e.target.style.borderColor = '#bdc3c7')}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '14px 18px',
            marginBottom: '30px',
            border: '1px solid #bdc3c7',
            borderRadius: '8px',
            fontSize: '1.1em',
            width: '100%',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#3498db')}
          onBlur={(e) => (e.target.style.borderColor = '#bdc3c7')}
        />
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '14px 25px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1.2em',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2980b9';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3498db';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
          }}
          active={{
            backgroundColor: '#2471a3',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(1px)',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;