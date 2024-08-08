"use client"

import {Chart as ChartJs , ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'


ChartJs.register(ArcElement, Tooltip, Legend);

const DougnutChart = ({ acc }) => {
    const data = {
        datasets: [
            {
                label: "Accounts",
                data: [1250, 1233, 1022],
                backgroundColor: ["#FF8A00", "#FC8000", "#FFF80C"]
            }
        ],

        labels: [" Account 1", "Account 2", "Account 3"]
    }
  return (
    <Doughnut 
       data={data} 
       options={
        {
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
       }
       
       />
  )
}

export default DougnutChart