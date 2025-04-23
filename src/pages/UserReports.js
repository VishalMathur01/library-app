import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserReports = () => {
  const [showReport, setShowReport] = useState(null);

  // Dummy Data (same as in Reports.js)
  const books = [
    { serialNo: 1001, name: 'Book 1', author: 'Author 1', category: 'Science', status: 'Available', cost: 500, procurementDate: '2023-01-01' },
    { serialNo: 1002, name: 'Book 2', author: 'Author 2', category: 'Fiction', status: 'Unavailable', cost: 400, procurementDate: '2023-02-01' },
  ];

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginRight: '10px',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const reportContainerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    width: '95%',
    maxWidth: '1200px',
    overflowX: 'auto', // For horizontal scrolling if tables are wide
  };

  const reportTitleStyle = {
    color: '#37474f',
    marginBottom: '15px',
    fontSize: '1.4em',
    fontWeight: 'bold',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const thStyle = {
    backgroundColor: '#37474f',
    color: 'white',
    fontWeight: 'bold',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  const backLinkStyle = {
    color: '#2196f3',
    textDecoration: 'none',
    fontSize: '1em',
    marginTop: '30px',
    transition: 'color 0.3s ease',
  };

  const backLinkHoverStyle = {
    color: '#1976d2',
  };

  const backButtonStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  };

  const backButtonHoverStyle = {
    backgroundColor: '#545b62',
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
    }}>
      <h2 style={{
        fontSize: '2.2em',
        fontWeight: 'bold',
        color: '#37474f',
        marginBottom: '25px',
      }}>
        User Reports
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowReport('masterListBooks')}
        >
          Master List of Books
        </button>
        {/* Add other buttons here */}
      </div>

      {/* Display Reports */}
      {showReport === 'masterListBooks' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Master List of Books</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Serial No</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Cost</th>
                <th style={thStyle}>Procurement Date</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.serialNo}>
                  <td style={tdStyle}>{book.serialNo}</td>
                  <td style={tdStyle}>{book.name}</td>
                  <td style={tdStyle}>{book.author}</td>
                  <td style={tdStyle}>{book.category}</td>
                  <td style={tdStyle}>{book.status}</td>
                  <td style={tdStyle}>{book.cost}</td>
                  <td style={tdStyle}>{book.procurementDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            style={backButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, backButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, backButtonStyle)}
            onClick={() => setShowReport(null)}
          >
            Back
          </button>
        </div>
      )}

      <Link
        to="/user-home"
        style={backLinkStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, backLinkHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.target.style, backLinkStyle)}
      >
        Back to User Home
      </Link>
    </div>
  );
};

export default UserReports;