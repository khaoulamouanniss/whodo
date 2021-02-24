import React from 'react'
import { Bar } from 'react-chartjs-2';
//import './styleChart.css';
export default function ChartByGender(props) {
  let arrMale= [];
  arrMale =props.data.male.map(a => a.nbanswers)
  let arrFemale= [];
  arrFemale =props.data.female.map(a => a.nbanswers)
    const data = {
    labels: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always'],
    datasets: [
      {
        label: 'male',
        data: arrMale,
        backgroundColor: 'rgb(126, 165, 238)',
        borderColor: [
          'rgb(180, 177, 174)'
        ],
        borderWidth: 1,
      },
      {
        label: 'female',
        data: arrFemale,
        backgroundColor: 'rgb(241, 187, 232)',
        borderColor: [
          'rgb(180, 177, 174)'
        ],
        borderWidth: 1,
      },
    ],
  }
  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <div className ='chartContainer'>
    <Bar style={{size:"70%"}} data={data} options={options} />
    </div>
  )
}