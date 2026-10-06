import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {

  const { t } =
    useTranslation();

  const [step, setStep] =
    useState(1);

  const [companyDetected,
  setCompanyDetected] =
    useState(null);

  const [requestReady, setRequestReady] =
  useState(false);

  const [selectedSiteId, setSelectedSiteId] =
  useState("");

    const [createNewSite, setCreateNewSite] =
  useState(false);

    const [analysisResult, setAnalysisResult] =
  useState(null);

  const [form, setForm] =
    useState({

      firstname: "",
      lastname: "",

      mobile: "",
      phone: "",

      email: "",

      password: "",
      confirmPassword: "",

      company: "",
      site: "",

      address: "",
      postalCode: "",
      city: "",
      country: ""

    });

  const [genericSearch, setGenericSearch] =
  useState({

    company: "",

    site: "",

    address: "",

    postalCode: "",

    city: "",

    country: ""

  });


  const updateField =
    (field, value) => {

      setForm({
        ...form,
        [field]: value
      });

    };

    const analyzeRegistration =
  async () => {

    try {

      const response =
        await fetch(
          "http://localhost:3000/auth/analyze-registration",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              email:
                form.email,

              company:
                form.company,

              site:
                form.site,

              postalCode:
                form.postalCode,

              city:
                form.city

            })

          }
        );

      const data =
        await response.json();

        console.log(
  "ANALYSIS RESULT",
  data
);

      setAnalysisResult(data);

      setStep(3);

    } catch (error) {

      console.error(error);

    }

};

const analyzeGenericCompany =
  async () => {

    try {

      const response =
        await fetch(
          "http://localhost:3000/auth/search-company",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              company:
                genericSearch.company,

              site:
                genericSearch.site,

              postalCode:
                genericSearch.postalCode,

              city:
                genericSearch.city

            })

          }
        );

      const data =
        await response.json();

      console.log(
        "GENERIC SEARCH RESULT",
        data
      );

      setAnalysisResult(data);
      setStep(3);

    } catch (error) {

      console.error(error);

    }

};

const analyzeEmail =
  async () => {

    try {

      const response =
        await fetch(
          "http://localhost:3000/auth/analyze-email",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify({

                email:
                  form.email

              })

          }
        );

      const data =
        await response.json();

console.log(
  "EMAIL ANALYSIS",
  data
);

      setCompanyDetected(
        data
      );

      setStep(2);

    } catch (error) {

      console.error(error);

    }

};

  return (

    <div className="register-page">

      <div className="login-logo">
        LOGO
      </div>

      <h1>
        {t("register.title")}
      </h1>

      <p>
        {t("register.description")}
      </p>

      {step === 1 && (

        <div className="register-form">

          <input
            type="text"
            placeholder={t("register.firstname")}
            value={form.firstname}
            onChange={(e) =>
              updateField(
                "firstname",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.lastname")}
            value={form.lastname}
            onChange={(e) =>
              updateField(
                "lastname",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.mobile")}
            value={form.mobile}
            onChange={(e) =>
              updateField(
                "mobile",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.phone")}
            value={form.phone}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder={t("register.email")}
            value={form.email}
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder={t("register.password")}
            value={form.password}
            onChange={(e) =>
              updateField(
                "password",
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder={t("register.confirmPassword")}
            value={form.confirmPassword}
            onChange={(e) =>
              updateField(
                "confirmPassword",
                e.target.value
              )
            }
          />

          <button
            type="button"
            onClick={analyzeEmail}
          >
            {t("register.continue")}
          </button>

        </div>

      )}

      {step === 2 && (

  <div className="register-form">

    {companyDetected?.result ===
      "COMPANY_FOUND" && (

      <>

        <h2>
          {t(
            "register.companyDetectedTitle"
          )}
        </h2>

        <p>
          {companyDetected.company.name}
        </p>

        <label>
          {t(
            "register.selectSite"
          )}
        </label>

        <select
          value={selectedSiteId}
          onChange={(e) =>
            setSelectedSiteId(
              e.target.value
            )
          }
        >

          <option value="">
            {t(
              "register.selectSite"
            )}
          </option>

          {companyDetected.sites.map(
            (site) => (

              <option
                key={site.id}
                value={site.id}
              >

                {site.site_name}

              </option>

            )
          )}

        </select>

        <button
  type="button"
  onClick={() => {

    setAnalysisResult({

      result:
        "COMPANY_SITE_FOUND",

      company:
        companyDetected.company.name,

      site:
        companyDetected.sites.find(
          site =>
            String(site.id) ===
            String(selectedSiteId)
        )?.site_name

    });

<div style={{
  color: "red",
  fontWeight: "bold"
}}>
  RESULT = {companyDetected?.result}
</div>

    setStep(3);

  }}
>
  {t(
    "register.useSelectedSite"
  )}
</button>

        <button
          type="button"
          onClick={() =>
            setCreateNewSite(true)
          }
        >
          {t(
            "register.createNewSite"
          )}
        </button>

        {createNewSite && (

          <div className="register-form">

            <input
              type="text"
              placeholder={
                t(
                  "register.newSiteName"
                )
              }
            />

            <input
              type="text"
              placeholder={
                t(
                  "register.address"
                )
              }
            />

            <input
              type="text"
              placeholder={
                t(
                  "register.postalCode"
                )
              }
            />

            <input
              type="text"
              placeholder={
                t(
                  "register.city"
                )
              }
            />

            <input
              type="text"
              placeholder={
                t(
                  "register.country"
                )
              }
            />

            <button
              type="button"
            >
              {t(
                "register.submitRequest"
              )}
            </button>

          </div>

        )}

      </>

    )}

    {(companyDetected?.result ===
      "GENERIC_DOMAIN" ) && (

      <>

        <input
          type="text"
          placeholder={
            t("register.company")
          }
          value={genericSearch.company}
          onChange={(e) =>
            setGenericSearch({
              ...genericSearch,
              company:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder={
            t("register.site")
          }
          value={genericSearch.site}
          onChange={(e) =>
            setGenericSearch({
              ...genericSearch,
              site:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder={
            t("register.address")
          }
          value={genericSearch.address}
          onChange={(e) =>
            setGenericSearch({
              ...genericSearch,
              address:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder={
            t(
              "register.postalCode"
            )
          }
          value={
            genericSearch.postalCode
          }
          onChange={(e) =>
            setGenericSearch({
              ...genericSearch,
              postalCode:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder={
            t("register.city")
          }
          value={genericSearch.city}
          onChange={(e) =>
            setGenericSearch({
              ...genericSearch,
              city:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder={
            t("register.country")
          }
          value={genericSearch.country}
          onChange={(e) =>
            setGenericSearch({
              ...genericSearch,
              country:
                e.target.value
            })
          }
        />

        <button
          type="button"
          onClick={
            analyzeGenericCompany
          }
        >
          {t(
            "register.searchCompany"
          )}
        </button>

      </>

    )}

   {companyDetected?.result ===
  "DOMAIN_NOT_FOUND" && (

  <>

    <h2>
      {t(
        "register.domainNotFoundTitle"
      )}
    </h2>

    <p>
      {t(
        "register.domainNotFoundDescription"
      )}
    </p>

    <input
      type="text"
      placeholder={
        t("register.company")
      }
      value={genericSearch.company}
      onChange={(e) =>
        setGenericSearch({
          ...genericSearch,
          company:
            e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder={
        t("register.site")
      }
      value={genericSearch.site}
      onChange={(e) =>
        setGenericSearch({
          ...genericSearch,
          site:
            e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder={
        t("register.address")
      }
      value={genericSearch.address}
      onChange={(e) =>
        setGenericSearch({
          ...genericSearch,
          address:
            e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder={
        t("register.postalCode")
      }
      value={
        genericSearch.postalCode
      }
      onChange={(e) =>
        setGenericSearch({
          ...genericSearch,
          postalCode:
            e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder={
        t("register.city")
      }
      value={
        genericSearch.city
      }
      onChange={(e) =>
        setGenericSearch({
          ...genericSearch,
          city:
            e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder={
        t("register.country")
      }
      value={
        genericSearch.country
      }
      onChange={(e) =>
        setGenericSearch({
          ...genericSearch,
          country:
            e.target.value
        })
      }
    />

    <button
      type="button"
      onClick={
        analyzeGenericCompany
      }
    >
      {t(
        "register.searchCompany"
      )}
    </button>

  </>

)} 

  </div>

)}

      {step === 3 && (

  <div className="register-form">

    {analysisResult?.result === "COMPANY_SITE_FOUND" && (

      <>

        <h2>
          {t("register.resultFoundTitle")}
        </h2>

        <p>
          {t("register.resultFoundDescription")}
        </p>

        <div>
  {t("register.company")} :
  {analysisResult?.company}
</div>

<div>
  {t("register.site")} :
  {analysisResult?.site}
</div>
        <button
  type="button"
  onClick={() => {
    console.log("USER CONFIRMED COMPANY/SITE");
  }}
>
  {t("common.yes")}
</button>

<button
  type="button"
  onClick={() => {
    setStep(2);
  }}
>
  {t("common.no")}
</button>

      </>

    )}

    {analysisResult?.result === "COMPANY_FOUND_SITE_MISSING" && (

  <>

    <h2>
      {t(
        "register.siteMissingTitle"
      )}
    </h2>

    <p>
      {t(
        "register.siteMissingDescription"
      )}
    </p>

    <div>

      <strong>
        {t("register.company")} :
      </strong>

      {" "}
      {analysisResult.company}

    </div>

    <br />

    <label>

      {t(
        "register.selectExistingSite"
      )}

    </label>

    <select>

      {analysisResult?.sites?.map(
        (site) => (

          <option
            key={site.id}
            value={site.id}
          >

            {site.site_name}

          </option>

        )
      )}

    </select>

    <br />

    <button
      type="button"
    >

      {t(
        "register.useSelectedSite"
      )}

    </button>

    <br />

    <button
  type="button"
  onClick={() =>
    setCreateNewSite(true)
  }
>
  {t("register.createNewSite")}
</button>

{createNewSite && (

  <div className="register-form">

    <input
      type="text"
      placeholder={t("register.newSiteName")}
    />

    <input
      type="text"
      placeholder={t("register.address")}
    />

    <input
      type="text"
      placeholder={t("register.postalCode")}
    />

    <input
      type="text"
      placeholder={t("register.city")}
    />

    <input
      type="text"
      placeholder={t("register.country")}
    />

    <button
  type="button"
  onClick={() =>
    setAnalysisResult({
      result:
        "NEW_SITE_REQUEST_READY"
    })
  }
>
  {t("register.submitRequest")}
</button>

{requestReady && (

  <div className="register-success">

    {t(
      "register.requestReady"
    )}

  </div>

)}

  </div>

)}

  </>

)}

    {analysisResult?.result === "GENERIC_DOMAIN" && (

      <>

  <h2>
    {t(
      "register.genericDomainTitle"
    )}
  </h2>

  <p>
    {t(
      "register.genericDomainDescription"
    )}
  </p>

  <input
    type="text"
    placeholder={
      t("register.company")
    }
    value={
      genericSearch.company
    }
    onChange={(e) =>
      setGenericSearch({
        ...genericSearch,
        company:
          e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder={
      t("register.site")
    }
    value={
      genericSearch.site
    }
    onChange={(e) =>
      setGenericSearch({
        ...genericSearch,
        site:
          e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder={
      t("register.address")
    }
    value={
      genericSearch.address
    }
    onChange={(e) =>
      setGenericSearch({
        ...genericSearch,
        address:
          e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder={
      t("register.postalCode")
    }
    value={
      genericSearch.postalCode
    }
    onChange={(e) =>
      setGenericSearch({
        ...genericSearch,
        postalCode:
          e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder={
      t("register.city")
    }
    value={
      genericSearch.city
    }
    onChange={(e) =>
      setGenericSearch({
        ...genericSearch,
        city:
          e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder={
      t("register.country")
    }
    value={
      genericSearch.country
    }
    onChange={(e) =>
      setGenericSearch({
        ...genericSearch,
        country:
          e.target.value
      })
    }
  />

  <button
  type="button"
  onClick={
    analyzeGenericCompany
  }
>
  {t(
    "register.searchCompany"
  )}
</button>

</>

    )}

    {analysisResult?.result === "NO_MATCH" && (

  <>
  <h2>
    {t("register.noMatchTitle")}
  </h2>

  <p>
    {t("register.noMatchDescription")}
  </p>

  <button
    type="button"
    onClick={() =>
      setAnalysisResult({
        result: "REQUEST_READY"
      })
    }
  >
    {t("register.sendRequest")}
  </button>

  <button
    type="button"
    onClick={() =>
      setStep(2)
    }
  >
    {t("register.back")}
  </button>
</>

)}

{analysisResult?.result === "NEW_SITE_REQUEST_READY" && (

  <>

    <h2>
      {t(
        "register.requestReadyTitle"
      )}
    </h2>

    <p>
      {t(
        "register.requestReadyDescription"
      )}
    </p>

    <button
      type="button"
    >
      {t(
        "register.sendRequest"
      )}
    </button>

  </>

)}

{analysisResult?.result ===
 "REQUEST_READY" && (

  <>
    <h2>
      {t(
        "register.requestReadyTitle"
      )}
    </h2>

    <p>
      {t(
        "register.requestReadyDescription"
      )}
    </p>

    <button
      type="button"
    >
      {t(
        "register.sendRequest"
      )}
    </button>

  </>

)}

  </div>

)}

    </div>

  );

}