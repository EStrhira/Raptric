import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const FAQSection = styled.section`
  padding: 0;
  background: #000000;
`

const BannerSection = styled.div`
  background: linear-gradient(135deg, #00a652, #008040);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/Banner3.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`

const BannerContent = styled.div`
  position: relative;
  z-index: 3;
  color: #ffffff;
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`

const BannerIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-top: -50px;
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 2rem;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  grid-column: 1 / -1;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const FAQTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const FAQSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const CategorySidebar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 2rem;
  }
`

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const CategoryButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'rgba(0, 166, 82, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#00a652' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  padding: 1rem;
  border-radius: 6px;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid ${props => props.$active ? '#00a652' : 'transparent'};

  &:hover {
    background: rgba(0, 166, 82, 0.1);
    color: #00a652;
  }
`

const QuestionsContent = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 2rem;
`

const QuestionsHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const QuestionsTitle = styled.h3`
  color: #00a652;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const QuestionsCount = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`

const QuestionList = styled.div`
  margin-top: 1rem;
`

const QuestionItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const Question = styled.h4`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: #00a652;
  }
`

const QuestionIcon = styled.span<{ $expanded?: boolean }>`
  color: #00a652;
  font-size: 1.2rem;
  font-weight: 700;
  transition: transform 0.3s ease;
  transform: ${props => props.$expanded ? 'rotate(45deg)' : 'rotate(0deg)'};
`

const Answer = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
`

const FAQCTA = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(0, 166, 82, 0.1);
  border-radius: 8px;
`

const CTAButton = styled(Link)`
  background: #00a652;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`

const FAQ: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  const [isLoading, setIsLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  const faqData = [
    {
      category: "About eSthira eBikes",
      questions: [
        {
          question: "What makes eSthira eBikes different from other electric bikes?",
          answer: "eSthira eBikes are designed with superior battery technology, advanced motor systems, and premium components. Our bikes feature: high-capacity lithium-ion batteries with intelligent BMS, brushless DC motors for higher efficiency, regenerative braking, and premium aluminum alloy frames. We use only genuine components from trusted manufacturers and conduct rigorous quality testing."
        },
        {
          question: "What is the battery technology used in eSthira eBikes?",
          answer: "We use advanced lithium-ion battery packs with Battery Management System (BMS) for optimal performance and safety. Our batteries feature: 21700/21700 cells, IP67 waterproof rating, smart charging technology, and thermal management systems. Battery capacity ranges from 15Ah to 20Ah depending on model."
        },
        {
          question: "What is the motor power and type?",
          answer: "eSthira eBikes are equipped with high-performance brushless DC motors ranging from 250W to 500W. We use hub motors for better weight distribution and efficiency. All motors are IP65 rated for weather protection and feature intelligent torque sensors for smooth power delivery."
        },
        {
          question: "What is the frame material and design?",
          answer: "Our frames are crafted from 6061 aluminum alloy for optimal strength-to-weight ratio. We use TIG welding for stronger joints, hydroformed tubes for better aerodynamics, and integrate the battery seamlessly into the downtube. All frames undergo stress testing and come with a lifetime warranty."
        },
        {
          question: "What safety features are included?",
          answer: "eSthira eBikes come with comprehensive safety features including: LED lighting systems, disc brakes with regenerative capability, GPS tracking, anti-theft immobilizer, and smart display panels. We also include reflectors, horn, and emergency stop systems as per regulatory requirements."
        },
        {
          question: "What is the range of eSthira eBikes?",
          answer: "Range varies by model from 40-80 km per charge. Our extended-range models can achieve up to 80 km with pedal assist mode. Actual range depends on rider weight, terrain, weather conditions, and assistance level used."
        },
        {
          question: "Are eSthira eBikes street legal?",
          answer: "Yes, all eSthira eBikes are fully compliant with Indian regulations for electric bicycles. They are registered with ARAI, have required safety certifications, and meet all local transport authority requirements. Maximum speed is limited to 25 km/h as per regulations."
        }
      ]
    },
    {
      category: "Technical Specifications",
      questions: [
        {
          question: "What is the motor power and torque?",
          answer: "Our motors deliver 35-50 Nm of torque, providing excellent acceleration and hill-climbing capability. The power delivery is smooth and responsive, with multiple riding modes: Eco, Normal, and Sport. Peak power output is 500W with 750W burst capability."
        },
        {
          question: "What battery capacity and charging time?",
          answer: "Battery capacity ranges from 15Ah to 20Ah with 48V systems. Charging time is 4-6 hours with fast charger, 8-10 hours with standard charger. Battery life expectancy is 1000+ charge cycles with proper maintenance."
        },
        {
          question: "What is the maximum speed and range?",
          answer: "Maximum speed is 25 km/h (as per regulations). Range varies from 40-80 km depending on model, battery capacity, and riding conditions. Eco mode extends range, while Sport mode provides maximum power."
        },
        {
          question: "What are the weight limits and dimensions?",
          answer: "Maximum rider weight is 120 kg. Bike weight ranges from 22-28 kg including battery. Frame sizes available: Small, Medium, Large to accommodate riders from 5'2\" to 6'4\" tall."
        }
      ]
    },
    {
      category: "Purchase & Pricing",
      questions: [
        {
          question: "What is the price range of eSthira eBikes?",
          answer: "Our eBikes range from ₹45,000 to ₹85,000 depending on model and features. We offer financing options with EMI starting from ₹3,500 per month. Special discounts available for students and corporate bulk orders."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery. EMI options available through leading banks. 0% interest EMI on selected credit cards for 6-12 months."
        },
        {
          question: "Is there a warranty included?",
          answer: "Yes, all eBikes come with comprehensive warranty: 2 years on frame, 1 year on battery and motor, 6 months on electrical components. Extended warranty options available for additional coverage."
        },
        {
          question: "Are there any financing options?",
          answer: "We offer multiple financing options through our banking partners. EMI tenure from 6 to 24 months. Quick approval process with minimal documentation. Special rates for government employees and students."
        }
      ]
    },
    {
      category: "Service & Support",
      questions: [
        {
          question: "What is the service schedule and cost?",
          answer: "Regular service recommended every 3 months or 1000 km. Service cost ranges from ₹500-1500 depending on the service type. Annual comprehensive service available for ₹3000 including all checks and basic parts."
        },
        {
          question: "Where are the service centers located?",
          answer: "We have service centers in major cities across India. Mobile service available in metro areas. Door-step service available for premium customers. Find nearest service center on our website or call our helpline."
        },
        {
          question: "What is covered under warranty?",
          answer: "Warranty covers manufacturing defects in frame, motor, battery, and electrical components. Does not cover wear and tear items like tires, brake pads, chain. Accidental damage and misuse not covered."
        },
        {
          question: "How do I schedule service?",
          answer: "Service can be scheduled through our website, mobile app, or by calling our service helpline. Emergency service available within 24 hours in major cities. Regular service appointments available within 3-5 days."
        }
      ]
    }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const itemKey = `${categoryIndex}-${questionIndex}`
    setExpandedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(item => item !== itemKey)
        : [...prev, itemKey]
    )
  }

  const selectCategory = (index: number) => {
    setSelectedCategory(index)
    setExpandedItems([]) // Reset expanded items when changing category
  }

  const currentCategory = faqData[selectedCategory]

  if (isLoading) {
    return (
      <FAQSection>
        <Container>
          <FAQContainer>
            <LoadingMessage>Loading FAQs...</LoadingMessage>
          </FAQContainer>
        </Container>
      </FAQSection>
    )
  }

  return (
    <FAQSection>
      <Container>
        <FAQContainer>
          <FAQHeader>
            <FAQTitle>Frequently Asked Questions</FAQTitle>
            <FAQSubtitle>
              Find answers to common questions about eSthira eBikes, services, and support.
            </FAQSubtitle>
          </FAQHeader>

          <CategorySidebar>
            <CategoryList>
              {faqData.map((category, index) => (
                <CategoryButton
                  key={index}
                  $active={selectedCategory === index}
                  onClick={() => selectCategory(index)}
                >
                  {category.category}
                </CategoryButton>
              ))}
            </CategoryList>
          </CategorySidebar>

          <QuestionsContent>
            <QuestionsHeader>
              <QuestionsTitle>{currentCategory.category}</QuestionsTitle>
              <QuestionsCount>{currentCategory.questions.length} questions</QuestionsCount>
            </QuestionsHeader>

            <QuestionList>
              {currentCategory.questions.map((item, questionIndex) => {
                const itemKey = `${selectedCategory}-${questionIndex}`
                const isExpanded = expandedItems.includes(itemKey)
                return (
                  <QuestionItem key={questionIndex}>
                    <Question onClick={() => toggleQuestion(selectedCategory, questionIndex)}>
                      <QuestionIcon $expanded={isExpanded}>+</QuestionIcon>
                      <span>{item.question}</span>
                    </Question>
                    <Answer style={{ maxHeight: isExpanded ? '500px' : '0' }}>
                      {item.answer}
                    </Answer>
                  </QuestionItem>
                )
              })}
            </QuestionList>
          </QuestionsContent>

          <FAQCTA style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ color: '#00a652', marginBottom: '1rem' }}>Still have questions?</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <CTAButton to="/contact">
              <i className="fas fa-phone"></i>
              Contact Support
            </CTAButton>
          </FAQCTA>
        </FAQContainer>
      </Container>
    </FAQSection>
  )
}

export default FAQ
