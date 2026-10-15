import { useTranslation } from "react-i18next";
import "./Users.css";
import {
  Clock3,
  CheckCircle2,
  UserX,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";

function Users() {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch(
        "http://localhost:3000/users"
      );

      const data = await response.json();

      setUsers(data);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const pendingUsers = users.filter(
    (user) =>
      user.status ===
      "PENDING_APPROVAL"
  );

  const activeUsers = users.filter(
    (user) =>
      user.status === "ACTIVE"
  );

  const disabledUsers = users.filter(
    (user) =>
      user.status === "DISABLED"
  );

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
  {pendingUsers.length}
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
  {activeUsers.length}
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
  {disabledUsers.length}
</div>
  </div>

</div>

      <div className="users-section">
        <h2>
  {t("users.pendingUsers")}

  <span className="users-badge">
  {pendingUsers.length}
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
      {activeUsers.length}
    </span>
  </h2>

  {activeUsers.length === 0 ? (
    <p className="users-empty">
      {t("users.noActiveUsers")}
    </p>
  ) : (
    <table className="users-table">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Société</th>
          <th>Statut</th>
        </tr>
      </thead>

      <tbody>
        {activeUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.company}</td>
            <td>{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
      <div className="users-section">
        <h2>
  {t("users.disabledUsers")}

  <span className="users-badge">
    {disabledUsers.length}
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