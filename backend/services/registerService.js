const db = require("../config/db");

const GENERIC_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "orange.fr",
  "free.fr",
  "sfr.fr",
  "laposte.net",
  "yahoo.com"
];

async function searchCompanyByAddress(
  company,
  site,
  city,
  postalCode
) {

  const [companies] =
    await db.execute(
      `
      SELECT *
      FROM companies
      WHERE LOWER(name) =
            LOWER(?)
      `,
      [company]
    );

  if (
    companies.length === 0
  ) {

    return {
      result:
        "NO_MATCH"
    };

  }

  const foundCompany =
    companies[0];

  const [sites] =
    await db.execute(
      `
      SELECT
        id,
        site_name
      FROM sites
      WHERE company_id = ?
      `,
      [foundCompany.id]
    );

  return {

    result:
      "COMPANY_FOUND",

    company: {

      id:
        foundCompany.id,

      name:
        foundCompany.name

    },

    sites

  };

}

async function analyzeEmailDomain(
  email
) {

  const domain =
    email.split("@")[1]
      ?.toLowerCase();

  if (
    GENERIC_DOMAINS.includes(
      domain
    )
  ) {

    return {
      result:
        "GENERIC_DOMAIN"
    };

  }

  const [companies] =
    await db.execute(
      `
      SELECT *
      FROM companies
      WHERE website LIKE ?
      `,
      [`%${domain}%`]
    );

  if (
    companies.length === 0
  ) {

    return {
      result:
        "DOMAIN_NOT_FOUND"
    };

  }

  const company =
    companies[0];

  const [sites] =
    await db.execute(
      `
      SELECT id,
             site_name
      FROM sites
      WHERE company_id = ?
      `,
      [company.id]
    );

  return {

    result:
      "COMPANY_FOUND",

    company: {

      id: company.id,

      name: company.name

    },

    sites

  };

}

async function analyzeRegistration(data) {

  const {
    email,
    company,
    site,
    postalCode,
    city
  } = data;

  const domain =
    email.split("@")[1]
      ?.toLowerCase();

  if (
    GENERIC_DOMAINS.includes(
      domain
    )
  ) {

    return {
      result:
        "GENERIC_DOMAIN"
    };

  }

  const [companies] =
    await db.execute(
      `
      SELECT *
      FROM companies
      WHERE website LIKE ?
      `,
      [`%${domain}%`]
    );

  if (
    companies.length === 0
  ) {

    return {
      result:
        "NO_MATCH"
    };

  }

  const foundCompany =
    companies[0];

  const [sites] =
    await db.execute(
      `
      SELECT *
      FROM sites
      WHERE company_id = ?
      `,
      [foundCompany.id]
    );

  const foundSite =
    sites.find(
      s =>
        s.site_name
          .toLowerCase()
          .includes(
            site.toLowerCase()
          )
    );

  if (foundSite) {

    return {

      result:
        "COMPANY_SITE_FOUND",

      company:
        foundCompany.name,

      site:
        foundSite.site_name

    };

  }

  return {

    result:
      "COMPANY_FOUND_SITE_MISSING",

    company:
      foundCompany.name,

    sites:
      sites.map(
        site => ({

          id: site.id,

          site_name:
            site.site_name

        })
      )

  };

}

module.exports = {
  analyzeRegistration,
  searchCompanyByAddress,
  analyzeEmailDomain
};