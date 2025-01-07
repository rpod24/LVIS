//Page to add a new Wiki Product, all fields are available to be filled out however name, description, and category are required fields.
// Product Schema, for reference. Empty values are not shown except for name, description, and notes.
// {
//     "name": "",
//     "description": "",
//     "price": -1,
//     "manufacturer": "",
//     "website": "",
//     "category": "",
//     "images": [],
//     "serialNumber": "",
//     "size": "",
//     "monitorSize": "",
//     "length": -1,
//     "model": "",
//     "version": "",
//     "weight": -1,
//     "color": "",
//     "specSheet": "",
//     "manual": "",
//     "notes": "",
//     "SKU": ""
// }
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../defaults';
import { useNavigate } from 'react-router-dom';
import '../../PageCSS/wiki.css';

function NewWikiProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [website, setWebsite] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    const [size, setSize] = useState('');
    const [monitorSize, setMonitorSize] = useState('');
    const [length, setLength] = useState('');
    const [model, setModel] = useState('');
    const [version, setVersion] = useState('');
    const [weight, setWeight] = useState('');
    const [color, setColor] = useState('');
    const [specSheet, setSpecSheet] = useState('');
    const [manual, setManual] = useState('');
    const [notes, setNotes] = useState('');
    const [SKU, setSKU] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = {
            name,
            description,
            price,
            manufacturer,
            files,
            website,
            category,
            files,
            serialNumber,
            size,
            monitorSize,
            length,
            model,
            version,
            weight,
            color,
            specSheet,
            manual,
            notes,
            SKU
        };
        try {
            const formData = new FormData();
            files.forEach((file, index) => {
              formData.append(`file`, file);
            });
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };
            await axios.post(`http://${BASE_URL}/Wiki/New/upload`, formData, config).then((response) => {
                product.files = response.data;
                axios.post(`http://${BASE_URL}/wiki`, product);
            });
            navigate('/wiki');
        } catch (error) {
            console.error(error);
        }
    };

    function handleNewImage(event) {
        setFiles([...event.target.files]);
      }

    return (
        <div className="form-container">
            <br></br>
            <h1>New Wiki Product</h1>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} action='/upload'>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>SKU:</label>
                    <input type="text" value={SKU} onChange={(e) => setSKU(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Manufacturer:</label>
                    <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Website:</label>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="file" multiple onChange={(e) => handleNewImage(e)} />
                </div>
                <div className="form-group">
                    <label>Serial Number:</label>
                    <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Size:</label>
                    <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Monitor Size:</label>
                    <input type="text" value={monitorSize} onChange={(e) => setMonitorSize(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Length:</label>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Model:</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Version:</label>
                    <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Weight:</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Color:</label>
                    <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Spec Sheet:</label>
                    <input type="text" value={specSheet} onChange={(e) => setSpecSheet(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Manual:</label>
                    <input type="text" value={manual} onChange={(e) => setManual(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Notes:</label>
                    <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>

            <br></br>
        </div>
    );

}

export default NewWikiProduct;