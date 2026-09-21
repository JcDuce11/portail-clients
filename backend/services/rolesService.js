const db = require("../config/db");
 
async function getRolesCount() {
const [rows] = await db.execute(
"SELECT COUNT(*) AS total FROM roles"
);
 
return rows[0].total;
}
 
module.exports = {
getRolesCount,
};