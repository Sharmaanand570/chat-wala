"use client"
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios, { all } from 'axios'
import ShortUserProfile from './component/shortUserProfile'
import { socket } from '../page'
import SentMessage from './component/sentMessage'
import ReceivedMessage from './component/receivedMessage'

export default function ChatApp({ searchParams }) {
    const [users, setUsers] = useState([])
    const router = useRouter()

    const [selectedUser, setSelectedUser] = useState(users[0])
    const allReceivedMessage = useRef([])
    const [allMessage, setAllMessage] = useState([])
    const [message, setMessage] = useState('')

    const handleSendMessage = (e) => {
        e.preventDefault()
        // Send the message here (e.g., call your API)
        if (message) {
            socket.emit('send_message', {
                from: searchParams.user_id,
                to: selectedUser._id,
                message: message,
                date: new Date()
            })
            console.log("message sent")
            allReceivedMessage.current = [
                ...allReceivedMessage.current,
                {
                    from: searchParams.user_id,
                    to: selectedUser._id,
                    message: message,
                    date: new Date(),
                    type: 'sent'
                }]
            setAllMessage(allReceivedMessage.current)
        }
    }

    function handleLogout() {
        // localStorage.removeItem('token')
        router.push('/login')
    }

    useEffect(() => {
        // Fetch users from your API here
        axios({
            url: 'http://192.168.5.102:3001/users',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res)
                setUsers(res.data.users)
                setSelectedUser(res.data.users[0])
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const selectUser = (user) => {
        setSelectedUser(user)
    }

    useEffect(() => {
        socket.on('received_message', (data) => {
            allReceivedMessage.current = [
                ...allReceivedMessage.current,
                {
                    ...data,
                    type: 'received'
                }]
            setAllMessage(allReceivedMessage.current)
            console.log(data)
        })
    }, [socket])

    useEffect(() => {
        socket.emit("join_room", searchParams.user_id)
    }, [searchParams])

    return (
        <div className="flex h-screen">
            {/* User list */}
            <div className="w-64 flex flex-col justify-between h-screen bg-blue-500 overflow-auto">
                <div>
                    <h1 className="text-xl font-bold p-4">Chats</h1>
                    <ul>
                        {users && users.length > 0 && users.map(user => {
                            if (user._id !== searchParams.user_id) {
                                return (
                                    <li key={user._id} className="border-b border-gray-200">
                                        <button onClick={() => selectUser(user)} className="block w-full text-left p-4 hover:bg-blue-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                                <div className="font-medium">{user.username}</div>
                                            </div>
                                        </button>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className="bottom-0">
                    <ShortUserProfile id={searchParams.user_id} />
                    <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded">
                        <img src='/icons/log-out.svg' className="text-red-500" alt="log-out" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Chat page */}
            <div className="flex-1 flex flex-col bg-blue-100 overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 bg-blue-400">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="font-medium text-black">{selectedUser && selectedUser.username}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {allMessage && allMessage.length > 0 && allMessage.map(message => {
                            if (message.from === searchParams.user_id && message.to === selectedUser._id) {
                                return <SentMessage key={message._id} message={message.message} date={message.date} />
                            }
                            else if (message.from === selectedUser._id && message.to === searchParams.user_id) {
                                return <ReceivedMessage key={message._id} message={message.message} date={message.date} />
                            }
                        })}
                    </div>
                </div>
                <div className="border border-gray-200 m-5">
                    <form className="flex" onSubmit={handleSendMessage}>
                        <input type="text" className="flex-1 text-black block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
