function Companies() {
return (
<>
<h1>Sociétés</h1>
 
<button className="add-button">
+ Nouvelle société
</button>
 
<div className="company-list">
<div className="company-card">
<h3>CLIENT-000001</h3>
 
<p>Nom : Société Exemple</p>
<p>Téléphone : 04 68 00 00 00</p>
<p>Email : contact@societe.fr</p>
</div>
</div>
</>
);
}
 
export default Companies;