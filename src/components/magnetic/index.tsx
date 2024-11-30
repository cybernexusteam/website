import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface FramerProps {
  children: React.ReactNode
}

interface Position {
  x: number
  y: number
}
export default function Framer({ children }: FramerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
  }

    const reset = () => {
    setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
      style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
      animate={position}
      transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
        >
            {children}
        </motion.div>
    )
}