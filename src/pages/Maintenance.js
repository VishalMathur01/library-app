import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Maintenance = () => {
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
    maxWidth: '600px',
    textAlign: 'left',
  };

  const formTitleStyle = {
    color: '#37474f',
    marginBottom: '15px',
    fontSize: '1.4em',
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

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    color: '#546e7a',
    fontSize: '0.9em',
  };

  const radioCheckboxLabelStyle = {
    display: 'inline-block',
    marginRight: '15px',
    color: '#546e7a',
    fontSize: '0.9em',
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
        Maintenance
      </h2>

      {/* Membership Section */}
      <h3 style={{ color: '#37474f', marginTop: '20px', marginBottom: '10px' }}>Membership</h3>
      <div>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('addMembership')}
        >
          Add
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('updateMembership')}
        >
          Update
        </button>
      </div>

      {/* Books/Movies Section */}
      <h3 style={{ color: '#37474f', marginTop: '20px', marginBottom: '10px' }}>Books/Movies</h3>
      <div>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('addBookMovie')}
        >
          Add
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('updateBookMovie')}
        >
          Update
        </button>
      </div>

      {/* User Management Section */}
      <h3 style={{ color: '#37474f', marginTop: '20px', marginBottom: '10px' }}>User Management</h3>
      <div>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('addUser')}
        >
          Add
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowSection('updateUser')}
        >
          Update
        </button>
      </div>

      <Link
        to="/admin-home"
        style={backLinkStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, backLinkHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.target.style, backLinkStyle)}
      >
        Back to Admin Home
      </Link>

      {/* Add Membership Form */}
      {showSection === 'addMembership' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Add Membership</h3>
          <input type="text" placeholder="First Name" style={inputStyle} />
          <input type="text" placeholder="Last Name" style={inputStyle} />
          <input type="text" placeholder="Contact Name" style={inputStyle} />
          <input type="text" placeholder="Contact Address" style={inputStyle} />
          <input type="text" placeholder="Aadhaar Card No" style={inputStyle} />
          <label style={labelStyle}>
            Start Date:
            <input type="date" style={{ ...inputStyle, width: 'auto' }} />
          </label>
          <label style={labelStyle}>
            End Date:
            <input type="date" style={{ ...inputStyle, width: 'auto' }} />
          </label>
          <label style={labelStyle}>
            Membership Duration:
            <div style={{ marginTop: '5px' }}>
              <label style={radioCheckboxLabelStyle}>
                <input type="radio" name="duration" value="6 months" /> 6 Months
              </label>
              <label style={radioCheckboxLabelStyle}>
                <input type="radio" name="duration" value="1 year" /> 1 Year
              </label>
              <label style={radioCheckboxLabelStyle}>
                <input type="radio" name="duration" value="2 years" /> 2 Years
              </label>
            </div>
          </label>
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm
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

      {/* Update Membership Form */}
      {showSection === 'updateMembership' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Update Membership</h3>
          <input type="text" placeholder="Membership ID" style={inputStyle} />
          <label style={labelStyle}>
            Start Date:
            <input type="date" style={{ ...inputStyle, width: 'auto' }} />
          </label>
          <label style={labelStyle}>
            End Date:
            <input type="date" style={{ ...inputStyle, width: 'auto' }} />
          </label>
          <label style={labelStyle}>
            Membership Extension:
            <div style={{ marginTop: '5px' }}>
              <label style={radioCheckboxLabelStyle}>
                <input type="radio" name="extension" value="6 months" /> 6 Months
              </label>
              <label style={radioCheckboxLabelStyle}>
                <input type="radio" name="extension" value="1 year" /> 1 Year
              </label>
              <label style={radioCheckboxLabelStyle}>
                <input type="radio" name="extension" value="2 years" /> 2 Years
              </label>
            </div>
          </label>
          <label style={labelStyle}>
            Remove Membership:
            <input type="checkbox" style={{ marginRight: '5px' }} />
          </label>
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm
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

      {/* Add Book/Movie Form */}
      {showSection === 'addBookMovie' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Add Book/Movie</h3>
          <label style={labelStyle}>
            <input type="radio" name="type" value="book" style={{ marginRight: '5px' }} /> Book
            <input type="radio" name="type" value="movie" style={{ marginLeft: '15px', marginRight: '5px' }} /> Movie
          </label>
          <input type="text" placeholder="Book/Movie Name" style={inputStyle} />
          <label style={labelStyle}>
            Date of Procurement:
            <input type="date" style={{ ...inputStyle, width: 'auto' }} />
          </label>
          <input type="number" placeholder="Quantity/Copies" defaultValue={-1} style={inputStyle} />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm
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

      {/* Update Book/Movie Form */}
      {showSection === 'updateBookMovie' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Update Book/Movie</h3>
          <label style={labelStyle}>
            <input type="radio" name="type" value="book" style={{ marginRight: '5px' }} /> Book
            <input type="radio" name="type" value="movie" style={{ marginLeft: '15px', marginRight: '5px' }} /> Movie
          </label>
          <input type="text" placeholder="Book/Movie Name" style={inputStyle} />
          <input type="text" placeholder="Serial No" style={inputStyle} />
          <select style={{ ...inputStyle, width: 'auto' }}>
            <option>Status</option>
            <option>Available</option>
            <option>Unavailable</option>
          </select>
          <label style={labelStyle}>
            Date:
            <input type="date" style={{ ...inputStyle, width: 'auto' }} />
          </label>
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm
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

      {/* Add User Form */}
      {showSection === 'addUser' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Add User</h3>
          <input type="text" placeholder="Name" style={inputStyle} />
          <label style={labelStyle}>
            Status:
            <input type="checkbox" style={{ marginRight: '5px' }} /> Active
          </label>
          <label style={labelStyle}>
            Admin:
            <input type="checkbox" style={{ marginRight: '5px' }} /> Admin
          </label>
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm
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

      {/* Update User Form */}
      {showSection === 'updateUser' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Update User</h3>
          <input type="text" placeholder="Name" style={inputStyle} />
          <label style={labelStyle}>
            Status:
            <input type="checkbox" style={{ marginRight: '5px' }} /> Active
          </label>
          <label style={labelStyle}>
            Admin:
            <input type="checkbox" style={{ marginRight: '5px' }} /> Admin
          </label>
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
          >
            Confirm
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
    </div>
  );
};

export default Maintenance;