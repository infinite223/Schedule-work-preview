import "./styles/appStyles.scss";
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import "./index.scss";
import Start from "./pages/Start";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {JoinToDay} from "./components/modals/JoinToDay";
import {RemoveFromDay} from "./components/modals/RemoveFromDay";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";
import Page404 from "./pages/404Page";
import {useDispatch, useSelector} from "react-redux";
import {
  selectedReadsCounter,
  setReadsCounter,
} from "./slices/readsCounterSlice";
import {setUpNotifications, useNotifications} from "reapop";
import {signOut} from "firebase/auth";
import {auth, db} from "./services/firebaseConfig";
import {setGroups} from "./slices/groupsSlice";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {GroupFirebase, GroupLocal, User} from "./Utilis/types";
import {setGroup} from "./slices/selectedGroupSlice";

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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const previousLocation = location.state?.previousLocation;
  const {user}: any = useAuth();
  const reads = useSelector(selectedReadsCounter);
  const {notify} = useNotifications();

  useEffect(() => {
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

  useEffect(() => {
    setLoading(true);
    const groupsRef = collection(db, "groups");

    const unsubscribe = onSnapshot(groupsRef, async (snapchot) => {
      console.log("get groups from firebase");
      const firebaseGroups: GroupFirebase[] = snapchot.docs.map(
        (doc: any, i) => {
          return doc.data();
        }
      );
      let _groups: GroupLocal[] = [];
      for (let i = 0; i < firebaseGroups.length; i++) {
        if (firebaseGroups[i].users.length > 0) {
          const usersRef = query(
            collection(db, "users"),
            where("uid", "in", firebaseGroups[i].users)
          );
          const querySnapshot = await getDocs(usersRef);
          dispatch(setReadsCounter(1));
          const users: User[] = querySnapshot.docs.map((doc: any) => {
            return doc.data();
          });
          _groups.push({
            id: firebaseGroups[i].id,
            name: firebaseGroups[i].name,
            users,
          });
        } else {
          _groups.push({
            id: firebaseGroups[i].id,
            name: firebaseGroups[i].name,
            users: [],
          });
        }
      }
      const findMyGroup = _groups.find((g) =>
        g?.users?.find((u) => u?.uid === user?.uid)
      );
      if (findMyGroup) {
        dispatch(setGroup(findMyGroup));
      } else {
        dispatch(setGroup(_groups[0]));
      }
      dispatch(setGroups(_groups));
      dispatch(setReadsCounter(1));
      setLoading(false);
    });

    console.log("da");
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

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
