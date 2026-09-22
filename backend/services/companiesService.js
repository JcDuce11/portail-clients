const db = require("../config/db");
 
async function getAllCompanies() {
const [rows] = await db.execute(
"SELECT * FROM companies ORDER BY id"
);
 
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
id
]
);
}
 
module.exports = {
getAllCompanies,
createCompany,
updateCompany,
};