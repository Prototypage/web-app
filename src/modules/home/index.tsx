import React, { useState } from 'react'
import styles from '../../../styles/home/home.module.css'
import { WiThermometer, WiHumidity } from 'react-icons/wi'
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa'
import ReactLoading from 'react-loading'
import { ImWarning } from 'react-icons/im'
import { MdGrain } from 'react-icons/md'
import { GrRefresh } from 'react-icons/gr'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { FaPrescriptionBottle } from 'react-icons/fa'

import Link from 'next/link'

export function Home(): JSX.Element {
  const [data_temperature, setData_temperature] = useState()
  const [data_humidity, setData_humidity] = useState()

  const [door_open, setDatadoor_open] = useState(false)
  const [door_loading, setDoorLoading] = useState(false)

  const fetchData_Temperature = async () => {
    const res = await fetch('/api/postgres/temperature/getLastTemperature')
    const json = await res.json()
    console.log(json)

    setData_temperature(json[0].temperature)
    // send_message('refresh_temperature')
  }
  const fetchData_Humidity = async () => {
    const res = await fetch('/api/postgres/humidity/getLastHumidity')
    const json = await res.json()
    setData_humidity(json[0].humidity)
    // send_message('refresh_humidity')
  }

  const enough_water = false
  const enough_food = false

  const send_message = (message: string) => {
    const socket = new WebSocket('ws://10.117.128.92:5000')
    socket.addEventListener('open', function () {
      socket.send(message)
    })
    socket.addEventListener('message', function (event) {
      let value_receive = []

      value_receive = event.data.split(',')
      if (value_receive[0] == 'refresh_temperature') {
        console.log('update value temperature? ' + value_receive[1])

        setData_temperature(value_receive[1])
      } else if (value_receive[0] == 'refresh_humidity') {
        console.log('update value humidity? ' + value_receive[1])
        setData_humidity(value_receive[1])
      } else if (value_receive[0] == 'door_opened') {
        console.log('door opened')
        setDatadoor_open(true)
        setDoorLoading(false)
      } else if (value_receive[0] == 'door_closed') {
        console.log('door closed')
        setDatadoor_open(false)
        setDoorLoading(false)
      }
    })
  }
  console.log(data_humidity, data_temperature)

  if (data_humidity != undefined || data_temperature != undefined) {
    fetchData_Temperature()
    fetchData_Humidity()
    return (
      <div>
        <ReactLoading type="spin" color="gray" className="m-auto p-5" />
      </div>
    )
  } else {
    return (
      <>
        <main className={styles.main}>
          <div className="p-10 space-y-8 z-0">
            <div className="grid grid-cols-2 gap-5 items-center justify-center columns-2">
              <div className="bg-pink-200 rounded-lg p-4 justify-self-center">
                <WiThermometer size={64} color="red" className="m-auto" />
                <p className="text-center font-bold p-2">
                  {data_temperature} °C
                </p>

                <div className="grid grid-cols-2 gap-5">
                  <Link href={'/temperatures'} passHref={true}>
                    <button
                      className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full `}
                      type="button"
                      title="send_temperature_page"
                    >
                      Voir plus
                    </button>
                  </Link>
                  <button
                    className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full `}
                    type="button"
                    title="send_temperature_page"
                    onClick={() => send_message('refresh_temperature')}
                  >
                    <GrRefresh size={32} color="white" className="m-auto" />
                  </button>
                </div>
              </div>
              <div className="bg-blue-200 p-4 justify-self-center rounded-lg">
                <WiHumidity size={64} color="blue" className="m-auto" />
                <p className="text-center font-bold p-2">{data_humidity} %</p>

                <div className="grid grid-cols-2 gap-5">
                  <Link href={'/humidity'} passHref={true}>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-2 px-4"
                      type="button"
                      title="send_humidity_page"
                    >
                      Voir plus
                    </button>
                  </Link>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-2 px-4"
                    type="button"
                    title="send_humidity_page"
                    onClick={() => send_message('refresh_humidity')}
                  >
                    <GrRefresh size={32} color="white" className="m-auto" />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-amber-300 grid grid-cols-3 gap-5 items-center justify-center columns-2 rounded-full">
              <div className="text-white p-5">
                {door_loading && (
                  <ReactLoading type="spin" color="white" className="m-auto" />
                )}
                {door_open && !door_loading && (
                  <FaDoorOpen size={69} color="white" className="m-auto" />
                )}
                {!door_open && !door_loading && (
                  <FaDoorClosed size={69} color="white" className="m-auto" />
                )}
              </div>

              <button
                className={`bg-blue-500  text-white font-bold py-2 px-4 rounded-full m-10 ${
                  door_open || door_loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
                type="button"
                onClick={() => {
                  send_message('open_door')
                  setDoorLoading(true)
                }}
              >
                Ouverture de la porte
              </button>
              <button
                className={`bg-red-500 text-white font-bold py-2 px-4 rounded-full m-10 ${
                  !door_open || door_loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-red-700'
                }`}
                type="button"
                onClick={() => {
                  send_message('close_door')
                  setDoorLoading(true)
                }}
              >
                Fermeture de la porte
              </button>
            </div>
            <div className="bg-black items-center">
              <MdGrain size={100} color="orange" className="m-auto p-5" />
              <p className="p-5 text-white text-center">
                {enough_food ? (
                  <div>Il y a assez de nourriture !</div>
                ) : (
                  <div>
                    <ImWarning
                      size={64}
                      color="yellow"
                      className="m-auto p-5"
                    />
                    Il n&apos;y a pas assez de nourriture !
                  </div>
                )}
              </p>
            </div>
            <div className="bg-black items-center">
              <FaPrescriptionBottle
                size={100}
                color="blue"
                className="m-auto p-5"
              />
              <p className="p-5 text-white text-center">
                {enough_water ? (
                  <div>Il y a assez d&apos;eau !</div>
                ) : (
                  <div>
                    <ImWarning
                      size={64}
                      color="yellow"
                      className="m-auto p-5"
                    />
                    Il n&apos;y a pas assez d&apos;eau !
                  </div>
                )}
              </p>
            </div>
            <div className="bg-black">
              <p className="text-white p-5">
                Détection PIR la nuit dernière :{' '}
              </p>
            </div>
          </div>
        </main>
      </>
    )
  }
}
