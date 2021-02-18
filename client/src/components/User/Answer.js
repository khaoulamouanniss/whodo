import React, { useState, useEffect } from "react";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import ChartByGender from './ChartByGender'
import ChartByRelation from './chartByRelation'
import "./Answer.css"

export default function Answer(props) {
  let id = props.item.id;
  const [showFilter, setShowFilter] =useState(false)
  const [showChart, setShowChart] = useState(false);
  const [showChartRelation, setShowChartRelation] = useState(false);
  console.log('answer props', props.item)
  const [dataArrayRelation, setDataArrayRelation] = useState({})
  const [dataArray, setDataArray] = useState({})
  const [voteOption, setVoteOption] = useState(0)
  const [neverOption, setNeverOption] = useState(0);
  const [rarelyOption, setRarelyOption] = useState(0);
  const [sometimesOption, setSometimesOption] = useState(0);
  const [usuallyOption, setUsuallyOption] = useState(0);
  const [alwaysOption, setAlwaysOption] = useState(0);
  let total = (neverOption + rarelyOption + sometimesOption + usuallyOption + alwaysOption);
  let percentageNever = neverOption / total * 100;
  percentageNever = Math.round(percentageNever * 100) / 100
  /////////
  let percentageRarely = rarelyOption / total * 100;
  percentageRarely = Math.round(percentageRarely * 100) / 100
  ////////
  let percentageSometimes = sometimesOption / total * 100;
  percentageSometimes = Math.round(percentageSometimes * 100) / 100
  ////////
  let percentageUsually = usuallyOption / total * 100;
  percentageUsually = Math.round(percentageUsually * 100) / 100
  //////
  let percentageAlways = alwaysOption / total * 100;
  percentageAlways = Math.round(percentageAlways * 100) / 100
  useEffect(() => {
    props.getNbAnsByOption(props.item.item).then((data) => {
      setNeverOption(Number(data[0].nbanswers));
      setRarelyOption(Number(data[1].nbanswers));
      setSometimesOption(Number(data[2].nbanswers));
      setUsuallyOption(Number(data[3].nbanswers));
      setAlwaysOption(Number(data[4].nbanswers));
    })
  }, [])
  useEffect(() => {
    changeheight();
  }, [neverOption, rarelyOption, sometimesOption, usuallyOption, alwaysOption])
  function changeheight() {
    document.getElementById('id1').style.height = percentageNever.toString() + '%'
    document.getElementById('id2').style.height = percentageRarely.toString() + '%'
    document.getElementById('id3').style.height = percentageSometimes.toString() + '%'
    document.getElementById('id4').style.height = percentageUsually.toString() + '%'
    document.getElementById('id5').style.height = percentageAlways.toString() + '%'
  }
  //filters the result by gender returning an object of arrays
  function filterByGender(id) {
    axios.get(`http://localhost:8001/answer/${id}/filter/gender`)
      .then(res => {
        setDataArray(res.data)
        setShowChart(true);
      })
      .catch((err) => console.log(err))
  }
  //filters the answers by relation status returning an object of arrays
  function filterByRelationStatus(id) {
    axios.get(`http://localhost:8001/answer/${id}/filter/relation`)
      .then(res => {
        setDataArrayRelation(res.data)
        setShowChartRelation(true);
      })
      .catch((err) => console.log(err))
  }
  function updateAfterNever() {
    setNeverOption(neverOption + 1)
    setVoteOption(1)
      addAnswer()
        changeheight()
        setShowFilter(true)
  }
  function updateAfterRarely() {
    setRarelyOption(rarelyOption + 1)
    setVoteOption(2)
      addAnswer()
        changeheight()
       
        setShowFilter(true)
      
    
    
  }
  function updateAfterSometimes() {
    setSometimesOption(sometimesOption + 1)
    setVoteOption(3)
      addAnswer()
        changeheight()
       
        setShowFilter(true)
     
    
   
  }
  function updateAfterUsually() {
    setUsuallyOption(usuallyOption + 1)
    setVoteOption(4)
      addAnswer()
        changeheight()
        setVoteOption(4)
        setShowFilter(true)
   
   
   
   
  }
  function updateAfterAlways() {
    setAlwaysOption(alwaysOption + 1)
    setVoteOption(5)
      addAnswer().then(()=>{
        changeheight()
   
        setShowFilter(true)
     
    })
   
  }
  //function responsible of adding a new response to answer_items table
  const addAnswer = () => {
   axios.post('http://localhost:8001/answer/add',{ 
      user_id: 4, 
      answer: voteOption, 
      item_id: id, 
    })
    .then(res =>
      {
        console.log('shoufou resultat', res.data)
        return(res.data)
        
       
      })
  
    }
  return (
    <div className="div-container">
      <h1>{props.item.item}</h1>
      
      <div className="graph1">
        <button name='never' id="id1" className="ans-btn trigger" onClick={updateAfterNever}> {percentageNever ? percentageNever : ''} </button>
        <div className="hidden"><p> Never</p></div>
      </div>
​
      <div className="graph2">
        <button id="id2" className="ans-btn trigger" onClick={updateAfterRarely}>{percentageRarely ? percentageRarely : ''} </button>
        <div className="hidden"><p> Rarely</p></div>
      </div>
      <div className="graph3">
        <button id="id3" className="ans-btn trigger" onClick={updateAfterSometimes}> {percentageSometimes ? percentageSometimes : ''} </button>
        <div className="hidden"><p> Sometimes</p></div>
      </div>
​
      <div className="graph4">
        <button id="id4" className="ans-btn trigger" onClick={updateAfterUsually}>{percentageUsually ? percentageUsually : ''} </button>
        <div className="hidden"><p> usually</p></div>
      </div>
​
​
      <div className="graph5">
        <button id="id5" className="ans-btn trigger" onClick={updateAfterAlways}> {percentageAlways ? percentageAlways : ''} </button>
        <div className="hidden"><p> always</p></div>
      </div>
      <br />
      <br />
      <div className='chart'>
     {showFilter &&  <button value='filter' onClick={filterByGender(id)}>
        filter by gender </button>
 && <button value='filterRelation' onClick={filterByRelationStatus(id)}>
filter by relation </button>
        }
        {showChart && <ChartByGender data={dataArray} />}
        {showChartRelation && <ChartByRelation data={dataArrayRelation} />}
      </div>
    </div>
  )
}
