import { FiExternalLink } from "react-icons/fi";

export default function NewsCard({ article }) {
    return (
            <div className="feeds bg-white dark:bg-neutral-900 gap-3 grid grid-cols-1 md:grid-cols-2 rounded-lg shadow hover:shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 relative">
                <img src={article.urlToImage || "/placeholder.png"}
                    alt={article.title}
                    className="size-64 w-full object-cover" />

                <div className="py-6 px-4 ">
                    <h2 className="font-bold text-lg leading-tight">{article.title}</h2>
                    <p className="mt-2 text-stone-500 dark:text-white">Author: {article.author || "Unknown"}</p>
                    <FiExternalLink className="absolute bottom-3 right-3 w-5 h-5 text-blue-600" />
                    {/* <p className="text-sm text-gray-600 leading-relaxed">{article.description}</p> */}

                    {/* <a href={article.source_url}
                target="_blank"
                className="text-blue-600 hover:underline">
                    Read more
                </a> */}
                </div>
            </div>
    )
}