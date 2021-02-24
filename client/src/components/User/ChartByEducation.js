import React from 'react'
import { Bar } from 'react-chartjs-2';
//import './styleChart.css';
export default function ChartByEducation(props) {
 
    const data = {
    labels: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always'],
    datasets: [
      {
        label: 'undergraduate',
        data: [0,1,0,0,0],
        backgroundColor: 'rgb(236, 177, 122)',
        borderColor:'rgb(180, 177, 174)',

        borderWidth: 1,
      },
      {
        label: 'graduate',
        data: [0,0,2,0,1],
        backgroundColor: 'rgb(109, 203, 231)',
        borderColor:'rgb(180, 177, 174)',
        borderWidth: 1,
      },
      {
        label: 'higher education',
        data: [1,1,0,0,0],
        backgroundColor: 'rgb(168, 247, 198)',
        borderColor:'rgb(180, 177, 174)',
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
    <Bar data={data} options={options} />
    </div>
  )
}