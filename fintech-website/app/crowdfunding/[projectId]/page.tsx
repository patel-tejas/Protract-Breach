"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Clock, Users, Share2, Heart, Bookmark } from "lucide-react"

// Sample crowdfunding projects data (same as in the main page)
const projects = [
  {
    id: "tech-innovation-hub",
    title: "Tech Innovation Hub",
    category: "Technology",
    description: "A collaborative workspace for tech startups to develop cutting-edge solutions.",
    longDescription: `
      The Tech Innovation Hub is designed to be a state-of-the-art collaborative workspace where tech startups can access resources, mentorship, and networking opportunities to develop cutting-edge solutions.
      
      Our vision is to create an ecosystem that fosters innovation and accelerates the growth of early-stage technology companies. The hub will provide access to high-speed internet, meeting rooms, event spaces, and specialized equipment like 3D printers and VR/AR development tools.
      
      Additionally, resident startups will benefit from:
      - Mentorship from industry veterans
      - Regular workshops and networking events
      - Access to potential investors
      - Legal and accounting support
      - Marketing and PR assistance
    `,
    fundingGoal: 500000,
    currentFunding: 325000,
    daysLeft: 15,
    backers: 187,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "TechVentures Inc.",
      image: "/placeholder.svg?height=100&width=100",
      description: "A venture studio focused on launching innovative technology startups.",
      projectsLaunched: 5,
      successRate: "92%",
    },
    updates: [
      {
        date: "2023-03-15",
        title: "Location Secured!",
        content: "We've secured a 10,000 sq ft space in the downtown tech district for the Innovation Hub.",
      },
      {
        date: "2023-02-28",
        title: "Partnership Announcement",
        content: "Excited to announce our partnership with LeadingTech University to provide educational resources.",
      },
    ],
    faqs: [
      {
        question: "When will the Tech Innovation Hub open?",
        answer: "We plan to open doors within 6 months of completing our funding goal.",
      },
      {
        question: "How can startups apply for residency?",
        answer:
          "Applications will open 3 months before launch. Selection will be based on innovation potential and team strength.",
      },
      {
        question: "Will there be options for virtual membership?",
        answer: "Yes, we'll offer virtual membership tiers for those who can't be physically present.",
      },
    ],
    featured: true,
  },
  {
    id: "sustainable-finance-app",
    title: "Sustainable Finance App",
    category: "Fintech",
    description: "Mobile application that helps users invest in environmentally responsible companies.",
    longDescription: `
      The Sustainable Finance App is designed to democratize access to sustainable investing. Our platform will help users invest in companies that are environmentally responsible, socially conscious, and have strong governance practices (ESG).
      
      Key features of the app include:
      - ESG scoring for thousands of companies
      - Portfolio analysis for sustainability metrics
      - Automated investment in diversified sustainable portfolios
      - Impact tracking to see the environmental and social benefits of your investments
      - Educational content about sustainable finance
      
      Our goal is to make it easy for anyone to align their investments with their values, regardless of their investment experience or account size.
    `,
    fundingGoal: 200000,
    currentFunding: 178000,
    daysLeft: 21,
    backers: 1243,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "GreenInvest Team",
      image: "/placeholder.svg?height=100&width=100",
      description: "A team of fintech experts and environmental scientists passionate about sustainable finance.",
      projectsLaunched: 2,
      successRate: "100%",
    },
    updates: [
      {
        date: "2023-03-10",
        title: "Beta Testing Begins",
        content: "We've started beta testing with 100 users and the feedback has been overwhelmingly positive!",
      },
      {
        date: "2023-02-15",
        title: "Development Milestone",
        content: "The core investment engine and ESG scoring algorithm are now complete.",
      },
    ],
    faqs: [
      {
        question: "When will the app be available?",
        answer: "We plan to launch in the App Store and Google Play within 4 months of completing funding.",
      },
      {
        question: "What are the minimum investment requirements?",
        answer: "Users can start investing with as little as $10.",
      },
      {
        question: "How do you determine if a company is sustainable?",
        answer: "We use a proprietary algorithm that analyzes over 50 ESG data points from multiple trusted sources.",
      },
    ],
    featured: true,
  },
  {
    id: "blockchain-payment-solution",
    title: "Blockchain Payment Solution",
    category: "Blockchain",
    description: "Secure and transparent payment processing system built on blockchain technology.",
    longDescription: `
      Our Blockchain Payment Solution aims to revolutionize how businesses process payments by leveraging the security, transparency, and efficiency of blockchain technology.
      
      The platform will enable:
      - Near-instant settlement of transactions
      - Significantly lower fees compared to traditional payment processors
      - Cross-border payments without currency conversion fees
      - Complete transparency and immutable transaction records
      - Smart contract integration for automated payment flows
      
      We're building on a layer-2 scaling solution to ensure high throughput and low environmental impact while maintaining the security benefits of blockchain technology.
    `,
    fundingGoal: 350000,
    currentFunding: 210000,
    daysLeft: 30,
    backers: 156,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "BlockPay Solutions",
      image: "/placeholder.svg?height=100&width=100",
      description: "A team of blockchain developers and payment industry veterans.",
      projectsLaunched: 1,
      successRate: "100%",
    },
    updates: [
      {
        date: "2023-03-05",
        title: "Technical Whitepaper Released",
        content: "We've published our technical whitepaper detailing the architecture of our solution.",
      },
      {
        date: "2023-02-20",
        title: "Partnership with Retailers",
        content: "We've secured partnerships with 5 major online retailers to pilot our payment solution.",
      },
    ],
    faqs: [
      {
        question: "Which blockchain are you building on?",
        answer: "We're building on Ethereum with a custom layer-2 scaling solution for optimal performance.",
      },
      {
        question: "How will businesses integrate with your solution?",
        answer: "We'll provide APIs and plugins for major e-commerce platforms like Shopify and WooCommerce.",
      },
      {
        question: "What are the transaction fees?",
        answer:
          "Our fees will be approximately 0.5%, significantly lower than the 2-3% charged by traditional payment processors.",
      },
    ],
    featured: false,
  },
  {
    id: "ai-financial-advisor",
    title: "AI Financial Advisor",
    category: "Artificial Intelligence",
    description: "AI-powered platform providing personalized financial advice to users.",
    longDescription: `
      The AI Financial Advisor is designed to democratize access to high-quality financial advice. Using advanced machine learning algorithms, our platform will analyze users' financial situations and provide personalized recommendations to help them achieve their financial goals.
      
      Key features include:
      - Comprehensive financial health analysis
      - Personalized investment recommendations
      - Debt reduction strategies
      - Retirement planning
      - Budget optimization
      - Tax efficiency suggestions
      
      Our AI has been trained on data from certified financial planners and will continuously learn and improve based on user outcomes and feedback.
    `,
    fundingGoal: 275000,
    currentFunding: 120000,
    daysLeft: 45,
    backers: 532,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "FinAI Labs",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "A team of AI researchers and financial experts dedicated to making financial advice accessible to everyone.",
      projectsLaunched: 0,
      successRate: "New Creator",
    },
    updates: [
      {
        date: "2023-03-12",
        title: "AI Model Training Progress",
        content: "Our AI model has achieved 85% accuracy in preliminary tests, exceeding our expectations!",
      },
      {
        date: "2023-02-25",
        title: "Advisory Board Formation",
        content: "We've assembled an advisory board of certified financial planners to guide our AI development.",
      },
    ],
    faqs: [
      {
        question: "Is the AI Financial Advisor a replacement for human financial advisors?",
        answer:
          "While our AI provides high-quality advice, it's designed to complement rather than replace human advisors for complex situations.",
      },
      {
        question: "How do you ensure the privacy and security of financial data?",
        answer:
          "We use bank-level encryption and never store sensitive financial credentials. All data is anonymized for AI training.",
      },
      {
        question: "What will the subscription cost be?",
        answer:
          "We plan to offer a freemium model with basic features available for free and premium features starting at $9.99/month.",
      },
    ],
    featured: false,
  },
  {
    id: "peer-to-peer-lending",
    title: "Peer-to-Peer Lending Platform",
    category: "Fintech",
    description: "Connect borrowers directly with lenders, eliminating traditional banking intermediaries.",
    longDescription: `
      Our Peer-to-Peer Lending Platform aims to revolutionize personal and small business lending by directly connecting borrowers with individual lenders, eliminating traditional banking intermediaries.
      
      This approach offers several advantages:
      - Lower interest rates for borrowers
      - Higher returns for lenders
      - Faster approval and funding process
      - More flexible lending criteria
      - Transparent fee structure
      
      Our proprietary risk assessment algorithm will evaluate borrowers based on traditional and alternative data points, allowing us to serve individuals and businesses that might be overlooked by conventional banking systems.
    `,
    fundingGoal: 400000,
    currentFunding: 185000,
    daysLeft: 25,
    backers: 243,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "P2P Finance Group",
      image: "/placeholder.svg?height=100&width=100",
      description: "A team of fintech innovators with experience in traditional banking and alternative lending.",
      projectsLaunched: 1,
      successRate: "100%",
    },
    updates: [
      {
        date: "2023-03-08",
        title: "Regulatory Approval",
        content: "We've received regulatory approval to operate in 15 states, with more pending.",
      },
      {
        date: "2023-02-18",
        title: "Risk Algorithm Validation",
        content:
          "Our risk assessment algorithm has been validated with historical lending data, showing a 30% improvement in default prediction.",
      },
    ],
    faqs: [
      {
        question: "How do you protect lenders from defaults?",
        answer:
          "We offer a diversification tool that automatically spreads investments across multiple loans, and we maintain a contingency fund to cover a portion of defaults.",
      },
      {
        question: "What are the minimum and maximum loan amounts?",
        answer: "Loans range from $1,000 to $50,000 for personal loans and up to $250,000 for business loans.",
      },
      {
        question: "How do you verify borrower information?",
        answer:
          "We use a combination of traditional credit checks, bank account verification, and alternative data sources.",
      },
    ],
    featured: false,
  },
  {
    id: "crypto-education-platform",
    title: "Crypto Education Platform",
    category: "Education",
    description: "Interactive learning platform teaching cryptocurrency fundamentals to beginners.",
    longDescription: `
      The Crypto Education Platform is designed to demystify cryptocurrency and blockchain technology for beginners through interactive, engaging, and accessible educational content.
      
      Our platform will feature:
      - Step-by-step courses from absolute basics to advanced topics
      - Interactive simulations of blockchain mechanics
      - Virtual trading environment with no real money at risk
      - Gamified learning with achievements and progress tracking
      - Community forums moderated by crypto experts
      - Regular updates to keep pace with this rapidly evolving field
      
      Our goal is to empower individuals with the knowledge they need to confidently participate in the cryptocurrency ecosystem.
    `,
    fundingGoal: 150000,
    currentFunding: 98000,
    daysLeft: 18,
    backers: 876,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "CryptoLearn Team",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "A group of blockchain educators and developers passionate about making crypto accessible to everyone.",
      projectsLaunched: 0,
      successRate: "New Creator",
    },
    updates: [
      {
        date: "2023-03-14",
        title: "Course Curriculum Finalized",
        content: "We've finalized our curriculum with input from leading blockchain educators and developers.",
      },
      {
        date: "2023-02-22",
        title: "Platform Demo",
        content: "We've completed a working demo of our interactive blockchain simulation tool.",
      },
    ],
    faqs: [
      {
        question: "Is this platform suitable for complete beginners?",
        answer: "We've designed our content to be accessible to anyone, regardless of their technical background.",
      },
      {
        question: "Will you cover specific cryptocurrencies or just the technology?",
        answer:
          "We'll cover both the underlying technology and specific cryptocurrencies, but with a focus on education rather than investment advice.",
      },
      {
        question: "Will there be certifications available?",
        answer:
          "Yes, we plan to offer certificates of completion for all courses, with some advanced certificates requiring assessment.",
      },
    ],
    featured: false,
  },
  {
    id: "financial-inclusion-initiative",
    title: "Financial Inclusion Initiative",
    category: "Social Impact",
    description: "Bringing banking services to underserved communities through mobile technology.",
    longDescription: `
      The Financial Inclusion Initiative aims to bring essential banking services to underserved communities through innovative mobile technology solutions.
      
      Our approach includes:
      - A simplified mobile banking application that works on basic smartphones
      - Offline functionality for areas with limited connectivity
      - Micro-lending services with financial education
      - Digital identity verification for those without traditional documentation
      - Agent network for cash deposits and withdrawals in remote areas
      - Financial literacy programs tailored to local contexts
      
      We believe that access to financial services is a fundamental right and a pathway out of poverty for millions of people worldwide.
    `,
    fundingGoal: 320000,
    currentFunding: 215000,
    daysLeft: 35,
    backers: 412,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "InclusiveFin Foundation",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "A non-profit organization dedicated to expanding financial access to underserved populations globally.",
      projectsLaunched: 3,
      successRate: "100%",
    },
    updates: [
      {
        date: "2023-03-11",
        title: "Pilot Program Success",
        content:
          "Our pilot program in rural communities has successfully onboarded 500 users to basic banking services.",
      },
      {
        date: "2023-02-19",
        title: "Partnership with Local NGOs",
        content:
          "We've established partnerships with 10 local NGOs to help implement our program in their communities.",
      },
    ],
    faqs: [
      {
        question: "Which regions will you focus on initially?",
        answer:
          "We'll begin in rural areas of Southeast Asia and Sub-Saharan Africa, with plans to expand based on impact and need.",
      },
      {
        question: "How will you measure success?",
        answer:
          "Our key metrics include number of users onboarded, volume of transactions, savings accumulated, and improvements in financial literacy scores.",
      },
      {
        question: "Is this a for-profit or non-profit initiative?",
        answer:
          "This is a non-profit initiative, though we aim to develop a sustainable model that can continue without relying solely on donations.",
      },
    ],
    featured: false,
  },
  {
    id: "digital-identity-verification",
    title: "Digital Identity Verification",
    category: "Security",
    description: "Secure and privacy-focused digital identity verification system for financial services.",
    longDescription: `
      Our Digital Identity Verification system aims to revolutionize how people verify their identity for financial services while maintaining privacy and security.
      
      Key features of our solution include:
      - Biometric verification (facial recognition, fingerprint)
      - Document scanning and validation
      - Liveness detection to prevent spoofing
      - Zero-knowledge proofs for privacy preservation
      - Decentralized identity storage giving users control of their data
      - Compliance with global KYC/AML regulations
      
      Our system will dramatically reduce onboarding time for financial services while enhancing security and protecting user privacy.
    `,
    fundingGoal: 280000,
    currentFunding: 140000,
    daysLeft: 28,
    backers: 189,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    creator: {
      name: "SecureID Technologies",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "A team of cybersecurity experts and privacy advocates focused on secure digital identity solutions.",
      projectsLaunched: 1,
      successRate: "100%",
    },
    updates: [
      {
        date: "2023-03-09",
        title: "Security Audit Completed",
        content: "Our system has successfully passed an independent security audit with flying colors.",
      },
      {
        date: "2023-02-24",
        title: "Financial Institution Partnerships",
        content: "We've secured partnerships with three financial institutions to pilot our verification system.",
      },
    ],
    faqs: [
      {
        question: "How do you ensure user privacy?",
        answer:
          "We use zero-knowledge proofs and decentralized storage so users can prove their identity without revealing unnecessary personal information.",
      },
      {
        question: "What happens if someone loses access to their device?",
        answer: "We have a secure recovery process that requires multiple factors of authentication to restore access.",
      },
      {
        question: "How do you prevent identity theft and spoofing?",
        answer:
          "We use advanced liveness detection, 3D face mapping, and behavioral biometrics to ensure the person is physically present and not using photos or deepfakes.",
      },
    ],
    featured: false,
  },
]

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    // Find the project with the matching ID
    const foundProject = projects.find((p) => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
      setActiveImage(0) // Reset active image when project changes
    }
  }, [projectId])

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link href="/crowdfunding">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const fundingPercentage = Math.round((project.currentFunding / project.fundingGoal) * 100)

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/crowdfunding"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <Badge className="mb-2 bg-primary">{project.category}</Badge>
              <h1 className="text-3xl font-bold">{project.title}</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2">
            {/* Project Image Gallery */}
            <Card className="mb-8 overflow-hidden border-fintech-black-800 bg-card/50 backdrop-blur-sm">
              <div className="relative aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {project.gallery.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                      activeImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full grid grid-cols-3 bg-fintech-black-900">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-xl font-bold mb-4">About This Project</h2>
                  <div className="whitespace-pre-line text-muted-foreground">{project.longDescription}</div>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <h2 className="text-xl font-bold mb-4">Project Updates</h2>
                <div className="space-y-6">
                  {project.updates.map((update: any, index: number) => (
                    <Card key={index} className="border-fintech-black-800 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{update.title}</CardTitle>
                          <span className="text-xs text-muted-foreground">{update.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {project.faqs.map((faq: any, index: number) => (
                    <Card key={index} className="border-fintech-black-800 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Funding Info */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card className="border-fintech-black-800 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">${project.currentFunding.toLocaleString()}</CardTitle>
                <CardDescription>
                  raised of ${project.fundingGoal.toLocaleString()} goal ({fundingPercentage}%)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="w-full bg-fintech-black-800/50 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 text-primary mb-1" />
                      <div className="font-bold">{project.backers}</div>
                      <div className="text-xs text-muted-foreground">Backers</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      <Clock className="h-5 w-5 text-primary mb-1" />
                      <div className="font-bold">{project.daysLeft}</div>
                      <div className="text-xs text-muted-foreground">Days Left</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      <Calendar className="h-5 w-5 text-primary mb-1" />
                      <div className="font-bold">
                        {new Date(Date.now() + project.daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">End Date</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Back This Project</Button>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card className="border-fintech-black-800 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>About the Creator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.creator.image} alt={project.creator.name} />
                    <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{project.creator.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.creator.projectsLaunched} projects launched • {project.creator.successRate} success rate
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{project.creator.description}</p>
                <Button variant="outline" className="w-full">
                  Contact Creator
                </Button>
              </CardContent>
            </Card>

            {/* Funding Tiers */}
            <Card className="border-fintech-black-800 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Support Tiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="border-fintech-black-800 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Early Supporter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-2">$50</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Be among the first to support this project and receive exclusive early access.
                    </p>
                    <Button variant="outline" className="w-full">
                      Select
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-fintech-black-800 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Premium Backer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-2">$250</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Premium access with additional features and personalized support.
                    </p>
                    <Button variant="outline" className="w-full">
                      Select
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-fintech-black-800 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Founding Member</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-2">$1,000</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Become a founding member with exclusive benefits and recognition.
                    </p>
                    <Button variant="outline" className="w-full">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

