import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Transactions = () => {
  const [showSection, setShowSection] = useState(null);
  const navigate = useNavigate();

  // Dummy Data for Book Availability (same as before)
  const books = [
    { serialNo: 1001, name: 'Book 1', author: 'Author 1', available: 'Yes' },
    { serialNo: 1002, name: 'Book 2', author: 'Author 2', available: 'No' },
  ];

  // State for forms
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Handle Search for Book Availability
  const handleSearch = () => {
    if (!selectedBook || !selectedAuthor) {
      alert('Please select both Book Name and Author.');
      return;
    }
    navigate('/book-availability');
  };

  // Handle Book Issue Form Submission
  const handleIssueBook = () => {
    if (!selectedBook || !issueDate || !returnDate) {
      alert('Please fill all required fields.');
      return;
    }
    navigate('/book-availability');
  };

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
    appearance: 'none', // Remove default arrow for better custom styling
    backgroundImage: 'url(\'data:image/svg+xml;charset=UTF-8,%3csvg fill="%23343a40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3e%3cpath d="M1.5 5.5l7 7 7-7-1.5-1.5-5.5 5.5-5.5-5.5-1.5 1.5z"/%3e%3c/svg%3e\')',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'calc(100% - 10px)',
    backgroundPositionY: '50%',
    paddingRight: '30px',
  };

  const textareaStyle = {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '0.9em',
    minHeight: '80px',
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
        Transactions
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
          <select style={selectStyle} value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
            <option value="">Select Book Name</option>
            <option value="Book 1">Book 1</option>
            <option value="Book 2">Book 2</option>
          </select>
          <label style={labelStyle}>Author:</label>
          <select style={selectStyle} value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
            <option value="">Select Author</option>
            <option value="Author 1">Author 1</option>
            <option value="Author 2">Author 2</option>
          </select>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={handleSearch}
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

      {/* Issue Book Section */}
      {showSection === 'issueBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Issue Book</h3>
          <label style={labelStyle}>Book Name:</label>
          <select style={selectStyle} value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
            <option value="">Select Book Name</option>
            <option value="Book 1">Book 1</option>
            <option value="Book 2">Book 2</option>
          </select>
          <label style={labelStyle}>Author:</label>
          <input type="text" style={inputStyle} value="Author 1" readOnly />
          <label style={labelStyle}>Issue Date:</label>
          <input type="date" style={inputStyle} value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          <label style={labelStyle}>Return Date:</label>
          <input
            type="date"
            style={inputStyle}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={issueDate}
          />
          <label style={labelStyle}>Remarks (Optional):</label>
          <textarea style={textareaStyle} placeholder="Remarks (Optional)"></textarea>
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
            onClick={handleIssueBook}
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

      {/* Return Book Section */}
      {showSection === 'returnBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Return Book</h3>
          <label style={labelStyle}>Book Name:</label>
          <select style={selectStyle}>
            <option>Select Book Name</option>
            <option>Book 1</option>
            <option>Book 2</option>
          </select>
          <label style={labelStyle}>Author:</label>
          <input type="text" style={inputStyle} value="Author 1" readOnly />
          <label style={labelStyle}>Serial No:</label>
          <select style={selectStyle}>
            <option>Select Serial No</option>
            <option>1001</option>
            <option>1002</option>
          </select>
          <label style={labelStyle}>Issue Date:</label>
          <input type="text" style={inputStyle} value="2023-01-01" readOnly />
          <label style={labelStyle}>Return Date:</label>
          <input type="date" style={inputStyle} />
          <label style={labelStyle}>Remarks (Optional):</label>
          <textarea style={textareaStyle} placeholder="Remarks (Optional)"></textarea>
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

      {/* Pay Fine Section */}
      {showSection === 'payFine' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Pay Fine</h3>
          <label style={labelStyle}>Book Name:</label>
          <input type="text" style={inputStyle} placeholder="Book Name" value="Book 1" readOnly />
          <label style={labelStyle}>Author Name:</label>
          <input type="text" style={inputStyle} placeholder="Author Name" value="Author 1" readOnly />
          <label style={labelStyle}>Serial No:</label>
          <input type="text" style={inputStyle} placeholder="Serial No" value="1001" readOnly />
          <label style={labelStyle}>Issue Date:</label>
          <input type="date" style={inputStyle} value="2023-01-01" readOnly />
          <label style={labelStyle}>Return Date:</label>
          <input type="date" style={inputStyle} value="2023-01-15" readOnly />
          <label style={labelStyle}>Actual Return Date:</label>
          <input type="date" style={inputStyle} />
          <label style={labelStyle}>Fine Calculated:</label>
          <input type="number" style={inputStyle} defaultValue={0} readOnly />
          <label style={labelStyle}>Fine Paid:</label>
          <div>
            <input type="checkbox" style={{ marginRight: '5px' }} /> Paid
          </div>
          <label style={labelStyle}>Remarks (Optional):</label>
          <textarea style={textareaStyle} placeholder="Remarks (Optional)"></textarea>
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

      <Link
        to="/admin-home"
        style={backLinkStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, backLinkHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.target.style, backLinkStyle)}
      >
        Back to Admin Home
      </Link>
    </div>
  );
};

export default Transactions;