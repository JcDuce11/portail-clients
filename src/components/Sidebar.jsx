function Sidebar({ setPage }) {
return (
<div className="sidebar">
<h2>Portail Clients</h2>
 
<ul>
<li onClick={() => setPage("dashboard")}>
Dashboard
</li>
 
<li onClick={() => setPage("companies")}>
Sociétés
</li>
 
<li>Tickets</li>
<li>Interventions</li>
<li>Inventaire</li>
<li>Administration</li>
</ul>
</div>
);
}
 
export default Sidebar;