import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserTransactions = () => {
  const [showSection, setShowSection] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [availabilityError, setAvailabilityError] = useState(null);
  const [selectedBookNameAvailability, setSelectedBookNameAvailability] = useState('');
  const [issueBookId, setIssueBookId] = useState('');
  const [issueMembershipId, setIssueMembershipId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [issueSuccessMessage, setIssueSuccessMessage] = useState('');
  const [issueErrorMessage, setIssueErrorMessage] = useState('');
  const [returnBookSerialNo, setReturnBookSerialNo] = useState('');
  const [returnSuccessMessage, setReturnSuccessMessage] = useState('');
  const [returnErrorMessage, setReturnErrorMessage] = useState('');
  const [payFineBookSerialNo, setPayFineBookSerialNo] = useState('');
  const [payFineAmount, setPayFineAmount] = useState(0);
  const [payFineSuccessMessage, setPayFineSuccessMessage] = useState('');
  const [payFineErrorMessage, setPayFineErrorMessage] = useState('');

  const handleCheckAvailability = async () => {
    if (!selectedBookNameAvailability) {
      alert('Please select a Book Name.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/books?name=${selectedBookNameAvailability}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        setAvailability(data[0].status);
        setAvailabilityError(null);
      } else {
        setAvailability('Not Found');
        setAvailabilityError(null);
      }
    } catch (err) {
      setAvailabilityError(err.message);
      setAvailability(null);
    }
  };

  const handleIssueRequest = async () => {
    if (!issueBookId || !issueMembershipId || !issueDate || !returnDate) {
      alert('Please fill all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serialNo: parseInt(issueBookId),
          membershipId: parseInt(issueMembershipId),
          issueDate,
          returnDate,
        }),
      });
      if (response.ok) {
        setIssueSuccessMessage('Issue request submitted!');
        setIssueErrorMessage('');
        // Optionally update the book's status in the local state or refetch books
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit issue request');
      }
    } catch (error) {
      setIssueErrorMessage(error.message);
      setIssueSuccessMessage('');
    }
  };

  const handleReturnBook = async () => {
    if (!returnBookSerialNo) {
      alert('Please enter the Serial No of the book to return.');
      return;
    }
    try {
      // In a real scenario, you might update the 'issues' table and the 'books' status
      // JSON Server doesn't easily support complex updates without a backend
      // For this example, we'll just simulate a successful return
      setReturnSuccessMessage(`Book with Serial No ${returnBookSerialNo} returned!`);
      setReturnErrorMessage('');
    } catch (error) {
      setReturnErrorMessage(error.message || 'Failed to return book.');
      setReturnSuccessMessage('');
    }
  };

  const handlePayFine = async () => {
    if (!payFineBookSerialNo || isNaN(payFineAmount) || payFineAmount <= 0) {
      alert('Please enter Book Serial No and a valid Fine Amount.');
      return;
    }
    try {
      // In a real scenario, you'd update membership or fines records
      // JSON Server simulation
      setPayFineSuccessMessage(`Fine of ${payFineAmount} paid for Book Serial No ${payFineBookSerialNo}!`);
      setPayFineErrorMessage('');
    } catch (error) {
      setPayFineErrorMessage(error.message || 'Failed to process fine payment.');
      setPayFineSuccessMessage('');
    }
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

      {showSection === 'isBookAvailable' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Check Book Availability</h3>
          <label style={labelStyle}>Book Name:</label>
          <select
            style={selectStyle}
            value={selectedBookNameAvailability}
            onChange={(e) => setSelectedBookNameAvailability(e.target.value)}
          >
            <option value="">Select Book Name</option>
            <option value="Book 1">Book 1</option>
            <option value="Book 2">Book 2</option>
            <option value="Book 3">Book 3</option>
          </select>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={handleCheckAvailability}
          >
            Search
          </button>
          {availability !== null && <p>Availability: {availability}</p>}
          {availabilityError && <p style={{ color: 'red' }}>Error: {availabilityError}</p>}
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

      {showSection === 'issueBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Request Book Issue</h3>
          <label style={labelStyle}>Book Serial No:</label>
          <input
            type="number"
            style={inputStyle}
            value={issueBookId}
            onChange={(e) => setIssueBookId(e.target.value)}
          />
          <label style={labelStyle}>Membership ID:</label>
          <input
            type="number"
            style={inputStyle}
            value={issueMembershipId}
            onChange={(e) => setIssueMembershipId(e.target.value)}
          />
          <label style={labelStyle}>Issue Date:</label>
          <input
            type="date"
            style={inputStyle}
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
          <label style={labelStyle}>Return Date:</label>
          <input
            type="date"
            style={inputStyle}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
            onClick={handleIssueRequest}
          >
            Request Issue
          </button>
          {issueSuccessMessage && <p style={{ color: 'green' }}>{issueSuccessMessage}</p>}
          {issueErrorMessage && <p style={{ color: 'red' }}>{issueErrorMessage}</p>}
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

      {showSection === 'returnBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Return Book</h3>
          <label style={labelStyle}>Book Serial No:</label>
          <input
            type="number"
            style={inputStyle}
            value={returnBookSerialNo}
            onChange={(e) => setReturnBookSerialNo(e.target.value)}
          />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
            onClick={handleReturnBook}
          >
            Confirm Return
          </button>
          {returnSuccessMessage && <p style={{ color: 'green' }}>{returnSuccessMessage}</p>}
          {returnErrorMessage && <p style={{ color: 'red' }}>{returnErrorMessage}</p>}
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

      {showSection === 'payFine' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Pay Fine</h3>
          <label style={labelStyle}>Book Serial No:</label>
          <input
            type="number"
            style={inputStyle}
            value={payFineBookSerialNo}
            onChange={(e) => setPayFineBookSerialNo(e.target.value)}
          />
          <label style={labelStyle}>Fine Amount:</label>
          <input
            type="number"
            style={inputStyle}
            value={payFineAmount}
            onChange={(e) => setPayFineAmount(parseFloat(e.target.value))}
          />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
            onClick={handlePayFine}
          >
            Pay Fine
          </button>
          {payFineSuccessMessage && <p style={{ color: 'green' }}>{payFineSuccessMessage}</p>}
          {payFineErrorMessage && <p style={{ color: 'red' }}>{payFineErrorMessage}</p>}
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
