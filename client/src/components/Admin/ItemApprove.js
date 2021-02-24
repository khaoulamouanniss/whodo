
import React from "react";
import "./ItemsApprove.css"

export default function ItemApprove(props) {

  const {id,item,setCurrentItem,approveItem,deleteItem} = props;
  let topics= props.topics? ' #'+ props.topics.replace('/',' #') : "";
  let answers = props.answers? ' ' + props.answers + ' answers' : "";

  return (
    <div className="itemsapprovetr">
    <div className ="itemsapprovecontainer">
  <div className = "itemsapprovetd"  style ={{flexGrow:"7"}}>
    <span>{item}</span>
  </div>
  <div className="itemsapprovetd" style ={{flexGrow:"5"}}>
    <span>{topics}</span>
  </div>
  <div className="itemsapprovefas-div">
  <div className="itemsapprovetd">
    <span><i style={{marginLeft:"-10%"}} className="itemsapprovefas1 fa-check-circle" onClick={() => approveItem(id)}></i></span>
    <span><i style={{marginLeft:"40%"}} className ="itemsapprovefas1 fa-times-circle" onClick={() => deleteItem(id)}></i></span>
  </div>
  </div>
</div>
</div>
    // <div>
    //   <div className= "itemsapprovetd">{item}{topics}{answers}</div>
    //   <i className="fas fa-check-circle" onClick={() => approveItem(id)}>Approve</i>
    //   <i className ="fas fa-times-circle" onClick={() => deleteItem(id)}>Delete</i>
    // </div>
  )
}