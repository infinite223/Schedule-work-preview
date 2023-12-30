import {createContext, useContext, useState, useEffect, useMemo} from "react";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../services/firebaseConfig";
import {User, onAuthStateChanged} from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState("");

  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        const getUser = async () => {
          const user: any = await getDoc(doc(db, "users", _user.uid));

          if (user.exists()) {
            setUser(user.data());
          }
        };

        getUser();
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });

    return () => {
      unlisten();
    };
  }, []);

  const memoedValue = useMemo(
    () => ({
      user,
      userType,
      setUser,
      setUserType,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
