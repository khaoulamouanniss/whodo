
import React from "react";

export default function User(props) {
 const { name, birth_date, gender, country, region, city, relationship, family} = props
 
  return (
    <div>
     
      <th scope="col">{name}</th>
      <th scope="col">{birth_date}</th>
      <th scope="col">{gender}</th>
      <th scope="col">{country}</th>
      <th scope="col">{region}</th>
      <th scope="col">{city}</th>
      <th scope="col">{relationship}</th>
      <th scope="col">{family}</th>

      
    </div>
  )
}