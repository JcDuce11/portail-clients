import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user) {
    return <Dashboard />;
  }

  return <Login />;
}

export default App;