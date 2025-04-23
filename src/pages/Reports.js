import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [showReport, setShowReport] = useState(null);

  // Dummy Data for Reports
  const books = [
    { serialNo: 1001, name: 'Book 1', author: 'Author 1', category: 'Science', status: 'Available', cost: 500, procurementDate: '2023-01-01' },
    { serialNo: 1002, name: 'Book 2', author: 'Author 2', category: 'Fiction', status: 'Unavailable', cost: 400, procurementDate: '2023-02-01' },
  ];

  const movies = [
    { serialNo: 2001, name: 'Movie 1', director: 'Director 1', category: 'Action', status: 'Available', cost: 800, procurementDate: '2023-03-01' },
    { serialNo: 2002, name: 'Movie 2', director: 'Director 2', category: 'Comedy', status: 'Unavailable', cost: 600, procurementDate: '2023-04-01' },
  ];

  const memberships = [
    { id: 1, name: 'Member 1', contactNumber: '1234567890', contactAddress: 'Address 1', aadhaarCardNo: '1234-5678-9012', startDate: '2023-01-01', endDate: '2024-01-01', status: 'Active', amountPending: 0 },
    { id: 2, name: 'Member 2', contactNumber: '0987654321', contactAddress: 'Address 2', aadhaarCardNo: '9876-5432-1098', startDate: '2023-02-01', endDate: '2024-02-01', status: 'Inactive', amountPending: 500 },
  ];

  const activeIssues = [
    { serialNo: 1001, bookMovie: 'Book 1', membershipId: 1, issueDate: '2023-01-01', returnDate: '2023-01-15' },
    { serialNo: 2001, bookMovie: 'Movie 1', membershipId: 2, issueDate: '2023-02-01', returnDate: '2023-02-15' },
  ];

  const overdueReturns = [
    { serialNo: 1001, book: 'Book 1', membershipId: 1, issueDate: '2023-01-01', returnDate: '2023-01-15', fine: 100 },
    { serialNo: 2001, book: 'Movie 1', membershipId: 2, issueDate: '2023-02-01', returnDate: '2023-02-15', fine: 200 },
  ];

  const pendingRequests = [
    { membershipId: 1, bookMovie: 'Book 1', requestedDate: '2023-01-01', requestFulfilledDate: '2023-01-05' },
    { membershipId: 2, bookMovie: 'Movie 1', requestedDate: '2023-02-01', requestFulfilledDate: '2023-02-05' },
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
        Reports
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
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowReport('masterListMovies')}
        >
          Master List of Movies
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowReport('masterListMemberships')}
        >
          Master List of Memberships
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowReport('activeIssues')}
        >
          Active Issues
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowReport('overdueReturns')}
        >
          Overdue Returns
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => setShowReport('pendingRequests')}
        >
          Pending Issue Requests
        </button>
      </div>

      {/* Master List of Books */}
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

      {/* Master List of Movies */}
      {showReport === 'masterListMovies' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Master List of Movies</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Serial No</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Director</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Cost</th>
                <th style={thStyle}>Procurement Date</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.serialNo}>
                  <td style={tdStyle}>{movie.serialNo}</td>
                  <td style={tdStyle}>{movie.name}</td>
                  <td style={tdStyle}>{movie.director}</td>
                  <td style={tdStyle}>{movie.category}</td>
                  <td style={tdStyle}>{movie.status}</td>
                  <td style={tdStyle}>{movie.cost}</td>
                  <td style={tdStyle}>{movie.procurementDate}</td>
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

      {/* Master List of Memberships */}
      {showReport === 'masterListMemberships' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Master List of Memberships</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Membership ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Contact Number</th>
                <th style={thStyle}>Contact Address</th>
                <th style={thStyle}>Aadhaar Card No</th>
                <th style={thStyle}>Start Date</th>
                <th style={thStyle}>End Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Amount Pending</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((membership) => (
                <tr key={membership.id}>
                  <td style={tdStyle}>{membership.id}</td>
                  <td style={tdStyle}>{membership.name}</td>
                  <td style={tdStyle}>{membership.contactNumber}</td>
                  <td style={tdStyle}>{membership.contactAddress}</td>
                  <td style={tdStyle}>{membership.aadhaarCardNo}</td>
                  <td style={tdStyle}>{membership.startDate}</td>
                  <td style={tdStyle}>{membership.endDate}</td>
                  <td style={tdStyle}>{membership.status}</td>
                  <td style={tdStyle}>{membership.amountPending}</td>
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

      {/* Active Issues */}
      {showReport === 'activeIssues' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Active Issues</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Serial No</th>
                <th style={thStyle}>Book/Movie</th>
                <th style={thStyle}>Membership ID</th>
                <th style={thStyle}>Issue Date</th>
                <th style={thStyle}>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {activeIssues.map((issue) => (
                <tr key={issue.serialNo}>
                  <td style={tdStyle}>{issue.serialNo}</td>
                  <td style={tdStyle}>{issue.bookMovie}</td>
                  <td style={tdStyle}>{issue.membershipId}</td>
                  <td style={tdStyle}>{issue.issueDate}</td>
                  <td style={tdStyle}>{issue.returnDate}</td>
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

      {/* Overdue Returns */}
      {showReport === 'overdueReturns' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Overdue Returns</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Serial No</th>
                <th style={thStyle}>Book</th>
                <th style={thStyle}>Membership ID</th>
                <th style={thStyle}>Issue Date</th>
                <th style={thStyle}>Return Date</th>
                <th style={thStyle}>Fine Calculated</th>
              </tr>
            </thead>
            <tbody>
              {overdueReturns.map((overdue) => (
                <tr key={overdue.serialNo}>
                  <td style={tdStyle}>{overdue.serialNo}</td>
                  <td style={tdStyle}>{overdue.book}</td>
                  <td style={tdStyle}>{overdue.membershipId}</td>
                  <td style={tdStyle}>{overdue.issueDate}</td>
                  <td style={tdStyle}>{overdue.returnDate}</td>
                  <td style={tdStyle}>{overdue.fine}</td>
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

      {/* Pending Issue Requests */}
      {showReport === 'pendingRequests' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Pending Issue Requests</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Membership ID</th>
                <th style={thStyle}>Book/Movie</th>
                <th style={thStyle}>Requested Date</th>
                <th style={thStyle}>Request Fulfilled Date</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.membershipId}>
                  <td style={tdStyle}>{request.membershipId}</td>
                  <td style={tdStyle}>{request.bookMovie}</td>
                  <td style={tdStyle}>{request.requestedDate}</td>
                  <td style={tdStyle}>{request.requestFulfilledDate}</td>
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

export default Reports;