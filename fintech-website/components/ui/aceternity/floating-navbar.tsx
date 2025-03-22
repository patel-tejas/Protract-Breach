"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn("fixed top-4 inset-x-0 max-w-2xl mx-auto z-50", className)}
      >
        <div className="relative">
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? "auto" : "60px",
              borderRadius: isOpen ? "1.5rem" : "3rem",
            }}
            className="flex flex-col bg-fintech-black-950/80 backdrop-blur-md border border-fintech-black-800 p-4 rounded-3xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-xl font-bold text-white">
                  <span className="gradient-text">Fin</span>Pulse
                </div>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-fintech-black-900 hover:bg-fintech-black-800 transition-colors"
              >
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="w-5 h-5 flex items-center justify-center">
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex flex-col space-y-4"
                >
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="flex items-center space-x-2 text-white/80 hover:text-white p-2 rounded-lg hover:bg-fintech-black-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

