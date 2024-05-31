import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Facility() {
  const param = useParams();
  var facilityData;

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        var url = `http://127.0.0.1:5000/facility/${param.id}`
        console.log(url)
        facilityData = (await axios.get(url)).data;
        console.log(facilityData)
      } catch (error) {
        console.error('There was an error fetching the facilities data!', error);
      }
    }
    fetchFacility();
  });
  return (
    <div>
      <h1>Facility</h1>
      <Sidebar>
        <Menu>
          <MenuItem> Facility </MenuItem>
          <MenuItem> Contacts </MenuItem>
          <MenuItem> CMS </MenuItem>
          <MenuItem> REA </MenuItem>
        </Menu>
      </Sidebar>
      {/*  */}
    </div>
  );
}

export default Facility;
