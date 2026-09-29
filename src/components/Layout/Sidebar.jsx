import { useTranslation } from "react-i18next";

import {
  sidebarModules,
} from "../../config/sidebarModules";

import "./Sidebar.css";

export default function Sidebar() {

  const { t } =
    useTranslation();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {
      role: "SUPER_ADMIN",
    };
    
    return (

    <aside className="sidebar">

      <div className="sidebar-logo">

  <div className="sidebar-company-name">
     MSP
  </div>

  <div className="sidebar-company-subtitle">
    {t("sidebar.portal")}
  </div>

</div>

      <nav>

        {sidebarModules[
  user.role
]?.map((item) => (

          <button
            key={item.key}
          >

            {item.icon}
            {" "}

            {t(
              `menu.${item.key}`
            )}

          </button>

        ))}

      </nav>

    </aside>

  );

}
