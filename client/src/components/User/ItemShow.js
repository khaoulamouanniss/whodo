
import React, { useState } from "react";

import './ItemShow.css';
import axios from 'axios'
import ChartByGender from './ChartByGender'
import ChartByRelation from './ChartByRelation'
import ChartByEducation from './ChartByEducation'

export default function ItemShow(props) {

  const {currentItem} = props;
  console.log(currentItem);
 const [filter, setFilter] = useState('gender');
 const [showChartGender, setShowChartGender] = useState(false);
 const [showChartRelation, setShowChartRelation] = useState(false);
 const [showChartEducation, setShowChartEducation] = useState(false);
 const [dataArrayGender, setDataArrayGender] =useState({})
 const [dataArrayRelation, setDataArrayRelation] =useState({})
 //filters the result by gender returning an object of arrays
 function filterAnswers(id, filter) {
 if (filter ==='gender') {
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
  } else  {
    axios.get(`http://localhost:8001/answer/${id}/filter/gender`)
    .then(res => {
      setDataArrayGender(res.data)
      setShowChartRelation(false);
      setShowChartGender(false);
      setShowChartEducation(true);
     

    })
    .catch((err) => console.log(err))

  }

}
//filters the answers by relation status returning an object of arrays

 
  return (
    
    <div className='container'>
    <div className='flexBig'>
      <div className='flexItem'>
        <div>
      <h6>{currentItem.topic}</h6>
      </div>
      <div>
      <h1>{currentItem.item}</h1>
      </div>
      </div>
      {/*here finished the flexItem*/}
      <div className='flexList'>
        <h6>filter by:</h6>
      <select name="filter" id="filter" value={filter} onChange={event => {
          setFilter(event.target.value); 
             filterAnswers(currentItem.id, event.target.value);
           }
          }>
            <option value='gender'> gender</option>
            <option value='relation'> relation</option>
            <option value='education'> education</option> 
          </select>
          </div>
            {/*here finished the flexList*/}
          </div>
            {/*here finished the flexBig*/}
          <div className='charts'>
            {showChartGender && <ChartByGender data={dataArrayGender}/>}
            {showChartRelation && <ChartByRelation data={dataArrayRelation} />}
            {showChartEducation && <ChartByEducation />}
          </div>
            {/*here finished the charts*/}
          </div>
         
    
  )
}