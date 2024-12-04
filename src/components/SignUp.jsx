import React, { useContext } from "react";
import { authContex } from "../Routes/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const {createUser}=useContext(authContex)

  const handleSignUp = (e) => {
    e.preventDefault();
    const name=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password);
    createUser(email,password)
    .then(result=>{
      console.log(result.user);
      const createdAt=result?.user?.metadata?.creationTime;

      
      const newUser={name,email,createdAt}
      fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify(newUser)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
       if(data.insertedId){
        Swal.fire({
          title: 'Success!',
          text: 'successfully sign up',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
       }
      })
    })
    .catch(error=>{
      console.log('ERROR',error.message);
    })
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full ">
        <h2 className="text-4xl text-center my-5">Sign Up</h2>
        <div className="card bg-base-100 w-full max-w-lg  mx-auto shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
              name="name"
                type="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
              name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
