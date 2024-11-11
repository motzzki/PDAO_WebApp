import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "react-bootstrap";
import axios from "axios";
import { host } from "../apiRoutes"; // Adjust your API base URL
import Swal from "sweetalert2"; // Import SweetAlert2

const BirthdayCashGift = () => {
  const [birthdays, setBirthdays] = useState([]); // Store fetched birthdays
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [totalClaimed, setTotalClaimed] = useState(0); // Store total claimed
  const [totalUnclaimed, setTotalUnclaimed] = useState(0); // Store total unclaimed

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get(
          `${host}/api/user_management/current-birthdays`
        );
        setBirthdays(response.data.birthdays); // Store birthdays in state
        setTotalClaimed(response.data.totalClaimed); // Store total claimed
        setTotalUnclaimed(response.data.totalUnclaimed); // Store total unclaimed
        setLoading(false);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
        setError("Failed to load birthdays");
        setLoading(false);
      }
    };

    fetchBirthdays(); // Fetch birthdays on mount
  }, []);

  // Handle claim action with SweetAlert confirmation
  const handleClaim = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to claim the cash gift for this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, claim it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const claimType = "birthday"; // You can modify this based on different claim types
          const response = await axios.post(
            `${host}/api/user_management/claim`,
            {
              userId,
              claimType,
            }
          );

          Swal.fire("Claimed!", response.data.message, "success"); // Show success message

          // Update the claimed status of the user in the local state to disable the button
          setBirthdays((prevState) =>
            prevState.map(
              (user) =>
                user.userId === userId ? { ...user, claim_tag: 1 } : user // Update claim_tag to 1
            )
          );
          // Optionally update the total claimed count if needed
          setTotalClaimed((prevTotal) => prevTotal + 1);
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to claim the gift",
            "error"
          );
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="fs-1 open-sans-bold">Cash Gift</CardTitle>
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Legend for total claimed and unclaimed */}
            <div className="mb-3">
              <strong>Legend:</strong>
              <span
                className="badge bg-success mx-2"
                style={{ fontSize: "14px" }}
              >
                Claimed: {totalClaimed}
              </span>
              <span
                className="badge bg-danger mx-2"
                style={{ fontSize: "14px" }}
              >
                Unclaimed: {totalUnclaimed}
              </span>
            </div>

            <Table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {birthdays.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>
                      {user.first_name} {user.middle_name} {user.last_name}
                    </td>
                    <td>{user.gender}</td>
                    <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleClaim(user.userId)}
                        disabled={user.claim_tag === 1} // Disable if claim_tag is 1 (claimed)
                      >
                        {user.claim_tag === 1 ? "Claimed" : "Claim"}{" "}
                        {/* Show text based on claim_tag */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default BirthdayCashGift;
