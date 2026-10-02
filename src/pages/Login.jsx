import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { t } = useTranslation();
  const [info, setInfo] = useState("");
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [otpCode, setOtpCode] = useState("");
  const { login } = useAuth();
  const handleOtpSubmit = () => {

  if (otpCode === "123456") {

  login({
  email,
  role: "SUPER_ADMIN",
});

  window.location.reload();

  return;
}

  setError(
    t("login.invalidOtp")
  );

  triggerShake();
};

const handleEmailSubmit = async () => {

  try {

    const response =
      await fetch(
        "http://localhost:3000/auth/check-email",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

    const data =
      await response.json();

    if (!data.exists) {

      setError(
        t("login.unknownUser")
      );

      triggerShake();

      return;
    }

    setError("");

    setTransitioning(true);

    setTimeout(() => {

      setStep(
        "password"
      );

      setTransitioning(false);

    }, 450);

  } catch (error) {

    console.error(error);

    setError(
      t("login.serverError")
    );

  }

};

const handlePasswordSubmit = async () => {

  const maxAttempts = 4;

  try {

  const response =
    await fetch(
      "http://localhost:3000/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

  const data =
    await response.json();

  if (!data.success) {

    const newAttempts =
      failedAttempts + 1;

    setFailedAttempts(
      newAttempts
    );

    const remainingAttempts =
      Math.max(
        0,
        maxAttempts -
          newAttempts
      );

    setError(
      data.message
    );

    triggerShake();

    return;
  }

  setError("");

  setFailedAttempts(0);

  const user =
    data.user;

  const otpRequired =
  data.otpRequired;

  if (otpRequired) {

    setTransitioning(true);

    setTimeout(() => {

      setStep("otp");

      setTransitioning(
        false
      );

    }, 450);

  } else {

    login(user);

    window.location.reload();

  }

  return;

} catch (error) {

  console.error(error);

  setError(
    t("login.serverError")
  );

}

  const newAttempts =
    failedAttempts + 1;

  setFailedAttempts(newAttempts);

  const remainingAttempts =
    Math.max(
      0,
      maxAttempts - newAttempts
    );

  if (remainingAttempts <= 0) {

    setError(
      t("login.accountLocked")
    );

    triggerShake();

    return;
  }

  setError(
    t("login.invalidPassword", {
      count: remainingAttempts,
    })
  );

  triggerShake();
};

const handleForgotPassword = () => {

  // TODO API

  setInfo(
    t("login.resetEmailSent")
  );

};

const triggerShake = () => {
  setShake(true);

  setTimeout(() => {
    setShake(false);
  }, 500);
};
const [transitioning, setTransitioning] =
  useState(false);

 return (
  <div className="login-page">

    <div
  className={`
    login-card
    ${shake ? "shake" : ""}
    ${transitioning ? "slide-out" : ""}
  `}
>

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
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

{error && (
<div className="login-error">
{error}
</div>
)}

<button
  type="button"
  onClick={handleEmailSubmit}
>
  {t("login.continue")}
</button>
          </>
        )}

        {step === "password" && (
  <div className="slide-in">

    <input
      type="password"
      value={password}
      placeholder={t("login.password")}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    {error && (
      <div className="login-error">
        {error}
      </div>
    )}

    <button
      type="button"
      onClick={handlePasswordSubmit}
    >
      {t("login.login")}
    </button>

    {failedAttempts >= 2 && (
      <button
        type="button"
        className="forgot-password-link"
      >
        Mot de passe oublié ?
      </button>
    )}

  </div>
)}

{step === "otp" && (
  <div className="slide-in">

<div className="otp-info">

  <div className="otp-title">
  {t("login.otpTitle")}
</div>

  <div className="otp-subtitle">
    {t("login.enterOtp")}
  </div>

</div>

    <input
      type="text"
      value={otpCode}
      maxLength={6}
      placeholder={t("login.otpPlaceholder")}
      onChange={(e) =>
        setOtpCode(
          e.target.value
        )
      }
    />

{error && (
  <div className="login-error">
    {error}
  </div>
)}

    <button
  type="button"
  onClick={handleOtpSubmit}
>
  {t("login.verify")}
</button>

  </div>
)}

      </div>
    </div>
  );
}