const db = require("../config/db");
 
async function findUserByEmail(email) {
const [rows] = await db.execute(
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
findUserByEmail,
};