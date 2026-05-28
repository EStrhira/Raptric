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
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 1px;
`

const SpecsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  align-items: start;
  align-content: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`

const SpecItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 120px;
  padding: 10px 0;
`

const SpecValue = styled.div<{ $animating?: boolean }>`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  transition: all 0.5s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  white-space: nowrap;

  span {
    font-size: 60%;
    font-weight: 500;
  }

  ${props => props.$animating && `
    transform: scale(1.1);
    color: #00a652;
  `}

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`

const SpecLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

const SpecIcon = styled.div`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
    motor: 0,
    pas:0,
    gear: 0
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const targetValues = {
    range: 60,
    speed: 25,
    battery: 13,
    motor: 250,
    pas: 5,
    gear: 7
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
    },
    {
      value: currentValues.pas,
      target: targetValues.pas,
      label: "Pedal Assist Levels",
      unit: "",
      icon: "fas fa-circle-dot"
    },
    {
      value: currentValues.gear,
      target: targetValues.gear,
      label: "Gears",
      unit: "",
      icon: "fas fa-gear"
    }
  ]

  const startAnimation = () => {
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    setIsAnimating(true)
    setCurrentValues({
      range: 0,
      speed: 0,
      battery: 0,
      motor: 0,
      pas: 0,
      gear: 0
    })
    animateToTargets()
  }

  const animateToTargets = () => {
    const duration = 3000 // 3 seconds for animation
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1) // Cap at 1

      setCurrentValues({
        range: Math.round(targetValues.range * progress),
        speed: Math.round(targetValues.speed * progress),
        battery: Math.round(targetValues.battery * progress),
        motor: Math.round(targetValues.motor * progress),
        pas: Math.round(targetValues.pas * progress),
        gear: Math.round(targetValues.gear * progress)
      })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        // Ensure final values are exactly the targets
        setCurrentValues({
          range: targetValues.range,
          speed: targetValues.speed,
          battery: targetValues.battery,
          motor: targetValues.motor,
          pas: targetValues.pas,
          gear: targetValues.gear
        })
      }
    }

    animationRef.current = requestAnimationFrame(animate)
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
        cancelAnimationFrame(animationRef.current)
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
              {formatNumber(spec.value)} <span>{spec.unit}</span>
            </SpecValue>
            <SpecLabel>{spec.label}</SpecLabel>
            
            {isAnimating && (
              <ProgressBar>
                <ProgressFill $progress={(spec.value / spec.target) * 100} />
              </ProgressBar>
            )}
          </SpecItem>
        ))}
      </SpecsContainer>
    </CounterContainer>
  )
}

export default RunningCounter
