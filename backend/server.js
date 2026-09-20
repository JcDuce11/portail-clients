const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();
 
const app = express();
 
app.get("/", async (req, res) => {
try {
const connection = await mysql.createConnection({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
});
 
const [rows] = await connection.execute(
"SELECT COUNT(*) AS total FROM roles"
);
 
await connection.end();
 
res.json({
success: true,
message: "Connexion MariaDB OK",
nombre_roles: rows[0].total,
});
} catch (error) {
console.error(error);
 
res.status(500).json({
success: false,
erreur: error.message,
});
}
});
 
app.listen(process.env.PORT || 3000, () => {
console.log(
`✅ API démarrée sur http://localhost:${process.env.PORT || 3000}`
);
});