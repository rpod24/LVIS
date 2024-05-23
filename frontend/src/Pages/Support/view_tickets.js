import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../PageCSS/ViewTickets.css'
import { useNavigate } from 'react-router-dom';
function ViewTickets() {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets(page, searchTerm);
  }, [page, searchTerm]);

  const fetchTickets = async (page, searchTerm) => {
    try {
      const currentPageResponse = await axios.get(`http://127.0.0.1:5000/tickets?p=${page}&search=${searchTerm}`);
      const nextPageResponse = await axios.get(`http://127.0.0.1:5000/tickets?p=${page + 1}&search=${searchTerm}`);

      if (Array.isArray(currentPageResponse.data) && currentPageResponse.data.length > 0) {
        setTickets(currentPageResponse.data);
        setHasNextPage(Array.isArray(nextPageResponse.data) && nextPageResponse.data.length > 0);
      } else {
        setTickets([]);
        setHasNextPage(false);
      }
    } catch (error) {
      console.error('There was an error fetching the tickets data!', error);
    }
  };

  const handleRowClick = (ticket) => {
    navigate('/Support/Ticket/'+ticket);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page whenever a new search is made
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const renderNotes = (notes, maxLength = 100, maxNotes = 2) => {
    if (!Array.isArray(notes)) {
      return <div>No notes available</div>;
    }
    const limitedNotes = notes.slice(0, maxNotes);
    return (
      <div>
        {limitedNotes.map((note, index) => (
          <div key={index} title={note.note}>
            <strong>{new Date(note.date).toLocaleString()}:</strong> {truncateText(note.note, maxLength)} <em>({note.person})</em>
          </div>
        ))}
        {notes.length > maxNotes && <div>...and {notes.length - maxNotes} more notes</div>}
      </div>
    );
  };

  return (
    <div className="ViewTickets">
      <header className="ViewTickets-header">
        <h1>View Tickets</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Created At</th>
            <th>Modified By</th>
            <th>Facility Name</th>
            <th>Facility Type</th>
            <th>Ticket</th>
            <th>Problem</th>
            <th>Contact Method</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Voicemail</th>
            <th>Follow Up</th>
            <th>Voicemail Time</th>
            <th>Caller</th>
            <th>Problem Category</th>
            <th>Problem Sub Category</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id.$oid} onClick={() => handleRowClick(ticket.ticket)} style={{ cursor: 'pointer' }}>
              <td>{ticket.status}</td>
              <td>{new Date(ticket.created_at).toLocaleString()}</td>
              <td>{ticket.modified_by}</td>
              <td>{ticket.facility_name}</td>
              <td>{ticket.facility_type}</td>
              <td>{ticket.ticket}</td>
              <td>{ticket.problem}</td>
              <td>{ticket.contact_method}</td>
              <td>{ticket.email}</td>
              <td>{ticket.phone_number}</td>
              <td><a href={ticket.voicemail} target="_blank" rel="noopener noreferrer">Voicemail</a></td>
              <td>{ticket.follow_up ? 'Yes' : 'No'}</td>
              <td>{new Date(ticket.voicemail_time).toLocaleString()}</td>
              <td>{ticket.caller}</td>
              <td>{ticket.problem_category}</td>
              <td>{ticket.problem_sub_category}</td>
              <td>{renderNotes(ticket.notes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
        <button onClick={handleNextPage} disabled={!hasNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ViewTickets;