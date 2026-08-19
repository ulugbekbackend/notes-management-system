import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* /dashboard and /settings previously had no auth guard at all --
          anyone could open them directly by URL without logging in. */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default App;
