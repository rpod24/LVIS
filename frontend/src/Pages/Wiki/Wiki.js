//Similar to inventory page just with wikiProducts instead of inventory
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./wiki.css";
import { BASE_URL } from "../../defaults";


function Wiki() {
    const [wikiProducts, setWikiProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${BASE_URL}/wiki`);
                setWikiProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleProductClick = (product) => {
        console.log(product);
        console.log(Object.keys(product));
        navigate(`/wiki/${product._id}`);
    };

    return (
        <div>
            <br></br>
            <h1>Wiki</h1>
            <button onClick={() => navigate("/Wiki/New")}>Create New Wiki Product</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {wikiProducts.map((product) => (
                        <tr key={product} className="wikiProduct" onClick={() => handleProductClick(product)}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.files && product.files[0] && <img className="productThumbnail" src={product.files[0]} alt={product.files[0]} />}</td>
                            <td>{product.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    );  
}

export default Wiki;