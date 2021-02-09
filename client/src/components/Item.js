
import React from "react";

export default function Item(props) {

  let topics=' #'+ props.topics.replace('/',' #');
  let answers =' ' + props.answers + ' answers';

  return (
    <div>
     {props.item}{topics}{answers}
    </div>
  )
}