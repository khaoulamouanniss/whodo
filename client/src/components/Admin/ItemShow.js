
import React from "react";
import Item from "./Item"

export default function ItemShow(props) {

  const {currentItem} = props;
 
 
  return (
    <>
      <h1>{currentItem}</h1>
      
    </>
  )
}