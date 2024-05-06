"use client"
import { useState } from 'react'

export default function ProfilePage() {
    const [name, setName] = useState('John Doe')
    const [email, setEmail] = useState('john.doe@example.com')
    const [bio, setBio] = useState('Software Developer')

    const handleUpdate = (e) => {
        e.preventDefault()
        // Perform update here (e.g., call your API)
        alert('Profile updated')
    }

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleUpdate}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Bio:
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    )
}
