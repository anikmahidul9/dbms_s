// UserDetailsPage.jsx
import React from "react";

const UserDetailsPage = () => {
  // Mock user data
  const user = {
    firstName: "John",
    lastName: "Doe",
    role: "Software Engineer",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg", // Placeholder avatar image
  };

  return (
    <div className="bg-gray-100  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Avatar */}
        <div className="bg-gray-200 h-32 flex items-center justify-center">
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="h-24 w-24 rounded-full"
          />
        </div>
        {/* User Details */}
        <div className="px-6 py-4">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
          <div className="border-t border-gray-200 py-2">
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Address:</span> {user.address}
            </p>
          </div>
        </div>
        {/* Edit Button */}
        <div className="px-6 py-4 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
