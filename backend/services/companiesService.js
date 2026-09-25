const db = require("../config/db");

async function getAllCompanies() {
  const [rows] = await db.execute(`
    SELECT *
    FROM companies
    WHERE deleted = 0
    ORDER BY id
  `);

  return rows;
}

async function getArchivedCompanies() {
  const [rows] = await db.execute(`
    SELECT *
    FROM companies
    WHERE deleted = 1
    ORDER BY id
  `);

  return rows;
}

async function createCompany(name) {
  const [result] = await db.execute(
    `
    INSERT INTO companies
    (
      company_code,
      name
    )
    VALUES
    ('TEMP', ?)
    `,
    [name]
  );

  const companyId = result.insertId;

  const companyCode =
    "CLI-" +
    String(companyId).padStart(6, "0");

  await db.execute(
    `
    UPDATE companies
    SET company_code = ?
    WHERE id = ?
    `,
    [companyCode, companyId]
  );

  return {
    id: companyId,
    companyCode,
  };
}
async function saveCompanyServices(
  companyId,
  serviceIds
) {

  await db.execute(
    `
    DELETE FROM company_services
    WHERE company_id = ?
    `,
    [companyId]
  );

  for (const serviceId of serviceIds) {

    await db.execute(
      `
      INSERT INTO company_services
      (
        company_id,
        service_id
      )
      VALUES
      (?,?)
      `,
      [
        companyId,
        serviceId,
      ]
    );
  }
}
async function updateCompany(
  id,
  phone,
  email,
  address,
  postal_code,
  city,
  country,
  siret,
  website,
  notes,
  contract_type,
  sla_level
) {
  await db.execute(
    `
    UPDATE companies
    SET
      phone = ?,
      email = ?,
      address = ?,
      postal_code = ?,
      city = ?,
      country = ?,
      siret = ?,
      website = ?,
      notes = ?,
      contract_type = ?,
      sla_level = ?
    WHERE id = ?
    `,
    [
      phone,
      email,
      address,
      postal_code,
      city,
      country,
      siret,
      website,
      notes,
      contract_type,
      sla_level,
      id,
    ]
  );
}

async function archiveCompany(id) {

  console.log(
    "ARCHIVE COMPANY SERVICE",
    id
  );

  await db.execute(
    `
    UPDATE companies
    SET
      status = 'ARCHIVED',
      deleted = 1
    WHERE id = ?
    `,
    [id]
  );

  const [result] = await db.execute(
    `
    UPDATE sites
    SET
      deleted = 1,
      status = 'ARCHIVED'
    WHERE company_id = ?
    `,
    [id]
  );

  console.log(result);

}

async function restoreCompany(id) {

  console.log(
    "RESTORE COMPANY",
    id
  );

  await db.execute(
    `
    UPDATE companies
    SET
      status = 'ACTIVE',
      deleted = 0
    WHERE id = ?
    `,
    [id]
  );

  const [result] =
    await db.execute(
      `
      UPDATE sites
      SET
        deleted = 0,
        status = 'ACTIVE'
      WHERE company_id = ?
      `,
      [id]
    );

  console.log(result);

}

async function getAllServices() {
  const [rows] = await db.execute(`
    SELECT *
    FROM services
    ORDER BY name
  `);

  return rows;
}

async function getCompanyServices(companyId) {
  const [rows] = await db.execute(
    `
    SELECT
      s.id,
      s.code,
      s.name
    FROM company_services cs
    INNER JOIN services s
      ON s.id = cs.service_id
    WHERE cs.company_id = ?
    ORDER BY s.name
    `,
    [companyId]
  );

  return rows;
}
async function saveCompanyServices(
  companyId,
  serviceIds
) {

  await db.execute(
    `
    DELETE FROM company_services
    WHERE company_id = ?
    `,
    [companyId]
  );

  for (const serviceId of serviceIds) {

    await db.execute(
      `
      INSERT INTO company_services
      (
        company_id,
        service_id
      )
      VALUES
      (?,?)
      `,
      [
        companyId,
        serviceId,
      ]
    );
  }
}
module.exports = {
  getAllCompanies,
  getArchivedCompanies,
  createCompany,
  updateCompany,
  archiveCompany,
  restoreCompany,
  getAllServices,
  getCompanyServices,
  saveCompanyServices,
};