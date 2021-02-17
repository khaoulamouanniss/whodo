
import React from "react";
import {Link} from "react-router-dom"

export default function ItemApprove(props) {

  const {id,item,setCurrentItem,approveItem,deleteItem} = props;
  let topics=' #'+ props.topics.replace('/',' #');
  let answers =' ' + props.answers + ' answers';

  return (
    <div>
      {/* <th scope="col"><Link to="/topicShow" onClick={() => setCurrentTopic({topic_id:topicID,topic:topic})}>{topic}</Link></th> */}
      <th scope="col"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item}{topics}{answers}</Link></th>
      <th scope="col"><button onClick={() => approveItem(id)}>Approve</button></th>
      <th scope="col"><button onClick={() => deleteItem(id)}>Delete</button></th>
    </div>
  )
}