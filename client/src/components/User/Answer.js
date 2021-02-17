import React from "react";

export default function Answer (props) {

  return (
    
      <>
      {props.item.item}
      <div>
      <button>Always</button>
      <button>Usually</button>
      <button>Sometimes</button>
      <button>Rarely</button>
      <button>Never</button>
      </div>
      </>
    
  )
}