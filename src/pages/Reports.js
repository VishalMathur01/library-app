import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Make sure to install moment: npm install moment

const Reports = () => {
  const [showReport, setShowReport] = useState(null);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [errorMovies, setErrorMovies] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [loadingMemberships, setLoadingMemberships] = useState(false);
  const [errorMemberships, setErrorMemberships] = useState(null);
  const [activeIssues, setActiveIssues] = useState([]);
  const [loadingActiveIssues, setLoadingActiveIssues] = useState(false);
  const [errorActiveIssues, setErrorActiveIssues] = useState(null);
  const [overdueReturns, setOverdueReturns] = useState([]);
  const [loadingOverdue, setLoadingOverdue] = useState(false);
  const [errorOverdue, setErrorOverdue] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [errorPending, setErrorPending] = useState(null);

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
    overflowX: 'auto',
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

  useEffect(() => {
    const fetchReportData = async () => {
      setLoadingBooks(true);
      setLoadingMovies(true);
      setLoadingMemberships(true);
      setLoadingActiveIssues(true);
      setLoadingOverdue(true);
      setLoadingPending(true);
      setErrorBooks(null);
      setErrorMovies(null);
      setErrorMemberships(null);
      setErrorActiveIssues(null);
      setErrorOverdue(null);
      setErrorPending(null);

      try {
        const booksResponse = await fetch('http://localhost:5000/books');
        if (!booksResponse.ok) throw new Error(`HTTP error! status: ${booksResponse.status}`);
        setBooks(await booksResponse.json());
      } catch (error) {
        setErrorBooks(error.message);
      } finally {
        setLoadingBooks(false);
      }

      try {
        const moviesResponse = await fetch('http://localhost:5000/movies');
        if (!moviesResponse.ok) throw new Error(`HTTP error! status: ${moviesResponse.status}`);
        setMovies(await moviesResponse.json());
      } catch (error) {
        setErrorMovies(error.message);
      } finally {
        setLoadingMovies(false);
      }

      try {
        const membershipsResponse = await fetch('http://localhost:5000/memberships');
        if (!membershipsResponse.ok) throw new Error(`HTTP error! status: ${membershipsResponse.status}`);
        setMemberships(await membershipsResponse.json());
      } catch (error) {
        setErrorMemberships(error.message);
      } finally {
        setLoadingMemberships(false);
      }

      try {
        const issuesResponse = await fetch('http://localhost:5000/issues?_expand=book&_expand=membership');
        if (!issuesResponse.ok) throw new Error(`HTTP error! status: ${issuesResponse.status}`);
        setActiveIssues(await issuesResponse.json());
      } catch (error) {
        setErrorActiveIssues(error.message);
      } finally {
        setLoadingActiveIssues(false);
      }

      if (showReport === 'overdueReturns') {
        try {
          const response = await fetch('http://localhost:5000/issues?_expand=book&_expand=membership');
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const allIssues = await response.json();

          const currentDate = moment();
          const overdue = allIssues.filter(issue => {
            const returnDate = moment(issue.returnDate);
            return returnDate.isBefore(currentDate, 'day');
          }).map(issue => ({
            ...issue,
            overdueDate: moment(issue.returnDate).format('YYYY-MM-DD'),
            daysOverdue: currentDate.diff(moment(issue.returnDate), 'days'),
            fine: currentDate.diff(moment(issue.returnDate), 'days') * 1, // Basic fine
          }));
          setOverdueReturns(overdue);
        } catch (error) {
          setErrorOverdue(error.message);
        } finally {
          setLoadingOverdue(false);
        }
      }

      if (showReport === 'pendingRequests') {
        try {
          const response = await fetch('http://localhost:5000/issueRequests?_expand=book&_expand=membership');
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          setPendingRequests(await response.json());
        } catch (error) {
          setErrorPending(error.message);
        } finally {
          setLoadingPending(false);
        }
      }
    };

    if (showReport) {
      fetchReportData();
    }
  }, [showReport]);

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

      {showReport === 'masterListBooks' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Master List of Books</h3>
          {loadingBooks && <p>Loading books...</p>}
          {errorBooks && <p style={{ color: 'red' }}>Error loading books: {errorBooks}</p>}
          {!loadingBooks && !errorBooks && (
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
          )}
          <button style={backButtonStyle} onClick={() => setShowReport(null)}>Back</button>
        </div>
      )}

      {showReport === 'masterListMovies' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Master List of Movies</h3>
          {loadingMovies && <p>Loading movies...</p>}
          {errorMovies && <p style={{ color: 'red' }}>Error loading movies: {errorMovies}</p>}
          {!loadingMovies && !errorMovies && (
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
          )}
          <button style={backButtonStyle} onClick={() => setShowReport(null)}>Back</button>
        </div>
      )}

      {showReport === 'masterListMemberships' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Master List of Memberships</h3>
          {loadingMemberships && <p>Loading memberships...</p>}
          {errorMemberships && <p style={{ color: 'red' }}>Error loading memberships: {errorMemberships}</p>}
          {!loadingMemberships && !errorMemberships && (
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
          )}
          <button style={backButtonStyle} onClick={() => setShowReport(null)}>Back</button>
        </div>
      )}

      {showReport === 'activeIssues' && (
        <div style={reportContainerStyle}>
          <h3 style={reportTitleStyle}>Active Issues</h3>
          {loadingActiveIssues && <p>Loading active issues...</p>}
          {errorActiveIssues && <p style={{ color: 'red' }}>Error loading active issues: {errorActiveIssues}</p>}
          {!loadingActiveIssues && (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Issue ID</th>
                  <th style={thStyle}>Book Name</th>
                  <th style={thStyle}>Member Name</th>
                  <th style={thStyle}>Issue Date</th>
                  <th style={thStyle}>Return Date</th>
                </tr>
              </thead>
              <tbody>
                {activeIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td style={tdStyle}>{issue.id}</td>
                    <td style={tdStyle}>{issue.book?.name}</td>
                    <td style={tdStyle}>{issue.membership?.name}</td>
                    <td style={tdStyle}>{issue.issueDate}</td>
                    <td style={tdStyle}>{issue.returnDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button style={backButtonStyle} onClick={() => setShowReport(null)}>Back</button>
        </div>
        )}

        {showReport === 'overdueReturns' && (
          <div style={reportContainerStyle}>
            <h3 style={reportTitleStyle}>Overdue Returns</h3>
            {loadingOverdue && <p>Loading overdue returns...</p>}
            {errorOverdue && <p style={{ color: 'red' }}>Error loading overdue returns: {errorOverdue}</p>}
            {!loadingOverdue && !errorOverdue && overdueReturns.length > 0 && (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Issue ID</th>
                    <th style={thStyle}>Book Name</th>
                    <th style={thStyle}>Member Name</th>
                    <th style={thStyle}>Issue Date</th>
                    <th style={thStyle}>Return Date</th>
                    <th style={thStyle}>Overdue Date</th>
                    <th style={thStyle}>Days Overdue</th>
                    <th style={thStyle}>Fine</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueReturns.map((issue) => (
                    <tr key={issue.id}>
                      <td style={tdStyle}>{issue.id}</td>
                      <td style={tdStyle}>{issue.book?.name}</td>
                      <td style={tdStyle}>{issue.membership?.name}</td>
                      <td style={tdStyle}>{issue.issueDate}</td>
                      <td style={tdStyle}>{issue.returnDate}</td>
                      <td style={tdStyle}>{issue.overdueDate}</td>
                      <td style={tdStyle}>{issue.daysOverdue}</td>
                      <td style={tdStyle}>{issue.fine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loadingOverdue && !errorOverdue && overdueReturns.length === 0 && (
              <p>No overdue returns.</p>
            )}
            <button style={backButtonStyle} onClick={() => setShowReport(null)}>Back</button>
          </div>
        )}
  
        {showReport === 'pendingRequests' && (
          <div style={reportContainerStyle}>
            <h3 style={reportTitleStyle}>Pending Issue Requests</h3>
            {loadingPending && <p>Loading pending requests...</p>}
            {errorPending && <p style={{ color: 'red' }}>Error loading pending requests: {errorPending}</p>}
            {!loadingPending && !errorPending && pendingRequests.length > 0 && (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Request ID</th>
                    <th style={thStyle}>Book Name</th>
                    <th style={thStyle}>Member Name</th>
                    <th style={thStyle}>Requested Date</th>
                    {/* Add other relevant fields based on your 'issueRequests' data */}
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.id}>
                      <td style={tdStyle}>{request.id}</td>
                      <td style={tdStyle}>{request.book?.name}</td>
                      <td style={tdStyle}>{request.membership?.name}</td>
                      <td style={tdStyle}>{request.requestedDate}</td>
                      {/* Add other relevant fields */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loadingPending && !errorPending && pendingRequests.length === 0 && (
              <p>No pending issue requests.</p>
            )}
            <button style={backButtonStyle} onClick={() => setShowReport(null)}>Back</button>
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
