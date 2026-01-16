"use client"

import { useSession } from "next-auth/react"
import Logo from "../components/Logo";
import { FiUser, FiMenu, FiLogOut, FiSun, FiFlag, FiCpu, FiCoffee, FiChevronDown, FiChevronUp, FiSearch, FiExternalLink, FiFilter } from "react-icons/fi";
import { FaBowlingBall, FaFire, FaFlask, FaListUl, FaSpinner } from "react-icons/fa";
import { MdHealthAndSafety, MdLocalMovies, MdSignalWifiOff } from "react-icons/md";
import NewsCard from "../components/NewsCards";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import ThemeToggle from "../components/ThemeToggle";
import { useRouter } from "next/navigation";


const CATEGORIES = [
    { name: "Trending", id: "general", icon: FaFire, color: "text-orange-400" },
    { name: "Entertainment", id: "entertainment", icon: MdLocalMovies, color: "text-red-600" },
    { name: "Science", id: "science", icon: FaFlask, color: "text-violet-500" },
    { name: "Technology", id: "technology", icon: FiCpu, color: "text-sky-500" },
    { name: "Business", id: "business", icon: FiCoffee, color: "text-amber-700" },
    { name: "Sports", id: "sports", icon: FaBowlingBall, color: "text-black" },
]

export default function Dashboard() {
    const { data: session, status } = useSession();

    const router = useRouter();
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //For the search results
    const [open, setOpen] = useState(false);
    const resultsRef = useRef(null);
    const [searchLoading, setSearchLoading] = useState(false);

    // Filter by source
    const [selectedSource, setSelectedSource] = useState('all');
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef(null);

    //States for more results in Nigeria
    const [moreResults, setMoreResults] = useState([]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (resultsRef.current && !resultsRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])
    //End of the click outside function for search results

    // Close filter dropdown when clicking outside
    useEffect(() => {
        function handleFilterClickOutside(e) {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        }
        document.addEventListener('mousedown', handleFilterClickOutside);
        return () => document.removeEventListener('mousedown', handleFilterClickOutside);
    }, []);

    // default to the first menu id
    const [selectedCategory, setSelectedCategory] = useState("general");


    //A callback memorization for the search functionality
    const fetchSearchRes = useCallback(async (searchQuery) => {
        const q = searchQuery || query;
        if (!q) {
            // setFeed([]);
            return;
        }
        setSearchLoading(true);

        try {
            console.log("Searching for: ", q); //Debug log
            const res = await fetch(`/api/news/search?q=${encodeURIComponent(q)}&searchIn=title&language=en`);
            const data1 = await res.json();
            console.log("Response: ", data1); //Debug log
            setSearchResults(data1.articles || []);
            // if (searchResults === null || []) return console.log(`No results found for '${q}'`)

        } catch (err) {
            console.error("Search Fetch Error: ", err.message);
            setError("Failed to fetch Search results. Error: ", err.message);
            // setError(NextResponse.json({message : "Failed to fetch Search results"}, {status : 500}));
            setSearchResults([]);
        } finally {
            setSearchLoading(false)
        }

    }, [query]);

    //UseEffect to fetch news based on search query
    useEffect(() => {
        fetchSearchRes(query);
    }, [fetchSearchRes]);


    //General news fetcher
    useEffect(() => {
        if (status !== "authenticated") return;

        async function fetchNews() {
            setLoading(true);
            try {
                // Map UI category to API params
                let apiCategory = selectedCategory;

                // let countryQuery = ""; I am working with a different API and the country param is in /api/news route
                if (selectedCategory === 'general') apiCategory = 'general';
                // if (selectedCategory === 'country') { apiCategory = 'general'; countryQuery = '&country=ng'; }

                const res = await fetch(`/api/news?&category=${apiCategory}`);
                if (!res.ok) throw new Error(`API error ${res.status}`);
                const data = await res.json();


                console.log(data)  //Temporary log for debugging


                // setFeed(data.results || []);
                setFeed(data.articles || []);

            } catch (err) {
                console.error('News fetch error:', err);
                setFeed([]);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [status, selectedCategory]);


    //useEffect for Health more results
    useEffect(() => {
        if (status !== "authenticated") return; // Ensure user is authenticated

        async function fetchMoreResults() {
            setLoading(true);
            try {
                const res = await fetch('/api/news/more-results', { credentials: 'include' });
                if (!res.ok) throw new Error(`API status ${res.status}`)
                const data = await res.json();
                console.log("More results data: ", data); //Debug log
                setMoreResults(data.articles || []);
                // Optionally merge into main feed if desired
                // setFeed((prevFeed) => [...prevFeed, ...(data.articles || [])]);
            } catch (err) {
                console.error('More results fetch error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchMoreResults();
    }, [status]);


    const uniqueSources = [...new Set(feed.map(a => a.source && a.source.name).filter(Boolean))];
    const filteredFeed = selectedSource === 'all' ? feed : feed.filter(a => a.source && a.source.name === selectedSource);

    if (status === 'loading') return <img src="/Dual-ball-loading.gif" alt="loading-animation" className="flex items-center justify-center bg-transparent z-999" />;
    if (status === 'unauthenticated') return (
        <div className="justify-center items-center flex flex-col gap-20 min-h-screen text-black dark:text-white">
            <MdSignalWifiOff className="w-20 h-20 text-blue-600 mx-auto mt-40" />
            <span className="ml-10">
                <h1 className="text-3xl dark:text-white">Oops Something wen't wrong</h1>
                <br />
                <p className="text-start dark:text-white ml-10">try:</p>
                <ul className="dark:text-white">
                    <li>- <a href="/login" className="text-blue-600 underline">Logging in again</a></li>
                    <li>- Reloading the page</li>
                    <li>- Checking your internet connection</li>
                    <li>- Clearing your browser cache</li>
                </ul>
            </span>
            {/* Opps something went wrong */}
        </div>
    );


    return (
        <main className="min-h-screen flex flex-col items-center px-2 text-black dark:text-white">
            {loading && (<div className="fixed inset-0 bg-black/30 z-50"/>)}
            <div className="items-center nav-banner dark:bg-blue-950/80 border-b-stone-200 w-full">
                <div className="flex justify-between items-center w-full px-4 py-3">
                    {/* App LOGO */}
                    <Logo className="scale-65 lg:scale-90 xl:scale-100 flex ml-auto hover:shadow -translate-x-10 md:translate-x-0" />

                    <div className="flex justify-between gap-3 -mt-5 lg:mt-10 lg:mb-7 ml-auto mr-5">

                        {/* The large screen nav bar goes here */}
                        <nav className="hidden lg:flex gap-3 items-center text-lg text-stone-500 md:mr-12 lg:mr-20 justify-between md:text-sm">

                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`nav-btn dark:text-white ${selectedCategory === cat.id ? 'bg-blue-100 font-semibold dark:bg-blue-900/90' : ''}`}>
                                    {cat.icon && <cat.icon className={cat.color} />}
                                    {cat.name}
                                </button>
                            ))}

                            <div className="profile hidden lg:flex ml-auto z-999 gap-3">
                                <FiUser className="w-9 h-9 lg:w-10 lg:h-10 lg:rounded-xl lg:ml-auto p-2 hover:cursor-pointer relative fi-user border border-blue-300 rounded-xl text-blue-600 dark:border-white dark:text-white" />

                                <div className="shadow rounded-xl bg-white dark:bg-blue-900 prof p-1.5 translate-y-12">
                                    <div className="w-full">
                                        <button className="prof-btn relative flex items-center py-3 px-4 pr-6 gap-2"><FiUser className="p-2 size-10 border border-blue-600 dark:border-white rounded-3xl text-blue-600 dark:text-white" />
                                            <span className="flex flex-col text-start">
                                                <h1 className="dark:text-white font-semibold">{session.user.name}</h1>
                                                <h2 className="dark:text-white text-sm">{session.user.email}</h2>
                                            </span>
                                            <FiChevronDown className='absolute right-0 top-1/2 translate-y-[calc(-50%+4px)] text-sm dark:text-white' />
                                            <FiChevronUp className='absolute right-0 top-1/2 translate-y-[calc(-50%-4px)] text-sm dark:text-white' />
                                        </button>
                                    </div>
                                </div>

                                
                            </div>
                            <button onClick={async () => {await signOut({redirect : false}); router.push("/dummyPage")}}><FiLogOut className="w-9 h-9 lg:w-10 lg:h-10 lg:rounded-xl lg:ml-auto p-2 hover:cursor-pointer relative rounded-xl text-red-600 dark:text-red-600 hover:bg-red-200" /></button>
                        </nav>
                        <div className="flex ml-auto items-center gap-4">
                            <div className="profile lg:hidden">
                                <FiUser className="w-9 h-9 lg:w-10 lg:h-10 lg:rounded-xl lg:mr-auto lg:-translate-x-10 p-2 hover:cursor-pointer relative fi-user border border-blue-300 dark:border-white rounded-xl text-blue-600 dark:text-white" />

                                <div className="z-9999 shadow rounded-xl bg-white dark:bg-blue-900 prof p-1.5">
                                    <div className="w-full">
                                        <button className="prof-btn relative flex items-center py-3 px-4 pr-6 gap-2"><FiUser className="p-2 size-10 border border-blue-600 dark:border-white rounded-3xl text-blue-600 dark:text-white" />
                                            <span className="flex flex-col text-start">
                                                <h1 className="dark:text-white font-semibold">{session.user.name}</h1>
                                                <h2 className="dark:text-white text-sm">{session.user.email}</h2>
                                            </span>
                                            <FiChevronDown className='absolute right-0 top-1/2 translate-y-[calc(-50%+4px)] text-sm dark:text-white' />
                                            <FiChevronUp className='absolute right-0 top-1/2 translate-y-[calc(-50%-4px)] text-sm dark:text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="cont flex ml-auto lg:hidden z-999">
                                <FiMenu className="w-10 h-10 p-2 text-blue-600 dark:text-white hover:cursor-pointer relative fi-menu" />

                                <div className="shadow-lg rounded-xl bg-white dark:bg-blue-900 nav p-2">
                                    <div className="flex flex-col w-60">
                                        {/* <button className="nav-btn"><FaFire className="text-orange-400" />Trending</button>
                                    <button className="nav-btn"><FiFlag className="text-green-600" />Nigeria</button>
                                    <button className="nav-btn"><FaFlask className="text-violet-500" />Science</button>
                                    <button className="nav-btn"><FiCpu className="text-sky-500" />Technology</button>
                                    <button className="nav-btn"><FiCoffee className="text-amber-700" />Food</button> */}

                                        {/* Using states for the above buttons */}
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`nav-btn dark:text-white ${selectedCategory === cat.id ? 'bg-blue-100 dark:bg-blue-950 font-semibold dark:text-white' : ''}`}>
                                                {cat.icon && <cat.icon className={cat.color} />}
                                                {cat.name}
                                            </button>
                                        ))}


                                        <div className="line"></div>
                                        <button className="nav-btn dark:text-white"><FiUser />Profile -  {session.user.email}</button>
                                        {/* <ThemeToggle /> */}
                                        <button className="nav-btn text-red-600 dark:text-white dark:bg-red-900" onClick={async () => {await signOut({redirect : false});router.push("/dummyPage")} }><FiLogOut className="text-red-600 dark:text-white" />Logout </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




                {/* The search bar goes here */}
                <div className="input-field flex justify-center items-center pb-3">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search keyword..."
                        onFocus={() => setOpen(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                fetchSearchRes();
                            }
                        }}
                        className="h-10 w-[90%] md:w-[50%] lg:w-[20%] pl-10 pr-4 mb-5 rounded-3xl text-blue-600 dark:text-white border relative border-blue-600 dark:border-white duration-500 focus:outline-none ml-25 lg:ml-100 lg:h-13 transition-transform focus:w-70 focus:shadow-md md:focus:w-100 lg:focus:w-130" />
                    {/* <div className="pointer-events-none pl-3 items-center absolute inset-y-0 left-45 search-icon">
                        <FiSearch className="text-blue-600 text-xl p-2 w-8 h-8 border-r" />
                    </div> */}
                    {searchLoading && <FaSpinner className="transition-all animate-spin text-blue-600 dark:text-white absolute right-370 bottom-9" />}


                    {/* {error && <p className="text-red-600">Error : {error} by NOsa</p>} */}
                    {searchResults && Array.isArray(searchResults) && open && (
                        <ul ref={resultsRef} className=" transform translate-y-55 absolute p-4 z-999 flex flex-col gap-3 bg-white dark:bg-neutral-800 shadow-lg rounded-2xl search-results max-h-100 overflow-y-auto border border-blue-100 mx-4">
                            {searchResults?.map((article, index) => {
                                if (!article || !article.title) return null;
                                // if (!searchResults) return console.log(`No results found for ${query}`);
                                return (
                                    <li key={index} className="px-1 py-2 justify-between rounded-xl flex gap-3 items-center hover:bg-gray-200 cursor-pointer text-md font-medium border-b border-blue-200 hover:shadow"><FaListUl className="text-blue-600" /><a href={article.url} target="_self">{typeof article.title === "string" && article.title.length > 30 ? article.title.slice(0, 40) + "..." : article.title}</a><span className="text-sm text-stone-400 ml-auto">source: {article.source?.name || "Unknown"}</span><FiExternalLink className="ml-auto text-blue-400" /></li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>




            <div className="translate-y-6 grid grid-cols-1 md:grid-cols-2 gap-3 pt-30 overflow-hidden lg:px-64 pb-64">
                <div className="p-4 col-span-1 md:col-span-2" ref={filterRef}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setFilterOpen((s) => !s)}>
                            <FiFilter className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-2 bg-white dark:bg-blue-950 hover:bg-blue-100 text-blue-600 rounded-xl border" />
                        </button>
                        <span className="text-md text-blue-500 px-3">{selectedSource === 'all' ? 'All' : selectedSource}</span>
                    </div>

                    {filterOpen && (
                        <div className="mt-3 bg-white dark:bg-neutral-900 rounded-xl shadow p-4 w-64 border border-blue-100">
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="source" checked={selectedSource === 'all'} onChange={() => setSelectedSource('all')} />
                                    <span className="text-sm">All sources</span>
                                </label>
                                {uniqueSources.map((src) => (
                                    <label key={src} className="flex items-center gap-2">
                                        <input type="radio" name="source" checked={selectedSource === src} onChange={() => setSelectedSource(src)} />
                                        <span className="text-sm">{src}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-3 flex gap-2 justify-end">
                                <button onClick={() => { setSelectedSource('all'); setFilterOpen(false); }} className="text-sm text-blue-600 p-2">Reset</button>
                                <button onClick={() => setFilterOpen(false)} className="text-sm bg-red-100 text-red-600 border rounded-xl px-2 py-1">Close</button>
                            </div>
                        </div>
                    )}
                </div>





                <h1 className="category-heading mt-2 text-xl md:text-2xl lg:text-4xl lg:text-start md:col-span-2 font-semibold ml-4">{selectedCategory === 'general' ? 'General' : selectedCategory === 'technology' ? 'Technology' : selectedCategory === 'science' ? 'Science' : selectedCategory === 'business' ? 'Business' : selectedCategory === 'entertainment' ? 'Entertainment' : selectedCategory === 'sports' ? 'Sports' : ''}</h1>
                {/* Content */}
                {loading ? (
                    <div className="feeds col-span-2 flex justify-center items-center w-full mx-3">
                        <img src="/Dual-ball-loading.gif" alt="loading" className="mx-auto my-10" />
                    </div>
                ) : (
                    filteredFeed && filteredFeed.length > 0 ? filteredFeed.map((article, index) => {
                        if (!article) return null;
                        return (
                            <a key={index} href={article.url}><NewsCard article={article} /></a>
                        );
                    }) : <p className="col-span-2 text-center text-gray-500">No articles found</p>
                )}
            </div>

            <div className="flex flex-col w-full">
                <h2 className="text-xl md:text-2xl font-semibold inline-flex items-center"><MdHealthAndSafety className="text-red-600 dark:text-red-600" />Health Updates in The United States?</h2>
                {moreResults && Array.isArray(moreResults) && moreResults.length > 0 && (
                    <div className="slider-container flex h-fit px-4">
                        {moreResults.map((article, index) => {
                            if (!article) return null;
                            return (
                                <a className="cards" key={index} href={article.url}>
                                    <NewsCard article={article} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>




            <footer className="mt-auto py-2 text-center text-blue-600 tracking-tight">
                <p className="text-center text-blue-600 py-4">© 2024 News Aggregator. All rights reserved.</p>
                <p className="text-center text-blue-600">Created by NOSA &trade;</p>
            </footer>
        </main>
    );
}