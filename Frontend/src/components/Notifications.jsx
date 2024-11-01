import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { GoBell } from "react-icons/go";
import { OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";

const socket = io("http://localhost:8000"); // Connect to Socket.IO server

const Notifications = ({ userType, userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("sendreq");
        const url =
          userType === "user"
            ? `http://localhost:8000/api/notifications/user/${userId}`
            : `http://localhost:8000/api/notifications/employee/${userId}`;

        const response = await axios.get(url);
        setNotifications(response.data);
        console.log(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [userType, userId]);

  // Listen for real-time notifications based on user type
  useEffect(() => {
    if (userType === "user") {
      socket.on("receiveUserNotification", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
      });
    } else if (userType === "employee") {
      socket.on("receiveEmployeeNotification", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
      });
    }

    // Clean up the event listener on unmount
    return () => {
      socket.off("receiveUserNotification");
      socket.off("receiveEmployeeNotification");
    };
  }, [userType]);

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="tooltip-notification">Notification</Tooltip>}
    >
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="link"
          bsPrefix="p-0"
          style={{ color: "white", fontSize: "1.5rem" }}
        >
          <span>
            <GoBell />
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxWidth: "300px" }}>
          <div className="dropdown-header">Notifications</div>
          {notifications.length > 0 ? (
            // Only show the latest 5 notifications
            notifications.slice(0, 5).map((notification) => (
              <Dropdown.Item key={notification.notifId} className="text-wrap">
                {notification.message}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item className="text-muted">
              No notifications
            </Dropdown.Item>
          )}

          <Dropdown.Divider />

          <Dropdown.Item href="/notifications" className="text-center">
            Show more
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </OverlayTrigger>
  );
};

export default Notifications;
