import React from 'react';
import '../PageCSS/frontPage.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function createTicket() {
    navigate("/Support/CreateTicket");
  }

  function tickets() {
    navigate("/Support/Tickets");
  }

  return (
    <div className="Home">
      <br></br>
      <div>
        <input type="text" placeholder="Search for a Customer" />
        <button onClick={createTicket}>Open a new ticket</button>
        <button onClick={tickets}>View all tickets</button>
      </div>
    </div>
  );
}

export default Home;
