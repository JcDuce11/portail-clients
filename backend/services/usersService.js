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

  console.log(
    "APPROVE COMPANY START"
  );

  console.log(
    "USER ID :",
    userId
  );

  console.log(
    "COMPANY DATA :",
    companyData
  );

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

console.log(
  "COMPANY INSERT RESULT :",
  companyResult
);

console.log(
  "NEW COMPANY ID :",
  companyId
);

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

  console.log(
  "COMPANY CODE GENERATED :",
  companyCode
);

const siteCode =
  `${companyCode}-01`;

const [siteResult] =
  await db.execute(
    `
    INSERT INTO sites (
      company_id,
      site_code,
      site_name
    )
    VALUES (
      ?,
      ?,
      ?
    )
    `,
    [
      companyId,
      siteCode,
      companyData.siteName,
    ]
  );

const siteId =
  siteResult.insertId;

console.log(
  "SITE CREATED :",
  siteId
);

console.log(
  "SITE CODE GENERATED :",
  siteCode
);

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

console.log(
  "USER UPDATED :",
  userId
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

console.log("DUPLICATE RESULT");
console.log(rows);

  return rows;
}

module.exports = {
  getAllUsers,
  disableUser,
  reactivateUser,
  approveUser,
  rejectUser,
  approveCompanyCreation,
  checkCompanyDuplicate,
};