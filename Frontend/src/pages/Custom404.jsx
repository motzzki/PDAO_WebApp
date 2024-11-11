import React from "react";
import { Link } from "react-router-dom";
import background from "../images/bg_pdao.jpg";

const Custom404 = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)", // Apply blur effect
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, color: "#1f2937" }}>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: "4rem", marginBottom: "0.5rem" }}
          className="text-black open-sans-bold"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontSize: "1.5rem" }}
          className="text-black open-sans-bold"
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ marginTop: "2rem" }}
        >
          <Link
            to="/"
            style={{
              padding: "0.5rem 1.5rem",
              fontSize: "1.2rem",
              color: "#fff",
              backgroundColor: "#3b82f6",
              borderRadius: "0.375rem",
              textDecoration: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Custom404;
