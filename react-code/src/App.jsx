import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider } from "./Authentication/AuthContext";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import Bookings from "./components/Bookings";
import RegisteredUsersPage from "./components/RegisteredUsersPage";
import About from "./components/About";
import Register from "./components/Register";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/user-dashboard"
              element={<ProtectedRoute element={<UserDashboard />} />}
            />
            <Route
              path="/admin-dashboard"
              element={<ProtectedRoute element={<AdminDashboard />} />}
            />
            <Route
              path="/ambulance-booking"
              element={<ProtectedRoute element={<Bookings />} />}
            />
            <Route
              path="/registered-user"
              element={<ProtectedRoute element={<RegisteredUsersPage />} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
