'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-blur bg-center" style={{ backgroundImage: "url('/14547803_rm222batch3-mind-03.svg')" }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center space-y-6 bg-white bg-opacity-50 p-10 rounded-lg"
            >
                <motion.h1
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl text-black font-bold"
                >
                    Welcome to Our Chat Application
                </motion.h1>
                <motion.p
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    class="text-xl text-gray-500 "
                >
                    This is a platform where you can connect and chat with people from all around the world. You can share ideas, make friends, and learn new things. Let's start the journey!
                </motion.p>
                <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg text-gray-500"
                >
                    Our application offers real-time messaging, group chats, and fun emojis to express yourself. You can also share files, images, and videos with your friends. We value your privacy and security, so your messages are encrypted and only visible to you and the people you're chatting with.
                </motion.div>
                <Link href="/user/login">
                    <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Get Started
                    </motion.p>
                </Link>
            </motion.div>
        </div>
    )
}
