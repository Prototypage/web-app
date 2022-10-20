import React from 'react'
import { Line } from 'react-chartjs-2'
import styles from '../../../styles/home/home.module.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function Historique(): JSX.Element {
  const data = {
    labels: ['1', '2', '3'],
    datasets: [
      {
        data: [0, 1, 10],
      },
    ],
  }
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWith: 0,
        borderColor: 'rgba(45,40,60,0.1)',
        fill: 'start',
        backgroundColor: 'rgba(47,97,68,0.3)',
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        display: true,
      },
    },
  }
  return (
    <>
      <main className={styles.main}>
        <div className="p-10 space-y-8 z-0">Historique</div>
        <Line
          data={data}
          options={options}
          width={100}
          height={30}
          className="p-5"
        />
      </main>
    </>
  )
}
