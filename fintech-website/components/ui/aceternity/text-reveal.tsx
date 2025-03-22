"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

export const TextReveal = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  if (!isMounted) {
    return null
  }

  // Split text into words
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} className="mr-2 mt-2" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

