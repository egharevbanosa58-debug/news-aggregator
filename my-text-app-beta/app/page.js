"use client"

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.js file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-39.5"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useRouter } from "next/navigation";
import Logo from "./components/Logo";
import { Router } from "next/router";

export default function Home() {

  const handleSubmit = (route) => {
    const router = useRouter();
    router.push(route)
  }
  return (
    <>
      <div className="m-20">
        <Logo className="lg:scale-105 md:mb-20 lg:mb-40" />
      </div>

      <div className="m-auto text-center space-y-3">
        <p className="text-3xl md:text-4xl lg:text-5xl font-medium items-center justify-center">Welcome to <span className="text-blue-600 font-semibold">News</span><span className="text-white bg-blue-600 p-2 text-3xl md:text-4xl lg:text-5xl font-semibold">Lite</span></p>
        <p className="text-sm md:text-lg">Your go-to app for the latest news updates.</p>
        <p className="text-blue-600 text-3xl font-bold m-20 md:text-4xl lg:text-5xl lg:mt-30">Let's get you started</p>
      </div>

      <div className="p-auto m-auto justify-center items-center ml-[27%] space-x-15">
        <button type="submit" onClick={() => handleSubmit('/register')} className="w-[80%] lg:w-[30%] p-3 md:p-4 lg:p-5 lg:rounded-5xl items-center justify-center font-extralight text-blue-600 bg-transparent text-xl rounded-3xl border border-blue-600 mb-8">
          Create Account
        </button>

        <button type="submit" onClick={() => handleSubmit('/login')} className="w-[80%] lg:w-[30%] p-3 md:p-4 lg:p-5 lg:rounded-5xl items-center justify-center text-xl text-white rounded-3xl bg-blue-600">
          Log in
        </button>
      </div>

      <footer className=" md:hidden w-full mt-30 bottom-0">
        <p className="text-center text-blue-600 py-4">© 2024 News Aggregator. All rights reserved.</p>
        <p className="text-center text-blue-600">Created by NOSA &trade;</p>
      </footer>
    </>
  )
}
