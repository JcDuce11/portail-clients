const db = require("../config/db");
 
async function getUsersCount() {
const [rows] = await db.execute(
"SELECT COUNT(*) AS total FROM users"
);
 
return rows[0].total;
}
 
async function getAllUsers() {
const [rows] = await db.execute(`
SELECT
u.id,
u.email,
u.firstname,
u.lastname,
r.name AS role
FROM users u
INNER JOIN roles r
ON r.id = u.role_id
`);
 
return rows;
}
 
module.exports = {
getUsersCount,
getAllUsers,
};