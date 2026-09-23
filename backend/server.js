const express = require("express");
const cors = require("cors");
 
const {
  getAllCompanies,
  getArchivedCompanies,
  createCompany,
  updateCompany,
  archiveCompany,
  restoreCompany,
  getCompanyServices,
  getAllServices,
  saveCompanyServices,
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
 
app.delete("/companies/:id", async (req, res) => {
try {
const { id } = req.params;
 
await archiveCompany(id);
 
res.json({
success: true,
});
 
} catch (error) {
 
console.error(error);
 
res.status(500).json({
success: false,
erreur: error.message,
});
 
}
});
app.get("/companies/archived", async (req, res) => {
try {
 
const companies =
await getArchivedCompanies();
 
res.json(companies);
 
} catch (error) {
 
res.status(500).json({
success: false,
erreur: error.message,
});
 
}
});
 
app.delete("/companies/:id", async (req, res) => {
try {
 
await archiveCompany(
req.params.id
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
 
app.put(
"/companies/:id/restore",
async (req, res) => {
try {
 
await restoreCompany(
req.params.id
);
 
res.json({
success: true,
});
 
} catch (error) {
 
res.status(500).json({
success: false,
erreur:
error.message,
});
 
}
}
);
app.get("/services", async (req, res) => {
  try {

    const services =
      await getAllServices();

    res.json(services);

  } catch (error) {

    res.status(500).json({
      success: false,
      erreur: error.message,
    });

  }
});
app.get(
  "/companies/:id/services",
  async (req, res) => {

    try {

      const services =
        await getCompanyServices(
          req.params.id
        );

      res.json(services);

    } catch (error) {

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }
  }
);
app.put(
  "/companies/:id/services",
  async (req, res) => {

    try {

      const {
        serviceIds,
      } = req.body;

      await saveCompanyServices(
        req.params.id,
        serviceIds
      );

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }
  }
);
app.listen(3000, () => {
 
console.log(
"✅ API démarrée sur http://localhost:3000"
);
 
});