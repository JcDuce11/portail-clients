import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Configuration() {

  const { t } = useTranslation();

  const [activeTab, setActiveTab] =
    useState("auth");

  const [settings, setSettings] =
  useState([]);

const settingsMap =
  Object.fromEntries(
    settings.map((item) => [
      item.setting_key,
      item.setting_value,
    ])
  );

useEffect(() => {

  const loadSettings =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:3000/settings"
          );

        const data =
          await response.json();

        console.log(
          "SETTINGS",
          data
        );

        setSettings(data);

      } catch (error) {

        console.error(error);

      }

    };

  loadSettings();

}, []);

  return (

    <div className="configuration-page">

      <h1>
        {t("configuration.title")}
      </h1>

      <div className="configuration-tabs">

        <button
          type="button"
          onClick={() => setActiveTab("auth")}
        >
          {t("configuration.tabs.auth")}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("smtp")}
        >
          {t("configuration.tabs.smtp")}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("graph")}
        >
          {t("configuration.tabs.graph")}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
        >
          {t("configuration.tabs.security")}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("branding")}
        >
          {t("configuration.tabs.branding")}
        </button>

      </div>

      <div className="configuration-content">

        {activeTab === "auth" && (

          <section>

  <h2>
    {t("configuration.auth.title")}
  </h2>

  <p>
    {t("configuration.auth.description")}
  </p>

  <div className="configuration-section">

    <div>

      <strong>
        {t(
          "configuration.auth.maxLoginAttempts"
        )}
      </strong>

      <div>
        {
          settingsMap.max_login_attempts
        }
      </div>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.lockDuration"
        )}
      </strong>

      <div>
        {
          settingsMap.lock_duration_minutes
        } min
      </div>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.sessionDuration"
        )}
      </strong>

      <div>
        {
          settingsMap
            .session_duration_hours
        } h
      </div>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.emailValidation"
        )}
      </strong>

      <div>

        {
          settingsMap.email_validation_required ===
          "1"

            ? t("common.enabled")

            : t("common.disabled")
        }

      </div>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.otpEnabled"
        )}
      </strong>

      <div>

        {
          settingsMap.otp_enabled ===
          "1"

            ? t("common.enabled")

            : t("common.disabled")
        }

      </div>

    </div>

  </div>

</section>

        )}

        {activeTab === "smtp" && (

          <section>

            <h2>
              {t("configuration.smtp.title")}
            </h2>

            <p>
              {t("configuration.smtp.description")}
            </p>

          </section>

        )}

        {activeTab === "graph" && (

          <section>

            <h2>
              {t("configuration.graph.title")}
            </h2>

            <p>
              {t("configuration.graph.description")}
            </p>

          </section>

        )}

        {activeTab === "security" && (

          <section>

            <h2>
              {t("configuration.security.title")}
            </h2>

            <p>
              {t("configuration.security.description")}
            </p>

          </section>

        )}

        {activeTab === "branding" && (

          <section>

            <h2>
              {t("configuration.branding.title")}
            </h2>

            <p>
              {t("configuration.branding.description")}
            </p>

          </section>

        )}

      </div>

    </div>

  );

}