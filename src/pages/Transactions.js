import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Transactions = () => {
  const [showSection, setShowSection] = useState(null);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [issues, setIssues] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedMembershipId, setSelectedMembershipId] = useState('');
  const [issueDate, setIssueDate] = useState(moment().format('YYYY-MM-DD'));
  const [returnDate, setReturnDate] = useState(moment().add(7, 'days').format('YYYY-MM-DD'));
  const [returnBookId, setReturnBookId] = useState('');
  const [payFineIssueId, setPayFineIssueId] = useState('');
  const [finePaid, setFinePaid] = useState(false);
  const [actualReturnDate, setActualReturnDate] = useState(moment().format('YYYY-MM-DD'));
  const [remarks, setRemarks] = useState('');
  const [calculatedFine, setCalculatedFine] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const booksResponse = await fetch('http://localhost:5000/books');
        const membershipsResponse = await fetch('http://localhost:5000/memberships');
        const issuesResponse = await fetch('http://localhost:5000/issues?_expand=book&_expand=membership');
        const finesResponse = await fetch('http://localhost:5000/fines');

        if (!booksResponse.ok || !membershipsResponse.ok || !issuesResponse.ok || !finesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        setBooks(await booksResponse.json());
        setMemberships(await membershipsResponse.json());
        setIssues(await issuesResponse.json());
        setFines(await finesResponse.json());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const findBookById = (id) => books.find(book => book.id === parseInt(id));
  const findMembershipById = (id) => memberships.find(member => member.id === parseInt(id));
  const findIssueById = (id) => issues.find(issue => issue.id === parseInt(id));
  const findFineByIssueId = (issueId) => fines.find(fine => fine.issueId === parseInt(issueId));

  const handleSearch = () => {
    if (!selectedBookId) {
      alert('Please select a Book Name.');
      return;
    }
    const book = findBookById(selectedBookId);
    if (book) {
      alert(`Book "${book.name}" by ${book.author} is currently ${book.status}.`);
    } else {
      alert('Book not found.');
    }
    setShowSection(null);
  };

  const handleIssueBook = async () => {
    if (!selectedBookId || !selectedMembershipId || !issueDate || !returnDate) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: parseInt(selectedBookId),
          membershipId: parseInt(selectedMembershipId),
          issueDate,
          returnDate,
        }),
      });

      if (response.ok) {
        alert('Book issued successfully!');
        setIssues([...issues, await response.json()]);
        setShowSection(null);
      } else {
        alert('Failed to issue book.');
      }
    } catch (error) {
      console.error('Error issuing book:', error);
      alert('An error occurred while issuing the book.');
    }
  };

  const handleReturnBook = async () => {
    if (!returnBookId || !actualReturnDate) {
      alert('Please select a Book and provide the return date.');
      return;
    }

    const issueToReturn = findIssueById(returnBookId);
    if (!issueToReturn) {
      alert('Issue not found.');
      return;
    }

    const expectedReturnDate = moment(issueToReturn.returnDate);
    const actualReturn = moment(actualReturnDate);
    let fineAmount = 0;

    if (actualReturn.isAfter(expectedReturnDate, 'day')) {
      const daysOverdue = actualReturn.diff(expectedReturnDate, 'days');
      fineAmount = daysOverdue * 5;
    }

    try {
      await fetch(`http://localhost:5000/issues/${returnBookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ returnedDate: actualReturnDate }),
      });

      if (fineAmount > 0) {
        const fineResponse = await fetch('http://localhost:5000/fines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ issueId: parseInt(returnBookId), amount: fineAmount, paid: false }),
        });
        if (fineResponse.ok) {
          setFines([...fines, await fineResponse.json()]);
        } else {
          console.error('Error creating fine record');
        }
      }

      alert(`Book returned successfully! Fine: $${fineAmount}`);
      const updatedIssues = issues.map(issue =>
        issue.id === parseInt(returnBookId) ? { ...issue, returnedDate: actualReturnDate } : issue
      );
      setIssues(updatedIssues);
      setShowSection(null);
    } catch (error) {
      console.error('Error returning book:', error);
      alert('An error occurred while returning the book.');
    }
  };

  const handlePayFine = async () => {
    if (!payFineIssueId) {
      alert('Please select an Issue ID to pay the fine for.');
      return;
    }

    try {
      const fineToPay = findFineByIssueId(payFineIssueId);
      if (!fineToPay) {
        alert('No fine found for this Issue ID.');
        return;
      }

      const response = await fetch(`http://localhost:5000/fines/${fineToPay.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paid: finePaid }),
      });

      if (response.ok) {
        alert('Fine payment status updated successfully!');
        const updatedFines = fines.map(fine =>
          fine.id === fineToPay.id ? { ...fine, paid: finePaid } : fine
        );
        setFines(updatedFines);
        setShowSection(null);
      } else {
        alert('Failed to update fine payment status.');
      }
    } catch (error) {
      console.error('Error updating fine payment:', error);
      alert('An error occurred while updating the fine payment status.');
    }
  };

  const calculateFineAmount = (issueId) => {
    const issue = findIssueById(issueId);
    if (issue && !issue.returnedDate) {
      const expectedReturnDate = moment(issue.returnDate);
      const currentDate = moment();
      if (currentDate.isAfter(expectedReturnDate, 'day')) {
        const daysOverdue = currentDate.diff(expectedReturnDate, 'days');
        setCalculatedFine(daysOverdue * 5);
      } else {
        setCalculatedFine(0);
      }
    } else if (issue && issue.returnedDate) {
      const expectedReturnDate = moment(issue.returnDate);
      const actualReturnDate = moment(issue.returnedDate);
      if (actualReturnDate.isAfter(expectedReturnDate, 'day')) {
        const daysOverdue = actualReturnDate.diff(expectedReturnDate, 'days');
        setCalculatedFine(daysOverdue * 5);
      } else {
        setCalculatedFine(0);
      }
    } else {
      setCalculatedFine(0);
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

  if (loading) {
    return <div>Loading transactions data...</div>;
  }

  if (error) {
    return <div>Error loading transactions data: {error}</div>;
  }

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

      {showSection === 'isBookAvailable' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Check Book Availability</h3>
          <label style={labelStyle}>Book Name:</label>
          <select
            style={selectStyle}
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
          >
            <option value="">Select Book Name</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>{book.name}</option>
            ))}
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

      {showSection === 'issueBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Issue Book</h3>
          <label style={labelStyle}>Book Name:</label>
          <select
            style={selectStyle}
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
          >
            <option value>Select Book Name</option>
            {books.filter(book => book.status === 'Available').map((book) => (
              <option key={book.id} value={book.id}>{book.name}</option>
            ))}
          </select>
          {selectedBookId && (
            <label style={labelStyle}>Author:</label>
          )}
          {selectedBookId && (
            <input
              type="text"
              style={inputStyle}
              value={findBookById(selectedBookId)?.author || ''}
              readOnly
            />
          )}
          <label style={labelStyle}>Membership ID:</label>
          <select
            style={selectStyle}
            value={selectedMembershipId}
            onChange={(e) => setSelectedMembershipId(e.target.value)}
          >
            <option value="">Select Membership ID</option>
            {memberships.map((member) => (
              <option key={member.id} value={member.id}>{member.name} (ID: {member.id})</option>
            ))}
          </select>
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
            min={issueDate}
          />
          <label style={labelStyle}>Remarks (Optional):</label>
          <textarea style={textareaStyle} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
            onClick={handleIssueBook}
          >
            Confirm Issue
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

      {showSection === 'returnBook' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Return Book</h3>
          <label style={labelStyle}>Issue ID:</label>
          <select
            style={selectStyle}
            value={returnBookId}
            onChange={(e) => setReturnBookId(e.target.value)}
          >
            <option value="">Select Issue ID</option>
            {issues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.book?.name} (Issue ID: {issue.id}, Member: {issue.membership?.name})
              </option>
            ))}
          </select>
          {returnBookId && (
            <>
              <label style={labelStyle}>Book Name:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(returnBookId)?.book?.name || ''}
                readOnly
              />
              <label style={labelStyle}>Member Name:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(returnBookId)?.membership?.name || ''}
                readOnly
              />
              <label style={labelStyle}>Issue Date:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(returnBookId)?.issueDate || ''}
                readOnly
              />
              <label style={labelStyle}>Expected Return Date:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(returnBookId)?.returnDate || ''}
                readOnly
              />
            </>
          )}
          <label style={labelStyle}>Actual Return Date:</label>
          <input
            type="date"
            style={inputStyle}
            value={actualReturnDate}
            onChange={(e) => setActualReturnDate(e.target.value)}
          />
          <label style={labelStyle}>Remarks (Optional):</label>
          <textarea style={textareaStyle} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          <button
            style={confirmButtonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
            onClick={handleReturnBook}
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

      {showSection === 'payFine' && (
        <div style={formContainerStyle}>
          <h3 style={formTitleStyle}>Pay Fine</h3>
          <label style={labelStyle}>Issue ID:</label>
          <select
            style={selectStyle}
            value={payFineIssueId}
            onChange={(e) => setPayFineIssueId(e.target.value)}
          >
            <option value="">Select Issue ID</option>
            {issues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.book?.name} (Issue ID: {issue.id}, Member: {issue.membership?.name})
              </option>
            ))}
          </select>
          {payFineIssueId && (
            <>
              <label style={labelStyle}>Book Name:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(payFineIssueId)?.book?.name || ''}
                readOnly
              />
              <label style={labelStyle}>Member Name:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(payFineIssueId)?.membership?.name || ''}
                readOnly
              />
              <label style={labelStyle}>Expected Return Date:</label>
              <input
                type="text"
                style={inputStyle}
                value={findIssueById(payFineIssueId)?.returnDate || ''}
                readOnly
              />
              <label style={labelStyle}>Fine Amount:</label>
              <input
                type="number"
                style={inputStyle}
                value={findFineByIssueId(payFineIssueId)?.amount || 0}
                readOnly
              />
              <label style={labelStyle}>Fine Paid:</label>
              <div>
                <input
                  type="checkbox"
                  style={{ marginRight: '5px' }}
                  checked={finePaid}
                  onChange={(e) => setFinePaid(e.target.checked)}
                /> Paid
              </div>
              <label style={labelStyle}>Remarks (Optional):</label>
              <textarea style={textareaStyle} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              <button
                style={confirmButtonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, confirmButtonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, confirmButtonStyle)}
                onClick={handlePayFine}
              >
                Confirm Payment
              </button>
            </>
          )}
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
