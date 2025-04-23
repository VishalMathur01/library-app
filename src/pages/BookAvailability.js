import React from 'react';
import { Link } from 'react-router-dom';

const BookAvailability = () => {
  // Dummy search results
  const books = [
    { name: 'Book 1', author: 'Author 1', serialNo: 1001, available: 'Yes' },
    { name: 'Book 2', author: 'Author 2', serialNo: 1002, available: 'No' },
  ];

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
        Book Availability
      </h2>

      <div style={{
        width: '95%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: '30px',
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
              <th style={{ padding: '15px', textAlign: 'left' }}>Book Name</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Author</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Serial No</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Available</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Select to Issue</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.serialNo} style={{ backgroundColor: book.available === 'No' ? '#ffebee' : '#f9f9f9' }}>
                <td style={{ padding: '12px' }}>{book.name}</td>
                <td style={{ padding: '12px' }}>{book.author}</td>
                <td style={{ padding: '12px' }}>{book.serialNo}</td>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: book.available === 'Yes' ? 'bold' : 'normal', color: book.available === 'Yes' ? '#2e7d32' : '#d32f2f' }}>
                  {book.available}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}><input type="radio" name="selectBook" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/transactions" style={{
        color: '#2196f3',
        textDecoration: 'none',
        fontSize: '1em',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#1976d2')}
      onMouseLeave={(e) => (e.target.style.color = '#2196f3')}
      >
        Back to Transactions
      </Link>
    </div>
  );
};

export default BookAvailability;