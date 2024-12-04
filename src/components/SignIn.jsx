import React, { useContext } from 'react';
import { authContex } from '../Routes/AuthProvider';

const SignIn = () => {
  const {UserLogin}=useContext(authContex)
    const handleSignIn = (e) => {
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        // console.log(email,password);
        UserLogin(email,password)
        .then(result=>{
          console.log(result.user);
          const lastSignInTime=result?.user?.metadata?.lastSignInTime
          const newUser={email,lastSignInTime}
          fetch('http://localhost:5000/users',{
            method:'PATCH',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(newUser)
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
          })

        })
        .catch(error=>{
          console.log('ERROR',error);
        })
      };
    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full ">
        <h2 className="text-4xl text-center my-5">Sign Up</h2>
        <div className="card bg-base-100 w-full max-w-lg  mx-auto shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default SignIn;