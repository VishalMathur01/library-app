import React from 'react';
import { Link } from 'react-router-dom';

const TransactionCancelled = () => {
  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      textAlign: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '500px',
      }}>
        <h2 style={{
          fontSize: '2.2em',
          fontWeight: 'bold',
          color: '#d32f2f', // Red to indicate cancellation
          marginBottom: '20px',
        }}>
          Transaction Cancelled
        </h2>
        <p style={{
          color: '#546e7a',
          fontSize: '1em',
          marginBottom: '25px',
        }}>
          Your transaction has been successfully cancelled.
        </p>
        <Link
          to="/"
          style={{
            color: '#2196f3',
            textDecoration: 'none',
            fontSize: '1.1em',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#1976d2')}
          onMouseLeave={(e) => (e.target.style.color = '#2196f3')}
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default TransactionCancelled;