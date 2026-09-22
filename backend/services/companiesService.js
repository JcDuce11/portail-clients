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
notes
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
notes = ?
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
id,
]
);
}
 
async function archiveCompany(id) {
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
}
 
async function restoreCompany(id) {
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
}
 
module.exports = {
getAllCompanies,
getArchivedCompanies,
createCompany,
updateCompany,
archiveCompany,
restoreCompany,
};