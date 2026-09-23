import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
 
function Companies() {
const { t, i18n } = useTranslation();
const [companies, setCompanies] = useState([]);
const [selectedCompany, setSelectedCompany] = useState(null);
const [archivedCompanies, setArchivedCompanies] = useState([]);
const [services, setServices] = useState([]);
const [companyServices, setCompanyServices] = useState([]);
useEffect(() => {
loadCompanies();
loadArchivedCompanies();
loadServices();
}, []);
 
async function loadServices() {

  try {

    const response = await fetch(
      "http://localhost:3000/services"
    );

    const data =
      await response.json();

    setServices(data);

  } catch (error) {

    console.error(error);

  }
}
async function loadCompanyServices(
  companyId
) {

  try {

    const response = await fetch(
      `http://localhost:3000/companies/${companyId}/services`
    );

    const data =
      await response.json();

    setCompanyServices(
      data.map(
        (service) =>
          service.id
      )
    );

  } catch (error) {

    console.error(error);

  }
}

async function loadArchivedCompanies() {
 
try {
 
const response = await fetch(
"http://localhost:3000/companies/archived"
);
 
const data =
await response.json();
 
setArchivedCompanies(
data
);
 
} catch (error) {
 
console.error(error);
 
}
}
async function restoreArchivedCompany(
companyId
) {
 
const confirmation =
window.confirm(
"♻ Restaurer cette société ?"
);
 
if (!confirmation) {
return;
}
 
try {
 
const response = await fetch(
`http://localhost:3000/companies/${companyId}/restore`,
{
method: "PUT",
}
);
 
const data =
await response.json();
 
if (data.success) {
 
alert(
"✅ Société restaurée"
);
 
await loadCompanies();
 
await loadArchivedCompanies();
}
 
} catch (error) {
 
console.error(error);
 
alert(
"Erreur restauration"
);
 
}
}
async function restoreCompany() {
 
if (!selectedCompany) {
return;
}
 
const confirmation =
window.confirm(
`♻ Restaurer le client ?
 
Référence :
${selectedCompany.company_code}
 
Nom :
${selectedCompany.name}`
);
 
if (!confirmation) {
return;
}
 
try {
 
const response = await fetch(
`http://localhost:3000/companies/${selectedCompany.id}/restore`,
{
method: "PUT",
}
);
 
const data =
await response.json();
 
if (data.success) {
 
alert(
"✅ Société restaurée"
);
 
setSelectedCompany(
null
);
 
await loadCompanies();
}
 
} catch (error) {
 
console.error(error);
 
alert(
"Erreur restauration"
);
}
}
async function loadCompanies() {
try {
const response = await fetch(
"http://localhost:3000/companies"
);
 
const data = await response.json();
 
setCompanies(data);
console.log("COMPANIES", data);
} catch (error) {
console.error(error);
}
}
 
async function archiveCompany() {
 
if (!selectedCompany) {
return;
}
 
const confirmation = window.confirm(
`⚠ ATTENTION
 
Êtes-vous sûr de vouloir archiver ce client ?
 
Référence :
${selectedCompany.company_code}
 
Nom :
${selectedCompany.name}
 
Cette opération conservera :
 
- les utilisateurs
- les tickets
- les interventions
- les documents
 
Le client disparaîtra de la liste active.`
);
 
if (!confirmation) {
return;
}
 
try {
 
const response = await fetch(
`http://localhost:3000/companies/${selectedCompany.id}`,
{
method: "DELETE",
}
);
 
const data =
await response.json();
 
if (data.success) {
 
alert("✅ Société archivée");
 
setSelectedCompany(null);
 
await loadCompanies();
 
await loadArchivedCompanies();
}
 
} catch (error) {
 
console.error(error);
 
alert(
"Erreur archivage"
);
}
}
async function saveCompany() {
    if (!selectedCompany) {
return;
}
 
if (
selectedCompany.email &&
!selectedCompany.email.includes("@")
) {
alert("Adresse email invalide");
return;
}
 
console.log(
  "CONTRAT:",
  selectedCompany.contract_type
);

console.log(
  "SLA:",
  selectedCompany.sla_level
);
try {
console.log(selectedCompany)
    const response = await fetch(
`http://localhost:3000/companies/${selectedCompany.id}`,
{
method: "PUT",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
  phone: selectedCompany.phone || "",

  email: selectedCompany.email || "",

  address: selectedCompany.address || "",

  postal_code:
    selectedCompany.postal_code || "",

  city:
    selectedCompany.city || "",

  country:
    selectedCompany.country || "",

  siret:
    selectedCompany.siret || "",

  website:
    selectedCompany.website || "",

  contract_type:
    selectedCompany.contract_type ||
    "AUCUN",

  sla_level:
    selectedCompany.sla_level ||
    "STANDARD",

  notes:
    selectedCompany.notes || "",
}),
}
);
 
const data = await response.json();
 
if (data.success) {

  await fetch(
    `http://localhost:3000/companies/${selectedCompany.id}/services`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceIds: companyServices,
      }),
    }
  );

  alert("✅ Société enregistrée");

  await loadCompanies();

}
} catch (error) {
console.error(error);
 
alert(
"Erreur sauvegarde : " +
error.message
);
}
}
 
return (
<div style={{ padding: "20px" }}>
<h1>Sociétés</h1>
<h3>
Nombre de sociétés : {companies.length}
</h3>
 
<div
style={{
display: "flex",
gap: "20px",
}}
>
<div style={{ width: "40%" }}>
<h2>{t("companies.title")}</h2>
 
<button
onClick={() =>
i18n.changeLanguage("fr")
}
>
FR
</button>
 
<button
onClick={() =>
i18n.changeLanguage("en")
}
style={{
marginLeft: "10px",
}}
>
EN
</button>

<table
border="1"
cellPadding="10"
style={{
width: "100%",
borderCollapse:
"collapse",
}}
>
<thead>
<tr>
<th>Référence</th>
<th>Nom</th>
</tr>
</thead>
 
<tbody>
{companies.map(
(company) => (
<tr
key={company.id}
style={{
cursor:
"pointer",
}}
onClick={() => {

  setSelectedCompany(
    company
  );

  loadCompanyServices(
    company.id
  );
}}
>
<td>
{
company.company_code
}
</td>
 
<td>
{company.name}
</td>
</tr>
)
)}
</tbody>
</table>
</div>
 <hr />
 
<h2>Sociétés archivées</h2>
 
<table
border="1"
cellPadding="10"
style={{
width: "100%",
borderCollapse: "collapse",
}}
>
<thead>
<tr>
<th>Référence</th>
<th>Nom</th>
<th>Action</th>
</tr>
</thead>
 
<tbody>
{archivedCompanies.map((company) => (
<tr key={company.id}>
<td>{company.company_code}</td>
 
<td>{company.name}</td>
 
<td>
<button
onClick={() =>
restoreArchivedCompany(
company.id
)
}
style={{
background: "#27ae60",
color: "white",
}}
>
♻ Restaurer
</button>
</td>
</tr>
))}
</tbody>
</table>
<div style={{ width: "60%" }}>
<h2>Fiche société</h2>
 
{!selectedCompany && (
<p>
Sélectionnez une
société
</p>
)}
 
{selectedCompany && (
<>
<p>
<strong>
Référence :
</strong>{" "}
{
selectedCompany.company_code
}
</p>
 
<p>
<strong>
Nom :
</strong>{" "}
{
selectedCompany.name
}
</p>
 
<p>{t("companies.phone")}</p>
 
<input
type="text"
value={
selectedCompany.phone ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
phone:
e.target.value,
})
}
/>
 
<p>{t("companies.email")}</p>
 
<input
type="text"
value={
selectedCompany.email ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
email:
e.target.value,
})
}
/>
 
<p>{t("companies.address")}</p>
 
<input
type="text"
value={
selectedCompany.address ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
address:
e.target.value,
})
}
/>
 
<p>{t("companies.postalCode")}</p>
 
<input
type="text"
value={
selectedCompany.postal_code ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
postal_code:
e.target.value,
})
}
/>
 
<p>{t("companies.city")}</p>
 
<input
type="text"
value={
selectedCompany.city ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
city:
e.target.value,
})
}
/>
 
<p>{t("companies.country")}</p>
 
<input
type="text"
value={
selectedCompany.country ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
country:
e.target.value,
})
}
/>
 
<p>{t("companies.siret")}</p>
 
<input
type="text"
value={
selectedCompany.siret ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
siret:
e.target.value,
})
}
/>
 
<p>Site Web</p>
 
<input
type="text"
value={
selectedCompany.website ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
website:
e.target.value,
})
}
/>
<p>{t("companies.contractType")}</p>

<select
  value={
    selectedCompany.contract_type ||
    "AUCUN"
  }
  onChange={(e) =>
    setSelectedCompany({
      ...selectedCompany,
      contract_type:
        e.target.value,
    })
  }
>
  <option value="AUCUN">
    Aucun
  </option>

  <option value="MSP">
    MSP
  </option>

  <option value="FORFAIT">
    Forfait
  </option>

  <option value="REGIE">
    Régie
  </option>

  <option value="PROJET">
    Projet
  </option>
</select>

<p>{t("companies.sla")}</p>

<select
  value={
    selectedCompany.sla_level ||
    "STANDARD"
  }
  onChange={(e) =>
    setSelectedCompany({
      ...selectedCompany,
      sla_level:
        e.target.value,
    })
  }
>
  <option value="STANDARD">
    Standard
  </option>

  <option value="PREMIUM">
    Premium
  </option>

  <option value="CRITIQUE">
    Critique
  </option>
</select>

<hr />

<h3>{t("companies.subscribedServices")}</h3>

{services.map((service) => (
  <div key={service.id}>
    <label>
      <input
        type="checkbox"
        checked={companyServices.includes(
          service.id
        )}
        onChange={(e) => {

          if (e.target.checked) {

            setCompanyServices([
              ...companyServices,
              service.id,
            ]);

          } else {

            setCompanyServices(
              companyServices.filter(
                (id) =>
                  id !== service.id
              )
            );

          }

        }}
      />

      {" "}
      {service.name}

    </label>
  </div>
))}
<p>Commentaires</p>
 
<textarea
rows="4"
value={
selectedCompany.notes ||
""
}
onChange={(e) =>
setSelectedCompany({
...selectedCompany,
notes:
e.target.value,
})
}
/>
 
<br />
<br />
 
<button
onClick={
saveCompany
}
>
Enregistrer
</button>
{selectedCompany?.deleted === 0 ? (
<button
onClick={archiveCompany}
style={{
marginLeft: "10px",
background: "#cc0000",
color: "white",
}}
>
🗑 Archiver
</button>
) : null}
 
{selectedCompany?.deleted === 1 ? (
<button
onClick={() =>
restoreArchivedCompany(
selectedCompany.id
)
}
style={{
marginLeft: "10px",
background: "#27ae60",
color: "white",
}}
>
♻ Restaurer
</button>
) : null}
</>
)}
</div>
</div>
</div>
);
}
 
export default Companies;