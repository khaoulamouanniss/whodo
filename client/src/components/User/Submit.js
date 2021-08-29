import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Submit.css";

export default function Submit(props) {
  const { change, setChange, user, topics } = props;
  let history = useHistory();

  const [topic, setTopic] = useState("Work");

  const submitItem = (submittedItem, topic, approved) => {
    let time = new Date();
    axios
      .post("http://localhost:8001/items", {
        creator: user.id,
        item: submittedItem,
        time: time,
        approved: approved,
        submittedTopic: topic,
        listOfTopics: topics,
      })
      .then((res) => {
        console.log("submittedItem", res.data);
        setChange(!change);
        history.push("/myitems");
      });
  };

  const handleChange = (e) => {
    if (!document.getElementById("item").value)
      alert("you need to type your question");
    else {
      submitItem(document.getElementById("item").value, topic, false);
      console.log("history", history);
    }
  };
  /* let item="";
  onChange={(event) => item=event.target.value}*/
  return (
    <div className="submit-container">
      <div className="submit-img">
        <img src="./submit-item.png"></img>
      </div>
      <div className="textareaContainer">
        <div className="submit-message">
          Submit your own behavior and see who does what.
          <div
            style={{
              color: "rgb(51, 50, 50)",
              fontSize: "18px",
              marginBottom: "3%",
            }}
          >
            Make sure it starts with a verb ending in -ing describes a behavior
            familiar to most people and is 80 characters or less.
          </div>
          <div className="question-mark">
            <textarea
              className="textArea"
              id="item"
              maxlength="80"
              type="text"
              rows="5"
              cols="20"
            ></textarea>
            <span className="submit-icon">
              <i style={{ color: "black" }} class="fas fa-question"></i>80
            </span>
          </div>
          {/*   <div className="tag-container" id="tag-container">
            <div
              style={{
                color: "rgb(51, 50, 50)",
                fontSize: "18px",
                marginBottom: "3%",
              }}
            >
              Add some keywords to help people find your submission starting
              with # (it might be something like work, love, money,
              restaurants...).
            </div>
           <div className="tags">
              {tags.map((tag) => {
                return (
                  <div className={tagsSpace ? "tag" : "noBackground"}>
                    {" "}
                    #{tag}
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              id="hashtags"
              placeholder="add a hashtag"
              onKeyUp={(e) => handleSubmitTag(e)}
            />
            </div>
        </div>
        <div>*/}
          <select
            className="topic-select"
            name="topic"
            id="topic"
            value={topic}
            onChange={async (event) => {
              await setTopic(event.target.value);
            }}
          >
            {props.topics.map((c) => {
              return <option value={c.topic}> {c.topic}</option>;
            })}
          </select>
          <Link className="text-button" to="/submit" onClick={handleChange}>
            <i style={{ fontSize: 20 }} class="fas fa-hashtag"></i>
            &nbsp;&nbsp;Submit
          </Link>
        </div>
      </div>
    </div>
  );
}
