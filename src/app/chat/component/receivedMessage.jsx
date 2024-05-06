export default function ReceivedMessage({ message, date }) {
    console.log(message)
    console.log(date)
    return (
        <div className="bg-red-300 border-50 m-10 rounded-md p-2.5 w-50">
            <h1 className="text-xl font-bold">{message}</h1>
            <p className="text-xs font-medium">Received on {(new Date(date)).toLocaleString()}</p>
        </div>
    )
}