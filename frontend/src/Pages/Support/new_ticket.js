// src/components/NewTicket/NewTicket.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../PageCSS/NewTicket.css"; // Import your custom CSS file
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

  useEffect(() => {
    fetchFacilitys(searchTerm);
  }, [searchTerm]);

  const fetchFacilitys = async (searchTerm) => {
    try {
      var currentPageResponse;
      if (searchTerm === "") {
        currentPageResponse = await axios.get(
          `http://${BASE_URL}/facilities`
        );
      } else {
        currentPageResponse = await axios.get(
          `http://${BASE_URL}/facilities?p=${0}&search=${searchTerm}`
        );
      }
      console.log(currentPageResponse);
      setFacilitys(currentPageResponse.data);
    } catch (error) {
      console.error("There was an error fetching the Facility data!", error);
    }
  };

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
    console.log(jsonToNameArray(facilities))
    console.log((facilities[0]))
    autocomplete(document.getElementById("myInput"), jsonToNameArray(facilities));
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
        "http://${BASE_URL}/tickets",
        finalDataNoRawData
      );
      // Reset form after successful submission
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
          {/* <label>
            Facility Name:
            <input
              type="text"
              name="facility_name"
              value={formData.facility_name}
              onChange={handleSearch}
              list="facility_name"
              required
            />
            <datalist id="facility_name">
              <option>Option</option>
              <option>Option2</option>
              {
                console.log(facilities)}
              {
              facilities.length > 0 ? <option>Option</option>:  (
                facilities.map((facility) => (
                  <option >{facility.name}</option>
                ))
              )}
            </datalist>
          </label> */}
          <label>
            Facility Name:
            <input
              id="myInput"
              type="text"
              onChange={handleSearch}
              name="myCountry"
              placeholder="Country"
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

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
export default NewTicket;
