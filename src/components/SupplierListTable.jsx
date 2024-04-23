import React, { useState } from "react";

const SupplierListTable = ({ supplier }) => {
  const data = supplier[0];
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
   const [editedCat, setEditedCat] = useState("");


  const handleEditClick = (userId, user) => {
    setEditingUserId(userId);
    setEditedName(user.fullname || ""); // Initialize to an empty string if undefined
    setEditedEmail(user.email || "");
    setEditedPhone(user.phone || "");
    setEditedAddress(user.address || "");
        setEditedCat(user.category || "");
  };

  const handleSaveClick = async (userId) => {
    // Handle save logic here, like sending updated data to the server
    try {
      // Send updated user data to the server
      const response = await fetch(`http://localhost:3000/supplier/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: editedName,
          email: editedEmail,
          phone: editedPhone,
          address: editedAddress,
          category:editedCat,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.reload();
      // Update editing state
      setEditingUserId(null);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Send DELETE request to your backend API
      const response = await fetch(`http://localhost:3000/supplier/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      window.location.reload();
      // Refresh the user list after successful deletion
      // You can update the user list state here if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  const renderEditFields = (user) => {
    if (editingUserId === user.id) {
      return (
        <tr>
          <td>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="mb-2 p-1 border rounded"
            />
          </td>
          <td>
            <input
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="mb-2 p-1 border rounded"
            />
          </td>
          <td>
            <input
              type="text"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
              className="mb-2 p-1 border rounded"
            />
          </td>
          <td>
            <input
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              className="mb-2 p-1 w-1/2 border rounded"
            />
          </td>
          <td>
            <input
              type="text"
              value={editedCat}
              onChange={(e) => setEditedCat(e.target.value)}
              className="mb-2 p-1 border rounded"
            />
          </td>
          <td>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSaveClick(user.id)}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setEditingUserId(null)}
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.address}</td>
          <td>{user.category}</td>
          <td>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEditClick(user.id, user)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data && typeof data === "object" && Object.keys(data).length > 0 ? (
            Object.values(data).map((item, index) => (
              <React.Fragment key={index}>
                {renderEditFields(item)}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierListTable;
