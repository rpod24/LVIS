import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../PageCSS/ViewTickets.css'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../defaults";
function Currents() {
  const [facilities, setFacilitys] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFacilitys(page, searchTerm);
  }, [page, searchTerm]);

  const fetchFacilitys = async (page, searchTerm) => {
    try {
      const currentPageResponse = await axios.get(`http://${BASE_URL}/customers?p=${page}&search=${searchTerm}`);
      const nextPageResponse = await axios.get(`http://${BASE_URL}/customers?p=${page + 1}&search=${searchTerm}`);

      if (Array.isArray(currentPageResponse.data) && currentPageResponse.data.length > 0) {
        setFacilitys(currentPageResponse.data);
        setHasNextPage(Array.isArray(nextPageResponse.data) && nextPageResponse.data.length > 0);
      } else {
        setFacilitys([]);
        setHasNextPage(false);
      }
    } catch (error) {
      console.error('There was an error fetching the Facility data!', error);
    }
  };

  const handleRowClick = (facility) => {
    navigate('/Customer/'+facility);
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

  return (
    <div className="ViewTickets">
      <header className="ViewTickets-header">
        <h1>View Facilities</h1>
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
            {/* Facility, product, version, isntall date, ship date, room numbers?, wifi?, next step */}
            <th>Facility</th>
            <th>Product</th>
            <th>Version</th>
            <th>Install Date</th>
            <th>Ship Date</th>
            <th>Has Room Numbers</th>
            <th>Has Wifi</th>
            <th>Next Step</th>
          </tr>
        </thead>
        <tbody>
          {facilities
            .filter((facility) => {
              console.log(facility);
              return facility.status == "Active"? facility : null;
            })
            .map((facility) => (
              <tr
                key={facility._id.$oid}
                onClick={() => handleRowClick(facility._id.$oid)}
                style={{ cursor: "pointer" }}
              >
                {/* Facility, product, version, isntall date, ship date, room numbers?, wifi?, next step */}
                <td>{facility.facilityName}</td>
                <td>{facility.product}</td>
                <td>{facility.productVersion}</td>
                <td>{new Date(facility.installationDate).toLocaleString()}</td>
                <td>{facility.roomList.length > 0}</td>
                <td>{facility.wifi.length > 0}</td>
                <td>{facility.nextStep}</td>
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

export default Currents;