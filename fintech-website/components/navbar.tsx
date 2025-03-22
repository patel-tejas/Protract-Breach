"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
// import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Thirdweb wallet hooks

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Crowdfunding", href: "/crowdfunding" },
  ]

  // Handle Sign In: connect wallet if needed then navigate to /signin
  // const handleSignIn = async () => {
  //   if (!address) {
  //     await connectWallet()
  //   }
  //   router.push("/signin")
  // }

  // Handle Register: connect wallet if needed then navigate to /signup
  // const handleRegister = async () => {
  //   if (!address) {
  //     await connectWallet()
  //   }
  //   router.push("/signup")
  // }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-fintech-black-950/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-white"
              >
                <span className="gradient-text">Fin</span>Pulse
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Button size="sm" >
                Sign In
              </Button>
              <Link href="/signup">
                <Button size="sm">
                  Register
                </Button>
              </Link>
              {/* <ConnectButton 
                client={client}
              /> */}
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-fintech-black-950/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-fintech-black-800">
                <Button className="w-full justify-start" onClick={() => { setIsOpen(false); handleSignIn() }}>
                  Sign In
                </Button>
                <Button className="w-full" onClick={() => { setIsOpen(false); handleRegister() }}>
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
