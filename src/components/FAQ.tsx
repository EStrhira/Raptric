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
    background: url('/counter-image.jpg') center/cover;
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
  max-width: 1000px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-top: -50px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 2rem;
  }
`

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const FAQCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const FAQCategory = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #00a652;
`

const CategoryTitle = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
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

  &:hover {
    color: #00a652;
  }
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
  const [expandedItems, setExpandedItems] = useState<number[]>([])

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
          question: "What are the battery specifications?",
          answer: "Battery specifications: 36V/48V system, 15-20Ah capacity, Samsung/LG cells, IP67 rating. Charging time: 4-6 hours from empty. Weight: 3.5-4.5 kg. Cycle life: 800-1000 charge cycles with 80% capacity retention after 1000 cycles."
        },
        {
          question: "What are the display and control features?",
          answer: "Multi-function LCD display showing: speed, battery level, assistance mode, distance traveled, and time. Controls: thumb throttle, pedal assist sensor, regenerative brake lever, and mode selection button. USB charging port for mobile device connectivity."
        },
        {
          question: "What are the brake specifications?",
          answer: "Front: 180mm hydraulic disc brakes with regenerative braking. Rear: 160mm hydraulic disc brakes. Both systems feature ABS for enhanced safety. Braking distance from 25 km/h at 3.5m on dry pavement."
        },
        {
          question: "What are the suspension specifications?",
          answer: "Front: 80mm travel suspension fork with adjustable preload and lockout. Rear: 70mm travel suspension with adjustable rebound. Both forks feature hydraulic damping for smooth ride quality. Suspension is optimized for urban commuting with comfort settings."
        },
        {
          question: "What are the wheel and tire specifications?",
          answer: "Wheels: 27.5\" aluminum alloy double-wall rims with CNC machining. Tires: 27.5\" x 2.125\" puncture-resistant tires with Kevlar belting. Tubeless design for reduced weight and improved puncture resistance."
        },
        {
          question: "What is the weight and carrying capacity?",
          answer: "Net weight: 18-22 kg (without battery). Gross weight: 22-25 kg (including battery). Maximum rider weight: 120 kg. Maximum carrying capacity: 15 kg (excluding rider)."
        },
        {
          question: "What are the charging specifications?",
          answer: "Smart charger: 100-240V AC input, 50/60Hz frequency. Charging current: 3A maximum. Features: LED indicators, temperature monitoring, auto-shutoff at full charge, and compatibility with Indian electrical standards."
        }
      ]
    },
    {
      category: "Purchase Information",
      questions: [
        {
          question: "How can I purchase an eSthira eBike?",
          answer: "Visit our authorized dealers in Bengaluru, buy online through our website, or contact our sales team. We offer: cash, card payments, UPI, bank transfers, and EMI options. Free test rides available at all locations."
        },
        {
          question: "What is the price range?",
          answer: "eSthira eBikes range from ₹45,000 to ₹85,000 depending on model and features. Premium models with larger batteries and advanced motors are priced higher. We offer seasonal discounts and corporate pricing for bulk orders."
        },
        {
          question: "Do you offer financing options?",
          answer: "Yes! We provide EMI options through leading banks and financial institutions. Zero down payment options available for qualified buyers. We also accept credit cards with 0% interest EMI for 6-12 months."
        },
        {
          question: "What is included with the purchase?",
          answer: "Complete package includes: eBike, charger, user manual, tool kit, helmet, lock, and first free service. Extended warranty options available for additional coverage."
        },
        {
          question: "Are there any current offers or discounts?",
          answer: "Check our website for current promotional offers. Seasonal discounts during festivals, student discounts, and corporate pricing available. Sign up for our newsletter to receive exclusive offers."
        }
      ]
    },
    {
      category: "Service & Support",
      questions: [
        {
          question: "Where can I get my eSthira eBike serviced?",
          answer: "Authorized service centers in major cities across India. Mobile service vans available for on-site support. Doorstep service available for basic maintenance and repairs. Contact our customer service for nearest location."
        },
        {
          question: "What is the warranty coverage?",
          answer: "Comprehensive warranty: 60 months on frame, 24 months on battery and motor, 6 months on electronics. Extended warranty options available. Warranty covers manufacturing defects and normal wear and tear. Registration required within 30 days of purchase."
        },
        {
          question: "How long does service take?",
          answer: "Regular service: 1-2 business days. Major repairs: 3-5 business days depending on parts availability. Express service available for urgent requirements."
        },
        {
          question: "What spare parts are available?",
          answer: "Complete inventory of genuine spare parts available at all service centers. Common parts in stock: batteries, tires, tubes, brake pads, chains, cables, and accessories. Parts can be ordered online and delivered within 2-3 business days."
        },
        {
          question: "What is the service cost?",
          answer: "Free inspection and diagnosis. Labor charges apply for repairs not covered under warranty. Competitive pricing on spare parts. Service packages available for regular maintenance."
        },
        {
          question: "How can I contact customer support?",
          answer: "Multiple channels available: Phone: +91-93802-76355, Email: info@esthira.com, WhatsApp support, Live chat on website, and social media. 24/7 emergency helpline for urgent issues."
        }
      ]
    },
    {
      category: "Legal & Compliance",
      questions: [
        {
          question: "Are eSthira eBikes legally compliant?",
          answer: "Fully compliant with all Indian regulations. Registered with ARAI. Meets CMVR standards for safety and emissions. All models have necessary certifications and documentation."
        },
        {
          question: "What documents are required for purchase?",
          answer: "Valid ID proof (Aadhar card, Voter ID, Passport for NRI, Driver's License). Address proof with utility bill. PAN card for business purchases. GST registration for corporate orders."
        },
        {
          question: "Is insurance required?",
          answer: "Third-party insurance recommended for comprehensive coverage. We can assist with insurance documentation and process. Insurance covers theft, accident, and third-party liability."
        },
        {
          question: "What are the return and exchange policies?",
          answer: "7-day return policy for manufacturing defects. Exchange available within 30 days for upgrade to higher model. 15% restocking fee for non-defective returns. Detailed terms available on our website."
        }
      ]
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleQuestion = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  return (
    <FAQSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>
            <i className="fas fa-question-circle"></i>
          </BannerIcon>
          <BannerTitle>Frequently Asked Questions</BannerTitle>
          <BannerSubtitle>
            Comprehensive answers to all your questions about eSthira eBikes. Find detailed information about specifications, features, purchase options, and support services.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <Container>
        <FAQContainer>
          {isLoading ? (
            <LoadingMessage>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
              <p>Loading FAQ...</p>
            </LoadingMessage>
          ) : (
            <>
              <FAQHeader>
                <FAQTitle>Got Questions? We Have Answers!</FAQTitle>
                <FAQSubtitle>
                  Browse through our comprehensive FAQ section or contact our support team for detailed information about eSthira eBikes.
                </FAQSubtitle>
              </FAQHeader>

              <FAQCategories>
                {faqData.map((category, categoryIndex) => (
                  <FAQCategory key={categoryIndex}>
                    <CategoryTitle>{category.category}</CategoryTitle>
                    <QuestionList>
                      {category.questions.map((item, questionIndex) => (
                        <QuestionItem key={questionIndex}>
                          <Question onClick={() => toggleQuestion(categoryIndex * 100 + questionIndex)}>
                            {expandedItems.includes(categoryIndex * 100 + questionIndex) ? '−' : '+'} {item.question}
                          </Question>
                          <Answer style={{
                            maxHeight: expandedItems.includes(categoryIndex * 100 + questionIndex) ? '200px' : '0'
                          }}>
                            {item.answer}
                          </Answer>
                        </QuestionItem>
                      ))}
                    </QuestionList>
                  </FAQCategory>
                ))}
              </FAQCategories>

              <FAQCTA>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                  Can't find what you're looking for? Contact our customer support team at +91-93802-76355 or info@esthira.com for personalized assistance.
                </p>
                <CTAButton to="mailto:info@esthira.com">
                  <i className="fas fa-envelope"></i>
                  Email Our Support Team
                </CTAButton>
              </FAQCTA>
            </>
          )}
        </FAQContainer>
      </Container>
    </FAQSection>
  )
}

export default FAQ
