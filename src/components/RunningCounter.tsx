import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const CounterContainer = styled.div`
  background: transparent;
  padding: 20px;
  margin: 40px auto;
  max-width: 800px;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    margin: 30px 20px;
    padding: 15px;
    max-width: 100%;
  }
`

const CounterTitle = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  opacity: 0.8;
`

const SpecsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`

const SpecItem = styled.div`
  text-align: center;
`

const SpecValue = styled.div<{ $animating?: boolean }>`
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  transition: all 0.5s ease;

  ${props => props.$animating && `
    transform: scale(1.1);
    color: #00a652;
  `}

  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const SpecLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const SpecIcon = styled.div`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
`

const CounterLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  cursor: pointer;
  margin-top: 15px;
  opacity: 0.6;
  text-align: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 10px;
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #ffffff 0%, #cccccc 100%);
  border-radius: 2px;
  transition: width 0.5s ease;
  width: ${props => props.$progress}%;
`

interface CounterProps {
  title?: string
}

const RunningCounter: React.FC<CounterProps> = ({ title = "E-BIKE SPECIFICATIONS" }) => {
  const [currentValues, setCurrentValues] = useState({
    range: 0,
    speed: 0,
    battery: 0,
    motor: 0
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const targetValues = {
    range: 60,
    speed: 25,
    battery: 13,
    motor: 250
  }

  const specs = [
    {
      value: currentValues.range,
      target: targetValues.range,
      label: "Range",
      unit: "KM",
      icon: "fas fa-route"
    },
    {
      value: currentValues.speed,
      target: targetValues.speed,
      label: "Speed",
      unit: "KM/h",
      icon: "fas fa-tachometer-alt"
    },
    {
      value: currentValues.battery,
      target: targetValues.battery,
      label: "Battery",
      unit: "Ah",
      icon: "fas fa-battery-full"
    },
    {
      value: currentValues.motor,
      target: targetValues.motor,
      label: "Motor",
      unit: "W",
      icon: "fas fa-bolt"
    }
  ]

  const startAnimation = () => {
    if (hasAnimated) return // Only animate once
    
    setIsAnimating(true)
    setHasAnimated(true)
    setCurrentValues({
      range: 0,
      speed: 0,
      battery: 0,
      motor: 0
    })
    animateToTargets()
  }

  const animateToTargets = () => {
    const duration = 3000 // 3 seconds for animation
    const steps = 30 // Number of animation steps
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep >= steps) {
        setIsAnimating(false)
        if (animationRef.current) {
          clearInterval(animationRef.current)
        }
        return
      }

      setCurrentValues(prev => {
        const newValues = { ...prev }
        const progress = (currentStep + 1) / steps

        // Animate each spec towards target
        newValues.range = Math.ceil(targetValues.range * progress)
        newValues.speed = Math.ceil(targetValues.speed * progress)
        newValues.battery = Math.ceil(targetValues.battery * progress)
        newValues.motor = Math.ceil(targetValues.motor * progress)

        return newValues
      })

      currentStep++
    }, stepDuration)

    animationRef.current = interval

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation()
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -100px 0px' // Start when element is 100px from top
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <CounterContainer ref={containerRef}>
      <CounterTitle>{title}</CounterTitle>
      
      <SpecsContainer>
        {specs.map((spec, index) => (
          <SpecItem key={index}>
            <SpecIcon>
              <i className={spec.icon}></i>
            </SpecIcon>
            <SpecValue $animating={isAnimating}>
              {formatNumber(spec.value)} {spec.unit}
            </SpecValue>
            <SpecLabel>{spec.label}</SpecLabel>
            
            {isAnimating && (
              <ProgressBar>
                <ProgressFill $progress={(currentValues[spec.label.toLowerCase() as keyof typeof currentValues] / spec.target) * 100} />
              </ProgressBar>
            )}
          </SpecItem>
        ))}
      </SpecsContainer>
    </CounterContainer>
  )
}

export default RunningCounter
