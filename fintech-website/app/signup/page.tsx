"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ConnectButton, useActiveAccount, TransactionButton, lightTheme } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";

// Replace with your deployed UserIdentity contract address
const CONTRACT_ADDRESS = "0x7187dC71f6b48a6429256D7b0Aa4f1e86C8bCA71";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const account = useActiveAccount();

  // Log the connected wallet address when available
  useEffect(() => {
    if (account) {
      console.log("Connected wallet address:", account.address);
    }
  }, [account]);

  // Load your smart contract using getContract.
  const contract = getContract({
    client: client,
    address: CONTRACT_ADDRESS,
    chain: sepolia, // using sepolia chain config
  });

  // If no wallet is connected, show the connect wallet prompt.
  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-fintech-black-800 bg-black/50 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-white">
                Connect Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white">
              <p>Please connect your wallet to sign up.</p>
            </CardContent>
            <CardFooter className="flex flex-col">
              <ConnectButton client={client} />
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render the signup form if the wallet is connected.
  return (
    <div className="flex min-h-screen items-center justify-center py-24 px-4 sm:px-6 lg:px-8 hero-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-fintech-black-800 bg-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  className="text-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
          // Update the TransactionButton component's transaction prop
            <TransactionButton
              theme={lightTheme()}
              transaction={async () =>
                prepareContractCall({
                  contract: contract,
                  method: {
                    // Explicit ABI definition
                    type: "function",
                    name: "registerUser",
                    inputs: [
                      { type: "string", name: "_username" }
                    ],
                    outputs: [],
                    stateMutability: "nonpayable"
                  },
                  params: [username]
                })
              }
              onTransactionConfirmed={() => {
                console.log("User registered with username:", username);
                setUsername("");
              }}
              onError={(error) => alert(`Error: ${error.message}`)}
              className="w-full"
            >
              Sign Up
            </TransactionButton>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}