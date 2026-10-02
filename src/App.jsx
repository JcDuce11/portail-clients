import Login from "./pages/login";
import Configuration from "./pages/Configuration";
import Dashboard from "./pages/Dashboard";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

function AppContent() {

  const {
  isAuthenticated,
  currentPage
} = useAuth();

  if (!isAuthenticated) {
  return <Login />;
}

switch (currentPage) {

  case "configuration":
    return <Configuration />;

  case "dashboard":
  default:
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