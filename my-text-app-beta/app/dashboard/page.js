"use client"

import { useSession } from "next-auth/react"
import Logo from "../components/Logo";
import { FiUser, FiMenu, FiLogOut, FiSun, FiFlag, FiCpu, FiCoffee, FiChevronDown, FiChevronUp, FiSearch, FiExternalLink, FiFilter } from "react-icons/fi";
import { FaBowlingBall, FaFire, FaFlask, FaListUl, FaSpinner } from "react-icons/fa";
import { MdLocalMovies, MdSignalWifiOff } from "react-icons/md";
import NewsCard from "../components/NewsCards";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";


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


    //useEffect for Nigeria more results
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
        <div className="justify-center items-center flex flex-col gap-20 min-h-screen">
            <MdSignalWifiOff className="w-20 h-20 text-blue-600 mx-auto mt-40" />
            <span>
                <h1 className="text-3xl">Oops Something wen't wrong</h1>
                <br/>
                <p className="text-start ">try:</p>
                <ul>
                    <li>- <a href="/login" className="text-blue-600 underline">Logging in again</a></li>
                    <li>- Checking your internet connection</li>
                    <li>- Clearing your browser cache</li>
                </ul>
            </span>
            {/* Opps something went wrong */}
        </div>
    );
    return (
        <main className={`${loading ? 'bg-stone/60' : ''} min-h-screen flex flex-col items-center px-2`}>
            <div className=" bg-white items-center nav-banner w-full">
                <div className="flex justify-between items-center w-full px-4 py-3">
                    {/* App LOGO */}
                    <Logo className="scale-80 lg:scale-90 xl:scale-100 pt-5 flex mr-auto" />

                    <div className="flex justify-between gap-3 -mt-5 lg:mt-10 lg:mb-7 ml-auto mr-5">

                        {/* The large screen nav bar goes here */}
                        <nav className="hidden lg:flex gap-3 items-center text-lg text-stone-500 md:mr-12 lg:mr-20 justify-between md:text-sm">

                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`nav-btn ${selectedCategory === cat.id ? 'bg-blue-100 font-semibold' : ''}`}>
                                    {cat.icon && <cat.icon className={cat.color} />}
                                    {cat.name}
                                </button>
                            ))}

                            <div className="profile hidden lg:flex ml-auto z-999">
                                <FiUser className="w-9 h-9 lg:w-10 lg:h-10 lg:rounded-xl lg:ml-auto p-2 hover:cursor-pointer relative fi-user border border-blue-300 rounded-xl text-blue-600" />

                                <div className="shadow rounded-xl bg-white prof p-1.5 translate-y-12">
                                    <div className="w-full">
                                        <button className="prof-btn relative flex items-center py-3 px-4 pr-6 gap-2"><FiUser className="p-2 size-10 border border-blue-600 rounded-3xl text-blue-600" />
                                            <span className="flex flex-col text-start">
                                                <h1 className="font-semibold">{session.user.name}</h1>
                                                <h2 className="text-sm">{session.user.email}</h2>
                                            </span>
                                            <FiChevronDown className='absolute right-0 top-1/2 translate-y-[calc(-50%+4px)] text-sm' />
                                            <FiChevronUp className='absolute right-0 top-1/2 translate-y-[calc(-50%-4px)] text-sm' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className="flex ml-auto items-center gap-4">
                            <div className="profile lg:hidden">
                                <FiUser className="w-9 h-9 lg:w-10 lg:h-10 lg:rounded-xl lg:mr-auto lg:-translate-x-10 p-2 hover:cursor-pointer relative fi-user border border-blue-300 rounded-xl text-blue-600" />

                                <div className="shadow rounded-xl bg-white prof p-1.5">
                                    <div className="w-full">
                                        <button className="prof-btn relative flex items-center py-3 px-4 pr-6 gap-2"><FiUser className="p-2 size-10 border border-blue-600 rounded-3xl text-blue-600" />
                                            <span className="flex flex-col text-start">
                                                <h1 className="font-semibold">{session.user.name}</h1>
                                                <h2 className="text-sm">{session.user.email}</h2>
                                            </span>
                                            <FiChevronDown className='absolute right-0 top-1/2 translate-y-[calc(-50%+4px)] text-sm' />
                                            <FiChevronUp className='absolute right-0 top-1/2 translate-y-[calc(-50%-4px)] text-sm' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="cont flex ml-auto lg:hidden z-999">
                                <FiMenu className="w-10 h-10 p-2 text-blue-600 hover:cursor-pointer relative fi-menu" />

                                <div className="shadow-lg rounded-xl bg-white nav p-2">
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
                                                className={`nav-btn ${selectedCategory === cat.id ? 'bg-blue-100 font-semibold' : ''}`}>
                                                {cat.icon && <cat.icon className={cat.color} />}
                                                {cat.name}
                                            </button>
                                        ))}


                                        <div className="line"></div>
                                        <button className="nav-btn"><FiUser />Profile</button>
                                        <button className="nav-btn"><FiSun />Theme</button>
                                        <button className="nav-btn text-red-600" onClick={() => signOut({ callbackUrl: "/DummyPage" })}><FiLogOut className="text-red-600" />Logout </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




                {/* The search bar goes here */}
                <div className="input-field flex justify-center items-center">
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
                        className="h-10 w-50 md:w-80 pl-10 pr-4 mb-5 rounded-3xl text-blue-600 border relative border-blue-600 focus:outline-none ml-25 lg:ml-100 lg:h-13 transition-all focus:w-70 focus:shadow-md md:focus:w-100" />
                    {/* <div className="pointer-events-none pl-3 items-center absolute inset-y-0 left-45 search-icon">
                        <FiSearch className="text-blue-600 text-xl p-2 w-8 h-8 border-r" />
                    </div> */}
                    {searchLoading && <FaSpinner className="transition-all animate-spin text-blue-600 absolute right-370 bottom-9" />}


                    {/* {error && <p className="text-red-600">Error : {error} by NOsa</p>} */}
                    {searchResults.length > 0 && open && (
                        <ul ref={resultsRef} className=" transform translate-y-55 absolute p-4 z-999 flex flex-col gap-3 bg-white shadow-lg rounded-2xl search-results max-h-100 overflow-y-auto border border-blue-100 mx-4">
                            {searchResults.map((article, index) => (
                                <li key={index} className="px-1 py-2 justify-between rounded-xl flex gap-3 items-center hover:bg-gray-200 cursor-pointer text-md font-medium border-b border-blue-200 hover:shadow"><FaListUl className="text-blue-600" /><a href={article.url} target="_self">{article.title.length > 30 ? article.title.slice(0, 40) + "..." : article.title}</a><span className="text-sm text-stone-400 ml-auto">source: {article.source.name}</span><FiExternalLink className="ml-auto text-blue-400" /></li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>




            <div className="translate-y-15 grid grid-cols-1 md:grid-cols-2 gap-3 pt-30 overflow-hidden lg:px-64 pb-64">
                <div className="p-4 col-span-1 md:col-span-2" ref={filterRef}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setFilterOpen((s) => !s)}><FiFilter className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-2 bg-white hover:bg-blue-100 text-blue-600 rounded-xl border" /></button>
                        <span className="text-md text-blue-500 px-3">{selectedSource === 'all' ? 'All' : selectedSource}</span>
                    </div>

                    {filterOpen && (
                        <div className="mt-3 bg-white rounded-xl shadow p-4 w-64 border border-blue-100">
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
                    filteredFeed.map((article, index) => (
                        <a key={index} href={article.url}><NewsCard article={article} /></a>
                    ))
                )}
            </div>

            <div className="flex flex-col w-full">
                {/* <h2>What's the health update in <span className="text-blue-700">The</span> United <span className="text-red-600">States?</span></h2> */}
                {/* <p className="text-sm text-stone-500">More news articles from Nigeria</p> */}
                {moreResults.length > 0 && (
                    <div className="slider-container flex h-fit px-4">
                        {moreResults.map((article, index) => (
                            <a className="cards" key={index} href={article.url}>
                                <NewsCard article={article} />
                            </a>
                        ))}
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