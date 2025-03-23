"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Subscription plan data
const subscriptionPlans = [
    {
        plan: "Enterprise Banking",
        price: "₹1,00,000 per year",
        description: "Designed for large banks and financial institutions, this plan provides advanced features...",
        features: [
            "Unlimited users",
            "24/7 priority support",
            "Custom API integration",
            "Advanced analytics dashboard",
            "Dedicated account manager",
            "Custom branding options",
            "Regulatory compliance tools",
            "Multi-region deployment",
            "Disaster recovery",
            "SLA guarantees",
        ],
        popular: false,
        cta: "Contact Sales",
    },
    {
        plan: "Corporate Fintech",
        price: "₹20,000 per year",
        description:
            "Ideal for mid-sized financial institutions and fintech companies, this plan offers comprehensive solutions...",
        features: [
            "Up to 1000 users",
            "24/7 support",
            "Standard API access",
            "Business analytics",
            "Team collaboration tools",
            "Workflow automation",
            "Compliance assistance",
            "Single-region deployment",
            "Regular backups",
            "99.9% uptime",
        ],
        popular: true,
        cta: "Start Free Trial",
    },
    {
        plan: "Startup Package",
        price: "₹5000 per year",
        description:
            "A cost-effective solution for startups and small companies in the fintech sector, providing essential features...",
        features: [
            "Up to 250 users",
            "Business hours support",
            "Basic API access",
            "Standard reporting",
            "Core financial tools",
            "Basic automation",
            "Compliance guidelines",
            "Shared infrastructure",
            "Daily backups",
            "99.5% uptime",
        ],
        popular: false,
        cta: "Get Started",
    },
]

// Billing toggle options
const billingOptions = [
    { value: "yearly", label: "Yearly" },
    { value: "monthly", label: "Monthly" },
]

export default function SubscriptionPage() {
    const [billing, setBilling] = useState("yearly")

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
        <div className="min-h-screen pt-20 bg-fintech-black-950 text-white">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold tracking-tight sm:text-5xl"
                    >
                        Choose Your <span className="gradient-text">Subscription</span> Plan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-4 text-xl text-muted-foreground"
                    >
                        Select the perfect plan for your business needs and scale as you grow
                    </motion.p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center bg-fintech-black-900 p-1 rounded-lg">
                        {billingOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setBilling(option.value)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billing === option.value ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
                                    }`}
                            >
                                {option.label}
                                {option.value === "yearly" && (
                                    <span className="ml-1 text-xs bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full">
                                        Save 20%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Subscription Plans */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {subscriptionPlans.map((plan, index) => (
                        <motion.div key={plan.plan} variants={itemVariants}>
                            <Card
                                className={`h-full flex flex-col border-fintech-black-800 bg-fintech-black-950 text-white backdrop-blur-sm hover:border-primary/50 transition-all duration-300 ${plan.popular ? "relative border-primary/50 shadow-lg shadow-primary/10" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <Badge className="bg-primary px-3 py-1">Most Popular</Badge>
                                    </div>
                                )}
                                <CardHeader className={`pb-4 ${plan.popular ? "pt-8" : ""}`}>
                                    <div className="text-sm text-muted-foreground mb-2">{plan.plan}</div>
                                    <CardTitle className="text-3xl font-bold">
                                        <span className="gradient-text">{plan.price.split(" ")[0]}</span>
                                        <span className="text-base font-normal text-muted-foreground ml-1">
                                            per {billing === "yearly" ? "year" : "month"}
                                        </span>
                                    </CardTitle>
                                    <div className="mt-2 text-sm text-muted-foreground">{plan.description}</div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant={"default"}>
                                        {plan.cta}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

               
            </div>
        </div>
    )
}


