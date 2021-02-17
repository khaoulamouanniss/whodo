
import React from "react";
import {Link} from "react-router-dom"

export default function Item(props) {

  const {id,item,setCurrentItem} = props;

  return (
    <div>
      {/* <th scope="col"><Link to="/topicShow" onClick={() => setCurrentTopic({topic_id:topicID,topic:topic})}>{topic}</Link></th> */}
      <th scope="col"><Link to="/itemShow" onClick={()=>setCurrentItem(item)}>{item}</Link></th>
      <th scope="col"><button>Delete</button></th>
    </div>
  )
}