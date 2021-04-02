import React from "react";
import { Steps, Step } from "react-step-builder";
import Step1 from "./Answer";
import Step2 from "./AnswerGuess";
import { Button, Col, Row } from "antd";
import { IconButton, Icon } from "rsuite"

const Navigation = (props) => {
  console.log({ props });
  return (
     <div className="next" style={{float : "center"}} >
      <p>Next</p><i class="fas fa-chevron-right" onClick={props.next}></i>
      </div>
  );
};

function AnswerApp(props) {
  const config = {
    navigation: {
      component: Navigation, // a React component with special props provided automatically
      location: "after" // or before
    }
  };

  return (
    <div className="App">
   
      <Steps  config={config}>
        <Step item ={props.item} setCurrentItem={props.setCurrentItem} getNbAnsByOption={props.getNbAnsByOption} topics={props.topics} user={props.user} component={Step1} />
        <Step  item ={props.item} setCurrentItem={props.setCurrentItem} getNbAnsByOption={props.getNbAnsByOption} topics={props.topics} user={props.user} component={Step2} />
     
      </Steps>
    </div>
  );
}

export default AnswerApp;
