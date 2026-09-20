import { useState } from "react";
import "./App.css";
 
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Sidebar from "./components/Sidebar";
 
function App() {
const [page, setPage] = useState("dashboard");
 
const renderPage = () => {
switch (page) {
case "companies":
return <Companies />;
 
default:
return <Dashboard />;
}
};
 
return (
<div className="app">
<Sidebar setPage={setPage} />
 
<main className="content">
{renderPage()}
</main>
</div>
);
}
 
export default App;