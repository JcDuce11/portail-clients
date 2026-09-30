import { useState } from "react";
import "./Login.css";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin() {

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

      console.log(data);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>
          Portail Clients MSP
        </h1>

        <p className="subtitle">
          Connexion au portail
        </p>

        <div className="login-form">

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="alexandre@portail.local"
          />

          <label>
            Mot de passe
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="********"
          />

          <button
            onClick={
              handleLogin
            }
          >
            Connexion
          </button>

        </div>

      </div>

    </div>

  );

}

export default Login;