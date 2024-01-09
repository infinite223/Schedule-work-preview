import "./styles/appStyles.scss";
import * as React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import "./index.scss";
import Start from "./pages/Start";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {JoinToDay} from "./components/modals/JoinToDay";
import {RemoveFromDay} from "./components/modals/RemoveFromDay";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";

const Settings = React.lazy(() => import("./pages/Settings"));
const Groups = React.lazy(() => import("./pages/Groups"));
const Schedule = React.lazy(() => import("./components/Schedule/index"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const {user}: any = useAuth();
  return (
    <React.StrictMode>
      <React.Suspense fallback={<Loading />}>
        <Routes location={previousLocation || location}>
          {!user ? (
            <>
              <Route path="/" element={<Start />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </>
          ) : (
            <>
              <Route
                path="/"
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
            </>
          )}
        </Routes>
        {previousLocation && (
          <Routes>
            <Route path="/JoinToDay" element={<JoinToDay />} />
            <Route path="/RemoveFromDay" element={<RemoveFromDay />} />
          </Routes>
        )}
      </React.Suspense>
    </React.StrictMode>
  );
}

export default App;
