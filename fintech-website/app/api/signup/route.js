import { db } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    await db.connect();

    try {
        const { walletAddress, username, password } = await request.json();

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [
                { walletAddress },
                { username }
            ]
        });

        if (existingUser) {
            return new Response(JSON.stringify({
                error: existingUser.walletAddress === walletAddress
                    ? 'Wallet already registered'
                    : 'Username already taken'
            }), { status: 400 });
        }

        // Create new user (password will be hashed by pre-save hook)
        const newUser = new User({
            walletAddress,
            username,
            password
        });

        await newUser.save();

        return new Response(JSON.stringify({
            success: true,
            user: {
                walletAddress: newUser.walletAddress,
                username: newUser.username
            }
        }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Server error'
        }), { status: 500 });
    }
}