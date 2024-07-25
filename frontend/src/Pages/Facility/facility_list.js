import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../PageCSS/ViewFacilities.css'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../defaults";

function ViewFacilities() {
    const [facilities, setFacilities] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'null', direction: -1 });
    const navigate = useNavigate();

    useEffect(() => {
        fetchFacilities(page, searchTerm, sortConfig.key, sortConfig.direction);
    }, [page, searchTerm]);

    const fetchFacilities = async (page, searchTerm, sort, sortDir) => {
        try {
            console.log(sort);
            var url = `http://${BASE_URL}/configuration?p=${page}`
            var urlNext = `http://${BASE_URL}/configuration?p=${page + 1}`
            if (searchTerm !== 'null') {
                url+= `&search=${searchTerm}`
            }
            if (sort !== 'null') {
                url+= `&sort={"${sort}": ${sortDir}}`
            }
            console.log(url)
            const currentPageResponse = await axios.get(url);
            const nextPageResponse = await axios.get(urlNext);

            if (Array.isArray(currentPageResponse.data) && currentPageResponse.data.length > 0) {
                setFacilities(currentPageResponse.data);
                setHasNextPage(Array.isArray(nextPageResponse.data) && nextPageResponse.data.length > 0);
            } else {
                setFacilities([]);
                setHasNextPage(false);
            }
        } catch (error) {
            console.error('There was an error fetching the facilities data!', error);
        }
    };

    const handleRowClick = (facility) => {
        navigate('/Configuration/' + facility);
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

    const handleSort = (key) => {
        console.log(key);
        var sort;
        switch (key) {
            case 'Name':
                sort = 'Name';
                break;
            case 'Location':
                sort = 'City';
                break;
            case 'Facility ID':
                sort = 'FacilityID';
                break;
            case 'Phone':
                sort = 'Phone';
                break;
            case 'Primary Contact':
                sort = 'PrimaryContact';
                break;
            default:
                sort = 'FacilityID';
        }
        console.log(sortConfig.direction);
        if(sortConfig.direction > 0) {
            setSortConfig({ key:sort, direction: -1 });
            fetchFacilities(page, searchTerm, sort, -1);
        }
        else {
            setSortConfig({ key:sort, direction: 1 });
            fetchFacilities(page, searchTerm, sort, 1);
        }
    };

    return (
        <div className="ViewFacilities">
            <header className="ViewFacilities-header">
                <h1>View facilities</h1>
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
                        <th onClick={() => handleSort('Name')}>Name</th>
                        <th onClick={() => handleSort('Location')}>Location</th>
                        <th onClick={() => handleSort('FacilityID')}>Facility ID</th>
                        <th onClick={() => handleSort('Phone')}>Phone</th>
                        <th onClick={() => handleSort('PrimaryContact')}>Primary Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {facilities.map(facility => (
                        <tr key={facility._id.$oid} onClick={() => handleRowClick(facility.FacilityID)} style={{ cursor: 'pointer' }}>
                            <td>{facility.Name}</td>
                            <td>{facility.City}, {facility.PartitionKey.slice(0, 2)}</td>
                            <td>{facility.FacilityID}</td>
                            <td>{facility.Phone}</td>
                            <td>{facility.PrimaryContact}</td>
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

export default ViewFacilities;
