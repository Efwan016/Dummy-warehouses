import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Overview from "./pages/Overview";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import OverviewMerchant from "./pages/OverviewMerchant";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./hooks/useAuth";

function AppRoutes() {
  const { user, login, logout } = useAuth(); // Ambil user langsung dari context

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
              <Login onLogin={login} />
            )
          }
        />

        {/* Overview (Dashboard) */}
        <Route
          path="/overview"
          element={
            user ? (
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
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

        {/* Profile */}
        <Route
          path="/profile"
          element={
            user ? (
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <Profile />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <ProductList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <AddProduct />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <EditProduct />
              </div>
            </ProtectedRoute>
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

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
