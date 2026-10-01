import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

function AppContent() {

  const {
    isAuthenticated,
  } = useAuth();

  if (
    isAuthenticated
  ) {
    return <Dashboard />;
  }

  return <Login />;
}

function App() {

  return (
    <AuthProvider>

      <AppContent />

    </AuthProvider>
  );

}

export default App;