const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
const { findUserByEmail } = require("./services/authService");
 
const { getRolesCount } = require("./services/rolesService");
const { getUsersCount } = require("./services/usersService");
const { getAllUsers } = require("./services/usersService");
 
const app = express();
app.use(express.json());
 
app.get("/", async (req, res) => {
try {
const roles = await getRolesCount();
const users = await getUsersCount();
 
res.json({
success: true,
message: "Connexion MariaDB OK",
nombre_roles: roles,
nombre_utilisateurs: users,
});
} catch (error) {
res.status(500).json({
success: false,
erreur: error.message,
});
}
});
 app.get("/users", async (req, res) => {
try {
const users = await getAllUsers();
 
res.json(users);
} catch (error) {
res.status(500).json({
success: false,
erreur: error.message,
});
}
});
app.post("/login", async (req, res) => {
try {
const { email, password } = req.body;
 
const user = await findUserByEmail(email);
 
if (!user) {
return res.status(401).json({
success: false,
message: "Utilisateur introuvable",
});
}
 
const passwordValid = await bcrypt.compare(
password,
user.password_hash
);
 
if (!passwordValid) {
return res.status(401).json({
success: false,
message: "Mot de passe incorrect",
});
}
 
const token = jwt.sign(
{
id: user.id,
role: user.role_name,
},
"MON_SECRET_JWT",
{
expiresIn: "8h",
}
);
 
res.json({
success: true,
token,
user: {
id: user.id,
firstname: user.firstname,
lastname: user.lastname,
role: user.role_name,
},
});
} catch (error) {
res.status(500).json({
success: false,
erreur: error.message,
});
}
});
app.listen(process.env.PORT, () => {
console.log(
`✅ API démarrée sur http://localhost:${process.env.PORT}`
);
});