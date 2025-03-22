"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Building, Award, Briefcase, Globe } from "lucide-react"
import Link from "next/link"

export default function About() {
  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Rodriguez",
      role: "CFO",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emma Williams",
      role: "Head of Product",
      image: "/placeholder.svg?height=300&width=300",
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
      <section className="pt-20 hero-pattern">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                About <span className="gradient-text">FinPulse</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                We're on a mission to revolutionize the way people interact with their finances.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At FinPulse, we believe that financial services should be accessible, transparent, and easy to use for
                everyone. We're building the financial infrastructure of tomorrow, today.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Accessibility:</strong> Making financial tools available to
                    everyone, regardless of background or experience.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Innovation:</strong> Constantly pushing the boundaries of what's
                    possible in financial technology.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Security:</strong> Protecting our users' data and assets with
                    the highest standards of security.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Transparency:</strong> Being open and honest about our products,
                    pricing, and practices.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 z-10"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="FinPulse Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Info Tabs */}
      <section className="py-24 bg-fintech-black-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Company</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn more about our journey, values, and achievements.
            </p>
          </div>

          <Tabs defaultValue="history" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="values">Values</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="future">Future</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our History</CardTitle>
                  <CardDescription>The journey of FinPulse from idea to reality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">2018 - Foundation</h3>
                      <p className="text-muted-foreground">
                        FinPulse was founded with a vision to democratize financial services.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">2020 - Growth</h3>
                      <p className="text-muted-foreground">
                        Expanded our team and launched our first suite of products.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">2022 - Global Expansion</h3>
                      <p className="text-muted-foreground">Expanded operations to over 30 countries worldwide.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">2023 - Recognition</h3>
                      <p className="text-muted-foreground">
                        Named one of the top fintech companies by industry leaders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="values" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                  <CardDescription>The principles that guide everything we do</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Innovation</h3>
                      <p className="text-muted-foreground">
                        We constantly push the boundaries of what's possible in financial technology.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Integrity</h3>
                      <p className="text-muted-foreground">
                        We operate with honesty, transparency, and the highest ethical standards.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Inclusion</h3>
                      <p className="text-muted-foreground">
                        We build products that are accessible to everyone, regardless of background.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Impact</h3>
                      <p className="text-muted-foreground">
                        We measure our success by the positive difference we make in people's lives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Achievements</CardTitle>
                  <CardDescription>Milestones and recognition we've received along the way</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-fintech-black-800 pb-2">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span>Best Fintech Startup 2021</span>
                      </div>
                      <span className="text-muted-foreground">TechCrunch</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-fintech-black-800 pb-2">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span>Innovation in Finance 2022</span>
                      </div>
                      <span className="text-muted-foreground">Forbes</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-fintech-black-800 pb-2">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span>Top 10 Fintech Companies 2023</span>
                      </div>
                      <span className="text-muted-foreground">Financial Times</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span>Best User Experience 2023</span>
                      </div>
                      <span className="text-muted-foreground">UX Awards</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="future" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Future</CardTitle>
                  <CardDescription>Where we're headed and what we're building next</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    At FinPulse, we're just getting started. Our roadmap for the future includes:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Expanded Product Suite</h3>
                        <p className="text-muted-foreground">
                          Launching new financial tools to cover every aspect of personal and business finance.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Global Reach</h3>
                        <p className="text-muted-foreground">
                          Expanding to 100+ countries to serve customers worldwide.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Financial Education</h3>
                        <p className="text-muted-foreground">
                          Launching initiatives to improve financial literacy globally.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Leadership Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">The talented individuals driving our mission forward.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-fintech-black-800 hover:border-primary/50 transition-all duration-300">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join Us on Our Mission</h2>
            <p className="mt-4 text-xl text-white/80">
              Be part of the financial revolution and help us build the future of finance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  View Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

