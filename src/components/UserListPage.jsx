// UserListPage.jsx
import React, { useEffect, useState } from "react";
import UserListTable from "./UserListTable";

const UserListPage = () => {
  // Mock user data
 const [users, setUsers] = useState([]);

 useEffect(() => {
   fetch("http://localhost:3000/users")
     .then((response) => {
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       return response.json();
     })
     .then((data) => {
       setUsers(data);
     })
     .catch((error) => {
       console.error("There was a problem with the fetch operation:", error);
     });
 }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <UserListTable users={users} />
    </div>
  );
};

export default UserListPage;
