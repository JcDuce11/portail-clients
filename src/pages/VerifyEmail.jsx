import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function VerifyEmail() {

  const { t } =
    useTranslation();

  const [result, setResult] =
    useState("loading");

  useEffect(() => {

    const verify =
      async () => {

        const params =
          new URLSearchParams(
            window.location.search
          );

        const token =
          params.get("token");

        try {

          const response =
            await fetch(
              `http://localhost:3000/auth/verify-email?token=${token}`
            );

          const data =
            await response.json();

          if (data.success) {

            setResult(
              "success"
            );

            return;
          }

          if (
            data.errorCode ===
            "TOKEN_EXPIRED"
          ) {

            setResult(
              "expired"
            );

            return;
          }

          if (
            data.errorCode ===
            "TOKEN_ALREADY_USED"
          ) {

            setResult(
              "alreadyUsed"
            );

            return;
          }

          setResult(
            "invalid"
          );

        } catch {

          setResult(
            "invalid"
          );

        }

      };

    verify();

  }, []);

  return (

    <div className="register-page">

      {result === "loading" && (

        <p>
          {t(
            "verifyEmail.loading"
          )}
        </p>

      )}

      {result === "success" && (

        <>
          <h1>
            {t(
              "verifyEmail.successTitle"
            )}
          </h1>

          <p>
            {t(
              "verifyEmail.successDescription"
            )}
          </p>
        </>

      )}

      {result === "expired" && (

        <>
          <h1>
            {t(
              "verifyEmail.expiredTitle"
            )}
          </h1>

          <p>
            {t(
              "verifyEmail.expiredDescription"
            )}
          </p>
        </>

      )}

      {result === "alreadyUsed" && (

        <>
          <h1>
            {t(
              "verifyEmail.alreadyUsedTitle"
            )}
          </h1>

          <p>
            {t(
              "verifyEmail.alreadyUsedDescription"
            )}
          </p>
        </>

      )}

      {result === "invalid" && (

        <>
          <h1>
            {t(
              "verifyEmail.invalidTitle"
            )}
          </h1>

          <p>
            {t(
              "verifyEmail.invalidDescription"
            )}
          </p>
        </>

      )}

    </div>

  );

}