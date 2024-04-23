import React, { useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UserListTable = ({ users }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedAddress, setEditedAddress] = useState("");

  const generatePDF = () => {
      console.log("Generate PDF button clicked");
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set up table columns
    const columns = ["Name", "Email", "Role", "Image Link"];

    // Auto page size
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

    // Set the width and height of the table
    const tableWidth = pageWidth - 40; // margin: 20px on each side
    const tableHeight = pageHeight - 40; // margin: 20px on top and bottom

    // Set x and y position for the table
    const x = 20;
    let y = 20;

    // Add the table header
    doc.autoTable({
      head: [columns],
      startY: y,
      theme: "grid",
    });

    // Add the table body
    y += doc.autoTable.previous.finalY;
    users.forEach((user) => {
      const rowData = [user.fullname, user.email, user.role, user.image];
      doc.autoTable({
        body: [rowData],
        startY: y,
        theme: "grid",
      });
      y += doc.autoTable.previous.finalY;
    });

    // Save the PDF
    doc.save("user_list.pdf");
  };

  const handleEditClick = (userId, user) => {
    setEditingUserId(userId);
    setEditedName(user.fullname || "");
    setEditedEmail(user.email || "");
    setEditedRole(user.role || "");
    setEditedAddress(user.image || "");
  };

  const handleSaveClick = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: editedName,
          email: editedEmail,
          role: editedRole,
          image: editedAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.reload();
      setEditingUserId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
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
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="mb-2 p-1 border rounded"
            />
          </td>
          <td>
            <input
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
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
          <td>{user.role}</td>
          <td>{user.image}</td>
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
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Image Link</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user, index) => (
            <React.Fragment key={index}>
              {renderEditFields(user)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get PDF
        </button>
      </div>
    </div>
  );
};

export default UserListTable;
