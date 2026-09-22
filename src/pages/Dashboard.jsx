import { useState } from "react";
 
function Dashboard() {
const [companyName, setCompanyName] =
useState("");
 
async function createCompany() {
 
try {
 
const response = await fetch(
"http://localhost:3000/companies",
{
method: "POST",
headers: {
"Content-Type":
"application/json",
},
body: JSON.stringify({
name:
companyName,
}),
}
);
 
const data =
await response.json();
 
alert(
"✅ Société créée avec succès\n\nRéférence : " +
data.companyCode
);
 
setCompanyName("");
 
} 
catch (error) {
console.error(error);
 
alert(
"Erreur création société\n\n" +
error.message
);
}
}
 
return (
<div
style={{
padding: "20px",
}}
>
<h1>
Portail Clients MSP
</h1>
 
<h2>
Nouvelle société
</h2>
 
<input
placeholder="Nom société"
value={companyName}
onChange={(e) =>
setCompanyName(
e.target.value
)
}
/>
 
<br />
<br />
 
<button
onClick={
createCompany
}
>
Ajouter
</button>
</div>
);
}
 
export default Dashboard;