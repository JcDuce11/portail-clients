import Login from "./pages/login";
import Configuration from "./pages/Configuration";
import Dashboard from "./pages/Dashboard";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

function AppContent() {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
}

function App() {

  return (
    <AuthProvider>

      <AppContent />

    </AuthProvider>
  );

}

export default App;