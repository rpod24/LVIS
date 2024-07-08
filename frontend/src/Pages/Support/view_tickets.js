import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../PageCSS/ViewTickets.css";
import { useNavigate } from "react-router-dom";

function ViewTickets() {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "null", direction: -1 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets(page, searchTerm, sortConfig.key, sortConfig.direction);
  }, [page, searchTerm]);

  const fetchTickets = async (page, searchTerm, sort, sortDir) => {
    try {
      console.log(sort);
      console.log(sortDir);
      var url = `http://127.0.0.1:5000/tickets?p=${page}`;
      var urlNext = `http://127.0.0.1:5000/tickets?p=${page + 1}`;

      if (searchTerm !== "null") {
        url += `&search=${searchTerm}`;
      }
      if (sort !== "null") {
        url += `&sort={"${sort}": ${sortDir}}`;
      }
      //
      const currentPageResponse = await axios.get(url);
      const nextPageResponse = await axios.get(urlNext);

      if (
        Array.isArray(currentPageResponse.data) &&
        currentPageResponse.data.length > 0
      ) {
        setTickets(currentPageResponse.data);
        setHasNextPage(
          Array.isArray(nextPageResponse.data) &&
            nextPageResponse.data.length > 0
        );
      } else {
        setTickets([]);
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("There was an error fetching the tickets data!", error);
    }
  };

  const handleRowClick = (ticket) => {
    navigate("/Support/Ticket/" + ticket);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page whenever a new search is made
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
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
            <strong>{new Date(note.date).toLocaleString()}:</strong>{" "}
            {truncateText(note.note, maxLength)} <em>({note.person})</em>
          </div>
        ))}
        {notes.length > maxNotes && (
          <div>...and {notes.length - maxNotes} more notes</div>
        )}
      </div>
    );
  };

  const handleSort = (key) => {
    console.log(key);
    var sort;
    switch (key) {
      case "Status":
        sort = "status";
        break;
      case "Created At":
        sort = "created_at";
        break;
      case "Modified By":
        sort = "modified_by";
        break;
      case "Facility Name":
        sort = "facility_name";
        break;
      case "Facility Type":
        sort = "facility_type";
        break;
      case "Ticket":
        sort = "ticket";
        break;
      case "Problem":
        sort = "problem";
        break;
      case "Contact Method":
        sort = "contact_method";
        break;
      case "Email":
        sort = "email";
        break;
      case "Phone Number":
        sort = "phone_number";
        break;
      case "Voicemail":
        sort = "voicemail";
        break;
      case "Follow Up":
        sort = "follow_up";
        break;
      case "Voicemail Time":
        sort = "voicemail_time";
        break;
      case "Caller":
        sort = "caller";
        break;
      case "Problem Category":
        sort = "problem_category";
        break;
      case "Problem Sub Category":
        sort = "problem_sub_category";
        break;
      case "Notes":
        sort = "notes";
        break;
      default:
        sort = "status";
        break;
    }
    console.log(sortConfig.direction);
    if(sortConfig.direction > 0) {
        setSortConfig({ key:sort, direction: -1 });
        fetchTickets(page, searchTerm, sort, -1);
    }
    else {
        setSortConfig({ key:sort, direction: 1 });
        fetchTickets(page, searchTerm, sort, 1);
    }
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
            <th onClick={() => handleSort("Status")}>Status</th>
            <th onClick={() => handleSort("Created At")}>Created At</th>
            <th onClick={() => handleSort("Modified By")}>Modified By</th>
            <th onClick={() => handleSort("Facility Name")}>Facility Name</th>
            <th onClick={() => handleSort("Facility Type")}>Facility Type</th>
            <th onClick={() => handleSort("Ticket")}>Ticket</th>
            <th onClick={() => handleSort("Problem")}>Problem</th>
            <th onClick={() => handleSort("Contact Method")}>Contact Method</th>
            <th onClick={() => handleSort("Email")}>Email</th>
            <th onClick={() => handleSort("Phone Number")}>Phone Number</th>
            <th onClick={() => handleSort("Voicemail")}>Voicemail</th>
            <th onClick={() => handleSort("Follow Up")}>Follow Up</th>
            <th onClick={() => handleSort("Voicemail Time")}>Voicemail Time</th>
            <th onClick={() => handleSort("Caller")}>Caller</th>
            <th onClick={() => handleSort("Problem Category")}>Problem Category</th>
            <th onClick={() => handleSort("Problem Sub Category")}>Problem Sub Category</th>
            <th onClick={() => handleSort("Notes")}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket._id.$oid}
              onClick={() => handleRowClick(ticket.ticket)}
              style={{ cursor: "pointer" }}
            >
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
              <td>
                <a
                  href={ticket.voicemail}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voicemail
                </a>
              </td>
              <td>{ticket.follow_up ? "Yes" : "No"}</td>
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
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewTickets;
