import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import styles from '../../../styles/home/home.module.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

let inside = false
let text_temperature = ''
let text_axeX = ''

export function Temperatures(): JSX.Element {
  const [data_temperature, setData_temperature] = useState({})

  const fetchData_today = async () => {
    text_temperature = 'ce matin'
    text_axeX = 'Heure'
    const res = await fetch('/api/postgres/temperature/getTemperaturesToday')
    const json = await res.json()

    const tab_test = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
    for (let i = 0; i < 24; i++) {
      let count = 0
      json.map((temperature) => {
        const date = new Date(temperature.created_at)

        if (date.getHours() === i) {
          tab_test[i - 1] += temperature.temperature
          count++
        }
      })
      tab_test[i - 1] = tab_test[i - 1] / count
    }

    setData_temperature({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24,
      ],
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: 'red',
          data: tab_test,
        },
      ],
    })
    inside = true
  }
  const fetchData_this_week = async () => {
    text_axeX = 'Jour'
    text_temperature = 'le début de la semaine'
    const res = await fetch('/api/postgres/temperature/getTemperaturesThisWeek')
    const json = await res.json()
    console.log(json)

    const tab_test = [0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 7; i++) {
      let count = 0
      json.map((temperature) => {
        const date = new Date(temperature.created_at)

        if (date.getDay() === i) {
          tab_test[i - 1] += temperature.temperature
          count++
        }
      })
      tab_test[i - 1] = tab_test[i - 1] / count
    }
    console.log(tab_test)

    setData_temperature({
      labels: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
      ],
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: 'red',
          data: tab_test,
        },
      ],
    })
    inside = true
  }

  const fetchData_this_month = async () => {
    text_axeX = 'Jour'
    text_temperature = 'le début du mois'
    const res = await fetch(
      '/api/postgres/temperature/getTemperaturesThisMonth'
    )
    const json = await res.json()

    const tab_test = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ]
    for (let i = 0; i < 31; i++) {
      let count = 0
      json.map((temperature) => {
        const date = new Date(temperature.created_at)

        if (date.getDate() === i) {
          tab_test[i - 1] += temperature.temperature
          count++
        }
      })
      tab_test[i - 1] = tab_test[i - 1] / count
    }

    setData_temperature({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: 'red',
          data: tab_test,
        },
      ],
    })
    inside = true
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Températures relevées depuis ' + text_temperature,
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
        title: {
          display: true,
          text: text_axeX,
        },
      },
      yAxis: {
        display: true,
        title: {
          display: true,
          text: 'Température (°C)',
        },
        max: 50,
      },
    },
  }
  if (!inside) fetchData_today()
  if (!inside) return <div>loading...</div>
  else {
    return (
      <>
        <main className={styles.main}>
          <div className="w-1/2 p-2">
            <Bar data={data_temperature} options={options} />
          </div>
          <div className="p-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-2 px-4"
              type="button"
              title="display_last_day"
              onClick={fetchData_today}
            >
              Dernière 24h
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-2 px-4 m-5"
              type="button"
              title="display_last_week"
              onClick={fetchData_this_week}
            >
              Dernière semaine
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-2 px-4"
              type="button"
              title="display_last_month"
              onClick={fetchData_this_month}
            >
              Dernier mois
            </button>
          </div>
        </main>
      </>
    )
  }
}
