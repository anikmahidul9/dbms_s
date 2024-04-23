import React, { useState } from "react";

const Registration = () => {
      const [fullname, setFullName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");
      const [image, setImage] = useState("");
      const [password, setPassword] = useState("");

      const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
          fullname: fullname,
          email: email,
          role: role,
          image: image,
          password: password,

        };
        console.log(userData);
        fetch("http://localhost:3000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
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
          setFullName("");
          setEmail("");
          setImage("");
          setRole("");
          setPassword("");
          window.location.replace(`http://localhost:5173/user-list`)
      };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse ml-10 -mt-24">
          <div className="text-center lg:text-left w-1/2">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6 w-1/2">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="name"
                  placeholder="username"
                  className="input input-bordered"
                  value={fullname}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-2">
                <select
                  className="select w-full max-w-xs"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pick your Role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image Link</span>
                </label>
                <input
                  type="text"
                  placeholder="image link"
                  className="input input-bordered"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
