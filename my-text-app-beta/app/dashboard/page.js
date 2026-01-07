"use client"

import { useSession } from "next-auth/react"
import Logo from "../components/Logo";
import { FiUser, FiMenu, FiLogOut, FiSun, FiFlag, FiCpu, FiCoffee, FiChevronDown, FiChevronUp, FiSearch, FiExternalLink, FiFilter } from "react-icons/fi";
import { FaBowlingBall, FaFire, FaFlask, FaListUl, FaSpinner } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
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

    if (status === 'loading') return <img src="/Dual-ball-loading.gif" alt="loading-animation" className="mx-auto my-150" />;
    if (status === 'unauthenticated') return <p>Not logged in</p>
    return (
        <main className={`${loading ? 'bg-transparent' : ''} min-h-screen pb-10`}>
            <div className=" bg-white items-center nav-banner w-full">
                <div className="flex items-center w-full pt-2">
                    {/* App LOGO */}
                    <Logo className="scale-50 lg:scale-60 xl:scale-70 lg:translate-y-5 pt-5 -ml-6 transform" />

                    <div className="flex gap-3 -mt-5 lg:mt-10 lg:mb-7 ml-auto mr-5">

                        {/* The large screen nav bar goes here */}
                        <nav className="hidden lg:flex gap-3 xl:3 items-center text-xl text-stone-500 md:mr-12 lg:mr-20 justify-center md:text-sm">

                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`nav-btn ${selectedCategory === cat.id ? 'bg-blue-100 font-semibold' : ''}`}>
                                    {cat.icon && <cat.icon className={cat.color} />}
                                    {cat.name}
                                </button>
                            ))}
                        </nav>

                        <div className="profile">
                            <FiUser className="w-9 h-9 lg:w-10 lg:h-10 lg:rounded-2xl lg:mr-auto lg:-translate-x-10 p-2 hover:cursor-pointer relative fi-user border border-blue-300 rounded-xl text-blue-600" />

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

                        <div className="cont lg:hidden z-999">
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




                {/* The search bar goes here */}
                <div className="input-field relative">
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
                        className="h-10 w-50 md:w-80 pl-10 pr-4 mb-5 rounded-3xl relative text-blue-600 border border-blue-600 focus:outline-none ml-25 lg:ml-100 lg:h-13 transition-all focus:w-70 focus:shadow-md md:focus:w-100" />
                    <FiSearch className="search-icon text-blue-600 text-xl absolute bottom-6 lg:bottom-7.5 p-2 w-8 h-8 left-26 lg:left-100 border-r" />
                    {searchLoading && <FaSpinner className="transition-all animate-spin text-blue-600 absolute right-370 bottom-9" />}


                    {/* {error && <p className="text-red-600">Error : {error} by NOsa</p>} */}
                    {searchResults.length > 0 && open && (
                        <ul ref={resultsRef} className="absolute p-4 z-999 bg-white shadow-lg rounded-2xl search-results space-y-2 max-h-100 overflow-y-auto border mx-20 border-blue-100">
                            {searchResults.map((article, index) => (
                                <li key={index} className="p-3 rounded-xl flex gap-3 items-center hover:bg-gray-200 cursor-pointer text-lg font-medium border-b border-blue-200 hover:shadow"><FaListUl className="text-blue-600" /><a href={article.url} target="_self">{article.title}</a><span className="text-sm text-stone-400 ml-auto">source: {article.source.name}</span><FiExternalLink className="ml-auto text-blue-400" /></li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>




            <div className="translate-y-30 grid grid-cols-1 md:grid-cols-2 gap-3 pt-30 overflow-hidden lg:px-50 pb-10">
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





                <h1 className="category-heading mt-2 text-2xl md:text-3xl lg:text-5xl lg:text-start md:col-span-2 font-semibold ml-4">{selectedCategory === 'general' ? 'General' : selectedCategory === 'technology' ? 'Technology' : selectedCategory === 'science' ? 'Science' : selectedCategory === 'business' ? 'Business' : selectedCategory === 'entertainment' ? 'Entertainment' : selectedCategory === 'sports' ? 'Sports' : ''}</h1>
                {/* Content */}
                {loading ? (
                    <div className="feeds col-span-2 flex justify-center items-center w-full mx-auto mt-30">
                        <img src="/Dual-ball-loading.gif" alt="loading" className="mx-auto my-10" />
                    </div>
                ) : (
                    filteredFeed.map((article, index) => (
                        <a key={index} href={article.url}><NewsCard article={article} /></a>
                    ))
                )}
            </div>


            <div className="bg-stone-500 h-[0.5px] w-full mt-50 mb-20 mx-0">

            </div>

            <div className="mt-60 mb-10 text-black health-text text-center whitespace-normal md:whitespace-nowrap text-2xl md:text-3xl lg:text-5xl font-semibold">
                <h2>What's the health update in <span className="text-blue-700">The</span> United <span className="text-red-600">States?</span></h2>
                {/* <p className="text-sm text-stone-500">More news articles from Nigeria</p> */}
            </div>

            {moreResults.length > 0 && (
                <div className="slider-container">
                    {moreResults.map((article, index) => (
                        <a className="cards" key={index} href={article.url}>
                            <NewsCard article={article} />
                        </a>
                    ))}
                </div>
            )}


            <footer className="w-full mt-30 bottom-0">
                <p className="text-center text-blue-600 py-4">© 2024 News Aggregator. All rights reserved.</p>
                <p className="text-center text-blue-600">Created by NOSA &trade;</p>
            </footer>
        </main>
    );
}