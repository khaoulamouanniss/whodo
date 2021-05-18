import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function NewLevel(props) {
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
      console.log(tempOptionValues.reduce((a, b) => a + b));
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
  }, []);

  useEffect(() => {
    if (guessOption) {
      document.getElementById(guessOption).style.backgroundColor = "blue";
    }
    for (const i of levels[0]) {
      document.getElementById(i + 1).style.backgroundColor = "green";
    }
  }, [showValues]);
  //updating the score after each guess

  //getting the score of a specific user
  /*const getMyScore = () => {
    axios
      .post("http://localhost:8001/guess/score", {
        user: user_id,
      })
      .then((res) => {
        setScore(res.data);
        return res.data;
      });
  };*/
  //updating level of a user

  const updateLevel = (id, l) => {
    console.log("getting into update level");
    axios
      .post("http://localhost:8001/upLevel", {
        id: id,
        l: l,
      })
      .then((res) => {
        console.log("about up in axios", res.data);
        return res.data;
      });
    <Link to="/newLevel" style={{ textDecoration: "none" }}></Link>;
  };
  //getting a random item according to a random topic
  const randomItem = () => {
    axios
      .post("http://localhost:8001/answer/random", {
        topic: topics[Math.floor(Math.random() * topics.length)],
      })
      .then((res) => {
        props.setCurrentItem(res.data);
        setTopic(topics[Math.floor(Math.random() * topics.length)]);
        return res.data;
      });
  };

  //update the level of the user according to the score
  const updateLevelByScore = (score) => {
    console.log("calling into update level");
    if (score > 500 && startScore <= 500) {
      updateLevel(user_id, 10);
    } else if (score > 410 && startScore <= 410) {
      updateLevel(user_id, 9);
    } else if (score > 330 && startScore <= 330) {
      updateLevel(user_id, 8);
    } else if (score > 260 && startScore <= 260) {
      updateLevel(user_id, 7);
    } else if (score > 200 && startScore <= 200) {
      updateLevel(user_id, 6);
    } else if (score > 150 && startScore <= 150) {
      updateLevel(user_id, 5);
    } else if (score > 110 && startScore <= 110) {
      updateLevel(user_id, 4);
    } else if (score > 80 && startScore <= 80) {
      updateLevel(user_id, 3);
    } else if (score > 60 && startScore <= 60) {
      updateLevel(user_id, 2);
    } else {
      updateLevel(user_id, 1);
    }
  };
  //change the heights of the buttons according to the value in the database
  useEffect(() => {
    optionValues.map((i) => {});
    document.getElementById("1").style.height =
      (Math.round((optionValues[0] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("2").style.height =
      (Math.round((optionValues[1] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("3").style.height =
      (Math.round((optionValues[2] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("4").style.height =
      (Math.round((optionValues[3] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("5").style.height =
      (Math.round((optionValues[4] / total) * 100) * 4 + 20).toString() + "px";
  }, [guessAnswer]);

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

  //getting the message that assess our guess
  function getGuessAssessment(levelsAns, choice) {
    let guessAns = "";
    console.log(levels);
    console.log(choice);
    if (levelsAns[0].includes(choice)) {
      guessAns += "Perfect Guess, 10 marks added \n";
      setPoints(10);
      addGuess(choice, 10, id);
      setScore(Number(score) + 10);

      //after adding the guess, we calculate the score and see if the user level will upgrade
    } else if (levelsAns[1].includes(choice)) {
      guessAns += "Almost there, 5 marks added \n";
      setPoints(5);
      setScore(Number(score) + 5);
      addGuess(choice, 5, id);
    } else if (levelsAns[2].includes(choice)) {
      guessAns += "No marks added \n";
      setPoints(0);
      addGuess(choice, 0, id);
    } else if (levelsAns[3].includes(choice)) {
      guessAns += "Second Farest answer, 5 marks deducted \n";
      setPoints(-5);
      setScore(Number(score) - 5);
      addGuess(choice, -5, id);
    } else if (levelsAns[4].includes(choice)) {
      guessAns += "Farest answer, 10 marks deducted \n";
      setPoints(-10);
      setScore(Number(score) - 10);
      addGuess(choice, -10, id);
    }
    updateLevelByScore(score);

    guessAns += " Most people answered ";
    levelsAns[0].map((el) => {
      switch (el) {
        case 0:
          guessAns += "Never ";
          break;
        case 1:
          guessAns += "Rarely ";
          break;
        case 2:
          guessAns += "Sometimes ";
          break;
        case 3:
          guessAns += "Usually ";
          break;
        case 4:
          guessAns += "Always ";
          break;
      }
    });
    console.log(points);
    return guessAns;
  }

  //creating a component for the button to be called
  const ButtonForGuess = ({ id, nameButton, percentage, styleButton }) => {
    return (
      <div className={`graph${id}`}>
        <button
          name={nameButton}
          // id={`id${id}`}
          id={id}
          className="ans-btn trigger"
          onClick={(e) => {
            setGuessOption(id);
            setDidGuess(true);
            e.target.style = { styleButton };
          }}
        >
          {" "}
        </button>
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
    e.target.style = { height: `{ percentage } px` };
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
    console.log(levels);

    setGuessAnswer(getGuessAssessment(levelsAns, guessOption - 1));
    if (guessAnswer) {
      console.log(guessAnswer);
    }
  };
  //on clicking on the guess button, you will execute this function that'll add your guess to the database
  const addGuess = (guessOption, points, id) => {
    axios
      .post("http://localhost:8001/guess/add", {
        user_id: user_id,
        guess: guessOption,
        item_id: id,
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

      <h3>You have unlocked</h3>
      <h1>level {props.level}</h1>
      <h6>{props.score} to pass</h6>
      <h3>New topics</h3>
      <h4>{openedTopics.map((item)=> { return <div> item</div>}}
      </h4>
      <Link
      style={{ textDecoration: "none" }}
      to="/answer"
      onClick={randomItem}
    >
      <button className="skip">
        skip
        <i className="fas fa-angle-right" style={{ fontSize: "36px" }}></i>
      </button>
    </Link>
    </div>
  );
}
