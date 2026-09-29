import UserMenu from "./UserMenu";

import "./Header.css";

import CompanySelector
  from "./CompanySelector";

export default function Header() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {

      firstname: "Alexandre",
      lastname: "FOURMY",
      role: "SUPER_ADMIN",

    };

  return (

    <header className="header">

      <div className="header-company">

     <CompanySelector />

      </div>

      <UserMenu user={user} />

    </header>

  );

}