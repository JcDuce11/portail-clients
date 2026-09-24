const db = require("../config/db");

async function getCompanySites(companyId) {

  const [rows] = await db.execute(
    `
    SELECT
      id,

      site_code,
      site_name,

      address,
      postal_code,
      city,
      country,

      phone,
      email,

      siret,

      is_main_site

    FROM sites

    WHERE company_id = ?

      AND deleted = 0

    ORDER BY site_code
    `,
    [companyId]
  );

  return rows;
}

async function getSiteServices(siteId) {

  const [rows] = await db.execute(
    `
    SELECT
      s.id,
      s.code,
      s.name
    FROM site_services ss
    INNER JOIN services s
      ON s.id = ss.service_id
    WHERE ss.site_id = ?
    ORDER BY s.name
    `,
    [siteId]
  );

  return rows;
}

async function saveSiteServices(
  siteId,
  serviceIds
) {

  await db.execute(
    `
    DELETE FROM site_services
    WHERE site_id = ?
    `,
    [siteId]
  );

  for (const serviceId of serviceIds) {

    await db.execute(
      `
      INSERT INTO site_services
      (
        site_id,
        service_id
      )
      VALUES
      (?,?)
      `,
      [
        siteId,
        serviceId,
      ]
    );

  }

}
async function createSite(
  companyId
) {

  const [companyRows] =
    await db.execute(
      `
      SELECT company_code
      FROM companies
      WHERE id = ?
      `,
      [companyId]
    );

  const companyCode =
    companyRows[0].company_code;

  const [siteRows] =
    await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM sites
      WHERE company_id = ?
      `,
      [companyId]
    );

  const nextNumber =
    siteRows[0].total + 1;

  const siteCode =
    `${companyCode}-${String(
      nextNumber
    ).padStart(2, "0")}`;

  const [result] =
    await db.execute(
      `
      INSERT INTO sites
      (
        company_id,
        site_code,
        site_name
      )
      VALUES
      (
        ?,
        ?,
        'Nouveau site'
      )
      `,
      [
        companyId,
        siteCode,
      ]
    );

  return {
    id: result.insertId,
    siteCode,
  };
}
async function archiveSite(
  siteId
) {

  await db.execute(
    `
    UPDATE sites
    SET
      deleted = 1,
      status = 'ARCHIVED'
    WHERE id = ?
    `,
    [siteId]
  );

}
module.exports = {
  getCompanySites,
  getSiteServices,
  saveSiteServices,
  createSite,
  archiveSite,
};