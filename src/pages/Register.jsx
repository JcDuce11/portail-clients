import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {

  const { t } =
    useTranslation();

  const [step, setStep] =
    useState(1);

    const [analysisResult, setAnalysisResult] =
  useState("companySiteFound");

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

  const updateField =
    (field, value) => {

      setForm({
        ...form,
        [field]: value
      });

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
            onClick={() =>
              setStep(2)
            }
          >
            {t("register.continue")}
          </button>

        </div>

      )}

      {step === 2 && (

        <div className="register-form">

          <input
            type="text"
            placeholder={t("register.company")}
            value={form.company}
            onChange={(e) =>
              updateField(
                "company",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.site")}
            value={form.site}
            onChange={(e) =>
              updateField(
                "site",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.address")}
            value={form.address}
            onChange={(e) =>
              updateField(
                "address",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.postalCode")}
            value={form.postalCode}
            onChange={(e) =>
              updateField(
                "postalCode",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.city")}
            value={form.city}
            onChange={(e) =>
              updateField(
                "city",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder={t("register.country")}
            value={form.country}
            onChange={(e) =>
              updateField(
                "country",
                e.target.value
              )
            }
          />

          <div
            className="register-actions"
          >

            <button
              type="button"
              onClick={() =>
                setStep(1)
              }
            >
              {t("register.back")}
            </button>

           <button
  type="button"
  onClick={() =>
    setStep(3)
  }
>
  {t("register.verify")}
</button>

          </div>

        </div>

      )}

      {step === 3 && (

  <div className="register-form">

    {analysisResult === "companySiteFound" && (

      <>

        <h2>
          {t("register.resultFoundTitle")}
        </h2>

        <p>
          {t("register.resultFoundDescription")}
        </p>

        <div>
          {t("register.company")} :
          DUPONT
        </div>

        <div>
          {t("register.site")} :
          PARIS
        </div>

        <button type="button">
          {t("common.yes")}
        </button>

        <button type="button">
          {t("common.no")}
        </button>

      </>

    )}

    {analysisResult === "companyFoundSiteMissing" && (

      <>

        <h2>
          {t("register.siteMissingTitle")}
        </h2>

        <p>
          {t("register.siteMissingDescription")}
        </p>

        <button type="button">
          {t("register.selectExistingSite")}
        </button>

        <button type="button">
          {t("register.createNewSite")}
        </button>

      </>

    )}

    {analysisResult === "genericDomain" && (

      <>

        <h2>
          {t("register.genericDomainTitle")}
        </h2>

        <p>
          {t("register.genericDomainDescription")}
        </p>

        <button type="button">
          {t("common.continue")}
        </button>

      </>

    )}

  </div>

)}

    </div>

  );

}