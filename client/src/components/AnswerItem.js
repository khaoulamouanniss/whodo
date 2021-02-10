import React from "react";


export default function AnswerItem (props) {
  return(
    <>
    {props.item}
    <button>Always</button>
    <button>Usually</button>
    <button>Sometimes</button>
    <button>Rarely</button>
    <button>Never</button>
    </>
  )
}