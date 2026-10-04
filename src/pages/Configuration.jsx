import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Configuration.css";

export default function Configuration() {

  const { t } = useTranslation();

  const [activeTab, setActiveTab] =
    useState("auth");

  const [settings, setSettings] =
  useState([]);

const [form, setForm] =
  useState({
    max_login_attempts: "",
    lock_duration_minutes: "",
    session_duration_hours: "",
    email_validation_required: false,
    otp_enabled: false
  });

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

        const map =
  Object.fromEntries(
    data.map(item => [
      item.setting_key,
      item.setting_value
    ])
  );

setForm({

  max_login_attempts:
    map.max_login_attempts || "",

  lock_duration_minutes:
    map.lock_duration_minutes || "",

  session_duration_hours:
    map.session_duration_hours || "",

  email_validation_required:
    map.email_validation_required === "1",

  otp_enabled:
    map.otp_enabled === "1"

});

      } catch (error) {

        console.error(error);

      }

    };

  loadSettings();

}, []);

const saveSettings = async () => {

  try {

    const response =
      await fetch(
        "http://localhost:3000/settings",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            max_login_attempts:
              form.max_login_attempts,

            lock_duration_minutes:
              form.lock_duration_minutes,

            session_duration_hours:
              form.session_duration_hours,

            email_validation_required:
              form.email_validation_required
                ? "1"
                : "0",

            otp_enabled:
              form.otp_enabled
                ? "1"
                : "0"

          })

        }
      );

    const data =
    await response.json();

    if (data.success) {

      alert(
        t(
          "configuration.saved"
        )
      );

    }

  } catch (error) {

    console.error(error);

  }

};

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

      <input
  type="number"
  value={form.max_login_attempts}
  onChange={(e) =>
    setForm({
      ...form,
      max_login_attempts:
        e.target.value
    })
  }
/>
    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.lockDuration"
        )}
      </strong>

      <input
  type="number"
  value={form.lock_duration_minutes}
  onChange={(e) =>
    setForm({
      ...form,
      lock_duration_minutes:
        e.target.value
    })
  }
/>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.sessionDuration"
        )}
      </strong>

      <input
  type="number"
  value={form.session_duration_hours}
  onChange={(e) =>
    setForm({
      ...form,
      session_duration_hours:
        e.target.value
    })
  }
/>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.emailValidation"
        )}
      </strong>

      <input
  type="checkbox"
  checked={
    form.email_validation_required
  }
  onChange={(e) =>
    setForm({
      ...form,
      email_validation_required:
        e.target.checked
    })
  }
/>

    </div>

    <br />

    <div>

      <strong>
        {t(
          "configuration.auth.otpEnabled"
        )}
      </strong>

      <input
  type="checkbox"
  checked={form.otp_enabled}
  onChange={(e) =>
    setForm({
      ...form,
      otp_enabled:
        e.target.checked
    })
  }
/>

    </div>

  </div>

<br />

<button
  type="button"
  className="configuration-save"
  onClick={saveSettings}
>
  {t("configuration.save")}
</button>

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