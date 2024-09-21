import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const TABLE_HEAD = ["Barangay", "Registered PWD"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Barangay = () => {
  const [barangayInfo, setBarangayInfo] = useState([]);

  useEffect(() => {
    fetchBarangayInfo();
  }, []);

  const fetchBarangayInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/barangay/get_barangay`
      );

      setBarangayInfo(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive className="text-center mt-4">
        <thead className="thead-dark">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {barangayInfo?.map((infos) => (
            <tr key={infos.barangay}>
              <td>{capitalizeFirstLetter(infos.barangay)}</td>
              <td>{infos.Registered}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Barangay;
