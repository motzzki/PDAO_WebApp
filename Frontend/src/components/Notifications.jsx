import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { GoBell } from "react-icons/go";
import { OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import { host } from "../apiRoutes";

const socket = io("https://api.pdao-web.online"); // Connect to Socket.IO server

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState({
    birthday: [],
    expired_id: [],
  });
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const url = `${host}/api/notification/user/${userId}`;
        const response = await axios.get(url);
        setNotifications(response.data);
        console.log(response.data); // Log the notifications structure
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    const handleUserBirthdayNotification = (newNotification) => {
      setNotifications((prev) => ({
        ...prev,
        birthday: [newNotification, ...prev.birthday],
      }));
      setHasNewNotifications(true); // Set flag for new notifications
    };

    // Listen for user birthday notifications
    socket.on("birthdayNotification", handleUserBirthdayNotification);

    // Clean up the event listener on unmount
    return () => {
      socket.off("birthdayNotification", handleUserBirthdayNotification);
    };
  }, []);

  const handleDropdownToggle = () => {
    if (hasNewNotifications) {
      setHasNewNotifications(false);
    }
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="tooltip-notification">Notification</Tooltip>}
    >
      <Dropdown align="end" onToggle={handleDropdownToggle}>
        <Dropdown.Toggle
          variant="link"
          bsPrefix="p-0"
          style={{ color: "white", fontSize: "1.5rem", position: "relative" }}
        >
          <span>
            <GoBell />
            {hasNewNotifications && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                !
              </span>
            )}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{ width: "400px", maxHeight: "300px", overflowY: "auto" }}
        >
          <div className="dropdown-header">Notifications</div>
          {notifications.birthday.length > 0 ||
          notifications.expired_id.length > 0 ? (
            <>
              {notifications.birthday.slice(0, 5).map((notification) => (
                <Dropdown.Item key={notification.notifId} className="text-wrap">
                  {notification.message}{" "}
                  <span className="text-danger">(Birthday)</span>
                </Dropdown.Item>
              ))}
              {notifications.expired_id.slice(0, 5).map((notification) => (
                <Dropdown.Item key={notification.notifId} className="text-wrap">
                  {notification.message}{" "}
                  <span className="text-danger">(Expired ID)</span>
                </Dropdown.Item>
              ))}
            </>
          ) : (
            <Dropdown.Item className="text-muted">
              No notifications
            </Dropdown.Item>
          )}

          {/* <Dropdown.Divider /> */}

          {/* <Dropdown.Item href="/notifications" className="text-center">
            Show more
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </OverlayTrigger>
  );
};

export default Notifications;
