import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        backgroundColor: '#37474f',
        color: 'white',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.8em', fontWeight: 'bold' }}>User Dashboard</h2>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link>
      </div>

      {/* Main Content Area */}
      <div style={{
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }}>
        {/* User Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px',
        }}>
          <Link to="/reports" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#2196f3', // Blue - Could be "View Available Books"
              color: 'white',
              padding: '14px 22px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1em',
              boxShadow: '0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.12)',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#1976d2')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#2196f3')}
            >
              View Reports {/* Consider a more user-centric label */}
            </button>
          </Link>
          <Link to="/transactions" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#4caf50', // Green - Could be "My Borrowed Books"
              color: 'white',
              padding: '14px 22px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1em',
              boxShadow: '0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.12)',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#43a047')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
              View Transactions {/* Consider a more user-centric label */}
            </button>
          </Link>
          {/* You might add more user-specific buttons here */}
        </div>

        {/* Data Table */}
        <div style={{
          width: '90%',
          maxWidth: '1200px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead style={{
              backgroundColor: '#37474f',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.12)',
            }}>
              <tr>
                <th style={{ padding: '18px', textAlign: 'left' }}>Code No From</th>
                <th style={{ padding: '18px', textAlign: 'left' }}>Code No To</th>
                <th style={{ padding: '18px', textAlign: 'left' }}>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px' }}>1001</td>
                <td style={{ padding: '15px' }}>2000</td>
                <td style={{ padding: '15px' }}>Science</td>
              </tr>
              <tr style={{ backgroundColor: 'white' }}>
                <td style={{ padding: '15px' }}>2001</td>
                <td style={{ padding: '15px' }}>3000</td>
                <td style={{ padding: '15px' }}>Fiction</td>
              </tr>
              {/* You might display different user-specific data here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserHome;