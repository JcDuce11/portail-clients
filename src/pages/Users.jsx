import { useEffect, useState } from "react";
 
function Users() {
const [users, setUsers] = useState([]);
 
useEffect(() => {
loadUsers();
}, []);
 
async function loadUsers() {
try {
const response = await fetch(
"http://localhost:3000/users"
);
 
const data = await response.json();
 
setUsers(data);
} catch (error) {
console.error(error);
}
}
 
return (
<div style={{ padding: "20px" }}>
<h1>Utilisateurs</h1>
 
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
<th>ID</th>
<th>Prénom</th>
<th>Nom</th>
<th>Email</th>
<th>Rôle</th>
<th>Société</th>
</tr>
</thead>
 
<tbody>
{users.map((user) => (
<tr key={user.id}>
<td>{user.id}</td>
<td>{user.firstname}</td>
<td>{user.lastname}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td>
{user.company || "-"}
</td>
</tr>
))}
</tbody>
</table>
 
<p>
Nombre d'utilisateurs :{" "}
{users.length}
</p>
</div>
);
}
 
export default Users;