"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpRight } from "lucide-react"

// Sample crowdfunding projects data
const projects = [
  {
    id: "tech-innovation-hub",
    title: "Tech Innovation Hub",
    category: "Technology",
    description: "A collaborative workspace for tech startups to develop cutting-edge solutions.",
    fundingGoal: 500000,
    currentFunding: 325000,
    daysLeft: 15,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "sustainable-finance-app",
    title: "Sustainable Finance App",
    category: "Fintech",
    description: "Mobile application that helps users invest in environmentally responsible companies.",
    fundingGoal: 200000,
    currentFunding: 178000,
    daysLeft: 21,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "blockchain-payment-solution",
    title: "Blockchain Payment Solution",
    category: "Blockchain",
    description: "Secure and transparent payment processing system built on blockchain technology.",
    fundingGoal: 350000,
    currentFunding: 210000,
    daysLeft: 30,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "ai-financial-advisor",
    title: "AI Financial Advisor",
    category: "Artificial Intelligence",
    description: "AI-powered platform providing personalized financial advice to users.",
    fundingGoal: 275000,
    currentFunding: 120000,
    daysLeft: 45,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "peer-to-peer-lending",
    title: "Peer-to-Peer Lending Platform",
    category: "Fintech",
    description: "Connect borrowers directly with lenders, eliminating traditional banking intermediaries.",
    fundingGoal: 400000,
    currentFunding: 185000,
    daysLeft: 25,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "crypto-education-platform",
    title: "Crypto Education Platform",
    category: "Education",
    description: "Interactive learning platform teaching cryptocurrency fundamentals to beginners.",
    fundingGoal: 150000,
    currentFunding: 98000,
    daysLeft: 18,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "financial-inclusion-initiative",
    title: "Financial Inclusion Initiative",
    category: "Social Impact",
    description: "Bringing banking services to underserved communities through mobile technology.",
    fundingGoal: 320000,
    currentFunding: 215000,
    daysLeft: 35,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "digital-identity-verification",
    title: "Digital Identity Verification",
    category: "Security",
    description: "Secure and privacy-focused digital identity verification system for financial services.",
    fundingGoal: 280000,
    currentFunding: 140000,
    daysLeft: 28,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

export default function CrowdfundingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || project.category.toLowerCase() === activeCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(projects.map((project) => project.category))]

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
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            <span className="gradient-text">Crowdfunding</span> Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-muted-foreground"
          >
            Discover innovative projects or launch your own campaign to bring your ideas to life.
          </motion.p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/crowdfunding/${project.id}`}>
                    <Card className="overflow-hidden border-fintech-black-800 bg-card/50 backdrop-blur-sm h-full hover:border-primary/50 transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-fintech-black-950/80 to-transparent"></div>
                        <Badge className="absolute top-3 right-3 bg-primary">{project.category}</Badge>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="w-full bg-fintech-black-800/50 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-white mt-1">
                            <span>${project.currentFunding.toLocaleString()}</span>
                            <span>{Math.round((project.currentFunding / project.fundingGoal) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-center">
                          <span>{project.title}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Goal: ${project.fundingGoal.toLocaleString()}</span>
                        <span className="text-primary">{project.daysLeft} days left</span>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-10 bg-fintech-black-950/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Filter:</span>
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-fintech-black-900">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Projects</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} whileHover={{ y: -5 }} className="group">
                  <Link href={`/crowdfunding/${project.id}`}>
                    <Card className="overflow-hidden border-fintech-black-800 bg-card/50 backdrop-blur-sm h-full hover:border-primary/50 transition-all duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-fintech-black-950/80 to-transparent"></div>
                        <Badge className="absolute top-3 right-3 bg-primary">{project.category}</Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex justify-between items-center">
                          <span className="line-clamp-1">{project.title}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                        <div className="mt-4">
                          <div className="w-full bg-fintech-black-800/50 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>${project.currentFunding.toLocaleString()}</span>
                            <span>{Math.round((project.currentFunding / project.fundingGoal) * 100)}%</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 text-xs flex justify-between">
                        <span className="text-muted-foreground">Goal: ${project.fundingGoal.toLocaleString()}</span>
                        <span className="text-primary">{project.daysLeft} days left</span>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects found matching your search criteria.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Start Your Project CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-xl gradient-bg">
            <h2 className="text-2xl font-bold text-white mb-4">Have a Great Idea?</h2>
            <p className="text-white/80 mb-6">
              Launch your own crowdfunding campaign and bring your innovative project to life.
            </p>
            <Button size="lg" variant="secondary">
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

