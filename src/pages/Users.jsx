import { useTranslation } from "react-i18next";
import "./Users.css";
import {
  Clock3,
  CheckCircle2,
  UserX,
  UserPlus,
} from "lucide-react";


function Users() {
  const { t } = useTranslation();

  return (
    <div className="users-page">
      <div className="users-header">
  <h1>{t("users.title")}</h1>

  <button
    className="users-add-button"
    onClick={() =>
      console.log("Invite user")
    }
  >
    <UserPlus size={18} />
    {t("users.invite")}
  </button>
</div>

      <div className="users-stats">

  <div className="users-stat-card">
    <Clock3
      size={24}
      className="users-stat-icon pending"
    />

    <div className="users-stat-card-title">
      {t("users.pending")}
    </div>

    <div className="users-stat-card-value">
      0
    </div>
  </div>

  <div className="users-stat-card">
    <CheckCircle2
      size={24}
      className="users-stat-icon active"
    />

    <div className="users-stat-card-title">
      {t("users.active")}
    </div>

    <div className="users-stat-card-value">
      0
    </div>
  </div>

  <div className="users-stat-card">
    <UserX
      size={24}
      className="users-stat-icon disabled"
    />

    <div className="users-stat-card-title">
      {t("users.disabled")}
    </div>

    <div className="users-stat-card-value">
      0
    </div>
  </div>

</div>

      <div className="users-section">
        <h2>
  {t("users.pendingUsers")}

  <span className="users-badge">
    0
  </span>
</h2>

        <p className="users-empty">
          {t("users.noPendingUsers")}
        </p>
      </div>

      <div className="users-section">
        <h2>
  {t("users.activeUsers")}

  <span className="users-badge">
    0
  </span>
</h2>

        <p className="users-empty">
          {t("users.noActiveUsers")}
        </p>
      </div>

      <div className="users-section">
        <h2>
  {t("users.disabledUsers")}

  <span className="users-badge">
    0
  </span>
</h2>

        <p className="users-empty">
          {t("users.noDisabledUsers")}
        </p>
      </div>
    </div>
  );
}

export default Users;