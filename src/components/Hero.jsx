import React from "react"
import product from "../assets/product.png"

const Hero = () => {
  return (
    <div>
      <div className="hero bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={product} className="w-4/5" />
          <div>
            <h1 className="text-5xl font-bold text-blue-500">
              Production Management
            </h1>
            <p className="py-6">
              Production management is the process that oversees the activities
              undertaken throughout the progression of converting your
              production inputs – such as raw materials, human resources, and
              other assets
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
