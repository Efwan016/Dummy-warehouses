import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Overview from "./pages/Overview";
import Sidebar from "./components/Sidebar";
import OverviewMerchant from "./pages/OverviewMerchant";

function App() {
  const [user, setUser] = useState(null);

  // Biar login persistent
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (username, role) => {
    const newUser = { username, roles: [role] };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/overview" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Overview (Dashboard) */}
        <Route
          path="/overview"
          element={
            user ? (
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={handleLogout} />
                {/* kalau role user merchant → ke OverviewMerchant */}
                {user.roles.includes("merchant") ? (
                  <OverviewMerchant />
                ) : (
                  <Overview />
                )}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Default → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
