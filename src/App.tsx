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
import Page404 from "./pages/404Page";
import {useSelector} from "react-redux";
import {selectedReadsCounter} from "./slices/readsCounterSlice";
import {setUpNotifications, useNotifications} from "reapop";
import {signOut} from "firebase/auth";
import {auth} from "./services/firebaseConfig";

const Settings = React.lazy(() => import("./pages/Settings"));
const Groups = React.lazy(() => import("./pages/Groups"));
const Schedule = React.lazy(() => import("./components/Schedule/index"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

setUpNotifications({
  defaultProps: {
    position: "bottom-right",
    dismissAfter: 2000,
    dismissible: true,
  },
});

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const {user}: any = useAuth();
  const reads = useSelector(selectedReadsCounter);
  const {notify} = useNotifications();

  React.useEffect(() => {
    console.log("xd ", reads);
    if (reads > 200) {
      notify({
        message: "Problem z nadmiarową ilością zapytań.... " + reads,
        status: "error",
        title: "Duża ilość zapytań do bazy",
      });

      if (reads > 300) {
        notify({
          message: "Problem z nadmiarową ilością zapytań.... " + reads,
          status: "error",
          title: "Wylogowywanie...",
        });

        signOut(auth);
      }
    }
  }, [reads]);

  return (
    <React.StrictMode>
      <React.Suspense fallback={<Loading />}>
        <Routes location={previousLocation || location}>
          <Route path="*" element={<Page404 />} />

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
