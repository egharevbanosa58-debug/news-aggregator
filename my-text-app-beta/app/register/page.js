"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
//Icons importation
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import Inputs from '../components/Inputs';
import Logo from '../components/Logo';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
                setLoading(false);
                return;
            }

            setSuccess(true);
            setLoading(false);
            await new Promise((r) => setTimeout(r, 700));
            router.push("/login");
        } catch (err) {
            setError("Something went wrong");
            setLoading(false);
        }
    }


    return (
        <div className='-mt-5 h-100vdh lg:h-294 overflow-hidden pt-20 pb-5 lg:pb-20 lg:pt-40'>

            <Logo />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded-2xl shadow h-180 lg:h-200 space-y-10 w-90 m-auto md:w-150 items-center bg-white pt-18 lg:pt-32"
            >
                <h1 className="font-bold text-4xl">Sign Up</h1>
                <p>Let's get you registered...</p>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm flex items-center gap-2"><FiCheck /> Registration successful!</p>}

                <span className='relative'>
                    <Inputs
                        type='text'
                        name='name'
                        placeholder='Username' />

                    <FiUser className='absolute text-2xl text-gray-400 bottom-5 left-2' />
                </span>

                <span className='relative'>
                    <Inputs
                        type='email'
                        name='email'
                        placeholder='Email' />

                    <FiMail className='absolute text-2xl text-gray-400 bottom-5 left-2' />
                </span>

                <span className='relative'>
                    <Inputs
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                    />

                    <FiLock className='absolute text-2xl text-gray-400 bottom-5 left-2' />

                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-10 bottom-5 text-gray-400 text-2xl hover:text-gray-600'
                        aria-label='Toggle password visibility'
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </span>

                <button type="submit" className="w-70 lg:w-90 hover:cursor-pointer hover:bg-blue-600 bg-blue-500 text-white font-bold text-2xl p-3 rounded-2xl" >Register</button>

                <p>Already have an account? {""}<a href="/login" className="text-blue-600 underline">Login</a></p>
            </form>
        </div>
    )
}