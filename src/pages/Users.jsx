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
  Trash2,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Users() {
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const isReferent = currentUser?.role === "REFERENT";
  const isAdmin = currentUser?.role === "ADMIN";
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] =
  useState([]);
  const [selectedUser, setSelectedUser] =
  useState(null);
  const [showUserModal, setShowUserModal] =
  useState(false);
  const [showDisableModal, setShowDisableModal] =
  useState(false);
  const [userToDisable, setUserToDisable] =
  useState(null);
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);
  const [userToDelete, setUserToDelete] =
  useState(null);
  const [deleteReason, setDeleteReason] =
  useState("");
  const [showApproveModal, setShowApproveModal] =
  useState(false);
  const [userToApprove, setUserToApprove] =
  useState(null);
  const [companyAction, setCompanyAction] =
  useState("");
  const [selectedCompanyId, setSelectedCompanyId] =
  useState("");
  const [selectedCompany, setSelectedCompany] =
  useState(null);
  const [showCompanyModal, setShowCompanyModal] =
  useState(false);
  const [companyDetails, setCompanyDetails] =
  useState(null);
  const [selectedSiteId, setSelectedSiteId] =
  useState("");
  const [newCompanyName, setNewCompanyName] =
  useState("");
  const [newPrimarySiteName, setNewPrimarySiteName] =
  useState("");
  const [newSiteAddress, setNewSiteAddress] =
  useState("");
  const [newSitePostalCode, setNewSitePostalCode] =
  useState("");
  const [newSiteCity, setNewSiteCity] =
  useState("");
  const [newSiteCountry, setNewSiteCountry] =
  useState("France");
  const [companyCreated, setCompanyCreated] =
  useState(false);
  const [sites, setSites] =
  useState([]);
  const [siteCreated, setSiteCreated] =
  useState(false);
  const [duplicateCompany, setDuplicateCompany] =
  useState(null);
  const [duplicateCompanyName, setDuplicateCompanyName] =
  useState("");
  const [duplicateError, setDuplicateError] =
  useState("");
  const [companyCreationStatus, setCompanyCreationStatus] =
  useState("");
  const [companyCreationError, setCompanyCreationError] =
  useState("");
  const [siteValidated, setSiteValidated] =
  useState(false);
  const [showRejectModal, setShowRejectModal] =
  useState(false);
  const [userToReject, setUserToReject] =
  useState(null);
  const [rejectReason, setRejectReason] =
  useState("");
  
  useEffect(() => {

  loadUsers();
  loadCompanies();

}, []);

useEffect(() => {

  if (selectedCompanyId) {

    loadSites(
      selectedCompanyId
    );

  }

}, [selectedCompanyId]);

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

async function loadCompanies() {

  try {

    const response = await fetch(
      "http://localhost:3000/companies"
    );

    const data = await response.json();

console.log(
  "COMPANIES DATA",
  data
);

console.log(
  "IS ARRAY",
  Array.isArray(data)
);

    setCompanies(data);

  } catch (error) {

    console.error(error);

  }

}

async function loadSites(
  companyId
) {

  try {

    const response =
      await fetch(
        `http://localhost:3000/companies/${companyId}/sites`
      );

    const data =
  await response.json();

setSites(data);

if (data.length > 0) {

  setSelectedSiteId(
    String(data[0].id)
  );

}
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



  const rejectedUsers = users.filter(
  (user) =>
    user.status === "REJECTED"
);

  const activeSuperAdmins =
  activeUsers.filter(
    (user) =>
      user.role === "SUPER_ADMIN"
  );

const isSelf = (user) =>
  user.email === currentUser.email;

const adminCannotManageSuperAdmin = (user) =>
  currentUser.role === "ADMIN" &&
  user.role === "SUPER_ADMIN";

  const isLastActiveSuperAdmin = (user) =>
  user.role === "SUPER_ADMIN" &&
  user.status === "ACTIVE" &&
  activeSuperAdmins.length === 1;

const canApproveUser = (user) => {

  if (companyAction === "new") {

    return (
      (newCompanyName ||
        user.requested_company_name) &&

      (newPrimarySiteName ||
        user.requested_site_name) &&

      newSiteAddress.trim() &&

      newSitePostalCode.trim() &&

      newSiteCity.trim() &&

      newSiteCountry.trim()
    );

  }

  return (
    user.company_id ||
    selectedCompanyId
  ) && (
    user.primary_site_id ||
    selectedSiteId
  );
};


const approvalScenario = (user) => {

  if (!user) {
    return "UNKNOWN";
  }

  if (
    user.company_id &&
    user.primary_site_id &&
    !user.requested_site_name
  ) {
    return "COMPANY_AND_SITE_FOUND";
  }

  if (
    user.company_id &&
    user.requested_site_name
  ) {
    return "SITE_CREATION_REQUEST";
  }
  
  if (
    user.requested_company_name
  ) {

    console.log(
  "COMPANY_CREATION_REQUEST DETECTED"
);

    return "COMPANY_CREATION_REQUEST";
  }

  return "UNKNOWN";
};

const approvalScenarioLabel = (user) => {

if (!user) {
    return t("users.scenarioUnknown");
  }
  
  switch (approvalScenario(user)) {

    case "COMPANY_AND_SITE_FOUND":
      return t("users.scenarioCompanySiteFound");

    case "SITE_CREATION_REQUEST":
      return t("users.scenarioSiteCreation");

    case "COMPANY_CREATION_REQUEST":
      return t("users.scenarioCompanyCreation");

    default:
      return t("users.scenarioUnknown");

  }

};

console.log(
  "DUPLICATE COMPANY",
  duplicateCompany
);

console.log(
  "DUPLICATE COMPANY NAME",
  duplicateCompanyName
);

console.log(
  "COMPANIES FULL",
  JSON.stringify(companies, null, 2)
);

const requestedCompany =
  userToApprove?.requested_company_name
    ?.trim()
    ?.toUpperCase();

console.log(
  "REQUESTED COMPANY",
  requestedCompany
);

const filteredCompanies =
  requestedCompany

    ? companies.filter(
        (company) =>
          company.name
            ?.trim()
            ?.toUpperCase()
            .includes(requestedCompany)
      )

    : companies;

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
<div className="users-stat-card">
  <XCircle
    size={24}
    className="users-stat-icon disabled"
  />

  <div className="users-stat-card-title">
    {t("users.rejected")}
  </div>

  <div className="users-stat-card-value">
    {rejectedUsers.length}
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

        {pendingUsers.length === 0 ? (

  <p className="users-empty">
    {t("users.noPendingUsers")}
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

      {pendingUsers.map((user) => (

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
  {user.status === "PENDING_APPROVAL"
    ? t("users.statusPendingApproval")
    : user.status === "ACTIVE"
    ? t("users.statusActive")
    : user.status === "DISABLED"
    ? t("users.statusDisabled")
    : user.status === "REJECTED"
    ? t("users.statusRejected")
    : user.status === "DELETED"
    ? t("users.statusDeleted")
    : user.status}
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
  className="users-action-button success"
  onClick={() => {
    setUserToApprove(user);
    setShowApproveModal(true);
  }}
>
  <CheckCircle2 size={16} />
</button>

            <button
  className="users-action-button danger"
  onClick={() => {

    setUserToReject(user);

    setShowRejectModal(true);

  }}
>
  <XCircle size={16} />
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
  isSelf(user) ||
  adminCannotManageSuperAdmin(user) ||
  isLastActiveSuperAdmin(user)
    ? "disabled-action"
    : ""
}`}
  disabled={
  isSelf(user) ||
  adminCannotManageSuperAdmin(user) ||
 isLastActiveSuperAdmin(user)
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
  className="users-action-button success"
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
  className={`users-action-button danger ${
  isSelf(user) ||
  adminCannotManageSuperAdmin(user) ||
  isLastActiveSuperAdmin(user)
    ? "disabled-action"
    : ""
}`}
 disabled={
  isSelf(user) ||
  adminCannotManageSuperAdmin(user) ||
  isLastActiveSuperAdmin(user)
}
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

<div className="users-section">

  <h2>
    {t("users.rejectedUsers")}

    <span className="users-badge">
      {rejectedUsers.length}
    </span>
  </h2>

  {rejectedUsers.length === 0 ? (

    <p className="users-empty">
      {t("users.noRejectedUsers")}
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

        {rejectedUsers.map((user) => (

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
                {t("users.statusRejected")}
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
  DEBUG companyId = [{String(selectedCompanyId)}]
</p>

<p>
  DEBUG siteId = [{String(selectedSiteId)}]
</p>

     <p>
  <strong>
    {t("users.company")} :
  </strong>{" "}
  {
    (() => {

      const company =
        companies.find(
          (c) =>
            String(c.id) ===
            String(selectedCompanyId)
        );

      return company
        ? `${company.company_code} - ${company.name}`
        : (
            selectedUser?.company ||
            selectedUser?.requested_company_name ||
            t("users.notFound")
          );

    })()
  }
</p>

<p>
  <strong>
    {t("users.site")} :
  </strong>{" "}
  {
    (() => {

      const site =
        sites.find(
          (s) =>
            String(s.id) ===
            String(selectedSiteId)
        );

      return site
        ? `${site.site_code} - ${site.site_name}`
        : (
            selectedUser?.requested_site_name ||
            t("users.notAssigned")
          );

    })()
  }
</p>

      <p>
  <strong>
    {t("users.status")} :
  </strong>{" "}
  {
    selectedUser.status === "PENDING_APPROVAL"
      ? t("users.statusPendingApproval")
      : selectedUser.status === "ACTIVE"
      ? t("users.statusActive")
      : selectedUser.status === "DISABLED"
      ? t("users.statusDisabled")
      : selectedUser.status === "REJECTED"
      ? t("users.statusRejected")
      : selectedUser.status === "DELETED"
      ? t("users.statusDeleted")
      : selectedUser.status
  }
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
    {t("users.validationScenario")} :
  </strong>{" "}
  {approvalScenarioLabel(selectedUser)}
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
          onClick={() => {

  setUserToDisable(null);
  setShowDisableModal(false);

}}
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

setUserToDisable(null);
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
  placeholder={t("users.deleteReasonPlaceholder")}
  value={deleteReason}
  maxLength={500}
  onChange={(e) =>
    setDeleteReason(e.target.value)
  }
/>

<div className="users-char-count">
  {deleteReason.length}/500
</div>

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

{showApproveModal &&
 userToApprove && (

<div className="users-modal-overlay">

  <div className="users-modal">

    <h2>
      {t("users.approveTitle")}
    </h2>

    <div className="disable-user-box">

      <div className="disable-user-name">
        {userToApprove.firstname}
        {" "}
        {userToApprove.lastname}
      </div>

      <div className="disable-user-warning">
        {t("users.approveWarning")}
      </div>

      <div className="disable-user-warning">
        {t("users.approveDescription")}
      </div>

    </div>

<div className="validation-grid">
    
    <div className="validation-section">

  <h3>
    {t("users.companyInformation")}
  </h3>

{userToApprove.requested_company_name && (

  <p>
    <strong>
      {t("users.requestedCompany")} :
    </strong>{" "}
    {userToApprove.requested_company_name}
  </p>
)}

{approvalScenario(userToApprove) ===
  "COMPANY_CREATION_REQUEST" && (

  <div className="validation-section">

    <h3>
      {t("users.companyProcessing")}
    </h3>

    <label>

      <input
        type="radio"
        name="companyAction"
        value="existing"
        checked={
          companyAction === "existing"
        }
        onChange={(e) =>
          setCompanyAction(
            e.target.value
          )
        }
      />

      {" "}
      {t("users.useExistingCompany")}

    </label>

    <br />

    <label>

      <input
        type="radio"
        name="companyAction"
        value="new"
        checked={
          companyAction === "new"
        }
        onChange={(e) =>
          setCompanyAction(
            e.target.value
          )
        }
      />

      {" "}
      {t("users.createNewCompany")}

    </label>

{companyAction === "existing" && (

  <div className="validation-section">

{filteredCompanies.length > 0 && (

  <div className="warning-box">

    {t("users.duplicateCompaniesFound", {
      count: filteredCompanies.length,
      company:
        userToApprove?.requested_company_name,
    })}

  </div>

)}

    <h3>
      {t("users.chooseExistingCompany")}
    </h3>

    <select
  className="users-select"
  value={selectedCompanyId}
  onChange={(e) =>
    setSelectedCompanyId(
      e.target.value
    )
  }
>

  <option value="">
    {t("users.selectCompany")}
  </option>

  {filteredCompanies.map((company) => (

    <option
      key={company.id}
      value={company.id}
    >
      {company.company_code}
      {" - "}
      {company.name}
    </option>

  ))}

</select>

<p
  style={{
    marginTop: "15px",
    marginBottom: "8px",
    fontWeight: 600,
  }}
>
  {t("users.selectSite")}
</p>

<p className="users-help-text">
  {t("users.availableSites", {
    count: sites.length,
  })}
</p>

<select
  className="users-select"
  value={selectedSiteId}
  onChange={(e) =>
    setSelectedSiteId(
      e.target.value
    )
  }
>

  <option value="">
  {t("users.selectSite")}
</option>

  {sites.map((site) => (

    <option
      key={site.id}
      value={site.id}
    >
      {site.site_code}
      {" - "}
      {site.site_name}
    </option>

  ))}

</select>

  </div>

)}

{companyAction === "new" && (

  <div className="validation-section">

    <h3>
      {t("users.newCompany")}
    </h3>

{filteredCompanies.length > 0 && (

  <div className="warning-box">

    <p>
      {t("users.duplicateCompaniesFound", {
        count: filteredCompanies.length,
        company:
          userToApprove?.requested_company_name,
      })}
    </p>

    {filteredCompanies.map((company) => (

      <div
        key={company.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >

        <button
  type="button"
  className="users-action-button"
  onClick={() => {

    setSelectedCompany(company);

console.log("COMPANY OBJECT", company);

    setCompanyDetails({
      
      code: company.company_code,

      name: company.name,

      address:
        company.address ||
        t("users.notProvided"),

      city:
        company.city ||
        t("users.notProvided"),

      postalCode:
        company.postal_code ||
        t("users.notProvided"),

      createdAt:
  company.created_at,

siteCount:
  company.site_count || 0,

userCount:
  company.user_count || 0,

mainSiteName:
  company.main_site_name,

mainSiteCode:
  company.main_site_code,

    });

    setShowCompanyModal(true);

  }}
>
  <Eye size={16} />
</button>

        <span>
          {company.company_code}
          {" - "}
          {company.name}
        </span>

      </div>

    ))}

  </div>

)}

    <label>
      {t("users.companyName")}
    </label>

    <input
      className="users-input"
      value={
        newCompanyName ||
        userToApprove.requested_company_name ||
        ""
      }
      onChange={(e) =>
        setNewCompanyName(
          e.target.value
        )
      }
    />

<label
  style={{
    marginTop: "15px",
    display: "block",
  }}
>
  {t("users.companyAddress")}
</label>

<input
  className="users-input"
  value={newSiteAddress}
  onChange={(e) =>
    setNewSiteAddress(
      e.target.value
    )
  }
/>

<label
  style={{
    marginTop: "15px",
    display: "block",
  }}
>
  {t("users.companyPostalCode")}
</label>

<input
  className="users-input"
  value={newSitePostalCode}
  maxLength={10}
  onChange={(e) =>
    setNewSitePostalCode(
      e.target.value.replace(/\D/g, "")
    )
  }
/>
<label
  style={{
    marginTop: "15px",
    display: "block",
  }}
>
  {t("users.companyCity")}
</label>

<input
  className="users-input"
  value={newSiteCity}
  onChange={(e) =>
    setNewSiteCity(
      e.target.value
    )
  }
/>

<label
  style={{
    marginTop: "15px",
    display: "block",
  }}
>
  {t("users.companyCountry")}
</label>

<input
  className="users-input"
  value={newSiteCountry}
  onChange={(e) =>
    setNewSiteCountry(
      e.target.value
    )
  }
/>

<hr />

<h4>
  {t("users.primarySite")}
</h4>

    <input
      className="users-input"
      value={
        newPrimarySiteName ||
        userToApprove.requested_site_name ||
        ""
      }
      onChange={(e) =>
        setNewPrimarySiteName(
          e.target.value
        )
      }
    />

<p className="users-help-text">
  {t("users.mainSiteUsesCompanyAddress")}
</p>

<button
  type="button"
  className="users-approve-button"
  style={{ marginTop: "20px" }}
  onClick={async () => {

  try {

    const duplicateResponse =
      await fetch(
        "http://localhost:3000/companies/check-duplicate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            companyName:
              newCompanyName ||
              userToApprove.requested_company_name,

            city:
              newSiteCity,

            postalCode:
              newSitePostalCode,

          }),

        }
      );

    const duplicateData =
      await duplicateResponse.json();

console.log(
  "DUPLICATE DATA",
  duplicateData
);

    if (duplicateData.exists) {

console.log(
  "DUPLICATE FOUND",
  duplicateData.company
);

      setDuplicateCompany(
        duplicateData.company
      );

      setDuplicateCompanyName(
        duplicateData.company.name
      );

console.log(
  "SET DUPLICATE COMPANY NAME",
  duplicateData.company.name
);

      setDuplicateError(
        t("users.companyAlreadyExists")
      );

      return;

    }

    setDuplicateCompany(null);

    setDuplicateError("");

    await fetch(
  `http://localhost:3000/users/${userToApprove.id}/approve-company-creation`,
  {
    method: "PUT",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({

      companyName:
        newCompanyName ||
        userToApprove.requested_company_name,

      siteName:
        newPrimarySiteName ||
        userToApprove.requested_site_name,

      address:
        newSiteAddress,

      postalCode:
        newSitePostalCode,

      city:
        newSiteCity,

      country:
        newSiteCountry,

    }),
  }
);
    
    setCompanyCreated(true);

    setSiteCreated(true);

    setCompanyCreationStatus(
      t("users.companyCreatedSuccess")
    );

  } catch (error) {

    console.error(error);

    setCompanyCreationStatus("");

    setCompanyCreationError(
      t("users.companyCreatedError")
    );

  }

}}
>
  {t("users.createCompany")}
</button>

{companyCreationStatus && (

  <div className="success-box">
    {companyCreationStatus}
  </div>

)}

{companyCreationError && (

  <div className="error-box">
    {companyCreationError}
  </div>

)}

{duplicateError && (

  <div className="error-box">

    {duplicateError}

    <br />

    {duplicateCompany?.company_code}
    {" - "}
    {duplicateCompany?.name}

    <br />
    <br />

    <button
      type="button"
      className="users-approve-button"
      onClick={() => {

console.log(
  "USE THIS COMPANY CLICK",
  duplicateCompany
);

  setCompanyAction("existing");

  setSelectedCompanyId(
    String(duplicateCompany.id)
  );

  setDuplicateError("");

      }}
    >
      {t("users.useThisCompany")}
    </button>

  </div>

)}

  </div>

)}

  </div>

)}

  <p>
    <strong>
      {t("users.company")} :
    </strong>{" "}
    {userToApprove.company || t("users.notFound")}
  </p>

  <p>
  <strong>
    {t("users.site")} :
  </strong>{" "}
  {
  selectedUser?.primary_site_id
    ? selectedUser.primary_site_id
    : selectedUser?.requested_site_name
      ? `${selectedUser.requested_site_name} (${t("users.requestedSite")})`
      : t("users.notAssigned")
}
</p>

<p>
      <strong>
        {t("users.email")} :
      </strong>{" "}
      {userToApprove.email}
    </p>

<p>
  <strong>
    {t("users.emailVerified")} :
  </strong>{" "}
  {userToApprove.email_verified
    ? `✅ ${t("users.yes")}`
    : `❌ ${t("users.no")}`}
</p>

{userToApprove.requested_site_name &&
 companyAction !== "new" && (

  <div className="validation-section">

    <h3>
      {t("users.requestedSite")}
    </h3>

    <p>
      {userToApprove.requested_site_name}
    </p>

<div className="users-modal-actions">

  <button
    className="users-close-button"
  >
    {t("users.rejectSite")}
  </button>

  <button
  className="users-approve-button"
  onClick={() => {

    setSiteValidated(true);

  }}
>
  {t("users.approveSite")}
</button>

{siteValidated && (

  <p>

    {isReferent
      ? `📨 ${t("users.siteCreationRequestCreated")}`
      : `✅ ${t("users.siteApproved")}`}

  </p>

)}


</div>

  </div>

)}

</div>

<div className="validation-section">

  <h3>
    {t("users.validationRequirements")}
  </h3>

  <p>
  {(
    userToApprove.company_id ||
    selectedCompanyId ||
    (
      companyAction === "new" &&
      (
        newCompanyName ||
        userToApprove.requested_company_name
      )
    )
  )
    ? "✅"
    : "❌"}{" "}
  {t("users.companyAssigned")}
</p>

<p>
  {(
    userToApprove.primary_site_id ||
    selectedSiteId ||
    (
      companyAction === "new" &&
      (
        newPrimarySiteName ||
        userToApprove.requested_site_name
      )
    )
  )
    ? "✅"
    : "❌"}{" "}
  {t("users.siteAssigned")}
</p>

  {companyAction === "new" && (

    <>

      <p>
        {newSiteAddress.trim()
          ? "✅"
          : "❌"}{" "}
        {t("users.siteAddress")}
      </p>

      <p>
        {newSitePostalCode.trim()
          ? "✅"
          : "❌"}{" "}
        {t("users.sitePostalCode")}
      </p>

      <p>
        {newSiteCity.trim()
          ? "✅"
          : "❌"}{" "}
        {t("users.siteCity")}
      </p>

      <p>
        {newSiteCountry.trim()
          ? "✅"
          : "❌"}{" "}
        {t("users.siteCountry")}
      </p>

<hr />

<p>
  {companyCreated
    ? "✅"
    : "❌"}{" "}
  {t("users.companyCreated")}
</p>

<p>
  {siteCreated
    ? "✅"
    : "❌"}{" "}
  {t("users.siteCreated")}
</p>

    </>

  )}

</div>
  
  </div>


    <div className="users-modal-actions">

      <button
        className="users-close-button"
        onClick={() => {

          setUserToApprove(null);

          setShowApproveModal(false);

        }}
      >
        {t("users.cancel")}
      </button>

      <button
  className="users-approve-button"
  disabled={
  !canApproveUser(userToApprove) &&
  !(
    companyAction === "existing" &&
    selectedCompanyId &&
    selectedSiteId
  )
}
  onClick={async () => {

    await fetch(
      `http://localhost:3000/users/${userToApprove.id}/approve`,
      {
        method: "PUT",
      }
    );

    await loadUsers();

    setCompanyCreated(true);
    setSiteCreated(true);
    setCompanyCreationStatus( t("users.companyCreatedSuccess"));
    setUserToApprove(null);
    setShowApproveModal(false);

  }}
>
  {t("users.validateUser")}
</button>

    </div>

  </div>

</div>

)}

{showRejectModal &&
 userToReject && (

<div className="users-modal-overlay">

  <div className="users-modal">

    <h2 className="users-danger-title">
      <XCircle size={24} />
      {t("users.rejectTitle")}
    </h2>

    <div className="disable-user-box">

      <div className="disable-user-name">
        {userToReject.firstname}
        {" "}
        {userToReject.lastname}
      </div>

      <div className="disable-user-warning">
        {t("users.rejectWarning")}
      </div>

    </div>

    <label className="users-delete-label">
      {t("users.rejectReason")}
    </label>

    <textarea
      className="users-delete-reason"
      placeholder={t("users.rejectPlaceholder")}
      value={rejectReason}
      onChange={(e) =>
        setRejectReason(e.target.value)
      }
    />

<div className="validation-section">

  <h3>
    {t("users.validationRequirements")}
  </h3>

  <p>
    {userToApprove.company_id
      ? "✅"
      : "❌"}{" "}
    {t("users.companyAssigned")}
  </p>

  <p>
    {userToApprove.primary_site_id
      ? "✅"
      : "❌"}{" "}
    {t("users.siteAssigned")}
  </p>

</div>

    <div className="users-modal-actions">

      <button
        className="users-close-button"
        onClick={() => {

          setRejectReason("");
          setUserToReject(null);
          setShowRejectModal(false);

        }}
      >
        {t("users.cancel")}
      </button>

      <button
        className="users-delete-button"
        disabled={!rejectReason.trim()}
        onClick={async () => {

          await fetch(
  `http://localhost:3000/users/${userToReject.id}/reject`,
  {
    method: "PUT",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      reason: rejectReason,
    }),
  }
);

await loadUsers();

          setRejectReason("");
          setUserToReject(null);
          setShowRejectModal(false);

        }}
      >
        {t("users.rejectUser")}
      </button>

    </div>

  </div>

</div>

)}
    {showCompanyModal &&
     companyDetails && (

      <div className="users-modal-overlay">

        <div className="users-modal">

          <h2>
            {companyDetails.name}
          </h2>

          <p>
            <strong>
              {t("users.companyCode")} :
            </strong>{" "}
            {companyDetails.code}
          </p>

          <p>
            <strong>
              {t("users.createdAt")} :
            </strong>{" "}
            {
              companyDetails.createdAt
                ? new Date(
                    companyDetails.createdAt
                  ).toLocaleDateString()
                : t("users.notProvided")
            }
          </p>

          <p>
            <strong>
              {t("users.companyAddress")} :
            </strong>{" "}
            {companyDetails.address}
          </p>

          <p>
            <strong>
              {t("users.companyPostalCode")} :
            </strong>{" "}
            {companyDetails.postalCode}
          </p>

          <p>
            <strong>
              {t("users.companyCity")} :
            </strong>{" "}
            {companyDetails.city}
          </p>

          <p>
            <strong>
              {t("users.siteCount")} :
            </strong>{" "}
            {companyDetails.siteCount}
          </p>

          <p>
            <strong>
              {t("users.userCount")} :
            </strong>{" "}
            {companyDetails.userCount}
          </p>
    
          <p>
            <strong>
              {t("users.mainSite")} :
            </strong>{" "}
            {companyDetails.mainSiteCode}
            {" - "}
            {companyDetails.mainSiteName}
          </p>

          <div className="users-modal-actions">

            <button
              className="users-close-button"
              onClick={() => {
                setShowCompanyModal(false);
              }}
            >
              {t("users.close")}
            </button>

            <button
              className="users-approve-button"
              onClick={() => {

                setCompanyAction(
                  "existing"
                );

                setSelectedCompanyId(
                  String(selectedCompany.id)
                );

                setShowCompanyModal(false);

              }}
            >
              {t("users.useThisCompany")}
            </button>

          </div>

        </div>

      </div>

    )}

  </div>
  );
}

export default Users;