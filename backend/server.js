const {
  getCompanySites,
  getSiteServices,
  saveSiteServices,
  createSite,
  archiveSite,
  getArchivedSites,
  restoreSite,
} = require("./services/sitesService");
const express = require("express");
const cors = require("cors");
const { getSettings, updateSettings } = require( "./services/settingsService" );
 
const {
  login,
  findUserByEmail,
} = require(
  "./services/authService"
);

console.log(
  "LOGIN FUNCTION:",
  typeof login
);

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

app.post("/auth/check-email", async (req, res) => {

  try {

    const { email } = req.body;

    const user =
      await findUserByEmail(email);

    if (!user) {

      return res.json({
        exists: false
      });

    }

    return res.json({

      exists: true,

      user: {

        id: user.id,

        email: user.email,

        firstname: user.firstname,

        lastname: user.lastname,

        role: user.role_name,

        status: user.status,

        company_id:
          user.company_id,

        primary_site_id:
          user.primary_site_id,

        email_verified:
          user.email_verified,

        require_two_factor:
          user.require_two_factor,

        two_factor_enabled:
          user.two_factor_enabled

      }

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

app.get("/auth/check-email", (req, res) => {

  res.json({
    success: true,
    message: "Route Auth OK"
  });

});

 app.post("/auth/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const result =
      await login(
        email,
        password
      );

    return res.json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});


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
contract_type,
sla_level,
notes,
} = req.body;
 
console.log({
  contract_type,
  sla_level,
});
console.log("UPDATE COMPANY PARAMS");

console.log({
  id: req.params.id,
  phone,
  email,
  address,
  postal_code,
  city,
  country,
  siret,
  website,
  notes,
  contract_type,
  sla_level,
});
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
notes,
contract_type,
sla_level
);
 
res.json({
success: true,
});
 
} 
catch (error) {

  console.error("ERREUR UPDATE COMPANY");
  console.error(error);

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
app.get(
  "/companies/:id/sites",
  async (req, res) => {

    try {

      const sites =
        await getCompanySites(
          req.params.id
        );

      res.json(sites);

    } catch (error) {

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }
  }
);
app.get(
  "/sites/:id/services",
  async (req, res) => {

    try {

      const services =
        await getSiteServices(
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
  "/sites/:id/services",
  async (req, res) => {

    try {

      const {
        serviceIds,
      } = req.body;

      await saveSiteServices(
        req.params.id,
        serviceIds
      );

      res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);
app.post(
  "/companies/:id/sites",
  async (req, res) => {

    try {

      const site =
        await createSite(
          req.params.id
        );

      res.json({
        success: true,
        site,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);
app.put(
  "/sites/:id/archive",
  async (req, res) => {

    try {

      await archiveSite(
        req.params.id
      );

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

  }
);
app.get(
  "/archived-sites",
  async (req, res) => {

    try {

      const sites =
        await getArchivedSites();

      res.json(sites);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);
app.put(
  "/sites/:id/restore",
  async (req, res) => {

    try {

      await restoreSite(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);
app.delete(
  "/companies/:id/forever",
  async (req, res) => {

    try {

      await deleteCompanyForever(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);

app.delete(
  "/sites/:id/forever",
  async (req, res) => {

    try {

      await deleteSiteForever(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);
app.post(
  "/auth/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const result =
        await login(
          email,
          password
        );

      res.json(result);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur:
          error.message,
      });

    }

  }
);

app.get(
  "/companies/active",
  async (req, res) => {

    try {

      const companies =
        await getAllCompanies();

      res.json(companies);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        erreur: error.message,
      });

    }

  }
);

app.get(
  "/settings",
  async (req, res) => {

    try {

      const settings =
        await getSettings();

      res.json(settings);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: error.message
      });

    }

  }
);

app.put(
  "/settings",
  async (req, res) => {

    try {

      await updateSettings(
        req.body
      );

      res.json({
        success: true
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }
);


app.listen(3000, () => {
 
console.log(
"✅ API démarrée sur http://localhost:3000"
);
 
});