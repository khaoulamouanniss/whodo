import React from "react";

import Topic from "./Topic";

export default function ListTopics(props) {

  const topicData = props.topics.map(t => <Topic topic={t.topic}/>)
  return (
    <ul>
      {topicData}
    </ul>
  );

}