import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function Dashboard({ onLogout }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Welcome to Dashboard 🎉</h1>
      <button
        onClick={onLogout}
        className="mt-6 px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Default route → redirect ke login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
