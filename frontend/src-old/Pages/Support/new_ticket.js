import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../PageCSS/NewTicket.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../defaults";

function NewTicket() {
  const [facilities, setFacilitys] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "open",
    created_at: new Date().toISOString(),
    created_by: localStorage.getItem("user"),
    modified_by: "Username",
    facility_name: "",
    facility_type: "",
    ticket: 0,
    problem: "",
    contact_method: "email",
    email: "",
    phone_number: "",
    voicemail: "", 
    follow_up: false,
    voicemail_time: "",
    caller: "",
    problem_sub_category: "",
    notes: [],
    rawNote: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFacilitys = async (searchTerm) => {
    try {
      var currentPageResponse;
      if (searchTerm === "") {
        currentPageResponse = await axios.get(
          `http://${BASE_URL}/configuration`
        );
      } else {
        currentPageResponse = await axios.get(
          `http://${BASE_URL}/configuration?p=${0}&search=${searchTerm}`
        );
      }
      console.log(currentPageResponse);
      setFacilitys(currentPageResponse.data);
    } catch (error) {
      console.error("There was an error fetching the Facility data!", error);
    }
  };

  useEffect(() => {
    fetchFacilitys(searchTerm);
  }, [searchTerm]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    fetchFacilitys(event.target.value);
    handleChange(event);
    autocomplete(document.getElementById("facility_name"), facilities, () => {
      try {
        var facilityName = document.getElementById("facility_name").value;
        var facilityType = "";
        for (var i = 0; i < facilities.length; i++) {
          console.log(facilities[i].Name === facilityName)
          if (facilities[i].Name === facilityName || facilities[i].FacilityID === facilityName) {
            facilityType = facilities[i].Product;
            break;
          }
        }
        document.getElementById("facility_type").value = facilityType;

      } catch (error) {

      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var finalDataNoRawData = {
        status: formData.status,
        created_at: formData.created_at,
        created_by: formData.created_by,
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
            note: formData.rawNote,
            date: new Date().toISOString(),
            person: "Current User",
          },
        ],
      };
      const response = await axios.post(
        `http://${BASE_URL}/tickets`,
        finalDataNoRawData
      );
      console.log(response);
      console.log(response.data);
      console.log(response.data.ticket);
      setFormData({
        status: "open",
        created_at: new Date().toISOString(),
        created_by: localStorage.getItem("user"),
        modified_by: "",
        facility_name: "",
        facility_type: "",
        ticket: 0,
        problem: "",
        contact_method: "email",
        email: "",
        phone_number: "",
        voicemail: "",
        follow_up: false,
        voicemail_time: "",
        caller: "",
        problem_sub_category: "",
        notes: [],
        rawNote: "",
      });
      navigate("/Support/Ticket/" + response.data.ticket);
    } catch (error) {
      console.error("There was an error creating the ticket!", error);
      alert("Failed to create ticket");
    }
  };

  const renderContactFields = () => {
    switch (formData.contact_method) {
      case "email":
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
      case "phone":
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
      case "voicemail":
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
            Created By:
            <input
              type="text"
              name="created_by"
              value={formData.created_by}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            Facility Name:
            <input
              id="facility_name"
              type="text"
              onChange={handleSearch}
              name="facility_name"
              placeholder="ID or Name"
            />
          </label>
          <label>
            Facility Type:
            <input
              type="text"
              name="facility_type"
              id="facility_type"
              value={formData.facility_type}
              onChange={handleChange}
              disabled
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
              className="note"
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

function jsonToNameArray(json) {
  var nameArray = [];
  for (var i = 0; i < json.length; i++) {
    nameArray.push(json[i].Name);
  }
  return nameArray;
}

function autocomplete(inp, arr, callback = () => { }) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].Name.substr(0, val.length).toUpperCase() === val.toUpperCase() || arr[i].FacilityID.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].Name.substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].Name.substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i].Name + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
    callback();
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
export default NewTicket;
