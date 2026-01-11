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


// import Logo from "./components/Logo";

// export default function Home() {

//   return (
//     <>
//       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
//       <div className="m-20">
//         <Logo className="lg:scale-105 md:mb-20 lg:mb-40" />
//       </div>

//       <div className="m-auto text-center space-y-3">
//         <p className="text-3xl md:text-4xl lg:text-5xl font-medium items-center justify-center">Welcome to <span className="text-blue-600 font-semibold">News</span><span className="text-white bg-blue-600 p-2 text-3xl md:text-4xl lg:text-5xl font-semibold">Lite</span></p>
//         <p className="text-sm md:text-lg">Your go-to app for the latest news updates.</p>
//         <p className="text-blue-600 text-3xl font-bold m-20 md:text-4xl lg:text-5xl lg:mt-30">Let's get you started</p>
//       </div>

//       <div className="p-auto m-auto justify-center items-center ml-[27%] space-x-15">
//         <a href="/register"><button type="submit" className="w-[80%] lg:w-[30%] p-3 md:p-4 lg:p-5 lg:rounded-5xl items-center justify-center font-extralight text-blue-600 bg-transparent text-xl rounded-3xl border border-blue-600 mb-8">
//           Create Account
//         </button></a>

//         <a href="/login"><button type="submit" className="w-[80%] lg:w-[30%] p-3 md:p-4 lg:p-5 lg:rounded-5xl items-center justify-center text-xl text-white rounded-3xl bg-blue-600">
//           Log in
//         </button></a>
//       </div>

//       <footer className=" md:hidden w-full mt-30 bottom-0">
//         <p className="text-center text-blue-600 py-4">© 2024 News Aggregator. All rights reserved.</p>
//         <p className="text-center text-blue-600">Created by NOSA &trade;</p>
//       </footer>
//     </>
//   )
// }



import Logo from "./components/Logo";

export default function Home() {
  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Logo Section */}
      <div className="flex justify-center mt-20 mb-10">
        <Logo className="lg:scale-105 md:mb-20 lg:mb-40" />
      </div>

      {/* Welcome Text */}
      <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <p className="text-3xl md:text-4xl lg:text-5xl font-medium">
          Welcome to{" "}
          <span className="text-blue-600 font-semibold">News</span>
          <span className="text-white bg-blue-600 px-2 py-1 text-3xl md:text-4xl lg:text-5xl font-semibold rounded">
            Lite
          </span>
        </p>
        <p className="text-sm md:text-lg">
          Your go-to app for the latest news updates.
        </p>
        <p className="text-blue-600 text-3xl md:text-4xl lg:text-5xl font-bold mt-8">
          Let's get you started
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-10 px-4">
        {/* Create Account */}
        <a href="/register" className="w-full lg:w-1/3">
          <button className="w-full p-4 text-xl font-extralight text-blue-600 bg-transparent border border-blue-600 rounded-3xl hover:bg-blue-50 transition">
            Create Account
          </button>
        </a>

        {/* Log In */}
        <a href="/login" className="w-full lg:w-1/3">
          <button className="w-full p-4 text-xl text-white bg-blue-600 rounded-3xl hover:bg-blue-700 transition">
            Log in
          </button>
        </a>
      </div>

      {/* Footer */}
      <footer className="md:hidden w-full mt-20 text-center">
        <p className="text-blue-600 py-2">
          © 2024 News Aggregator. All rights reserved.
        </p>
        <p className="text-blue-600">Created by NOSA &trade;</p>
      </footer>
    </>
  );
}