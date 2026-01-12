import { FiLogOut } from "react-icons/fi";

export default function DummyPage(){
    return (
        <div className="flex flex-col justify-center items-center">
            <FiLogOut className="text-red-600 dark:text-red-600 scale-110 p-4 rounded-xl bg-red-200"/>
            <p className="text-xl">You Logged out</p>
        </div>
    )
}