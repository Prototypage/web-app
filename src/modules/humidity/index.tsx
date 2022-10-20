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
// import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'

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
let text_humidity = ''

export function Humidity(): JSX.Element {
  const [data_humidity, setdata_humidity] = useState({})

  const fetchData_today = async () => {
    text_humidity = 'ce matin'
    const res = await fetch('/api/postgres/humidity/getHumidityToday')
    const json = await res.json()

    const tab_test = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
    for (let i = 0; i < 24; i++) {
      let count = 0
      json.map((humidity) => {
        const date = new Date(humidity.created_at)

        if (date.getHours() === i) {
          tab_test[i - 1] += humidity.humidity
          count++
        }
      })
      tab_test[i - 1] = tab_test[i - 1] / count
    }

    setdata_humidity({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24,
      ],
      datasets: [
        {
          label: 'Humidité',
          backgroundColor: 'blue',
          data: tab_test,
        },
      ],
    })
    inside = true
  }
  const fetchData_this_week = async () => {
    text_humidity = 'le début de la semaine'
    const res = await fetch('/api/postgres/humidity/getHumidityThisWeek')
    const json = await res.json()

    const tab_test = [0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 7; i++) {
      let count = 0
      json.map((humidity) => {
        const date = new Date(humidity.created_at)

        if (date.getDay() === i) {
          tab_test[i - 1] += humidity.humidity
          count++
        }
      })
      tab_test[i - 1] = tab_test[i - 1] / count
    }
    console.log(tab_test)

    setdata_humidity({
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
          label: 'Humidité',
          backgroundColor: 'blue',
          data: tab_test,
        },
      ],
    })
    inside = true
  }

  const fetchData_this_month = async () => {
    text_humidity = 'le début du mois'
    const res = await fetch('/api/postgres/humidity/getHumidityThisMonth')
    const json = await res.json()

    const tab_test = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ]
    for (let i = 0; i < 31; i++) {
      let count = 0
      json.map((humidity) => {
        const date = new Date(humidity.created_at)

        if (date.getDate() === i) {
          tab_test[i - 1] += humidity.humidity
          count++
        }
      })
      tab_test[i - 1] = tab_test[i - 1] / count
    }

    setdata_humidity({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      datasets: [
        {
          label: 'Humidité',
          backgroundColor: 'blue',
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
        text: 'Humidité relevée depuis ' + text_humidity,
        font: {
          size: 30,
        },
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
        title: {
          display: true,
          text: 'Humidité (%)',
        },
        max: 100,
      },
    },
  }
  if (!inside) fetchData_today()
  if (!inside) return <div>loading...</div>
  else {
    return (
      <>
        <main className={styles.main}>
          <div className="w-1/2">
            <Link href={'/'} passHref={true}>
              <button
                className="bg-gray-500 hover:bg-gray-700 rounded-full text-white font-bold"
                type="button"
                title="retour"
              >
                <BsArrowLeft size={64} color="white" className="m-auto p-4" />
              </button>
            </Link>
          </div>
          <div className="w-1/2 p-2">
            <Bar data={data_humidity} options={options} />
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
