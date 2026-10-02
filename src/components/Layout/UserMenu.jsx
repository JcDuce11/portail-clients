import { useState } from "react";

import { useTranslation } from "react-i18next";

import "./UserMenu.css";

import { useAuth }
from "../../context/AuthContext";

export default function UserMenu({
  user,
}) {

   const { t } =
   useTranslation();
  
    const [open,
    setOpen] =
      useState(false);

    const { logout } = useAuth();

return (

    <div
      className="user-menu"
    >

      <button
        className="user-button"
        onClick={() =>
          setOpen(!open)
        }
      >

        <div
          className="user-info"
        >

          <div
            className="user-name"
          >
            {user.firstname}
            {" "}
            {user.lastname}
          </div>

          <div
            className="user-role"
          >
            {t(`userMenu.${user.role.toLowerCase()}`)}
          </div>

        </div>

        <div
          className="user-avatar"
        >

          AF

        </div>

      </button>

      {open && (

        <div
          className="user-dropdown"
        >

          <div
            className="dropdown-header"
          >

            <div>

              {user.firstname}
              {" "}
              {user.lastname}

            </div>

            <div className="role-badge">

  {t( `userMenu.${user.role.toLowerCase()}`)}

            </div>

          </div>

          <hr />

         <button>
  👤 {t("userMenu.profile")}
</button>

<button>
  🎨 {t("userMenu.preferences")}
</button>

<button>
  🔒 {t("userMenu.security")}
</button>

<button>
  📋 {t("userMenu.history")}
</button>

          {user.role ===
            "SUPER_ADMIN" && (

            <>

              <hr />

            </>

          )}

          <hr />

          <button
onClick={logout}
>
  🚪 {t("userMenu.logout")}
</button>
        </div>

      )}

    </div>

  );

}