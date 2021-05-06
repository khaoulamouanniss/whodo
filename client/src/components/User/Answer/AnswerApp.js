import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Step1 from "./Answer";
import axios from "axios";
import Step2 from "./AnswerGuess";

function AnswerApp(props) {
  const [ClickedChoice, setClickedChoice] = useState(
    localStorage.getItem("clicked") || false
  );

  const [currentStep, setCurrentStep] = useState(1);
  if (!ClickedChoice) {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Step1
              currentStep={currentStep}
              items={props.items}
              item={props.item}
              setCurrentItem={props.setCurrentItem}
              getNbAnsByOption={props.getNbAnsByOption}
              topics={props.topics}
              user={props.user}
            />{" "}
          </>
        );
      case 2:
        return (
          <>
            {" "}
            <Step1
              currentStep={currentStep}
              items={props.items}
              item={props.items[Math.floor(Math.random() * props.items.length)]}
              setCurrentItem={props.setCurrentItem}
              getNbAnsByOption={props.getNbAnsByOption}
              topics={props.topics}
              user={props.user}
            />
          </>
        );
    }
  } else {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Step1
              currentStep={currentStep}
              items={props.items}
              item={props.item}
              setCurrentItem={props.setCurrentItem}
              getNbAnsByOption={props.getNbAnsByOption}
              topics={props.topics}
              user={props.user}
            />
          </>
        );
      case 3:
        return (
          <>
            <Step1
              currentStep={currentStep}
              items={props.items}
              item={props.item}
              setCurrentItem={props.setCurrentItem}
              getNbAnsByOption={props.getNbAnsByOption}
              topics={props.topics}
              user={props.user}
            />{" "}
          </>
        );
    }
  }
}

export default AnswerApp;
