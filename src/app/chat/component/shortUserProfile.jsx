import axios from "axios";
import { useState, useEffect } from "react";

export default function ShortUserProfile({ id }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios(`http://192.168.5.102:3001/users/${id}`)
            .then(res => {
                console.log(res.data)
                setUser(res.data.user)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className="flex-auto bg-lime-600 p-1">
            <h1 className="text-xl">You</h1>
            <p className="text-sm">{user.email}</p>
            <h2 className="text-xs">username: {user.username}</h2>
        </div>
    )
}