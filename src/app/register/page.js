"use client"
// pages/register.js
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function RegisterPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState()
    const handleRegister = async (e) => {
        e.preventDefault()
        // Perform registration here (e.g., call your API)
        // Then navigate to the login page
        await axios(
            {
                url: 'http://192.168.5.102:3001/users/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username,
                    email,
                    password
                }
            }
        )
            .then((res) => {
                router.push('/login')
            })
            .catch((err) => {
                console.log(err.response.data)
                setError(err.response.data.message)
            })
            .finally(() => {

            })
    }

    const emptyError = () => {
        setError(null)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="font-medium text-rose-600">
                    {error && "Error:" + error}
                </p>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-sm">
                    <Link href="/login">
                        <p className="font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

