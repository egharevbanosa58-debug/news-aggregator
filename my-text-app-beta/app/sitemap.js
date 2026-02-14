// export default async function sitemap() {
//     const BASE_URL = 'https://newslitenews.vercel.app/';

//     // To fetch the same news shown on my dashboard
//     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`, {
//         next: { revalidate: 3600 }
//     });

//     const articles = await res.json();

//     // TO turn thpse articles into sitemap links
//     const articleEntries = articles.map(() => ({
//         url: `${BASE_URL}/dashboard/${article.slug}`, // Path to my article page
//     }))
// }



// I will not continue the above one because it has protected pages... amd i dont want the world to be seeing those protected pages or the google bot being redirected to a login form and flagging my page for soft 404 errors, so i will only build my sitemap to accommodate the landing page that will direct the users to either login or sign up.


export default function sitemap() {
    const BASE_URL = 'https://newslitenews.vercel.app';

    return [
        {
            url : BASE_URL,
            lastModified : new Date(),
        },

        {
            url : `${BASE_URL}/login`,
            lastModified : new Date(),
        },

        {
            url : `${BASE_URL}/register`,
            lastModified : new Date(),
        }
    ]
}