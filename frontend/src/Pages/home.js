import React from 'react';
import '../PageCSS/frontPage.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <br></br>
      <div>
        <input type="text" placeholder="Search for a Customer" />
        <button onClick={navigate("/Support/CreateTicket")}>Open a new ticket</button>
        <button onClick={navigate("/Support/Tickets")}>View all tickets</button>
      </div>
    </div>
  );
}

export default Home;
