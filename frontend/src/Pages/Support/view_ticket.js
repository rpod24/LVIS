// src/components/Ticket/Ticket.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../PageCSS/ViewTicket.css'; // Import your custom CSS file
import { useParams } from 'react-router-dom';

function Ticket() {
  const {id} = useParams();
  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [problem, setProblem] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const [formData, setFormData] = useState({
    status: '',
    facility_name: '',
    facility_type: '',
    problem: '',
    contact_method: '',
    email: '',
    phone_number: '',
    voicemail: '',
    follow_up: false,
    voicemail_time: '',
    caller: '',
    problem_sub_category: ''
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/tickets?ticket=${id}`);
        console.log(response.data[0]);
        setTicket(response.data[0]);
        setProblem(response.data[0].problem);
        setNotes(response.data[0].notes);
        setFormData({
          status: response.data[0].status,
          facility_name: response.data[0].facility_name,
          facility_type: response.data[0].facility_type,
          problem: response.data[0].problem,
          contact_method: response.data[0].contact_method,
          email: response.data[0].email,
          phone_number: response.data[0].phone_number,
          voicemail: response.data[0].voicemail,
          follow_up: response.data[0].follow_up,
          voicemail_time: response.data[0].voicemail_time,
          caller: response.data[0].caller,
          problem_sub_category: response.data[0].problem_sub_category
        });
      } catch (error) {
        console.error('There was an error fetching the ticket data!', error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    console.log('Saving changes...');
    console.log(ticket);
    for (const key in formData) {
      if (formData[key] !== ticket[key]) {
        ticket[key] = formData[key];
      }
    }
    if(!ticket.modified_by.includes(localStorage.getItem('user'))){
      var editTicket = ticket;
      editTicket.modified_by += `, ${localStorage.getItem('user')}`;
      setTicket(editTicket);
    }
    try {
      await axios.put(`http://127.0.0.1:5000/tickets?ticket=${id}`, ticket);
      // alert('Ticket updated successfully');
      setIsEditing(false);
      setTicket({ ...ticket, ...formData });
    } catch (error) {
      // console.log()
      if(error.response.status==405){
        alert('You did not edit the ticket');
      }
      console.error('There was an error updating the ticket!', error);
    }
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const updatedNotes = [...notes, { note: newNote, date: new Date().toISOString(), person: 'Current User' }];
    ticket.notes = updatedNotes;
    try {
      await axios.put(`http://127.0.0.1:5000/tickets?ticket=${id}`, ticket);
      setNotes(updatedNotes);
      setNewNote('');
    } catch (error) {
      console.error('There was an error adding the note!', error);
    }
  };

  if (!ticket) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="ViewTicket">
      <header className="ViewTicket-header">
        <h1>Ticket Details</h1>
        <button onClick={handleToggleEdit}>{isEditing ? 'Cancel Edit' : 'Edit Ticket'}</button>
        {isEditing && <button onClick={handleSaveChanges}>Save Changes</button>}
      </header>
      <div className="ticket-details">
        <div className="row">
          <p><strong>Status:</strong>
            {isEditing ? (
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            ) : (
              ticket.status
            )}
          </p>
          <p><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
          <p><strong>Modified By:</strong> {ticket.modified_by}</p>
        </div>
        <div className="row">
          <p><strong>Facility Name:</strong>
            {isEditing ? (
              <input
                type="text"
                name="facility_name"
                value={formData.facility_name}
                onChange={handleInputChange}
              />
            ) : (
              ticket.facility_name
            )}
          </p>
          <p><strong>Facility Type:</strong>
            {isEditing ? (
              <input
                type="text"
                name="facility_type"
                value={formData.facility_type}
                onChange={handleInputChange}
              />
            ) : (
              ticket.facility_type
            )}
          </p>
          <p><strong>Ticket:</strong> {ticket.ticket}</p>
        </div>
        <div className="row">
          <p><strong>Problem:</strong>
            {isEditing ? (
              <input
                type="text"
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
              />
            ) : (
              problem
            )}
          </p>
          <p><strong>Problem Sub Category:</strong>
            {isEditing ? (
              <input
                type="text"
                name="problem_sub_category"
                value={formData.problem_sub_category}
                onChange={handleInputChange}
              />
            ) : (
              ticket.problem_sub_category
            )}
          </p>
        </div>
        <div className="row">
          <p><strong>Contact Method:</strong>
            {isEditing ? (
              <select
                name="contact_method"
                value={formData.contact_method}
                onChange={handleInputChange}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="voicemail">Voicemail</option>
              </select>
            ) : (
              ticket.contact_method
            )}
          </p>
          {formData.contact_method === 'email' && (
            <p><strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                ticket.email
              )}
            </p>
          )}
          {(formData.contact_method === 'phone' || formData.contact_method === 'voicemail') && (
            <p><strong>Phone Number:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              ) : (
                ticket.phone_number
              )}
            </p>
          )}
        </div>
        {formData.contact_method === 'voicemail' && (
          <div className="row">
            <p><strong>Voicemail File:</strong>
              {isEditing ? (
                <input
                  type="file"
                  name="voicemail"
                  onChange={handleInputChange}
                />
              ) : (
                <a href={ticket.voicemail} target="_blank" rel="noopener noreferrer">Listen</a>
              )}
            </p>
            <p><strong>Voicemail Time:</strong>
              {isEditing ? (
                <input
                  type="datetime-local"
                  name="voicemail_time"
                  value={formData.voicemail_time}
                  onChange={handleInputChange}
                />
              ) : (
                new Date(ticket.voicemail_time).toLocaleString()
              )}
            </p>
            <p><strong>Caller:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="caller"
                  value={formData.caller}
                  onChange={handleInputChange}
                />
              ) : (
                ticket.caller
              )}
            </p>
          </div>
        )}
        <div className="row">
          <p><strong>Follow Up:</strong>
            {isEditing ? (
              <input
                type="checkbox"
                name="follow_up"
                checked={formData.follow_up}
                onChange={handleInputChange}
              />
            ) : (
              ticket.follow_up ? 'Yes' : 'No'
            )}
          </p>
        </div>
        <div>
          <strong>Notes:</strong>
          {notes.map((note, index) => (
            <div key={index}>
              <p>{new Date(note.date).toLocaleString()}: {note.note} <em>({note.person})</em></p>
            </div>
          ))}
        </div>
        <div>
          <textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={handleNoteChange}
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
