
import React from "react";

export default function TopicShow(props) {

  const {topic_id,topic} = props.currentTopic 

  return (
    <div>
      {topic_id}{topic}
    </div>
  )
}