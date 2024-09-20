import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment'


const TABLE_HEAD = [

  "User Id",
   "First Name",
   "Middle Name",
   "Last Name",
   "Contact Number",
   "Email",
   "Age",
   "Gender",
   "Birthdate",
   "Blood Type",
   "Nationality",
   "Action"
]

const RegisteredPwd = () => {

  const [registeredPwd, setRegisteredPwd] = useState([]) 

  useEffect(() =>{
    fetchRegistered();
  },[])

  const fetchRegistered = async () => {

    try {
      const response = await axios.get(`http://localhost:8000/api/pwdInfo/pwd_info`);

      setRegisteredPwd(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  

  return <div>
       <Table striped bordered hover responsive>
      <thead>
        <tr>
        {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                  >
                      {head}
                  </th>
                ))}
        </tr>
      </thead>
      <tbody>
              {registeredPwd?.map((infos) => {
                //const birthDateObj = new Date(infos.date_of_birth);
                return(
                  <tr key={infos.userId}>
                    <td>
                      {infos.userId}
                    </td>
                    <td>
                      {infos.first_name}
                    </td>
                    <td>
                      {infos.middle_name}
                    </td>
                    <td>
                      {infos.last_name}
                    </td>
                    <td>
                      {infos.contact_num}
                    </td>
                    <td>
                      {infos.email}
                    </td>
                    <td>
                      {infos.age}
                    </td>
                    <td>
                      {infos.gender}
                    </td>
                    <td>
                      {/* {`${birthDateObj.getMonth() + 1}/${birthDateObj.getDate()}/${birthDateObj.getFullYear()}`} */}
                      {moment(infos.date_of_birth).format("MMM DD, YYYY")}
                    </td>
                    <td>
                      {infos.blood_type}
                    </td>
                    <td>
                      {infos.nationality}
                    </td>
                  </tr>
                );
              })}
      </tbody>
    </Table> 
  </div>;
};

export default RegisteredPwd;
