"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Lock, Zap, Shield, CreditCard, TrendingUp, Smartphone } from "lucide-react"
import ether from "@/public/ether.png"
import Image from "next/image"
import SubscriptionPage from "@/components/subscription"

export default function Home() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Analyze the frauds and transactions with our advanced analytics tools.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure Transactions",
      description: "End-to-end encryption and multi-factor authentication",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Decentralized Security",
      description: "Decentralized blockchain network for secure user authentication.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Fraud Protection",
      description: "AI-powered fraud detection and prevention systems.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "KYC/AML Regulations",
      description: "Compliant with Know Your Customer and Anti-Money Laundering regulations.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Advanced Face Recognition",
      description: "Secure your account with advanced face recognition technology.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 hero-pattern">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                The Future of <span className="gradient-text">Finance</span> is Here
              </h1>
              <p className="mt-6 text-2xl text-muted-foreground">
              AI-Powered Fraud Prevention With Blockchain
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="https://github.com/patel-tejas/anirveda">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-16 w-full max-w-4xl"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 z-10"></div>
                <img
                  src="/placeholder.svg?height=600&width=1200"
                  alt="FinPulse Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div> */}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-[-5px] left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-[10rem]"
            preserveAspectRatio="none"
          >
            <path
              fill="hsl(240, 10%, 3.9%)"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Features for Modern Finance</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to manage your money, all in one place.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-fintech-black-800 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Crowdfunding Preview Section */}
      <section className="py-24 bg-fintech-black-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Your Security is our Priority</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our platform ensures multi-factor authentication to ensure your data is secure. From Blockchain based IDs to Facial Recognition, we have it all. 
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 z-10"></div>
           <Image src={ether} alt="Ether" layout="responsive" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center p-6 bg-fintech-black-950/80 backdrop-blur-md rounded-xl max-w-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Live Contract Stats on Etherscan</h3>
                <p className="text-white/80 mb-6">
                  View the live contract on Etherscan to see the decentralized security.
                </p>
                <Link href="https://sepolia.etherscan.io/address/0x7187dC71f6b48a6429256D7b0Aa4f1e86C8bCA71">
                  <Button size="lg">
                    Watch <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-fintech-black-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">$2B+</div>
              <div className="mt-2 text-sm text-muted-foreground">Transactions Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">1M+</div>
              <div className="mt-2 text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">150+</div>
              <div className="mt-2 text-sm text-muted-foreground">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="mt-2 text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 bg-fintech-black-950">
        <SubscriptionPage />
      </section>
      {/* Mobile App Section */}
      {/* <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Take Control with Our Mobile App</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Manage your finances on the go with our powerful mobile application. Available for iOS and Android.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Smartphone className="h-5 w-5 text-primary mr-3" />
                  <span>Real-time notifications and alerts</span>
                </li>
                <li className="flex items-center">
                  <Smartphone className="h-5 w-5 text-primary mr-3" />
                  <span>Biometric authentication for secure access</span>
                </li>
                <li className="flex items-center">
                  <Smartphone className="h-5 w-5 text-primary mr-3" />
                  <span>Contactless payments with NFC technology</span>
                </li>
                <li className="flex items-center">
                  <Smartphone className="h-5 w-5 text-primary mr-3" />
                  <span>Offline mode for essential features</span>
                </li>
              </ul>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  Download for iOS
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Download for Android
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative mx-auto w-full max-w-sm lg:max-w-none"
            >
              <div className="relative mx-auto w-64 h-[500px] rounded-[2.5rem] border-8 border-fintech-black-800 shadow-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=800&width=400"
                  alt="FinPulse Mobile App"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-24 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Join thousands of users who are already experiencing the future of finance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </>
  )
}

