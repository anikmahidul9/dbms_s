import React, { useEffect, useState } from "react";
import Card from "./Card";
import Hero from "./Hero";


const HomeMain = () => {
      const [productData, setProduct] = useState([]);
      const [searchQuery, setSearchQuery] = useState("");
      const product = productData[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product-data?searchTerm=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [searchQuery]);
  return (
    <div>
      <Hero />
      <div>
        <div className="form-control flex justify-end w-1/4 ml-8">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
          {product &&
          typeof product === "object" &&
          Object.keys(product).length > 0 ? (
            Object.values(product).map((item, index) => (
              <React.Fragment key={index}>
                <Card product={item} />
              </React.Fragment>
            ))
          ) : (
            <div>
              <p>No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
