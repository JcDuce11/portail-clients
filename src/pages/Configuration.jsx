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
    otp_enabled: false,
    smtp_host: "",
    smtp_port: "",
    smtp_ssl: false,
    smtp_user: "",
    smtp_password: "",
    smtp_sender_email: "",
    smtp_sender_name: "",
    smtp_test_email: ""
  });

const [saveMessage, setSaveMessage] =
  useState("");

const [smtpMessage, setSmtpMessage] =
  useState("");

const [smtpError, setSmtpError] =
  useState(false);

const [saveError, setSaveError] =
  useState(false);

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
    map.otp_enabled === "1",

  smtp_host:
    map.smtp_host || "",

  smtp_port:
    map.smtp_port || "",

  smtp_ssl:
    map.smtp_ssl === "1",

  smtp_user:
    map.smtp_user || "",

  smtp_password:
    map.smtp_password || "",

  smtp_sender_email:
    map.smtp_sender_email || "",

  smtp_sender_name:
    map.smtp_sender_name || "",

  smtp_test_email: ""

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
      : "0",

  smtp_host:
    form.smtp_host,

  smtp_port:
    form.smtp_port,

  smtp_ssl:
    form.smtp_ssl
      ? "1"
      : "0",

  smtp_user:
    form.smtp_user,

  smtp_password:
    form.smtp_password,

  smtp_sender_email:
    form.smtp_sender_email,

  smtp_sender_name:
    form.smtp_sender_name

})


        }
      );

    const data =
    await response.json();

    if (data.success) {

  setSaveError(false);

  setSaveMessage(
    t("configuration.saved")
  );

  setTimeout(() => {

    setSaveMessage("");

  }, 3000);

}


  } catch (error) {

    console.error(error);

setSaveError(true);

setSaveMessage(
  t("configuration.saveError")
);

setTimeout(() => {

  setSaveMessage("");

}, 5000);

  }

};

const testSmtp =
  async () => {

    try {

      const response =
        await fetch(
          "http://localhost:3000/smtp/test",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              email:
                form.smtp_test_email
            })

          }
        );

      const data =
        await response.json();

      if (data.success) {

        setSmtpError(false);

        setSmtpMessage(
          t(
            "configuration.smtp.testSuccess"
          )
        );

      } else {

        setSmtpError(true);

        const smtpErrors = {

  SMTP_SSL_ERROR:
    t(
      "configuration.smtp.errors.ssl"
    ),

  SMTP_AUTH_ERROR:
    t(
      "configuration.smtp.errors.auth"
    ),

  SMTP_RATE_LIMIT:
    t(
    "configuration.smtp.errors.rateLimit"
    ),

  SMTP_UNKNOWN_ERROR:
    t(
      "configuration.smtp.errors.unknown"
    )

};

setSmtpMessage(

  smtpErrors[
    data.errorCode
  ] ||

  t(
    "configuration.smtp.errors.unknown"
  )

);

      }

      setTimeout(() => {

        setSmtpMessage("");

      }, 5000);

    } catch (error) {

      console.error(error);

      setSmtpError(true);

      setSmtpMessage(
        t(
          "configuration.smtp.testError"
        )
      );

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

<div className="configuration-actions">

  <button
    type="button"
    className="configuration-save"
    onClick={saveSettings}
  >
    {t("configuration.save")}
  </button>

  {saveMessage && (

    <div
      className={
        saveError
          ? "configuration-feedback error"
          : "configuration-feedback success"
      }
    >
      {saveMessage}
    </div>

  )}

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

  <div className="configuration-section">

    <div>

      <strong>
        {t("configuration.smtp.host")}
      </strong>

      <input
        type="text"
        value={form.smtp_host}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_host:
              e.target.value
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.port")}
      </strong>

      <input
        type="number"
        value={form.smtp_port}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_port:
              e.target.value
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.ssl")}
      </strong>

      <input
        type="checkbox"
        checked={form.smtp_ssl}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_ssl:
              e.target.checked
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.user")}
      </strong>

      <input
        type="text"
        value={form.smtp_user}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_user:
              e.target.value
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.password")}
      </strong>

      <input
        type="password"
        value={form.smtp_password}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_password:
              e.target.value
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.senderName")}
      </strong>

      <input
        type="text"
        value={form.smtp_sender_name}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_sender_name:
              e.target.value
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.senderEmail")}
      </strong>

      <input
        type="email"
        value={form.smtp_sender_email}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_sender_email:
              e.target.value
          })
        }
      />

    </div>

    <div>

      <strong>
        {t("configuration.smtp.testEmail")}
      </strong>

      <input
        type="email"
        value={form.smtp_test_email}
        onChange={(e) =>
          setForm({
            ...form,
            smtp_test_email:
              e.target.value
          })
        }
      />

    </div>

    <br />

<div className="configuration-actions">

<button
  type="button"
  className="configuration-save"
  onClick={testSmtp}
>
  {t("configuration.smtp.test")}
</button>

{smtpMessage && (

  <div
    className={
      smtpError
        ? "configuration-feedback error"
        : "configuration-feedback success"
    }
  >
    {smtpMessage}
  </div>

)}

  <button
    type="button"
    className="configuration-save"
    onClick={saveSettings}
  >
    {t("configuration.save")}
  </button>

  {saveMessage && (

    <div
      className={
        saveError
          ? "configuration-feedback error"
          : "configuration-feedback success"
      }
    >
      {saveMessage}
    </div>

  )}

</div>

  </div>

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