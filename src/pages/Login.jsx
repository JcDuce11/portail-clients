import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Login.css";

export default function Login() {
  const { t } = useTranslation();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          LOGO
        </div>

        {step === "email" && (
          <>
            <h1>{t("login.welcome")}</h1>

            <input
              type="email"
              value={email}
              placeholder={t("login.email")}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setStep("password")}
            >
              {t("login.continue")}
            </button>
          </>
        )}

        {step === "password" && (
          <>
            <h1>{email}</h1>

            <input
              type="password"
              placeholder={t("login.password")}
            />

            <button type="button">
              {t("login.login")}
            </button>
          </>
        )}

      </div>
    </div>
  );
}