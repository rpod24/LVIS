//Similar to customer prospect page just with wikiProducts instead
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../defaults';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import '../../PageCSS/customerPage.css';

function WikiProduct() {
    const params = useParams();
    const [wikiProducts, setWikiProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${BASE_URL}/wiki/${params.id}`);
                setWikiProducts(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [params.id]);

    return (
        <Container>
            <h1>Wiki</h1>
            <div className="wikiProducts">
                <div className="wikiProduct">
                    <h2>{wikiProducts.name}</h2>
                    <p>{wikiProducts.description}</p>
                </div>
                {/* Show images if possilbe */}
                <div className="wikiImage">
                    {wikiProducts.images && wikiProducts.images.map((image) => (
                        <img className='product-image' key={image} src={image} alt={image} />
                    ))}
                </div>
                <div className="wikiProduct">
                    {wikiProducts.price!=""? <p>Price: {wikiProducts.price}</p> : null}
                </div>
            </div>
        </Container>
    );
}

export default WikiProduct;