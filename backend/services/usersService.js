const db = require("../config/db");
 
async function getAllUsers() {
const [rows] = await db.execute(`
SELECT
u.id,
u.firstname,
u.lastname,
u.email,
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
 
module.exports = {
getAllUsers,
};