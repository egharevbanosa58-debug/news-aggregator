"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

//Icons importation
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import Inputs from '../components/Inputs';
import Logo from '../components/Logo';


export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (res?.error) {
            console.log(res.error);
            setError(res.error);
            setLoading(false);
            return;
        }

        // success: show animation then redirect
        setSuccess(true);
        setLoading(false);
        await new Promise((r) => setTimeout(r, 700));
        router.replace('/dashboard');
    }


    return (
        <div className='min-h-screen overflow-hidden pt-16 lg:pb-16 lg:pt-20 flex flex-col items-center px-6 gap-6 text-black'>

            <Logo />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded-2xl shadow h-fit lg:py-24 px-6 md:px-20 items-center bg-white py-20 gap-6 dark:bg-blue-950 dark:border dark:border-blue-600">
                <h1 className="font-bold text-4xl dark:text-white">Welcome Back!</h1>
                <h2 className="font-semibold text-3xl dark:text-white">Login</h2>

                <span className='relative'>
                    <Inputs
                        type='email'
                        name='email'
                        placeholder='Email' />

                    <FiMail className='absolute text-2xl text-gray-400 dark:text-white bottom-5 left-2.5' />
                </span>

                <span className='relative'>
                    <Inputs
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                        disabled={loading || success}
                    />

                    <FiLock className='absolute text-2xl text-gray-400 dark:text-white bottom-5 left-2.5' />

                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-6 bottom-5 text-gray-400 dark:text-white text-2xl hover:text-gray-600'
                        aria-label='Toggle password visibility'
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </span>

                <button
                    type='submit'
                    disabled={loading || success}
                    className={`w-70 md:w-90 hover:cursor-pointer ${success ? 'bg-green-500' : 'hover:bg-blue-600 bg-blue-500'} hover:shadow-gray-300 dark:hover:shadow-gray-900 hover:shadow-lg text-white font-bold text-lg p-3 rounded-2xl flex items-center justify-center gap-3`}
                >
                    {loading && (
                        <span className='inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    )}
                    {success ? (
                        <>
                            <FiCheck className='text-white text-2xl' />
                            <span>Success</span>
                        </>
                    ) : (
                        <span>Login</span>
                    )}
                </button>
                {error && <p className='text-red-600'>{error}</p>}

                <p className="dark:text-white">Don't have an account?{""} <a href="/register" className='text-blue-600 underline'>Create account</a></p>
            </form>
        </div>
    )
};