import Background from "./components/Background";
import Content from "./components/Content";
import Nav from "./components/Nav";
import "./styles/appStyles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.scss";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ProtectedRoute} from "./components/ProtectedRoute";
import Schedule from "./components/Schedule";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import {JoinToDay} from "./components/modals/JoinToDay";
import {RemoveFromDay} from "./components/modals/RemoveFromDay";

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <React.StrictMode>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Start />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/JoinToDay" element={<JoinToDay />} />
          <Route path="/RemoveFromDay" element={<RemoveFromDay />} />
        </Routes>
      )}
    </React.StrictMode>
  );
}

export default App;
