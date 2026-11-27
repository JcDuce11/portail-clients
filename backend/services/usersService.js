const db = require("../config/db");

async function getAllUsers() {
  const [rows] = await db.execute(`
    SELECT
      u.id,
      u.firstname,
      u.lastname,
      u.email,
      u.status,
      u.email_verified,
      u.active,
      u.force_password_change,
      u.last_login,
      u.created_at,
      u.company_id,
      u.requested_company_name,
      u.primary_site_id,
      u.requested_site_name,
      u.failed_login_attempts,
      u.locked_until,
      u.two_factor_enabled,
      u.require_two_factor,
      u.language,
      u.theme,
      r.name AS role,
      c.name AS company
    FROM users u
    LEFT JOIN roles r
      ON r.id = u.role_id
    LEFT JOIN companies c
      ON c.id = u.company_id
    ORDER BY u.lastname
  `);

  return rows;
}

async function approveUser(userId) {
  await db.execute(
    `
    UPDATE users
    SET status = 'ACTIVE'
    WHERE id = ?
    `,
    [userId]
  );
}

async function rejectUser(userId, reason) {
  await db.execute(
    `
    UPDATE users
    SET
      status = 'REJECTED',
      rejection_reason = ?,
      rejected_at = NOW()
    WHERE id = ?
    `,
    [reason, userId]
  );
}

async function disableUser(userId) {
  await db.execute(
    `
    UPDATE users
    SET status = 'DISABLED'
    WHERE id = ?
    `,
    [userId]
  );
}

async function reactivateUser(userId) {
  await db.execute(
    `
    UPDATE users
    SET status = 'ACTIVE'
    WHERE id = ?
    `,
    [userId]
  );
}

async function approveCompanyCreation(
  userId,
  companyData
) {

  const [companyResult] =
    await db.execute(
      `
      INSERT INTO companies (
        company_code,
        name,
        address,
        postal_code,
        city,
        country
      )
      VALUES (
        '',
        ?,
        ?,
        ?,
        ?,
        ?
      )
      `,
      [
        companyData.companyName,
        companyData.address,
        companyData.postalCode,
        companyData.city,
        companyData.country,
      ]
    );

  const companyId =
  companyResult.insertId;

const companyCode =
    `CLI-${String(companyId)
      .padStart(6, "0")}`;

  await db.execute(
    `
    UPDATE companies
    SET company_code = ?
    WHERE id = ?
    `,
    [
      companyCode,
      companyId,
    ]
  );

const siteCode =
  `${companyCode}-01`;

const [siteResult] =
  await db.execute(
    `
    INSERT INTO sites (
  company_id,
  site_code,
  site_name,
  is_main_site
)
VALUES (
  ?,
  ?,
  ?,
  ?
)
    `,
    [
  companyId,
  siteCode,
  companyData.siteName,
  1,
]
  );

const siteId =
  siteResult.insertId;

await db.execute(
  `
  UPDATE users
  SET
    company_id = ?,
    primary_site_id = ?,
    status = 'ACTIVE',
    requested_company_name = NULL,
    requested_site_name = NULL
  WHERE id = ?
  `,
  [
    companyId,
    siteId,
    userId,
  ]
);

  return {
  success: true,
  companyId,
  companyCode,
  siteId,
  siteCode,
};

}

async function checkCompanyDuplicate(
  companyData
) {

  const [rows] =
    await db.execute(
      `
      SELECT
        id,
        company_code,
        name,
        address,
        postal_code,
        city
      FROM companies
      WHERE
        UPPER(name) = UPPER(?)
        AND UPPER(city) = UPPER(?)
        AND postal_code = ?
      `,
      [
        companyData.companyName,
        companyData.city,
        companyData.postalCode,
      ]
    );

  return rows;
}

async function assignCompanySite(
  userId,
  companyId,
  siteId
) {

  await db.execute(
    `
    UPDATE users
    SET
      company_id = ?,
      primary_site_id = ?,
      status = 'ACTIVE',
      requested_company_name = NULL,
      requested_site_name = NULL
    WHERE id = ?
    `,
    [
      companyId,
      siteId,
      userId,
    ]
  );

}

async function emailExists(email) {

  const [rows] =
    await db.execute(
      `
      SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

  return rows.length > 0;

}

async function createUser(
  userData
) {

  const [roleRow] =
    await db.execute(
      `
      SELECT id
      FROM roles
      WHERE name = ?
      LIMIT 1
      `,
      [userData.role]
    );

  if (
    roleRow.length === 0
  ) {

    throw new Error(
      "Role not found"
    );

  }

  const roleId =
    roleRow[0].id;

  const [result] = await db.execute(
    `
    INSERT INTO users (
      email,
      password_hash,
      firstname,
      lastname,
      role_id,
      company_id,
      primary_site_id,
      status,
      email_verified,
      force_password_change
    )
    VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      'ACTIVE',
      1,
      ?
    )
    `,
    [
      userData.email,
      userData.passwordHash,
      userData.firstName,
      userData.lastName,
      roleId,
      userData.companyId || null,
      userData.siteId || null,
      userData.forcePasswordChange
        ? 1
        : 0,
    ]
  );

  await db.execute(
  `
  INSERT INTO audit_logs (
    user_id,
    action,
    target_type,
    target_id,
    details
  )
  VALUES (?, ?, ?, ?, ?)
  `,
  [
    null,
    "CREATE_USER",
    "USER",
    result.insertId,
    JSON.stringify({
      email: userData.email,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }),
  ]
);

}

async function deleteUser(userId, reason) {
  
  const [users] = await db.execute(
  `
  SELECT
    email,
    firstname,
    lastname
  FROM users
  WHERE id = ?
  `,
  [userId]
);

if (users.length > 0) {
  const user = users[0];

  await db.execute(
    `
    INSERT INTO audit_logs (
      user_id,
      action,
      target_type,
      target_id,
      details
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      null,
      "DELETE_USER",
      "USER",
      userId,
      JSON.stringify({
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        reason,
      }),
    ]
  );
}
 
  await db.execute(
    `
    UPDATE users
    SET
      status = 'DELETED',
      rejection_reason = ?
    WHERE id = ?
    `,
    [reason, userId]
  );
}

module.exports = {
  getAllUsers,
  disableUser,
  reactivateUser,
  approveUser,
  rejectUser,
  createUser,
  deleteUser,
  assignCompanySite,
  approveCompanyCreation,
  checkCompanyDuplicate,
  emailExists,
};