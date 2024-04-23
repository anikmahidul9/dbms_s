import React, { useEffect, useState } from "react";
import SupplierListTable from "./SupplierListTable";

const AddSupplier = () => {
  const [fullname, setFullName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    fetch("http://localhost:3000/supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, phone, address, category}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        // Handle response from server as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
    // Reset form fields
    setFullName("");
    setDate("");
    setEmail("");
    setPhone("");
    setAddress("");
    setAmount("");
     window.location.replace(`http://localhost:5173/dashboard/supplier-details`);
  };

  return (
    <div className="flex justify-between  w-full">
      <div className="flex justify-center mt-10 w-1/2">
        <div className="max-w-lg w-full bg-white rounded-lg p-6 flex">
          <form
            onSubmit={handleSubmit}
            className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-md p-6"
          >
            <h1 className="font-bold text-4xl text-center mb-4 mt-0">
              {" "}
              Add Supplier
            </h1>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-bold mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-bold mb-2"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-700 font-bold mb-2"
              >
                Address:
              </label>
              <input
                id="subject"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Category
              </label>
              <input
                type="tel"
                id="phone"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-accent text-black py-2 px-4 rounded-md hover:bg-white border-4 border-transparent hover:border-[#D4FDFE]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
