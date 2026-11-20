const db = require("../config/db");

async function getRolesCount() {

  const [rows] =
    await db.execute(
      "SELECT COUNT(*) AS total FROM roles"
    );

  return rows[0].total;

}

async function getAllRoles() {

  const [rows] =
    await db.execute(`
      SELECT
        id,
        name
      FROM roles
      ORDER BY id
    `);

  return rows;

}

module.exports = {
  getRolesCount,
  getAllRoles,
};