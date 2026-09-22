const express = require("express");
const cors = require("cors");
 
const {
getAllCompanies,
createCompany,
updateCompany,
} = require("./services/companiesService");
 
const {
getAllUsers,
} = require("./services/usersService");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.get("/companies", async (req, res) => {
try {
const companies =
await getAllCompanies();
 
res.json(companies);
 
} catch (error) {
 
res.status(500).json({
success: false,
erreur: error.message,
});
 
}
});
 
app.post("/companies", async (req, res) => {
 
try {
 
const { name } = req.body;
 
const company =
await createCompany(name);
 
res.json({
success: true,
companyCode:
company.companyCode,
});
 
} catch (error) {
 
res.status(500).json({
success: false,
erreur: error.message,
});
 
}
});
 
app.put("/companies/:id", async (req, res) => {
 
try {
 
const { id } = req.params;
 
const {
phone,
email,
address,
postal_code,
city,
country,
siret,
website,
notes,
} = req.body;
 
await updateCompany(
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
);
 
res.json({
success: true,
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
 
const users =
await getAllUsers();
 
res.json(users);
 
} catch (error) {
 
res.status(500).json({
success: false,
erreur: error.message,
});
 
}
});
 
app.listen(3000, () => {
 
console.log(
"✅ API démarrée sur http://localhost:3000"
);
 
});