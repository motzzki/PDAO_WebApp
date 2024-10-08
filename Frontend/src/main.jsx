import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./layout/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
