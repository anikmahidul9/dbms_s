import React, { useEffect, useState } from "react";
import SupplierListTable from "./SupplierListTable";

const Supplierdetails = () => {
    const [supplier, setSupplier] = useState([]);

    useEffect(() => {
      fetch("http://localhost:3000/supplier-data")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSupplier(data);
          console.log(data[0]);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }, []);
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Supplier List</h1>
        <SupplierListTable supplier={supplier} />
      </div>
    </div>
  );
};

export default Supplierdetails;
