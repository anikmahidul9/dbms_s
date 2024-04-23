import React, { useState } from "react";

const Product = () => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
 const data = {
    name:product,
    category: category,
    price: price,
    image: image,
    description: description,
  };
  console.log(data);
  
    
    fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
       data
      ),
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
    setProduct("");
    setCategory("");
      setPrice("");
      setImage("");
      setDescription("");
  };
  return (
    <div>
      <div className="flex justify-center mt-10 w-full">
        <div className="max-w-lg w-full bg-white rounded-lg p-6 flex">
          <form
            onSubmit={handleSubmit}
            className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-md p-6"
          >
            <h1 className="font-bold text-4xl text-center mb-4 mt-0">
              {" "}
              Add Product
            </h1>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Name:
              </label>
              <input
                type="text"
                id="fullName"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-bold mb-2"
              >
                Category:
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Image:
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Description:
              </label>
              <input
                type="text"
                id="price"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="input-lg w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
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

export default Product;
