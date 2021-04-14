import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import ChartByGender from '../ChartByGender'
import ChartByRelation from '../ChartByRelation'
import ChartByEducation from '../ChartByEducation'
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, TwitterShareButton } from "react-share"
import { FacebookIcon, WhatsappIcon, LinkedinIcon, TwitterIcon } from "react-share"
import "./Answer.css"



export default function AnswerGuess(props) {
  console.log('answer props', props)
  let id = props.item.id;
  let user_id = props.user.id;
  let [showValues, setShowValues] = useState(false);
  // let shareUrl = window.location.href;
  let shareUrl = "http://whodo.co";
  let [classNameButton, setClassNameButton] = useState('ans-btn trigger')
  console.log(shareUrl)
  //a message that will be displayed to the user after guessing 
  const [guessAnswer, setGuessAnswer] = useState("")
  //contains five cells containing the count for the five answer options
  const [arrayAnswers, setArrayAnswers] = useState([])
  const [nextItem, setNextItem] = useState({})
  const [showFilter, setShowFilter] = useState(false)
  //boolean variables to allow the display of the charts
  const [showChartGender, setShowChartGender] = useState(false);
  const [showChartRelation, setShowChartRelation] = useState(false);
  const [showChartEducation, setShowChartEducation] = useState(false);


  const [enableButtons, setEnableButtons] = useState(true);
  //it is the array that contains the item answers by relation : single or engaged
  const [dataArrayRelation, setDataArrayRelation] = useState({})
  //it is the array that contains the item answers by gender : male or female
  const [dataArrayGender, setDataArrayGender] = useState({})
  //it changes whenever an item is answered
  const [voteOption, setVoteOption] = useState(0)
  //a state for the topic to be changed every time the user select a new topic
  const [topic, setTopic] = useState(props.item.topic);
  // a state is used for each option and it changes whenever its option is clicked
  const [neverOption, setNeverOption] = useState(0);
  const [rarelyOption, setRarelyOption] = useState(0);
  const [sometimesOption, setSometimesOption] = useState(0);
  const [usuallyOption, setUsuallyOption] = useState(0);
  const [alwaysOption, setAlwaysOption] = useState(0);
  const [socialState, setSocialState] = useState(false);
  //a state for the filter set by default to gender
  const [filter, setFilter] = useState('gender');

  //the total number of answers for the current item
  let total = neverOption + rarelyOption + sometimesOption + usuallyOption + alwaysOption;
  //rounded percentage for each option for the current item
  let percentageNever = neverOption / total * 100;
  percentageNever = Math.round(percentageNever)
  let percentageRarely = rarelyOption / total * 100;
  percentageRarely = Math.round(percentageRarely)
  let percentageSometimes = sometimesOption / total * 100;
  percentageSometimes = Math.round(percentageSometimes)
  let percentageUsually = usuallyOption / total * 100;
  percentageUsually = Math.round(percentageUsually)
  let percentageAlways = alwaysOption / total * 100;
  percentageAlways = Math.round(percentageAlways)

  useEffect(() => {
    expandMenu(socialState);
    props.getNbAnsByOption(props.item.item).then((data) => {

      setNeverOption(Number(data[0].nbanswers));
      setRarelyOption(Number(data[1].nbanswers));
      setSometimesOption(Number(data[2].nbanswers));
      setUsuallyOption(Number(data[3].nbanswers));
      setAlwaysOption(Number(data[4].nbanswers));
      backToNormalButtonHeights();


    })
  }, [])

  useEffect(() => {

    props.getNbAnsByOption(props.item.item).then((data) => {

      setNeverOption(Number(data[0].nbanswers));
      setRarelyOption(Number(data[1].nbanswers));
      setSometimesOption(Number(data[2].nbanswers));
      setUsuallyOption(Number(data[3].nbanswers));
      setAlwaysOption(Number(data[4].nbanswers));

      enableAllButtons();
      backToNormalButtonHeights();
      setShowChartEducation(false);
      setShowChartGender(false);
      setShowChartRelation(false);

    })
  }, [props.item.item])

  useEffect(() => {

    changeheight();
  }, [voteOption])

  //this function will be called everytime the user clicks on shar button 
  function expandMenu(socialState) {
    if (socialState === false) {
      document.getElementById('icon-list').style.transform = 'scaleX(0)';

      setSocialState(true);
    }
    else {
      document.getElementById('icon-list').style.transform = 'scaleX(1)';
      setSocialState(false);
    }

  }

  const answersForItem =(id) => {
    axios.get(`http://localhost:8001/answer/${id}/guess`)
    .then(res => {
      setArrayAnswers(res.data)
      console.log(res.data)

    })
    .catch((err) => console.log(err))
  }
  

  function backToNormalButtonHeights() {
    document.getElementById('id1').style.height = '20px'
    document.getElementById('id2').style.height = '20px'
    document.getElementById('id3').style.height = '20px'
    document.getElementById('id4').style.height = '20px'
    document.getElementById('id5').style.height = '20px'
  }


  //disabling all buttons after the user clicks on any option
  function disableAllButtons() {
    document.getElementById('id1').disabled = true
    document.getElementById('id2').disabled = true
    document.getElementById('id3').disabled = true
    document.getElementById('id4').disabled = true
    document.getElementById('id5').disabled = true
    setEnableButtons(false);

  }
  //enabling all the buttons again 
  function enableAllButtons() {
    document.getElementById('id1').disabled = false
    document.getElementById('id2').disabled = false
    document.getElementById('id3').disabled = false
    document.getElementById('id4').disabled = false
    document.getElementById('id5').disabled = false
    setEnableButtons(true)
  }
  const randomItem = (nextTopic) => {

    axios.post('http://localhost:8001/answer/random', { topic: nextTopic })
      .then(res => {
        props.setCurrentItem(res.data)
        return res.data;
      })
  }
  function updateAfterGuess(id) {
    let sortedIndexes = [];
    let copyArrayAnswers = [...arrayAnswers];
     for (let i = 0; i < copyArrayAnswers.length; i++) {
       let maxIndex = Array.IndexOf(Math.max(copyArrayAnswers))
       sortedIndexes.push(copyArrayAnswers[maxIndex]);
       copyArrayAnswers[maxIndex] = -1;
     }
     if (id === "id1" && sortedIndexes[0] === 0 || id === "id2" && sortedIndexes[0] === 1 
     || id === "id3" && sortedIndexes[0] === 2 || id === "id4" && sortedIndexes[0] === 3
     || id === "id5" && sortedIndexes[0] === 4) {
        setGuessAnswer('Perfect Guess, 10 marks added')
     }
     if (id === "id1" && sortedIndexes[1] === 0 || id === "id2" && sortedIndexes[1] === 1 
     || id === "id3" && sortedIndexes[1] === 2 || id === "id4" && sortedIndexes[1] === 3
     || id === "id5" && sortedIndexes[1] === 4) {
        setGuessAnswer('Almost there, 5 marks added')
     }
     if (id === "id1" && sortedIndexes[2] === 0 || id === "id2" && sortedIndexes[2] === 1 
     || id === "id3" && sortedIndexes[2] === 2 || id === "id4" && sortedIndexes[2] === 3
     || id === "id5" && sortedIndexes[2] === 4) {
        setGuessAnswer('No marks added')
     }
     if (id === "id1" && sortedIndexes[3] === 0 || id === "id2" && sortedIndexes[3] === 1 
     || id === "id3" && sortedIndexes[3] === 2 || id === "id4" && sortedIndexes[3] === 3
     || id === "id5" && sortedIndexes[3] === 4) {
        setGuessAnswer('Second Farest answer, 5 marks deducted')
     }
     if (id === "id1" && sortedIndexes[4] === 0 || id === "id2" && sortedIndexes[4] === 1 
     || id === "id3" && sortedIndexes[4] === 2 || id === "id4" && sortedIndexes[4] === 3
     || id === "id5" && sortedIndexes[4] === 4) {
        setGuessAnswer('Farest answer, 10 marks deducted')
     }



  }
  function changeheight() {

    document.getElementById('id1').style.height = (percentageNever * 4 + 20).toString() + 'px'
    document.getElementById('id2').style.height = (percentageRarely * 4 + 20).toString() + 'px'
    document.getElementById('id3').style.height = (percentageSometimes * 4 + 20).toString() + 'px'
    document.getElementById('id4').style.height = (percentageUsually * 4 + 20).toString() + 'px'
    document.getElementById('id5').style.height = (percentageAlways * 4 + 20).toString() + 'px'


  }
  
  return (

    <div className="div-container">
      {/*first component of our flexBox*/}
      <div className="itemAndButtons">
      <div className='itemHashtagSocialShare'>
        <div className='itemHashtag'>
          <div className='hashtag'>
            <Link style={{ textDecoration: "none" }} to="/answer" onClick={() => randomItem(topic)} >
              <h5>#{topic}</h5>
            </Link>
          </div>
          <div className='itemContent'>
            <h2>second page{props.item.item}</h2>
          </div>

        </div>  {/*end of the title without social share */}
        {/*second part of our item title*/}
        <div className='shareAndFav'>
          <div id="button" className="fav-btn" style ={{fontSize: "0.5rem"}}>
          <i className="fas fa-heart fa-3x"></i>
           
          </div>
          <div className='socialMedia'>
            <input type="checkbox" id="check" />
            <label for="check">
              <div id="button"><i className="fas fa-share" onClick={() => expandMenu(socialState)} style={{ height: "16px", width: "16px" }}></i></div>
            </label>

            <div id="icon-list">
              <ul>
                <li><WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon round={true} style={{ height: "32px", width: "32px" }} />
                </WhatsappShareButton></li>
                <li> <FacebookShareButton
                  url={shareUrl}
                  quote='have a look at this video'
                  hashtag='#whodo'>
                  <FacebookIcon logoFillColor="white" round={true} style={{ height: "32px", width: "32px" }} />
                </FacebookShareButton></li>
                <li><TwitterShareButton title={props.item.item} url={shareUrl}>
                  <TwitterIcon logoFillColor="white" round={true} style={{ height: "32px", width: "32px" }} />
                </TwitterShareButton></li>

              </ul>

            </div>

          </div> {/*end of social share component */}

        </div>
      </div>
 


      {/*second component of our flexBox*/}
      <div className='voteButtons'>
        <div className="graph1">
          <button name='never' id="id1" className="ans-btn trigger" onClick={() => { updateAfterGuess(this.id); }}> {showValues && !enableButtons ? `${percentageNever}%` : ''} </button>
          <div className="hidden"><p> Never</p></div>
        </div>

        <div className="graph2">
          <button name='rarely' id="id2" className="ans-btn trigger" onClick={() => { updateAfterGuess(this.id); }}>{showValues && !enableButtons ? `${percentageRarely}%` : ''} </button>
          <div className="hidden"><p> Rarely</p></div>
        </div>
        <div className="graph3">
          <button name='sometimes' id="id3" className="ans-btn trigger" onClick={() => { updateAfterGuess(this.id); }}> {showValues && !enableButtons ? `${percentageSometimes}%` : ''} </button>
          <div className="hidden"><p> Sometimes</p></div>
        </div>

        <div className="graph4">
          <button name='usually' id="id4" className="ans-btn trigger" onClick={() => { updateAfterGuess(this.id); }}>{showValues && !enableButtons ? `${percentageUsually}%` : ''} </button>
          <div className="hidden"><p> usually</p></div>
        </div>


        <div className="graph5">
          <button name='always' id="id5" className="ans-btn trigger" onClick={() => updateAfterGuess(this.id)}> {showValues && !enableButtons ? `${percentageAlways}%` : ''} </button>
          <div className="hidden"><p> always</p></div>
        </div>
      </div>
     
      </div>
      
    </div>

  )
}

