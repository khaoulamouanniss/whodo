
import React from "react";
import {Link} from "react-router-dom";
import "./Topics.css";

export default function Topic(props) {

  const {topicID,topic,NbItems,setCurrentTopic,showItemsByTopic,deleteTopic} = props;

  return (
   
      <div className="topicstr">
      <div className = "topicstd"  style ={{flexGrow:"1", flexFlow:"1"}}>
        <span><Link to="/topicShow" onClick={() => {  setCurrentTopic({topic_id:topicID,topic:topic});showItemsByTopic(topicID)} }>{topic}</Link></span>
      </div>
      <div className="topicstd">
        <span>{NbItems} items</span>
      </div>
      <div className="topicstd">
        <span><i onClick={() => deleteTopic(topicID)} className="fas fa-trash"></i></span>
      </div>
    </div>

    
    // <div>
    //   <table>
    //     <tr>
    //       {/* <th>Topics</th> */}
    //     </tr>
    //   <tr>
    //   <td className="topicstd"><Link to="/topicShow" onClick={() => {  setCurrentTopic({topic_id:topicID,topic:topic});showItemsByTopic(topicID)} }>{topic}</Link></td>
    //   <td className="topicstd">{NbItems}</td>
    //   <td><button className="topicstd" onClick={() => deleteTopic(topicID)}>Delete</button></td>
    //   </tr>
    //   </table>
      
    // </div>
  )
}