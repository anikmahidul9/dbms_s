/* eslint-disable react/prop-types */
import React from "react";

const Card = ({product}) => {
  console.log(product);
  
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl my-4">
        <figure>
         <img src={product?.image} alt=""  className="w-1/2"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product?.name}</h2>
          <p>{product?.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
