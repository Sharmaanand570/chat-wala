

export default function SentMessage({ message, date }) {
    console.log(message)
    console.log(date)
    return (
        <div className="bg-green-300 flex-1 border-50 m-10 justify-items-end rounded-md p-2.5 w-50">
            <h1 className="text-xl font-bold">{message}</h1>
            <p className="text-xs font-medium ">Sent on {(new Date(date)).toLocaleString()}</p>
        </div>
    )
}