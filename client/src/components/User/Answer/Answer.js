import React, { useState, useEffect } from "react";



import { Link } from 'react-router-dom'
import axios from 'axios'
import ChartByGender from '../ChartByGender'
import ChartByRelation from '../ChartByRelation'
import ChartByEducation from '../ChartByEducation'
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, TwitterShareButton } from "react-share"
import { FacebookIcon, WhatsappIcon, LinkedinIcon, TwitterIcon } from "react-share"
import "./Answer.css"



export default function Answer(props) {
 
  console.log('answer props', props)
  let id = props.item.id;
  let user_id = props.user.id;
  let [showValues, setShowValues] = useState(false);
  // let shareUrl = window.location.href;
  let shareUrl = "http://whodo.co";
  let [classNameButton, setClassNameButton] = useState('ans-btn trigger')
  console.log(shareUrl)
  const [nextItem, setNextItem] = useState({})
  const [showFilter, setShowFilter] = useState(false)
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
  function changeheight() {

    document.getElementById('id1').style.height = (percentageNever * 4 + 20).toString() + 'px'
    document.getElementById('id2').style.height = (percentageRarely * 4 + 20).toString() + 'px'
    document.getElementById('id3').style.height = (percentageSometimes * 4 + 20).toString() + 'px'
    document.getElementById('id4').style.height = (percentageUsually * 4 + 20).toString() + 'px'
    document.getElementById('id5').style.height = (percentageAlways * 4 + 20).toString() + 'px'


  }
  //return the results according to the filter selected by the user
  function filterAnswers(id, filter) {
    if (filter === 'gender') {
      axios.get(`http://localhost:8001/answer/${id}/filter/gender`)
        .then(res => {
          setDataArrayGender(res.data);
          setShowChartRelation(false);
          setShowChartEducation(false);
          setShowChartGender(true);

        })
        .catch((err) => console.log(err))
    }
    else if (filter === 'relation') {
      axios.get(`http://localhost:8001/answer/${id}/filter/relation`)
        .then(res => {
          setDataArrayRelation(res.data);
          setShowChartGender(false);
          setShowChartEducation(false);
          setShowChartRelation(true);

        })
        .catch((err) => console.log(err))
    } else {

      setShowChartRelation(false);
      setShowChartGender(false);
      setShowChartEducation(true);
    }

  }
  //function responsible of adding a new response to answer_items table
  const addAnswer = (voteOption, id) => {
    axios.post('http://localhost:8001/answer/add', {
      user_id: user_id,
      answer: voteOption,
      item_id: id,
    })
      .then(res => {
        console.log('shoufou resultat', res.data)
        return (res.data)
      })

  }

  //filters the result by gender returning an object of arrays


  function updateAfterNever() {
    disableAllButtons()
    setNeverOption(neverOption + 1)
    setVoteOption(1)
    addAnswer(1, id)
    setShowValues(true)
    setShowFilter(true);
  }
  function updateAfterRarely() {
    disableAllButtons()
    setRarelyOption(rarelyOption + 1)
    setVoteOption(2)
    addAnswer(2, id)
    setShowValues(true)
    setShowFilter(true)



  }
  function updateAfterSometimes() {
    disableAllButtons()
    setSometimesOption(sometimesOption + 1)
    setVoteOption(3)
    addAnswer(3, id)
    setShowValues(true)

    setShowFilter(true)



  }
  function updateAfterUsually() {
    disableAllButtons()
    setUsuallyOption(usuallyOption + 1)
    setVoteOption(4)
    addAnswer(4, id)

    setShowValues(true)

    setShowFilter(true)




  }
  function updateAfterAlways() {
    disableAllButtons()
    setAlwaysOption(alwaysOption + 1)
    setVoteOption(5)
    addAnswer(5, id)

    setShowValues(true)

    setShowFilter(true)



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
            <h2>{props.item.item}</h2>
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
      {/*third part of our item title*/}
      {/*<div class='changeYourTopic'>
          <div className="answer-label">
          <h6>Change topic</h6>
          </div>
          <div>
          <select className="answer-select" name="other-topics" id="otherTopics" value={topic} onChange={async event => {
         await  setTopic(event.target.value); 
             randomItem(event.target.value);
             enableAllButtons();
           }
          }>
            {props.topics.map((c) => {
              return (<option value={c.topic}> {c.topic}</option>)
            })}
          
          </select>
          </div>
        </div>
        */}


      {/*second component of our flexBox*/}
      <div className='voteButtons'>
        <div className="graph1">
          <button name='never' id="id1" className="ans-btn trigger" onClick={() => { updateAfterNever(); }}> {showValues && !enableButtons ? `${percentageNever}%` : ''} </button>
          <div className="hidden"><p> Never</p></div>
        </div>

        <div className="graph2">
          <button name='rarely' id="id2" className="ans-btn trigger" onClick={() => { updateAfterRarely(); }}>{showValues && !enableButtons ? `${percentageRarely}%` : ''} </button>
          <div className="hidden"><p> Rarely</p></div>
        </div>
        <div className="graph3">
          <button name='sometimes' id="id3" className="ans-btn trigger" onClick={() => { updateAfterSometimes(); }}> {showValues && !enableButtons ? `${percentageSometimes}%` : ''} </button>
          <div className="hidden"><p> Sometimes</p></div>
        </div>

        <div className="graph4">
          <button name='usually' id="id4" className="ans-btn trigger" onClick={() => { updateAfterUsually(); }}>{showValues && !enableButtons ? `${percentageUsually}%` : ''} </button>
          <div className="hidden"><p> usually</p></div>
        </div>


        <div className="graph5">
          <button name='always' id="id5" className="ans-btn trigger" onClick={() => updateAfterAlways()}> {showValues && !enableButtons ? `${percentageAlways}%` : ''} </button>
          <div className="hidden"><p> always</p></div>
        </div>
      </div>
      <div className="next" >
      <p>Next</p><i class="fas fa-chevron-right" onClick={props.next}></i>
      </div>
      </div>
      {/*third component of our flex*/}

     {/*  {showFilter &&  <div className='filterResults'>

    <div className='filterTitle'>
       <h6>filter results by:</h6>
        </div>
        <div className='filterSelect'>
           <select className="answer-select" name="filter" id="filter" value={filter} onChange={event => {
            setFilter(event.target.value);
            filterAnswers(props.item.id, event.target.value);
          }
          }>
            <option value='gender'> Filter by gender</option>
            <option value='relation'> Filter by relation</option>
            <option value='education'> Filter by education</option>
          </select>
        </div>

        <div className='charts'>
          first subcomponent of chart flex 
          <div className='chartsByGender'>
            {showChartGender && <ChartByGender data={dataArrayGender} />}
          </div>
          second subcomponent of chart flex 
          <div className='chartsByRelation'>
            {showChartRelation && <ChartByRelation data={dataArrayRelation} />}
          </div>
          <br />
          <div className='chartsByEducation'>
            {showChartEducation && <ChartByEducation />}
          </div>
          <br />
        </div>
      </div>} */}
     
   
    </div>

  )
}

