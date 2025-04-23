import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserTransactions = () => {
  const [showSection, setShowSection] = useState(null);

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

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'left',
  };

  const formTitleStyle = {
    color: '#37474f',
    marginBottom: '15px',
    fontSize: '1.4em',
    fontWeight: 'bold',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#546e7a',
    fontSize: '0.9em',
    fontWeight: 'bold',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '0.9em',
  };

  const selectStyle = {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '0.9em',
    appearance: 'none',
    backgroundImage: 'url(\'data:image/svg+xml;charset=UTF-8,%3csvg fill="%23343a40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3e%3cpath d="M1.5 5.5l7 7 7-7-1.5-1.5-5.5 5.5-5.5-5.5-1.5 1.5z"/%3e%3c/svg%3e\')',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'calc(100% - 10px)',
    backgroundPositionY: '50%',
    paddingRight: '30px',
  };

  const confirmButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  };

  const confirmButtonHoverStyle = {
    backgroundColor: '#1e7e34',
  };

  const cancelButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  };

  const cancelButtonHoverStyle = {
    backgroundColor: '#c82333',
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
        User Transactions
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('isBookAvailable')}
        >
          Is Book Available
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('issueBook')}
        >
          Issue Book
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('returnBook')}
        >
          Return Book
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('payFine')}
        >
          Pay Fine
        </button>
      </div>

      {/* Is Book Available Section */}
      {showSection === 'isBookAvailable' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Check Book Availability</h3>
          <label style={labelStyle}>Book Name:</label>
          <select style={selectStyle}>
            <option>Select Book Name</option>
            <option>Book 1</option>
            <option>Book 2</option>
          </select>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          >
            Search
          </button>
          <button
            style={cancelButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, cancelButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, cancelButtonStyle)}
            onClick={() => setShowSection(null)}
          >
            Back
          </button>
        </div>
      )}

      {/* Issue Book Section (Example - you'll need to add state and handlers) */}
      {showSection === 'issueBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Issue Book</h3>
          <label style={labelStyle}>Book Name:</label>
          <select style={selectStyle}>
            <option>Select Book Name</option>
            <option>Book 1</option>
            <option>Book 2</option>
          </select>
          <label style={labelStyle}>Issue Date:</label>
          <input type="date" style={inputStyle} />
          <label style={labelStyle}>Return Date:</label>
          <input type="date" style={inputStyle} />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Request Issue
          </button>
          <button
            style={cancelButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, cancelButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, cancelButtonStyle)}
            onClick={() => setShowSection(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Return Book Section (Example) */}
      {showSection === 'returnBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Return Book</h3>
          <label style={labelStyle}>Book Name:</label>
          <select style={selectStyle}>
            <option>Select Book Name</option>
            <option>Book 1</option>
            <option>Book 2</option>
          </select>
          <label style={labelStyle}>Return Date:</label>
          <input type="date" style={inputStyle} />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm Return
          </button>
          <button
            style={cancelButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, cancelButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, cancelButtonStyle)}
            onClick={() => setShowSection(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Pay Fine Section (Example) */}
      {showSection === 'payFine' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Pay Fine</h3>
          <label style={labelStyle}>Book Name:</label>
          <input type="text" style={inputStyle} readOnly placeholder="Book Name" value="Book 1" />
          <label style={labelStyle}>Fine Amount:</label>
          <input type="number" style={inputStyle} readOnly placeholder="Fine Amount" value="50" />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Pay Fine
          </button>
          <button
            style={cancelButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, cancelButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, cancelButtonStyle)}
            onClick={() => setShowSection(null)}
          >
            Cancel
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

export default UserTransactions;