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
        backgroundColor: 'blue',
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
        label: 'female',
        data: arrFemale,
        backgroundColor: 'pink',
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