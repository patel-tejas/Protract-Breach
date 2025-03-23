import connectDB from "@/db/db";
import userSchema from "../../../db/models/userSchema";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    await connectDB();
  
    try {
      const { username, password, walletAddress } = await request.json(); // Only get username/password
  
      // Find user by username instead of walletAddress
      const user = await userSchema.findOne({ username });
      if (!user) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      console.log({username, password, user});
    
    if (user.walletAddress !== walletAddress) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    
    //   Password check
      const isMatch = password === user.password;
      console.log("isMatch", isMatch);
      if (!isMatch) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
        
      // Password check
    //   const isMatch = password === user.password;
    //   console.log("isMatch", isMatch);
    //   if (!isMatch) {
    //     return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
    //       status: 401,
    //       headers: { 'Content-Type': 'application/json' }
    //     });
    //   }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        "secret", // Store this in environment variables!
        { expiresIn: '1d' }
      );
  
      return new Response(JSON.stringify({
        success: true,
        token,
        user: {
          username: user.username,
          walletAddress: user.walletAddress // Optional: Return wallet if needed
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      return new Response(JSON.stringify({
        error: error.message || 'Server error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }