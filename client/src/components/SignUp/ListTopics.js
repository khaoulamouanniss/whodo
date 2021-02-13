import React from "react";

import Topic from "./Topic";

export default function ListTopics(props) {

  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} userId={props.userId} addFavTopic={props.addFavTopic}/>)
  return (
    <ul>
      {topicData}
    </ul>
  );

}