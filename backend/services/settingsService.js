const db = require("../config/db");

async function getSettings() {

  const [rows] =
    await db.execute(`
      SELECT
        setting_key,
        setting_value
      FROM app_settings
      ORDER BY setting_key
    `);

  return rows;

}

module.exports = {
  getSettings
};