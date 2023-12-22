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
} from "react-router-dom";
import "./index.scss";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ProtectedRoute} from "./components/ProtectedRoute";
import Schedule from "./components/Schedule";

function App() {
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.StrictMode>
  );
}

export default App;
