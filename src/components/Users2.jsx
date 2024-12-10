import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Users2 = () => {

    const {isError,error,isPending,data:users}=useQuery({
        queryKey:"users",
        queryFn:async()=>{
           const res=await fetch('https://coffee-store-server-dusky-gamma.vercel.app/users')
           return res.json()
        }
    })


//   const [users, setUsers] = useState([]);
//   useEffect(()=>{
//     fetch('https://coffee-store-server-dusky-gamma.vercel.app/users')
//     .then(res=>res.json())
//     .then(data=>setUsers(data))
//   },[])

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://coffee-store-server-dusky-gamma.vercel.app/users/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remaining = users.filter((user) => user._id !== id);
              setUsers(remaining);
            }
          });
      }
    });
  };

  if(isPending){
    return <span className="loading loading-spinner text-primary"></span>
  }
  if(isError){
    return <p>{error.message}</p>
  }
  return (
    <div>
      Users {users?.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>createdAt</th>
              <th>Last SignIn Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>1</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastSignInTime}</td>
                <td>
                  <button className="btn mr-3">Edit</button>
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="btn"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users2;
