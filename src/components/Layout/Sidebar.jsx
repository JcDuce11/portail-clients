import { useTranslation } from "react-i18next";

import { useState } from "react";

import {
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

import {
  LayoutDashboard,
  Ticket,
  BookOpen,
  Wrench,
  FileText,
  Calculator,
  Users,
  Boxes,
  Settings
} from "lucide-react";

import {
  sidebarModules,
} from "../../config/sidebarModules.jsx";

import "./Sidebar.css";

export default function Sidebar() {

  const icons = {
  dashboard: LayoutDashboard,
  tickets: Ticket,
  documentation: BookOpen,
  interventions: Wrench,
  contracts: FileText,
  quotes: Calculator,
  users: Users,
  services: Boxes,
  settings: Settings,
};
  
  const [collapsed, setCollapsed] = useState(false);
  
  const { t } =
    useTranslation();

 // TODO AUTH
// À supprimer lors de la mise en place du login MariaDB

const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || {
    id: 1,
    firstname: "Alexandre",
    lastname: "FOURMY",
    role: "SUPER_ADMIN",
    email: "admin@test.local"
  };

console.log("SIDEBAR RENDER");
console.log("USER =", user);

    return (
  <aside
    className={`sidebar ${
      collapsed ? "collapsed" : ""
    }`}
  >

<button
  className="collapse-btn"
  onClick={() => setCollapsed(!collapsed)}
>
  {collapsed ? (
    <PanelLeftOpen size={18} />
  ) : (
    <PanelLeftClose size={18} />
  )}
</button>

    <div className="sidebar-header">

      <div className="logo-circle">
        LOGO
      </div>

      {!collapsed && (
        <>
          <div className="sidebar-company-name">
            MSP Portal
          </div>

          <div className="sidebar-company-subtitle">
            {t("sidebar.portal")}
          </div>

          <div className="sidebar-user-role">
            {user.role}
          </div>
        </>
      )}
    </div>

<div className="sidebar-divider"></div>

    <nav>
      {sidebarModules[user.role]?.map(
        (item) => (
          <button
            key={item.key}
            type="button"
          >
            <span>
              {item.icon}
            </span>

            {!collapsed &&
              t(`menu.${item.key}`)}
          </button>
        )
      )}
    </nav>

  </aside>
);

}
