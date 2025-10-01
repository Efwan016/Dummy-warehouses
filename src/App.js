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

import WarehouseList from "./pages/warehouses/WarehouseList";
import AddWarehouse from "./pages/warehouses/AddWarehouse";
import EditWarehouse from "./pages/warehouses/EditWarehouse";

import CategoryList from "./pages/categories/CategoryList";
import AddCategory from "./pages/categories/AddCategory";
import EditCategory from "./pages/categories/EditCategory";

import MerchantList from "./pages/merchants/MerchantList";
import AddMerchant from "./pages/merchants/AddMerchant";
import EditMerchant from "./pages/merchants/EditMerchant";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import UserList from "./pages/users/UserList";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";

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

        {/* Warehouses Routes */}
        <Route
          path="/warehouses"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <WarehouseList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/warehouses/add"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <AddWarehouse />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/warehouses/edit/:id"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <EditWarehouse />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Categories Routes */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <CategoryList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/add"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <AddCategory />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <EditCategory />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Merchants Routes */}
        <Route
          path="/merchants"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <MerchantList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/merchants/add"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <AddMerchant />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/merchants/edit/:id"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <EditMerchant />
              </div>
            </ProtectedRoute>
          }
        />

        {/* User Management Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <UserList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <AddUser />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute roles={["manager"]}>
              <div className="flex h-screen">
                <Sidebar user={user} onLogout={logout} />
                <EditUser />
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
