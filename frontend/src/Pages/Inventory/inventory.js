//http://127.0.0.1:5000/products
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../PageCSS/Inventory.css'; // Import your custom CSS file

function Inventory() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isDetailedView, setIsDetailedView] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems(page, searchTerm);//Fetches the products and runs other coroutines see fetchItems
  }, [page, searchTerm]);

  const fetchItems = async (page, searchTerm) => {
    try {
      const currentPageResponse = await axios.get(`http://127.0.0.1:5000/products?p=${page}&search=${searchTerm}`); //Fetches the current 50 products for the user
      const nextPageResponse = await axios.get(`http://127.0.0.1:5000/products?p=${page + 1}&search=${searchTerm}`); //Prefetches the next 50 products for the user

      if (Array.isArray(currentPageResponse.data) && currentPageResponse.data.length > 0) {//Stops the page index from going below 0 and hides the prev button when at page 0
        setItems(currentPageResponse.data);
        setHasNextPage(Array.isArray(nextPageResponse.data) && nextPageResponse.data.length > 0);
      } else {
        setItems([]);
        setHasNextPage(false);
      }
    } catch (error) {
      console.error('There was an error fetching the inventory data!', error);
    }
  };

  const handleRowClick = (item) => { //TODO: Implement loading the product page with all of its inventory
    // alert(`Item: ${item.itemName}\nModel: ${item.model}\nSKU: ${item.sku}`);
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
    <div className="Inventory">
      <header className="Inventory-header">
        <h1>Inventory</h1>
        <button onClick={() => setIsDetailedView(!isDetailedView)}>
          {isDetailedView ? 'Switch to Simplified View' : 'Switch to Detailed View'}
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      {isDetailedView ? (
        <table>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Manufacturer</th>
              <th>Item Name</th>
              <th>Model</th>
              <th>SKU</th>
              <th>Dimensions (LxWxH)</th>
              <th>Weight (g)</th>
              <th>Barcode</th>
              <th>Unit Cost ($)</th>
              <th>Unit Price ($)</th>
              <th>Min Threshold</th>
              <th>Tags</th>
              <th>Spec Sheet</th>
              <th>Part Number</th>
              <th>Notes</th>
              <th>Units on Hand</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id.$oid} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                <td><img src={item.productImage} alt={item.itemName} width="50" /></td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.manufacturer}</td>
                <td>{item.itemName}</td>
                <td>{item.model}</td>
                <td>{item.sku}</td>
                <td>{`${item.dimensions.length} x ${item.dimensions.width} x ${item.dimensions.height}`}</td>
                <td>{item.weight}</td>
                <td>{item.barCode}</td>
                <td>{item.unitCost}</td>
                <td>{item.unitPrice}</td>
                <td>{item.minimumItemThreshold}</td>
                <td>{item.tags.join(', ')}</td>
                <td><a href={item.specSheet} target="_blank" rel="noopener noreferrer">View Spec Sheet</a></td>
                <td>{item.partNumber}</td>
                <td>{item.notes}</td>
                <td>{item.unitsOnHand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid-view">
          {items.map((item, index) => (
            <div key={item._id.$oid} className="grid-item" onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
              <img src={item.productImage} alt={item.itemName} width="100" />
              <p>{item.itemName}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
        <button onClick={handleNextPage} disabled={!hasNextPage}>Next</button>
      </div>
    </div>
  );
}

export default Inventory;