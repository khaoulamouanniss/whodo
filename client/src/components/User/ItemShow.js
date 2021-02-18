
import React from "react";


export default function ItemShow(props) {

  const {currentItem} = props;
 
 
  return (
    <>
      <h1>{currentItem.id}{currentItem.item}</h1>
      
    </>
  )
}