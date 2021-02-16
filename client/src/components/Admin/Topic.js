
import React from "react";
import {Link} from "react-router-dom"

export default function Topic(props) {

  const {topicID,topic,NbItems,setCurrentTopic} = props;

  return (
    <div>
      <th scope="col"><Link to="/topicShow" onClick={() => setCurrentTopic({topic_id:topicID,topic:topic})}>{topic}</Link></th>
      <th scope="col">{NbItems}</th>
      <th scope="col"><button>Show</button></th>
      <th scope="col"><button>Edit</button></th>
      <th scope="col"><button>Delete</button></th>
    </div>
  )
}