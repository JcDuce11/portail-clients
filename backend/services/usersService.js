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
      u.primary_site_id,
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

module.exports = {
  getAllUsers,
  disableUser,
  reactivateUser,
  approveUser,
  rejectUser,
};