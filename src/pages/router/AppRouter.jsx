import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRouter() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            user
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}