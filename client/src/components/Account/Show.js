import React from "react";

export default function Show(props) {
  const {user,onUpdate} =props
  return (
    <div>
    <div>name: {user.name}</div>
   <div>lastName:{user.lastName}   </div>
   <div>birthDate: {user.birthDate}</div>
   <div>gender: {user.gender}</div>
   <div>email: {user.email}</div>
   <div>profilePic : {user.profilePic}</div>
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