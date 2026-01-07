export async function fetchNews(category){
    return fetch(`api/news?category=${category}`);
}