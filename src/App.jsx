import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFound from "./components/NotFound";
import AddUsers from "./components/AddUsers";
import UserCreation from "./components/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="users" element={<Users />} />
        <Route path="create-user" element={<AddUsers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
