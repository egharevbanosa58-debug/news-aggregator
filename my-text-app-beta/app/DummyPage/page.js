import { FiLogOut } from "react-icons/fi";

export default function DummyPage(){
    return (
        <div className="flex flex-col gap-10 justify-center items-center h-screen dark:bg-blue-950">
            <FiLogOut className="text-red-600 dark:text-red-600 h-24 w-24 p-6 rounded-3xl bg-red-200"/>
            <p className="text-xl md:text-2xl text-red-600">You Logged out</p>

            <div className="flex gap-4">
                <a href="/login"><button className="hover:shadow-lg p-3 rounded-xl text-md md:text-lg text-red-600 border border-red-600 bg-transparent">Log Back in</button></a>
                <a href="/"><button className="hover:shadow-lg p-3 rounded-xl text-md md:text-lg text-white bg-red-600">Return To Home Page</button></a>
            </div>
        </div>
    )
}