
import React from "react";
import {Link} from "react-router-dom";
import "./Items.css"

export default function Item(props) {

  const {id,item,setCurrentItem,deleteItem} = props;
  let topics= props.topics? ' #'+ props.topics.replace('/',' #') : "";
  let answers = props.answers? ' ' + props.answers + ' answers' : "";

  return (
    <div className="itemstr">
    <div className = "itemstd"  style ={{flexGrow:"29", flexFlow:"17"}}>
      <span><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item} </Link></span>
    </div>
    <div className="itemstd" style ={{flexGrow:"7", flexFlow:"6"}}>
      <span><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{topics}</Link></span>
    </div>
    <div className="itemstd" style ={{flexGrow:"5", flexFlow:"3"}}>
      <span> <Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{answers}</Link></span>
    </div>
    <div className="itemstd" style ={{flexGrow:"5", flexFlow:"3"}}>
      <span><i onClick={() => deleteItem(id)}className="fas fa-trash"></i></span>
    </div>
  </div>


    
      /* <tr >
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item} </Link></td>
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{topics}</Link></td>
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{answers}</Link></td>
      <td className= "itemstd"><button onClick={() => deleteItem(id)}>Delete</button></td>
      </tr> */
  )
}