import React from 'react'
import { Bar } from 'react-chartjs-2';
//import './styleChart.css';
export default function ChartByRelation(props) {
  let arrSingle= [];
  arrSingle =props.data.single.map(a => a.nbanswers)
  let arrEngaged= [];
  arrEngaged =props.data.engaged.map(a => a.nbanswers)
    const data = {
    labels: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always'],
    datasets: [
      {
        label: 'single',
        data: arrSingle,
        backgroundColor: 'rgb(126, 238, 219)',
        borderColor: [
          'rgb(180, 177, 174)'
        ],
        borderWidth: 1,
      },
      {
        label: 'engaged',
        data: arrEngaged,
        backgroundColor: 'rgb(157, 108, 190)',
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
    <Bar data={data} options={options} />
    </div>
  )
}