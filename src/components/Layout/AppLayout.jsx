import Header from "./Header";
import Sidebar from "./Sidebar";

import "./AppLayout.css";

export default function AppLayout({
  children,
}) {

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="app-main">

        <Header />

        <div className="app-content">

          {children}

        </div>

      </div>

    </div>

  );

}