const bcrypt = require("bcrypt");
const db = require("../config/db");

async function login(email, password) {

  const [rows] =
    await db.execute(
      `
      SELECT
        u.*,
        r.name AS role_name

      FROM users u

      INNER JOIN roles r
        ON r.id = u.role_id

      WHERE u.email = ?
      `,
      [email]
    );

  if (rows.length === 0) {

    return {
      success: false,
      message: "Utilisateur introuvable",
    };

  }

  const user = rows[0];

  if (user.status === "DELETED") {

  return {
    success: false,
    message: "Compte supprimé",
  };

}

if (user.status === "REJECTED") {

  return {
    success: false,
    message: "Compte refusé",
  };

}

if (user.status === "PENDING_ASSIGNMENT") {

  return {
    success: false,
    message:
      "Compte en attente d'affectation",
  };

}

if (user.status !== "ACTIVE") {

  return {
    success: false,
    message:
      `Compte non actif (${user.status})`,
  };

}

if (!user.company_id) {

  return {
    success: false,
    message:
      "Utilisateur non rattaché à une société",
  };

}

if (!user.primary_site_id) {

  return {
    success: false,
    message:
      "Utilisateur non rattaché à un site principal",
  };

}

if (user.status === "LOCKED") {

  return {
    success: false,
    message:
      "Compte verrouillé",
  };

}

if (
  user.locked_until &&
  new Date(user.locked_until) >
    new Date()
) {

  return {
    success: false,
    message:
      "Compte temporairement verrouillé",
  };

}

  const valid =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!valid) {

    await db.execute(
  `
    UPDATE users
    SET failed_login_attempts =
      failed_login_attempts + 1
    WHERE id = ?
  `,
  [user.id]
);

return {
  success: false,
  message:
    "Mot de passe incorrect",
};

  }

await db.execute(
  `
    UPDATE users
    SET
      failed_login_attempts = 0,
      last_login = NOW()
    WHERE id = ?
  `,
  [user.id]
);

const otpRequired =
  user.require_two_factor ||
  user.two_factor_enabled;

 return {

  success: true,

  otpRequired,

  user: {

    id: user.id,

    email: user.email,

    firstname:
      user.firstname,

    lastname:
      user.lastname,

    role:
      user.role_name,

    company_id:
      user.company_id,

    language:
      user.language,

    theme:
      user.theme,

    primary_site_id:
      user.primary_site_id,

    status:
      user.status,

    email_verified:
      user.email_verified,

    two_factor_enabled:
      user.two_factor_enabled,

    require_two_factor:
      user.require_two_factor

  }

};

}

async function findUserByEmail(email) {

  const [rows] =
    await db.execute(
      `
      SELECT
        u.*,
        r.name AS role_name

      FROM users u

      INNER JOIN roles r
        ON r.id = u.role_id

      WHERE u.email = ?
      `,
      [email]
    );

  return rows[0];

}

module.exports = {
  login,
  findUserByEmail,
};