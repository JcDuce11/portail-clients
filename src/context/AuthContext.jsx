import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [currentPage, setCurrentPage] =
  useState("dashboard");

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, []);

  const login = (
    userData
  ) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  const isAuthenticated =
  !!user;

  return (
    <AuthContext.Provider
  value={{
    user,
    login,
    logout,
    isAuthenticated,
    currentPage,
    setCurrentPage
  }}
>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(
    AuthContext
  );
};