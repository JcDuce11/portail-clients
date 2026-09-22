import { useEffect, useState } from "react";
 
function Companies() {
const [companies, setCompanies] = useState([]);
const [selectedCompany, setSelectedCompany] = useState(null);
 
useEffect(() => {
loadCompanies();
}, []);
 
async function loadCompanies() {
try {
const response = await fetch(
"http://localhost:3000/companies"
);
 
const data = await response.json();
 
setCompanies(data);
} catch (error) {
console.error(error);
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
 
try {
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
notes:
selectedCompany.notes || "",
}),
}
);
 
const data = await response.json();
 
if (data.success) {
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
 
<div
style={{
display: "flex",
gap: "20px",
}}
>
<div style={{ width: "40%" }}>
<h2>Liste</h2>
 
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
onClick={() =>
setSelectedCompany(
company
)
}
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
 
<p>Téléphone</p>
 
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
 
<p>Email</p>
 
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
 
<p>Rue</p>
 
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
 
<p>Code postal</p>
 
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
 
<p>Ville</p>
 
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
 
<p>Pays</p>
 
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
 
<p>SIRET</p>
 
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
</>
)}
</div>
</div>
</div>
);
}
 
export default Companies;