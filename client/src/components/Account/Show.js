import React from "react";

export default function Show(props) {
  const {user,onUpdate} =props
  return (
    <div>
    <div>name: {user.name}</div>
   <div>lastName:{user.last_name}   </div>
   <div>birthDate: {user.birth_date}</div>
   <div>gender: {user.gender}</div>
   <div>email: {user.email}</div>
   <div>profilePic : {user.profile_pic}</div>
   <div>country: {user.country}</div>
   <div>region: {user.region}</div>
   <div>city: {user.city}</div>
   <div>referrer: {user.referrer}</div>
   <div>relationship: {user.relationship}</div>
   <div>family: {user.family} </div>
   <button onClick={onUpdate}>Update</button>
    </div>
  )
}