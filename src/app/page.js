"use client"
import { useEffect, useState, useRef } from "react"
import io from "socket.io-client"

const socket = io.connect("http://192.168.5.102:3001")
socket.on("connect", () => {
  console.log("connected")
})
socket.on("disconnect", () => {
  console.log("disconnected")
})

export { socket }

function SendedMessage({ data }) {
  return (
    <div className="w-full  bg-red-500 p-1">
      <p className="text-right text-white">{data.message}</p>
      <p className="text-right text-white">{`${data.on}`}</p>
    </div>
  )
}

function ReceivedMessage({ data }) {
  return (
    <div className="w-full bg-green-500 p-1">
      <p className="text-left text-white">{data.message}</p>
      <p className="text-left text-white">{`${data.on}`}</p>
    </div>
  )
}

export default function Home() {
  const [sendMessage, setSendMessage] = useState([])
  const [room, setRoom] = useState()
  const [isRoomJoin, setIsRoomJoin] = useState(false)

  let allMessage = useRef([])
  const [isMessageArived, setIsMessageArrived] = useState([])
  function onSendMessage() {
    socket.emit("send_message", {
      message: sendMessage,
      on: new Date(),
      room: room
    })
    allMessage.current = [{
      message: sendMessage,
      on: new Date(),
      room: room,
      status: "sent"
    }, ...allMessage.current]
    setIsMessageArrived(allMessage.current)
    setSendMessage("")
  }

  function onJoinRooom() {
    if (room !== "") {
      socket.emit("join_room", room)
      setIsRoomJoin(true)
    }
  }

  function outFromRoom() {
    socket.emit("out_from_room", room)
    setIsRoomJoin(false)
    setRoom()
    allMessage.current = []
    setIsMessageArrived([])
  }

  useEffect(() => {
    socket.on("received_message", (data) => {
      allMessage.current = [{ ...data, status: "received" }, ...allMessage.current]
      setIsMessageArrived(allMessage.current)
    })
  }, [socket])

  return (
    <main className="w-full h-screen flex-col items-center justify-between">
      <div className="h-1/6">
        {isRoomJoin ? <div className="bg-blue-400 flex flex-row justify-center items-center w-full p-5">
          <span className="text-2xl text-center text-white font-bold">Room {room} </span>
          <button onClick={outFromRoom} type="submit" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Out from Room</button>
        </div> : <div className="flex flex-row w-full p-5">
          <input value={room} onChange={(event) => { setRoom(event.target.value) }} type="text" id="text" className="grid w-11/12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Join Room" required />
          <button onClick={onJoinRooom} type="submit" className="text-white w-1/12 mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
        </div>}
      </div>
      <div className="h-4/6 flex flex-col-reverse overflow-auto mb-4 border">
        {isMessageArived.map((data, index) => {
          if (data && data.status && data.status === "sent") {
            return <SendedMessage key={index} data={data} />
          }
          if (data && data.status && data.status === "received") {
            return <ReceivedMessage key={index} data={data} />
          }
        })}
      </div>
      <div className="h-1/6">
        <div className="flex flex-row w-full p-5">
          <input value={sendMessage} onChange={(event) => setSendMessage(event.target.value)} type="text" id="text" className="grid w-11/12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message" required />
          <button onClick={onSendMessage} type="submit" className="text-white w-1/12 mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
        </div>
      </div>
    </main>
  )
}
