// app/api/signup/route.js
import connectDB from "@/db/db";
import userSchema from "../../../db/models/userSchema";
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await connectDB();
  
  try {
    const { walletAddress, username, password, image_url } = await request.json();
    console.log("Request data:", { walletAddress, username, password, image_url });
    
    // Check for existing users
    const existingUser = await userSchema.findOne({
      $or: [{ walletAddress }, { username }]
    });

    if (existingUser) {
      return new Response(JSON.stringify({
        error: existingUser.walletAddress === walletAddress 
          ? 'Wallet already registered' 
          : 'Username already taken'
      }), { status: 400 });
    }

    // Hash password and save user
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      walletAddress,
      username,
      password,
      image_url
    });

    await newUser.save();
    console.log("User created:", newUser);
    
    
    return new Response(JSON.stringify({
      success: true,
      user: {
        walletAddress: newUser.walletAddress,
        username: newUser.username
      }
    }), { status: 201 });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message || 'Server error'
    }), { status: 500 });
  }
}