import "./styles/appStyles.scss";
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import Information from "./pages/Information";
import {AssignPerson} from "./components/modals/AssignPerson";
import {EditUserModal} from "./components/modals/EditUserModal";
import {StartNewUser} from "./components/modals/StartNewUser";

const Settings = React.lazy(() => import("./pages/Settings"));
const Groups = React.lazy(() => import("./pages/Groups"));
const Schedule = React.lazy(() => import("./components/Schedule/index"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ReleaseNotes = React.lazy(() => import("./pages/ReleaseNotes"));

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
  const [localGroups, setLocalGroups] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // control reads, secure limits
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
    // get groups data form firebase
    setLoading(true);
    const groupsRef = collection(db, "groups");

    const unsubscribe = onSnapshot(groupsRef, async (snapchot) => {
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
      setLocalGroups(_groups);

      dispatch(setReadsCounter(1));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // update redux state groups/selected group
    if (localGroups) {
      setLoading(true);
      const findMyGroups = localGroups.filter((g: any) => {
        return g.users.find((u: any) => u.uid === user?.uid);
      });

      if (findMyGroups.length === 1) {
        dispatch(setGroup(findMyGroups[0]));
      } else if (localGroups.length === 0) {
        notify({
          message: "Poproś administratora o utworzenie grupy" + reads,
          status: "error",
          title: "Brak grup w bazie",
        });
        signOut(auth);
      } else {
        dispatch(setGroup(localGroups[0]));
      }
      dispatch(setGroups(localGroups));
      setLoading(false);
    }
  }, [localGroups, user]);

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
              <Route
                path="/ReleaseNotes"
                element={
                  <ProtectedRoute>
                    <ReleaseNotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Information"
                element={
                  <ProtectedRoute>
                    <Information />
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
            <Route path="/AssignPerson" element={<AssignPerson />} />
            <Route path="/EditUserModal" element={<EditUserModal />} />
            <Route path="/StartNewUser" element={<StartNewUser />} />
          </Routes>
        )}
      </React.Suspense>
    </React.StrictMode>
  );
}

export default App;
