import React from "react";
import User from "./User"

export default function Users(props) {

 
  const userData = props.users.map(u => <User user_id={u.id} name={u.name} birth_date={u.birth_date} gender={u.gender} country={u.country} region={u.region}  city={u.city} relationship={u.relationship} family={u.family}/>)
  return(
    <>
    <tbody>
     <table className="table">
        <thead>
          <tr>
            <th scope="col">Topic</th>
            <th scope="col">Number of items</th>
            <th scope="col">Delete</th>
          </tr>
          <tr>{userData}</tr>
        </thead>
      </table>
      </tbody>
    </>
  )
}