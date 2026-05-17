
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { users } from "@/app/lib/users";
export async function POST(req) {
    try {
        //Reads data sent from the client
        const {name, email, password} = await req.json();

        //Basic validation
        if (!name || !email || !password){
            return NextResponse.json({message: "Username, Email and password are required"}, {status: 400});
        }

        //Checking if user already exists
        const existingUser = users.find((u) => u.email === email);
        const existingName = users.find((u) => u.name === name);
        if (existingUser) {
            return NextResponse.json({message: "User already exists"}, {status:409});
        }
        if (existingName) {
            return NextResponse.json({message: "Username already exists"}, {status:409})
        }

        //Hashing the password
        const hashPassword = await bcrypt.hash(password, 10);

        //Save user (replaces with DataBAse later)
        users.push({
            name,
            email, 
            password: hashPassword,
        });

        //Sending a success message
        return NextResponse.json({message : "User registered successfully"}, {status: 201});
    }catch (error){
        //Catch unexpepcted errors
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}

