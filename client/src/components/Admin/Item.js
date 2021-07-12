import React from "react";
import { Link } from "react-router-dom";
import "./Items.css";

export default function Item(props) {
  console.log("props of one item", props);
  const { id, item, setCurrentItem, deleteItem, user } = props;
  let topics = props.topics ? " #" + props.topics.replace("/", " #") : "";
  let answers = props.answers ? " " + props.answers + " answers" : "";

  return (
    <div className="itemstr ">
      <div className="itemscontainer">
        <div className="itemstd" style={{ flexGrow: "55" }}>
          <span>
            <Link
              to="/itemShow"
              onClick={() => setCurrentItem({ id: id, item: item })}
            >
              {item}{" "}
            </Link>
          </span>
        </div>
        <div className="itemstd" style={{ flexGrow: "14" }}>
          <span>{topics}</span>
        </div>
        <div className="itemstd" style={{ flexGrow: "10" }}>
          <span> {answers}</span>
        </div>
        <div className="itemstd" style={{ flexGrow: "1", marginTop: "-1%" }}>
          <span>
            <i
              onClick={() => deleteItem(id)}
              className="itemsfas1 fa-trash"
            ></i>
          </span>
        </div>
      </div>
    </div>

    /* <tr >
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item} </Link></td>
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{topics}</Link></td>
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{answers}</Link></td>
      <td className= "itemstd"><button onClick={() => deleteItem(id)}>Delete</button></td>
      </tr> */
  );
}
