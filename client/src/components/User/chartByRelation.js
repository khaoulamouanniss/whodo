import React from 'react'
import { Bar } from 'react-chartjs-2';


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
        backgroundColor: 'red',
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'engaged',
        data: arrEngaged,
        backgroundColor: 'blue'
          
        ,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
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
    <Bar data={data} options={options} />
  )
}