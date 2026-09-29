import {
  useEffect,
  useState,
} from "react";

import "./CompanySelector.css";

import { useTranslation } from "react-i18next";

export default function CompanySelector() {

  const [search, setSearch] =
  useState("");

const [open, setOpen] =
  useState(false);

  const { t } =
  useTranslation();

    const [companies,
    setCompanies] =
      useState([]);

  const [selectedCompany,
    setSelectedCompany] =
      useState(null);

  useEffect(() => {

    loadCompanies();

  }, []);

  async function loadCompanies() {

    try {

      const response =
        await fetch(
          "http://localhost:3000/companies/active"
        );

      const data =
        await response.json();

        console.log(
  "COMPANIES LOADED",
  data
);

      setCompanies(data);

      if (data.length > 0) {

        setSelectedCompany(
          data[0]
        );

      }

    } catch (error) {

      console.error(error);

    }

  }

  return (

  <div className="company-selector">

    <div
      className="company-card"
      onClick={() =>
        setOpen(!open)
      }
    >

      <div className="company-icon">
        🏢
      </div>

      <div className="company-info">

        <div className="company-name">

          {selectedCompany
            ? selectedCompany.name
            : "..."}

        </div>

        <div className="company-code">

          {selectedCompany
            ? selectedCompany.company_code
            : ""}

        </div>

      </div>

    </div>

       {open && (

      <div className="company-dropdown">

      <input
type="text"
placeholder={t("companySelector.search")}
value={search}
onChange={(e) =>
setSearch(
e.target.value
)
}
className="company-search"
/>
 
{companies
.filter((company) =>
 
company.name
.toLowerCase()
.includes(
search.toLowerCase()
)
 
)
.map((company) => (
 
<div
key={company.id}
className="company-item"
onClick={() => {
 
setSelectedCompany(
company
);
 
setOpen(false);
 
}}
>

            <div className="company-item-name">
              {company.name}
            </div>

            <div className="company-item-code">
              {company.company_code}
            </div>

          </div>

        ))}

      </div>

    )}

  </div>

);

}