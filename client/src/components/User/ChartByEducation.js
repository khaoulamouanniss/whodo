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
        backgroundColor: 'blue',
        borderColor:'rgba(255, 99, 132, 1)',

        borderWidth: 1,
      },
      {
        label: 'graduate',
        data: [0,0,2,0,1],
        backgroundColor: 'purple',
        borderColor:'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'higher education',
        data: [1,1,0,0,0],
        backgroundColor: 'green',
        borderColor:'rgba(255, 99, 132, 1)',
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