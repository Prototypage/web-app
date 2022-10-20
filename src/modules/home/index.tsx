import React, { useEffect, useState } from 'react'
import styles from '../../../styles/home/home.module.css'
import { WiThermometer, WiHumidity } from 'react-icons/wi'
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa'
import ReactLoading from 'react-loading'
import { ImWarning } from 'react-icons/im'
import { MdGrain } from 'react-icons/md'
import { GrRefresh } from 'react-icons/gr'
import { TiTickOutline } from 'react-icons/ti'
import { FaPrescriptionBottle } from 'react-icons/fa'
import logoPoule from '../../../public/poule_drole-removebg.png'
import logoRenard from '../../../public/renard_test1.png'
import logoRenardDodo from '../../../public/renard_dodo2.png'

import Image from 'next/image'

import Link from 'next/link'

export function Home(): JSX.Element {
  const [data_temperature, setData_temperature] = useState()
  const [data_humidity, setData_humidity] = useState()
  const [data_food, setData_food] = useState(false)
  const [data_water, setData_water] = useState(0)
  const [data_PIR, setData_PIR] = useState(0)

  const [door_open, setDatadoor_open] = useState(false)
  const [door_loading, setDoorLoading] = useState(false)

  const [text_door, setDatatext_door] = useState('')

  const fetchData_Temperature = async () => {
    const res = await fetch(
      'http://localhost:3000/api/postgres/temperature/getLastTemperature'
    )
    const json = await res.json()
    console.log(json)

    setData_temperature(json[0].temperature)
    // send_message('refresh_temperature')
  }
  const fetchData_Humidity = async () => {
    const res = await fetch(
      'http://localhost:3000/api/postgres/humidity/getLastHumidity'
    )
    const json = await res.json()
    setData_humidity(json[0].humidity)
    // send_message('refresh_humidity')
  }

  const fetchData_Pir = async () => {
    const res = await fetch('http://localhost:3000/api/postgres/pir/getLastPir')
    const json = await res.json()
    console.log(json[0].status)

    setData_PIR(json[0].status)
    // send_message('refresh_pir')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every 10 second!')
      fetchData_Pir()
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchStateDoor()
    fetchFood()
    fetchWater()
    fetchData_Temperature()
    fetchData_Humidity()
  }, [])

  const fetchFood = async () => {
    send_message('enough_food')
  }
  const fetchStateDoor = async () => {
    send_message('state_door')
  }

  const fetchWater = async () => {
    send_message('enough_water')
  }

  const send_message = (message: string) => {
    console.log('SEND MESSAGE?')

    const socket = new WebSocket('ws://10.117.128.92:5000')
    socket.addEventListener('open', function () {
      console.log('open + ', message)

      socket.send(message)
    })
    socket.addEventListener('message', function (event) {
      let value_receive = []
      value_receive = event.data.split(',')
      const message = value_receive[0]
      const value = value_receive[1]

      if (message == 'refresh_temperature') {
        console.log('update value temperature? ' + value)

        setData_temperature(value)
      } else if (message == 'refresh_humidity') {
        console.log('update value humidity? ' + value)
        setData_humidity(value)
      } else if (message == 'door_opened') {
        console.log('door opened')
        setDatadoor_open(true)
        setDoorLoading(false)
        setDatatext_door('Porte ouverte')
      } else if (message == 'door_closed') {
        console.log('door closed')
        setDatadoor_open(false)
        setDoorLoading(false)
        setDatatext_door('Porte fermée')
      } else if (message == 'enough_food') {
        console.log('enough food? ' + value)
        const distance = value
        console.log(value)

        if (distance < 3.3 || distance > 5) {
          setData_food(true)
        } else {
          setData_food(false)
        }
      } else if (message == 'enough_water') {
        console.log('enough water? ' + value)

        if (value == 1) {
          setData_water(1)
        } else {
          setData_water(0)
        }
      } else if (message == 'state_door') {
        console.log('state door ? ' + value)
        if (value == 0) {
          setDatadoor_open(true)
          setDatatext_door('Porte ouverte')
        } else {
          setDatadoor_open(false)
          setDatatext_door('Porte fermée')
        }
      }
    })
  }
  useEffect(() => {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload()
      }
    }
  }, [])

  return (
    <>
      <main className={styles.main}>
        <div className="p-10 space-y-8 z-0">
          <div className="py-5 text-center">
            <Image
              src={logoPoule}
              alt="Logo Poule"
              width={200}
              height={200}
              objectFit="contain"
            />
            <div className="text-4xl text-black italic font-bold rounded-full">
              COT COT CONNECT
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center justify-center columns-2">
            <div className="bg-pink-200 rounded-lg p-4 items-center">
              <WiThermometer size={64} color="red" className="m-auto" />
              <div className="text-center font-bold p-2">
                {data_temperature} °C
              </div>

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
            <div className="bg-blue-200 p-4 items-center rounded-lg">
              <WiHumidity size={64} color="blue" className="m-auto" />
              <div className="text-center font-bold p-2">{data_humidity} %</div>

              <div className="grid grid-cols-2 gap-5 ">
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
          <div className="bg-fuchsia-200 grid grid-cols-2 gap-5 items-center justify-center columns-2 rounded-lg ">
            <div className="text-white p-5">
              {door_loading && (
                <ReactLoading type="spin" color="black" className="m-auto" />
              )}
              {door_open && !door_loading && (
                <FaDoorOpen size={100} color="black" className="m-auto" />
              )}
              {!door_open && !door_loading && (
                <FaDoorClosed size={100} color="black" className="m-auto" />
              )}
              <div className="text-black text-center p-2">{text_door}</div>
            </div>
            <div className="text-white p-5 grid grid-row">
              <button
                className={`bg-blue-500  text-white font-bold py-2 px-4 rounded-full m-10 ${
                  door_open || door_loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
                disabled={door_open || door_loading}
                type="button"
                onClick={() => {
                  send_message('open_door')
                  setDoorLoading(true)
                  setDatatext_door('Ouverture de la porte')
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
                disabled={!door_open || door_loading}
                type="button"
                onClick={() => {
                  send_message('close_door')
                  setDoorLoading(true)
                  setDatatext_door('Fermeture de la porte')
                }}
              >
                Fermeture de la porte
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center justify-center columns-2">
            <div className="bg-amber-200 items-center p-auto rounded-lg">
              <MdGrain size={100} color="orange" className="m-auto p-2" />
              <div className="p-4 text-black text-center">
                {data_food ? (
                  <div>
                    <TiTickOutline
                      size={64}
                      color="green"
                      className="m-auto p-4"
                    />
                    Il y a assez de nourriture !
                  </div>
                ) : (
                  <div>
                    <ImWarning size={64} color="red" className="m-auto p-4" />
                    Il n&apos;y a pas assez de nourriture !
                  </div>
                )}
              </div>
            </div>
            <div className="bg-blue-200 items-center p-auto rounded-lg">
              <FaPrescriptionBottle
                size={100}
                color="blue"
                className="m-auto p-4"
              />
              <div className="p-4 text-black text-center">
                {data_water ? (
                  <div>
                    <TiTickOutline
                      size={64}
                      color="green"
                      className="m-auto p-4"
                    />
                    Il y a assez d&apos;eau !
                  </div>
                ) : (
                  <div>
                    <ImWarning size={64} color="red" className="m-auto p-4" />
                    Il n&apos;y a pas assez d&apos;eau !
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-yellow-200 rounded-lg grid grid-cols-2 gap-5 items-center justify-center columns-2">
            {data_PIR != 1 ? (
              <>
                <div className="text-black p-5 text-center">
                  Attente de détection de mouvement...
                </div>
                <div>
                  <Image
                    src={logoRenardDodo}
                    alt="Logo Renard Dodo"
                    width={200}
                    height={200}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-black p-5 text-center">
                  Animal détecté !!
                </div>
                <div>
                  <Image
                    src={logoRenard}
                    alt="Logo Renard"
                    width={200}
                    height={200}
                  />
                </div>
              </>
            )}
          </div>
          <div className="p-2">
            <div className="rounded-lg p-4 grid grid-cols-2 gap-5 items-center justify-center columns-2">
              <div className="text-black text-center text-xl	">
                <div>Vidéo en direct de</div>
                <div>l&apos;intérieur du poulailler</div>
              </div>
              <div className="bg-black rounded-3xl ">
                <img
                  src="http://10.117.128.92:8081"
                  className="p-4 h-124 w-124 m-auto border-2 rounded-3xl border-solid border-yellow-200	"
                  alt="camera"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
