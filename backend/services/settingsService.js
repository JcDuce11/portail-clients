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

async function updateSettings(settings) {

  const connection =
    await db.getConnection();

  try {

    await connection.beginTransaction();

    for (
      const [key, value]
      of Object.entries(settings)
    ) {

      await connection.execute(
        `
        UPDATE app_settings
        SET setting_value = ?
        WHERE setting_key = ?
        `,
        [value, key]
      );

    }

    await connection.commit();

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();

  }

}

module.exports = {
  getSettings,
  updateSettings
};