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

  const valid =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!valid) {

    return {
      success: false,
      message: "Mot de passe incorrect",
    };

  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role_name,
      company_id: user.company_id,
      language: user.language,
      theme: user.theme,
    },
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