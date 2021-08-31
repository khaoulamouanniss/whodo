import React, { useState, useEffect } from "react";
import { FacebookButton, TwitterButton } from "react-social";
import { SocialIcon } from "react-social-icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Answer.css";
const { getGuessAssessment, mostPeopleDO } = require("./updateLevelByScore");
export default function AnswerGuess(props) {
  let id = props.item.id;
  let user_id = props.user.id;
  console.log("props of guessAnswer", props);
  const [topic, setTopic] = useState(props.item.topic);
  const { unlockedTopics } = props;
  const [colorButton, setColorButton] = useState("black");
  const [showSocial, setShowSocial] = useState(false);
  const [levels, setLevels] = useState([[]]);
  const [topics, setTopics] = useState([]);
  const startScore = props.score;
  const [level, setLevel] = useState(localStorage.getItem("userLevel"));
  const [switchToLevel, setSwitchToLevel] = useState(false);
  const [score, setScore] = useState();
  const [optionValues, setOptionValues] = useState([0, 0, 0, 0, 0]);
  const [guessOption, setGuessOption] = useState(0);
  const [showValues, setShowValues] = useState(false);
  const [total, setTotal] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [points, setPoints] = useState(0);
  const [guessAnswer, setGuessAnswer] = useState("");
  const [didGuess, setDidGuess] = useState(false);
  const [clickedFavorite, setClickedFavorite] = useState(false);
  let linknewLevel = "/newLevel";
  const history = useHistory();
  //tell about the page state
  //1:see the question and click my guess
  //2:calculating the score I got for my guess and showing it
  //3:sending my guess and the score to the server
  //4:getting all the responses
  //5:visualizing all the responses

  //getting the number of answers for each option from the database when the page load
  useEffect(() => {
    props.getNbAnsByOption(props.item.item).then((data) => {
      let tempOptionValues = [];
      data.map((i) => {
        tempOptionValues.push(Number(i.nbanswers));
      });
      console.log(
        "total",
        tempOptionValues.reduce((a, b) => a + b)
      );
      setTotal(tempOptionValues.reduce((a, b) => a + b));
      if (total) alert(total);
      setOptionValues(tempOptionValues);
    });
    //loading the list of existing topics in an array at the start
    let temporaryArray = [];
    props.topics.map((topic) => {
      temporaryArray.push(topic.topic);
    });
    setTopics(temporaryArray);
  }, [guessAnswer]);

  useEffect(() => {
    const levels = [30, 50, 110, 150, 200, 230, 330, 410, 500];
    axios
      .post("http://localhost:8001/guess/score", {
        user: user_id,
      })
      .then((res) => {
        console.log("getting the scores", res.data);
        setScore(res.data);

        for (let counter = 0; counter < 9; counter++) {
          if (levels[counter] > props.score) {
            setLevel(counter + 1);
            return;
          }
        }
      });
  }, [props.score]);
  useEffect(() => {
    if (switchToLevel) {
      delayAndGo();
    }
  }, [switchToLevel]);

  useEffect(() => {
    if (guessOption) {
      document.getElementById(guessOption).style.backgroundColor = "blue";
    }
    console.log("levels of 0", levels[0]);
    for (const i of levels[0]) {
      document.getElementById(i + 1).style.backgroundColor = "green";
    }
  }, [showValues]);

  //updating the level of a user
  const updateLevel = (id, l) => {
    console.log("getting into update level");

    axios
      .post("http://localhost:8001/upLevel", {
        id: user_id,
        l: l,
      })
      .then((res) => {
        console.log("about up in axios", res);
        return res.data;
      });
  };
  //getting a random item according to a random topic
  const randomItem = () => {
    const myTopic =
      unlockedTopics[Math.floor(Math.random() * unlockedTopics.length)];
    console.log("tfarrej fel mytopic", myTopic);
    axios
      .post("http://localhost:8001/answer/random", {
        id: user_id,
        topic: myTopic,
      })
      .then((res) => {
        props.setCurrentItem(res.data);
        setTopic(myTopic);
        return res.data;
      });
  };
  //adding an item to favorite items List

  const addToFavorite = (e, value) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/answer/favorite", {
        id_user: user_id,
        id_item: id,
        clickedFavorite: value,
      })
      .then((res) => {
        console.log("the returned item favorite", res.data);

        console.log("clickedfavorite", value);
        if (value) {
          console.log(e.target.style);
          e.target.style.color = "orange";
        } else {
          console.log(e.target.style);
          e.target.style.color = "black";
        }
        console.log("I tried to style your heart");
        return res.data;
      });
  };

  //returns the maximum value in an array of objects
  function maxOfArray(arr) {
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i];
      }
    }
    return max;
  }

  //to delay passing to newLevel page
  function delayAndGo(e) {
    setTimeout(() => history.push(linknewLevel), 1500);
  }

  //creating a component for the button to be called
  const ButtonForGuess = ({ id, nameButton, percentage }) => {
    console.log("nthabtou esse3a houa walale", levels[0], id - 1);
    let myColor = "black";
    if (levels[0].includes(id - 1)) {
      myColor = "green";
    } else {
      if (guessOption === id) {
        myColor = "blue";
      }
    }
    return (
      <div className={`graph${id}`}>
        <button
          name={nameButton}
          id={id}
          className="ans-btn trigger"
          style={{
            height: `${percentage * 2 + 20}px`,
            backgroundColor: myColor,
          }}
          onClick={(e) => {
            console.log(e.target);
            setGuessOption(id);
            setDidGuess(true);

            console.log(`${percentage * 2 + 20}px`);
          }}
        ></button>
        <div className="hidden">
          <p> {nameButton}</p>
        </div>
        {showValues && <div className="percentage">{percentage}%</div>}
      </div>
    );
  };

  //the event to be triggered when the user click on a button to guess
  const updateAfterGuess = (e) => {
    const buttonId = e.target.id;
    /* a table that contains an array of arrays ordered from higher answers to lower answer, in each cell more 
than one element because we can have same number of answers for different options */
    let levelsAns = [];
    //counter on the number of cells in each subArray
    let levelsCounter = 0;
    //counter on how many array in the matrix
    let l = 0;
    //initialiaze the array of level(array of arrays): index 0 contains the highest rates and  5 for lowest rates
    for (let c = 0; c < 5; c++) {
      levelsAns[c] = [];
    }
    //make a copy of the nb of answers for each option
    let copyOptionValues = [...optionValues];
    console.log(copyOptionValues);
    //we may fill into one level three option when users answer 4 answers for example for never, rarely, usually
    while (levelsCounter < 5) {
      let max = maxOfArray(copyOptionValues);
      console.log(max);
      for (let i = 0; i < copyOptionValues.length; i++) {
        if (copyOptionValues[i] === max) {
          //storing in each sub array of optionValues the index of options having the highest rate
          levelsAns[l].push(i);
          levelsCounter++;
          copyOptionValues[i] = -1;
        }
      }
      l++;
    }
    setLevels(levelsAns);
    console.log("levels", levelsAns);
    let guessResult = getGuessAssessment(levelsAns, guessOption - 1, score, id);
    setGuessAnswer(guessResult[0]);

    console.log("guessResult", guessResult);
    setScore(score + Number(guessResult[1]));
    setPoints(Number(guessResult[1]));
    localStorage.setItem(
      "userScore",
      Number(localStorage.getItem("userScore")) + Number(guessResult[1])
    );
    addGuess(guessOption, Number(guessResult[1]));
    localStorage.setItem("userLevel", guessResult[2]);
    updateLevel(user_id, guessResult[2]);
    if (guessResult[3]) {
      updateLevel(user_id, guessResult[2]);
      setSwitchToLevel(true);
    }
  };
  //on clicking on the guess button, you will execute this function that'll add your guess to the database
  const addGuess = (guessOption, points) => {
    axios
      .post("http://localhost:8001/guess/add", {
        user_id: user_id,
        guess: guessOption,
        item_id: props.item.id,
        points: points,
      })
      .then((res) => {
        console.log("result of adding a guess", res.data);
        return res.data;
      });
  };

  return (
    <div className="div-container">
      {/*first component of our flexBox*/}

      <div className="yourScore">
        {" "}
        Points : {localStorage.getItem("userScore") ? score : 0}
      </div>
      {/*second component of our flexBox*/}
      <div className="itemAndButtonsGuess">
        <div className="itemHashtag">
          <div className="hashtag">
            <Link style={{ textDecoration: "none" }} to="/answer">
              <h5>#{topic}</h5>
            </Link>
          </div>
          <div className="itemContent">
            <h3>
              {props.item.item &&
                props.item.item
                  .replace("yourself", "themselves")
                  .replace("your", "their")
                  .replace("you", "they")}
            </h3>
          </div>
        </div>
        {/*second component of our flexBox*/}
        <div className="buttonsAndLabel">
          <div className="youDo optionIndication">
            Most people do{" "}
            {levels[0].map((i) => {
              switch (i) {
                case 0:
                  return "Never ";
                  break;
                case 1:
                  return "Rarely ";
                  break;
                case 2:
                  return "Sometimes ";
                  break;
                case 3:
                  return "Usually ";
                  break;
                case 4:
                  return "Always ";
                  break;
              }
            })}
          </div>
          <div className="voteButtons">
            <div className="optionIndication">Never</div>
            <ButtonForGuess
              id={1}
              nameButton={"Never"}
              className="ans-btn trigger"
              percentage={
                guessAnswer ? Math.round((optionValues[0] / total) * 100) : 15
              }
            />

            <ButtonForGuess
              id={2}
              nameButton={"Rarely"}
              className="ans-btn trigger"
              percentage={
                guessAnswer ? Math.round((optionValues[1] / total) * 100) : 15
              }
            />

            <ButtonForGuess
              id={3}
              nameButton={"Sometimes"}
              className="ans-btn trigger"
              percentage={
                guessAnswer ? Math.round((optionValues[2] / total) * 100) : 15
              }
            />

            <ButtonForGuess
              id={4}
              nameButton={"Usually"}
              className="ans-btn trigger"
              percentage={
                guessAnswer ? Math.round((optionValues[3] / total) * 100) : 15
              }
            />

            <ButtonForGuess
              id={5}
              nameButton={"Always"}
              className="ans-btn trigger"
              percentage={
                guessAnswer ? Math.round((optionValues[4] / total) * 100) : 15
              }
            />

            <div className="optionIndication">Always</div>
          </div>
          {/*voteButtons ended here*/}
        </div>
        {showAlert && (
          <div id="idPoints" className="Absolute-Center">
            <div className="points">
              {guessAnswer} +{points}
            </div>
          </div>
        )}
      </div>
      {didGuess && (
        <>
          <button
            className="skip"
            onClick={(e) => {
              e.preventDefault();
              setDidGuess(false);
              console.log(guessOption);
              updateAfterGuess(e);
              setShowValues(true);
              setShowAlert(true);
            }}
          >
            Done
            <i className="fas fa-angle-right" style={{ fontSize: "36px" }}></i>
          </button>
        </>
      )}

      {showValues && (
        <>
          <Link
            style={{ textDecoration: "none" }}
            to="/answer"
            onClick={randomItem}
          >
            <button className="skip">
              Next
              <i
                className="fas fa-angle-right"
                style={{ fontSize: "36px" }}
              ></i>
            </button>
          </Link>

          <div className="likeAndShare">
            <div className="like">
              <i
                className="fas fa-heart"
                style={{ color: "black" }}
                onClick={(e) => {
                  addToFavorite(e, !clickedFavorite);
                  setClickedFavorite(!clickedFavorite);
                }}
              ></i>
            </div>

            <div className="share">
              <i
                className="fas fa-share"
                onClick={() => setShowSocial(!showSocial)}
              >
                {" "}
                {showSocial && (
                  <div>
                    <FacebookButton
                      url={"https://github.com/"}
                      appId={179472363976068}
                    >
                      <SocialIcon url="https://facebook.com/jaketrent" />
                    </FacebookButton>
                    <TwitterButton url={"https://github.com/"}>
                      <SocialIcon url="https://Twitter.com/jaketrent" />
                    </TwitterButton>
                  </div>
                )}
              </i>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
