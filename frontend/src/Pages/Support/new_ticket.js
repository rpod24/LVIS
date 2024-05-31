// src/components/NewTicket/NewTicket.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../PageCSS/NewTicket.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

function NewTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: 'open',
    created_at: new Date().toISOString(),
    modified_by: 'Username',
    facility_name: '',
    facility_type: '',
    ticket: 0,
    problem: '',
    contact_method: 'email',
    email: '',
    phone_number: '',
    voicemail: '',
    follow_up: false,
    voicemail_time: '',
    caller: '',
    problem_sub_category: '',
    notes: [],
    rawNote: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var finalDataNoRawData = {
        status: formData.status,
        created_at: formData.created_at,
        modified_by: formData.modified_by,
        facility_name: formData.facility_name,
        facility_type: formData.facility_type,
        ticket: formData.ticket,
        problem: formData.problem,
        contact_method: formData.contact_method,
        email: formData.email,
        phone_number: formData.phone_number,
        voicemail: formData.voicemail,
        follow_up: formData.follow_up,
        voicemail_time: formData.voicemail_time,
        caller: formData.caller,
        problem_sub_category: formData.problem_sub_category,
        notes: [
          {
            "note": formData.rawNote,
            "date": new Date().toISOString(),
            "person": "Current User"
          },
        ]
      }
      const response = await axios.post('http://127.0.0.1:5000/tickets', finalDataNoRawData);
      // Reset form after successful submission
      console.log(response);
      console.log(response.data);
      console.log(response.data.ticket);
      setFormData({
        status: 'open',
        created_at: new Date().toISOString(),
        modified_by: 'Username',
        facility_name: '',
        facility_type: '',
        ticket: 0,
        problem: '',
        contact_method: 'email',
        email: '',
        phone_number: '',
        voicemail: '',
        follow_up: false,
        voicemail_time: '',
        caller: '',
        problem_sub_category: '',
        notes: [],
        rawNote: '',
      });
      navigate('/Support/Ticket/'+response.data.ticket)
    } catch (error) {
      console.error('There was an error creating the ticket!', error);
      alert('Failed to create ticket');
    }
  };

  const renderContactFields = () => {
    switch (formData.contact_method) {
      case 'email':
        return (
          <label key="email">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        );
      case 'phone':
        return (
          <label key="phone_number">
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </label>
        );
        case 'voicemail':
          return (
            <>
              <label key="phone_number">
                Phone Number:
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </label>
              <label key="voicemail">
                Voicemail File:
                <input
                  type="file"
                  name="voicemail"
                  onChange={handleChange}
                  required
                />
              </label>
              <label key="voicemail_time">
                Voicemail Time:
                <input
                  type="datetime-local"
                  name="voicemail_time"
                  value={formData.voicemail_time}
                  onChange={handleChange}
                  required
                />
              </label>
              <label key="caller">
                Caller:
                <input
                  type="text"
                  name="caller"
                  value={formData.caller}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className="NewTicket">
      <header className="NewTicket-header">
        <h1>Open a New Ticket</h1>
      </header>
      <form onSubmit={handleSubmit} className="NewTicket-form">
        <div className="form-section">
          <label>
            Modified By:
            <input
              type="text"
              name="modified_by"
              value={formData.modified_by}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            Facility Name:
            <input
              type="text"
              name="facility_name"
              value={formData.facility_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Facility Type:
            <input
              type="text"
              name="facility_type"
              value={formData.facility_type}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-section">
          <label>
            Contact Method:
            <select
              name="contact_method"
              value={formData.contact_method}
              onChange={handleChange}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="voicemail">Voicemail</option>
            </select>
          </label>
          {renderContactFields()}
        </div>

        <div className="form-section">
          <label>
            Problem:
            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Problem Sub Category:
            <input
              type="text"
              name="problem_sub_category"
              value={formData.problem_sub_category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-section">
          <label>
            Notes:
            <textarea
            className='note'
              type="text"
              name="rawNote"
              value={formData.rawNote}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Open Ticket</button>
      </form>
    </div>
  );
}

export default NewTicket;
