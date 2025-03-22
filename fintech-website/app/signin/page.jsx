"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ConnectButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";

const CONTRACT_ADDRESS = "0x7187dC71f6b48a6429256D7b0Aa4f1e86C8bCA71";

export default function SignIn() {
  const account = useActiveAccount();
  const [loading, setLoading] = useState(false);

  // Initialize the contract instance
  const contract = getContract({
    client: client,
    address: CONTRACT_ADDRESS,
    chain: sepolia,
  });

  // Check registration status using the isRegistered function
  const { data: isRegistered, isLoading: isContractLoading } = useReadContract({
    contract,
    method: {
      type: "function",
      name: "isRegistered",
      inputs: [{ type: "address", name: "_user" }],
      outputs: [{ type: "bool" }],
      stateMutability: "view"
    },
    params: [account?.address]
  });

  // Handle loading states
  useEffect(() => {
    if (account) {
      setLoading(true);
      if (!isContractLoading) {
        setLoading(false);
      }
    }
  }, [account, isContractLoading]);

  // Wallet connection screen
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
              <p>Please connect your wallet to continue</p>
            </CardContent>
            <CardFooter className="flex flex-col">
              <ConnectButton client={client} />
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main content after wallet connection
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
            <CardTitle className="text-2xl font-bold text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center">
              Blockchain Identity Verification
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-white">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Connected Wallet: {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </p>
              
              {loading ? (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300">Checking blockchain records...</p>
                  <div className="animate-pulse h-2 bg-gray-700 rounded"></div>
                </div>
              ) : isRegistered ? (
                <div className="mt-4 space-y-2">
                  <p className="text-green-400 font-semibold">✓ Verified Identity</p>
                  <p className="text-xs text-gray-400">
                    Blockchain registration confirmed
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <p className="text-red-400 font-semibold">✗ Not Registered</p>
                  <p className="text-xs text-gray-400">
                    This wallet has no registered identity
                  </p>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {isRegistered ? (
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Enter Platform
                </Button>
              </Link>
            ) : (
              <div className="w-full space-y-3">
                <div className="text-center text-red-500 text-sm">
                  You need to register first
                </div>
                <Link href="/signup" className="w-full">
                  <Button variant="outline" className="w-full">
                    Go to Registration
                  </Button>
                </Link>
              </div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}