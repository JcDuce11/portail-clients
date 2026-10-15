import { useTranslation } from "react-i18next";
import "./Users.css";
import {
  Clock3,
  CheckCircle2,
  UserX,
  UserPlus,
  Eye,
  Pencil,
  Ban,
  Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] =
  useState(null);
  const [showUserModal, setShowUserModal] =
  useState(false);
  const [showDisableModal, setShowDisableModal] =
  useState(false);
  const { user: currentUser } = useAuth();
  const [userToDisable, setUserToDisable] =
  useState(null);
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);
  const [userToDelete, setUserToDelete] =
  useState(null);
  const [deleteReason, setDeleteReason] =
  useState("");

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
          <th>{t("table.firstname")}</th>
          <th>{t("table.lastname")}</th>
          <th>{t("table.email")}</th>
          <th>{t("table.role")}</th>
          <th>{t("table.company")}</th>
          <th>{t("table.status")}</th>
          <th>{t("table.actions")}</th>
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
            <td>
  <span
    className={`status-badge status-${user.status.toLowerCase()}`}
  >
    {user.status}
  </span>
</td>
            <td>
  <button
  className="users-action-button"
  onClick={() => {
    
   console.log(user);

setSelectedUser(user);
setShowUserModal(true);
  }}
>
  <Eye size={16} />
</button>


  <button
    className="users-action-button"
    onClick={() =>
      console.log(
        "Modifier utilisateur",
        user.id
      )
    }
  >
    <Pencil size={16} />
  </button>

  <button
  className={`users-action-button danger ${
    user.email === currentUser.email
      ? "disabled-action"
      : ""
  }`}
  disabled={
    user.email === currentUser.email
  }
  onClick={() => {
    setUserToDisable(user);
    setShowDisableModal(true);
  }}
>
  <Ban size={16} />
</button>

</td>
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

  {disabledUsers.length === 0 ? (

    <p className="users-empty">
      {t("users.noDisabledUsers")}
    </p>

  ) : (

    <table className="users-table">

      <thead>
        <tr>
          <th>{t("table.firstname")}</th>
          <th>{t("table.lastname")}</th>
          <th>{t("table.email")}</th>
          <th>{t("table.role")}</th>
          <th>{t("table.company")}</th>
          <th>{t("table.status")}</th>
          <th>{t("table.actions")}</th>
        </tr>
      </thead>

      <tbody>

        {disabledUsers.map((user) => (

          <tr key={user.id}>

            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.company}</td>

            <td>
              <span
                className={`status-badge status-${user.status.toLowerCase()}`}
              >
                {user.status}
              </span>
            </td>
<td>

<button
    className="users-action-button"
    onClick={() => {
      setSelectedUser(user);
      setShowUserModal(true);
    }}
  >
    <Eye size={16} />
  </button>
  
  <button
    className="users-action-button"
    onClick={async () => {

      try {

        await fetch(
          `http://localhost:3000/users/${user.id}/reactivate`,
          {
            method: "PUT",
          }
        );

        await loadUsers();

      } catch (error) {

        console.error(error);

      }

    }}
  >
    <CheckCircle2 size={16} />
  </button>
  <button
  className="users-action-button danger"
  onClick={() => {

    setUserToDelete(user);

    setShowDeleteModal(true);

  }}
>
  <Trash2 size={16} />
</button>

</td>
          </tr>

        ))}

      </tbody>

    </table>

  )}

</div>

    {showUserModal && selectedUser && (
  <div className="users-modal-overlay">

    <div className="users-modal">

      <h2>
        {t("users.details")}
      </h2>

      <p>
        <strong>
          {t("users.firstname")} :
        </strong>{" "}
        {selectedUser.firstname}
      </p>

      <p>
        <strong>
          {t("users.lastname")} :
        </strong>{" "}
        {selectedUser.lastname}
      </p>

      <p>
        <strong>
          {t("users.email")} :
        </strong>{" "}
        {selectedUser.email}
      </p>

      <p>
        <strong>
          {t("users.role")} :
        </strong>{" "}
        {selectedUser.role}
      </p>

      <p>
        <strong>
          {t("users.company")} :
        </strong>{" "}
        {selectedUser.company}
      </p>

      <p>
        <strong>
          {t("users.status")} :
        </strong>{" "}
        {selectedUser.status}
      </p>

<p>
  <strong>
    {t("users.emailVerified")} :
  </strong>{" "}
  {selectedUser.email_verified
    ? `✅ ${t("users.yes")}`
    : `❌ ${t("users.no")}`}
</p>

<p>
  <strong>
    {t("users.otp")} :
  </strong>{" "}
  {selectedUser.two_factor_enabled
    ? `✅ ${t("users.enabled")}`
    : `❌ ${t("users.disabledLabel")}`}
</p>

<p>
  <strong>
    {t("users.language")} :
  </strong>{" "}
  {selectedUser.language}
</p>

<p>
  <strong>
    {t("users.theme")} :
  </strong>{" "}
  {selectedUser.theme}
</p>

      <button
        className="users-close-button"
        onClick={() =>
          setShowUserModal(false)
        }
      >
        {t("users.close")}
      </button>

    </div>

  </div>
)} 

{showDisableModal &&
  userToDisable && (

  <div className="users-modal-overlay">

    <div className="users-modal">

      <h2 className="users-danger-title">
  <Ban size={24} />
  {t("users.disableTitle")}
</h2>

      <div className="disable-user-box">

  <div className="disable-user-name">
    {userToDisable.firstname}
    {" "}
    {userToDisable.lastname}
  </div>

  <div className="disable-user-warning">
    {t("users.disableWarning")}
  </div>

</div>

      <div className="users-modal-actions">

        <button
          className="users-close-button"
          onClick={() =>
            setShowDisableModal(false)
          }
        >
          {t("users.cancel")}
        </button>

        <button
          className="users-delete-button"
          onClick={async () => {

  try {

    await fetch(
      `http://localhost:3000/users/${userToDisable.id}/disable`,
      {
        method: "PUT",
      }
    );

    await loadUsers();

    setShowDisableModal(false);

  } catch (error) {

    console.error(error);

  }

}}
        >
          {t("users.disable")}
        </button>

      </div>

    </div>

  </div>
)}

{showDeleteModal &&
 userToDelete && (

<div className="users-modal-overlay">

  <div className="users-modal">

    <h2 className="users-danger-title">
      <Trash2 size={24} />
      {t("users.deleteTitle")}
    </h2>

    <div className="disable-user-box">

      <div className="disable-user-name">
        {userToDelete.firstname}
        {" "}
        {userToDelete.lastname}
      </div>

      <div className="disable-user-warning">
        {t("users.deleteWarning")}
      </div>

      <div className="disable-user-warning">
        {t("users.deleteWarning2")}
      </div>

    </div>

<label className="users-delete-label">
  {t("users.deleteReason")}
</label>

<textarea
  className="users-delete-reason"
  value={deleteReason}
  onChange={(e) =>
    setDeleteReason(e.target.value)
  }
/>

    <div className="users-modal-actions">

      <button
        className="users-close-button"
        onClick={() => {

  setDeleteReason("");
  setUserToDelete(null);
  setShowDeleteModal(false);

}}

      >
        {t("users.cancel")}
      </button>

      <button
        className="users-delete-button"
        disabled={!deleteReason.trim()}
        onClick={() => {

  console.log(
    "DELETE USER",
    userToDelete.id,
    deleteReason
  );

  setDeleteReason("");
  setUserToDelete(null);
  setShowDeleteModal(false);

}}
      >
        {t("users.deleteForever")}
      </button>

    </div>

  </div>

</div>

)}

    </div>
  );
}

export default Users;