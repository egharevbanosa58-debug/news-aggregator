// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";


// export async function GET(req){
//     try{
//         // Check if user is logged in
//         const session = await getServerSession();

//         if(!session){
//             return NextResponse.json(
//                 {message : "Unauthorized"},
//                 {status : 401}
//             );
//         }

//         // Read query params (?category=sports)
//         const {searchParams} = new URL(req.url);
//         const category = searchParams.get("category") || "general";

//         // Build a NewsApi URL
//         const url = `https://newsapi.org/v2/top-headlines?country=ng&category=${category}`;

//         // Fetch from NewsApi (server-side)
//         const res = await fetch(url, {
//             headers: {
//                 Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
//             },
//         });

//         if (!res.ok) {
//             throw new Error("Failed to fetch news");
//         }
        
//         const data = await res.json();
//         return NextResponse.json(data);
//     } catch(error){
//         return NextResponse.json(
//             {message : "Server error"},
//             {status : 500}
//         );
//     }
// }







import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "latest";

    // const url = `https://newsdata.io/api/1/latest?language=en&apiKey=${process.env.NEWS_API_KEY}&q=category`;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

    const res = await fetch(url, {
      headers: {
        // Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
        "User-Agent": "NextJS-News-App",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("NewsAPI error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




// import { NextResponse } from "next/server";

// export async function GET() {
//   try{
//     const res = await fetch(`https://newsdata.io/api/1/latest?language=en&apiKey=${process.env.NEWS_API_KEY}`, 
//       {
//         headers: {
//           "User-Agent": "NextJS-News-App",
//         }
//       }
//     );

//     if(!res.ok){
//       const errorText = await res.text();
//       console.error("NewsAPI error:", errorText);
//       return NextResponse.json(
//         { error: "Failed to fetch news" },
//         { status: 500 }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   }catch(error){
//     console.error("SERVER ERROR:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" }, 
//       { status: 500 }
//     );
//   }
// }