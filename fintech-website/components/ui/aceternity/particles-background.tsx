"use client"

import type React from "react"
import { useCallback } from "react"
import { Particles } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

interface ParticlesBackgroundProps {
  className?: string
  quantity?: number
  color?: string
  particleSize?: number
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  className,
  quantity = 40,
  color = "#8b5cf6",
  particleSize = 3,
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      className={className}
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: quantity,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: color,
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: particleSize,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: color,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5,
              },
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      }}
    />
  )
}

export default ParticlesBackground

