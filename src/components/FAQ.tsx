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
  white-space: pre-line;
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
      category: "General",
      questions: [
        {
          question: "How can I try the RAPTRIC Bikes before I buy it?",
          answer: "At eSthira, we believe in giving 100% confidence to our customers with their purchase. So please visit our store to test drive any RAPTRIC of your choice."
        },
        {
          question: "What's the point of an eBike?",
          answer: "eBikes come with a battery-powered assist that comes via pedalling and a throttle. When you push the pedals on a pedal-assist eBike, a motor engages & gives you a boost, so you can ride uphill without tiring yourself. The throttle mode engages the motor when twisted. The throttle allows you to take a break while your eBike continues to move ahead with the help of the motor. This is most useful in Stop-and-Go traffic."
        },
        {
          question: "Do eBike require a licence or registration?",
          answer: "eBikes with speed limit of 25kmph and power limit of 250 watts, require no registration. RAPTRIC by eSthira Mobility qualifies under this criteria and hence doesn't need registration or license to ride."
        },
        {
          question: "How fast can I go on an eBike?",
          answer: "The assistance from the motor cuts off at the speed of 25kmph, but you can go faster by combining your pedal power in the pedal-assist mode. We suggest that every time you hit the pedal, wear the essential biking gear for your safety and follow the state and city rules."
        },
        {
          question: "What is the use of gears on an eBikes?",
          answer: "Though an eBike is sufficient to make your ride easy by itself, you can still opt for gears on our eBike to make that extra difference in comfort of riding when electric assist is switched off."
        },
        {
          question: "Does an eBike come with user manual?",
          answer: "In order to go green and save environment, all our documentation is digital. You can find the user manual here which gives you all information related to the vehicle use, ride, safety, service & warranty."
        },
        {
          question: "Is it legal for kids/minors to use eBikes?",
          answer: "There is no legal regulations in India that prevents kids/minors from using the eBike. So, definitely, kids/minors can ride eBike. However, caution should be exercised (wear the essential biking gear for your safety and follow the state and city rules) as the cycle is powered with a battery and can reach a speed of up to 25kmph."
        },
        {
          question: "Are there any accessories available for my eBike?",
          answer: "There are several accessories readily available for use. Check our accessories section on the website to take your pick. The eBike comes with a wide range of accessories to choose from as per your requirement. You could also visit the eSthira store to check them out!"
        },
        {
          question: "Can I ride eBikes in the monsoons?",
          answer: "Yes, you can ride your eBikes in the monsoon. You have to take some precautions like you should not ride in deep water or heavy rains. After riding, the eBike should be parked in a dry place or under a covered place. After the ride, make sure the eBike and components are kept dry."
        },
        {
          question: "Can I wash my eBike with water?",
          answer: "Yes, you can wash your e-cycle with water but do not put pressure-wash."
        },
        {
          question: "How much does an eBike weigh and how much weight it can carry?",
          answer: "Net weight - 22-25kg; Capacity - 120kg"
        },
        {
          question: "Can I retrofit any other motor or battery or modify my eBike?",
          answer: "No, you cannot do any kind of electrical modification on the eBike. If done, you will void the warranty."
        },
        {
          question: "What are the perks of riding an eBike?",
          answer: "Owning a eBike in India has many advantages, including being economical and friendly to the environment:\n• Low cost of maintenance\n• Beneficial to the environment\n• Regular use keeps you in shape\n• Simple to use\n• eBike's portable battery design makes charging incredibly simple\n• eBikes also have warranties that ensure peace of mind\n• There is no need for a license or registration\n• Dedicated service station is an added advantage of buying an eSthira's eBike."
        },
        {
          question: "How much money can I really save if I use eBikes for regular commuting?",
          answer: "Based on the average range, cost of charging and average commuting distance, you will recover the cost of eBike in 3 years when compared to any other petrol 2 wheeler."
        },
        {
          question: "What do I do if something is not working or goes wrong with my RAPTRIC?",
          answer: "If you encounter any issue with your RAPTRIC Bike, please refer to the YouTube videos for assistance. If you are not able to find any solution to the issue, then please email us at info.esthira@gmail.com or Whatsapp us at +919380276355 and we will help you out. Additionally, you could either take your RAPTRIC to the nearest service store or have help at your doorstep."
        },
        {
          question: "What if my RAPTRIC is delivered faulty or damaged in transit?",
          answer: "We hope you never have to experience that as all our bikes go through high-quality manufacturing tests before they are dispatched. However, such things can happen and if it does, just get in touch with us and we will arrange for the replacement to be delivered."
        }
      ]
    },
    {
      category: "eBikes",
      questions: [
        {
          question: "What riding modes does the RAPTRIC eBike offer?",
          answer: "All RAPTRIC eBike models run on regular pedalling and electric power modes. The RAPTRIC is powered by a 36V 7.8/10.4 Ah Li-on battery and gives you two modes to work with - Pedal Assist and Throttle."
        },
        {
          question: "How does the Pedal Assist mode work?",
          answer: "To ride on Pedal Assist mode, choose any of the PAS Levels (1..5) and start pedalling. The power boost kicks in as soon as you start pedalling. You can change the power assist levels on the move."
        },
        {
          question: "How does the Throttle mode work?",
          answer: "To ride on the throttle mode, twist the throttle to power ahead without pedalling."
        },
        {
          question: "Can I ride an eBike without pedalling?",
          answer: "Yes, eBikes can be used without pedalling when you shift to the throttle mode. Although, it is not recommended to do this for a long duration as it will considerably reduce the range and of course, it will beat the whole purpose of cycling. Pedal-assist mode is much more fun than throttle mode."
        },
        {
          question: "Do eBikes work without battery?",
          answer: "You can ride an eBikes without the use of battery just like a normal cycle. The effort required will be slightly more than normal cycles because the battery and other electronics tends to increase the overall weight by 6-7kgs."
        },
        {
          question: "Do RAPTRIC eBikes come with a removable Battery?",
          answer: "Yes, the battery is fully removable from the RAPTRIC eBike and you can carry it with you. It makes it easier for you to charge it anytime, anywhere."
        },
        {
          question: "Is the battery on a RAPTRIC eBike interchangeable with another RAPTRIC?",
          answer: "Yes, the battery across all RAPTRIC eBikes are structurally the same and interchangeable. You can use a battery pack of another RAPTRIC ebike on yours or buy a spare one at any point of time."
        },
        {
          question: "How long does it take the battery to charge fully and what sort of charging point do I need to recharge?",
          answer: "With the default 2A charger that comes with the bicycle, it takes approximately 3.5 to 4 hours to charge a 7.8Ah battery. And it will take 4-5 hours to charge a 10.4Ah battery. You can charge the battery with a 5 Amps electrical wall socket. If you would like to speed up the charging, you can also buy a 3A charger during purchase or from our accessories section."
        },
        {
          question: "Does the battery charge while pedalling?",
          answer: "No, it does not charge during pedaling. Pedaling is used normally to climb uphill and to increase mileage."
        },
        {
          question: "How often should I charge the battery?",
          answer: "Well, it depends upon your travel plan and state of charge. Otherwise, it is recommended to charge the battery full once in a month if not in use. The battery can also be kept idle for a period of 1 month without charging."
        },
        {
          question: "Is there a way to know the charge level of the battery at any point?",
          answer: "You can always check the battery charge level on the LED display console on the battery. When you only see the red LED, its time to charge your battery."
        },
        {
          question: "What is the range of RAPTRIC's Li-on battery?",
          answer: "Under ideal condition (limited usage of throttle, pedal assist level of 1 or 2 and rider weight of 70kg), the 7.8Ah battery offers a range of 40+ kms and a 10.4Ah battery offers a range of 50+ kms"
        },
        {
          question: "Can I buy an additional battery along with a RAPTRIC eBike?",
          answer: "Yes, you can buy any number of additional batteries at any point of time."
        },
        {
          question: "What is the life of the battery?",
          answer: "The life of a Li-on battery is measured in charge cycles. The RAPTRIC battery comes with 700 charge cycles. However, we have found the actual life in test conditions to be 9000+ charge cycles. You can be rest assured of a life of 4-5 years minimum. Essentially, the battery life depends on how often you charge it. Even after the 700 charge cycles, the battery can still be used with a drop in range."
        },
        {
          question: "Can I lock the battery?",
          answer: "Yes, the battery is locked to the bike and a key should be used to remove it."
        },
        {
          question: "How to handle a removed battery?",
          answer: "Please handle the removed battery carefully without dropping it. Please store it in a cool and dry place. Make sure that there is no metal objects near the battery connectors. Keep it away from kids and liquid items."
        },
        {
          question: "Can I continue to use my eBike after meeting with an accident?",
          answer: "We wish you a very safe ride. However, if you come across an accident, then we recommend you to please visit our store for a health checkup to ensure your safety, while continuing to use the eBike in future."
        },
        {
          question: "What if I loose my battery or eBike keys?",
          answer: "Replacement keys needs to be ordered at our store at additional cost."
        },
        {
          question: "What are the specs of the motor?",
          answer: "The RAPTRIC eBike is equipped with a CE & UL certified, 36V 250W BLDC motor. The motor is programmed to deliver a maximum speed of 25 kmph as a measure of rider safety (ARAI certification requirement)"
        },
        {
          question: "What is the life of the motor?",
          answer: "With good care, the motor has a minimum life of 5 years and can go well beyond"
        },
        {
          question: "Does cycling with a motor make sense at all?",
          answer: "In pedal-assist mode, the motor gives a boost to your pedalling effort. The idea of providing a motor is to reduce tension in your body when you are tired. You can easily push back to the pedal-assist mode and continue pedalling. So, riding an eBike is definitely not cheating. It just enables you to do a lot more."
        },
        {
          question: "How do I switch on the RAPTRIC eBike?",
          answer: "RAPTRIC eBike has a power lock on the handle bar. You will be provided keys using which you can power it on. Additionally, you might have to press the ON/OFF switch on the Display module (based on the model). Please remember to turn on the battery before the above steps."
        },
        {
          question: "What happens if I forget to switch off the eBike?",
          answer: "While it does not cause any damage to the vehicle, it does drain the battery and the cycle might accelerate if somebody accidentally touches the throttle."
        }
      ]
    },
    {
      category: "Payment",
      questions: [
        {
          question: "Is it safe to make payment online on the eSthira's website?",
          answer: "You can pay online on our website with complete peace of mind. When you make the payment on our website, the payment is processed through our fully secured and PCI DSS compliant payment gateway (Razorpay). Your transaction is fully protected and eSthira does not access or keep any of your card, netbanking details."
        },
        {
          question: "What modes are payment are accepted?",
          answer: "We only accept payments by UPI, credit, debit cards and netbanking.We accept cash payments only in our store."
        },
        {
          question: "Do you have an option for cash-on-delivery (COD)?",
          answer: "Unfortunately, we do not support COD. Please make your payment online using your UPI, credit, debit or netbanking accounts. Or pay cash at our store."
        },
        {
          question: "Do you have EMI options available?",
          answer: "Yes, we have easy EMI options available. You will find them during the checkout stage, on the payment gateway page. Do browse the options and select the one that suits you."
        },
        {
          question: "How can I track my order?",
          answer: "Congratulations on your purchase of eBike. You can log in to your account to track your order and get all your updates. You can also click here: Track My Order to track your order and estimate the delivery."
        },
        {
          question: "What should I do for the payment that got deducted from my account, but the transaction failed on the website?",
          answer: "Do not worry. Please call us at +91-93802-76355 and confirm the payment status with us. If we have not received the payment, then usually the amount will get reversed to the same payment method. You can check with your bank for more details."
        }
      ]
    },
    {
      category: "Store & Service",
      questions: [
        {
          question: "When can I collect my RAPTRIC from store?",
          answer: "If the store already has the model that you have chosen/placed order for, you can take on-the-spot delivery. We suggest calling the store before leaving the house. In case of non-availability, you can still place your order at the store and the RAPTRIC will be delivered to you within 5-10 working days."
        },
        {
          question: "Do you have any stores near my location?",
          answer: "Our store is located here. Additionally, you can check if there is any of our retail partners near to you here."
        },
        {
          question: "Does RAPTRIC have service facilities for its Bikes?",
          answer: "RAPTRIC has an authorised service centre in Bengaluru, giving you complete piece of mind. Please visit us at the store here for servicing your Bike."
        },
        {
          question: "How often does an RAPTRIC need servicing?",
          answer: "Usually our Bikes are maintenance free. However, we recommend to get regular health checkup at least once in 3 months."
        }
      ]
    },
    {
      category: "Assembly",
      questions: [
        {
          question: "Does the RAPTRICc Bikes come fully assembled or is there any assembling required?",
          answer: "The eBike comes to you 90% assembled, in a well-packaged carton box. You will need very little assembly to do before your RAPTRIC is ready to ride. You will receive a video link for detailed step-by-step assembly instructions and assembling your RAPTRIC won't be difficult at all. In fact you will love doing it."
        },
        {
          question: "Can I get physical help to have the RAPTRIC eBike assembled when delivered onsite?",
          answer: "As the assembly is simple and only mechanical, you can also visit your local cycle store for getting it assembled."
        },
        {
          question: "How long will it take for the assembly of the bike after delivery?",
          answer: "As Each RAPTRIC bike comes to you 90% assembled, the assembly of the bike shouldn't take more than an 30 mins, if done by an expert."
        }
      ]
    },
    {
      category: "Return or Exchange",
      questions: [
        {
          question: "What is your Returns / exchange policy?",
          answer: "Every RAPTRIC Bike is manufactured and tested with the highest quality standard. We are proud to say that finding a flaw in our cycle is quite rare. For any manufacturing defect or missing/defective components, you can drop us an email at info.esthira@gmail.com. We don't accept return/exchange but we will support you for any issue/defect with your RAPTRIC Bike."
        }
      ]
    },
    {
      category: "Health & Fitness",
      questions: [
        {
          question: "Does cycling help you in reducing weight?",
          answer: "Cycling is a great form of exercise to reduce weight. It can be adopted by those who are struggling in the gym or even those who prefer outdoor activities over gym workouts. Cycling helps burn calories within the first 30 minutes of hitting the pedal, so it is a great way to stay in form."
        },
        {
          question: "Can I burn fat by cycling?",
          answer: "Yes, cycling is a great way to burn fat and lose calories. The outdoor activity is an excellent physical activity as well as aids mental wellness."
        },
        {
          question: "Can you lose belly fat by cycling?",
          answer: "Cycling is one of the top three ways of losing belly fat. The stubborn belly fat is extremely difficult to get rid of however, cycling remains an effective way to lose it. Cycling not only gets your heart rate up but also has the capacity to burn a significant number of calories. Health experts suggest that regular cycling can burn more calories and thereby help you lose weight."
        },
        {
          question: "How many calories are burnt while cycling?",
          answer: "It is recommended that you must at least cycle for a span of 30 minutes for your body to start burning calories. According to Harvard Health Publishing, a 70-KG person can burn 446 calories in just 30 minutes by cycling at a speed of 25 to 30 kmph. Burning excess calories aids weight loss. Cycling is a great form of workout to help you lose weight and also give you a break from the monotony of life."
        },
        {
          question: "Are eBikes better for my joints?",
          answer: "eBike make bike riding fun and more convenient especially when you are on a steep slope and want to reduce the pressure on your knees and joints. With a motor that takes up for you when you need a break, you can easily shift to the throttle mode if you are too tired. This helps relieve stress on your knees, hips and joints."
        },
        {
          question: "How does riding a cycle help in child development?",
          answer: "Cycling will help your child develop their leg muscles and strengthen their bones. The continued exercise will help build their stamina and improve their cardiovascular development. It will also increase their coordination and balance. Riding a bicycle is something all children should be able to experience. Moreover, cycling is a great teacher of different life lessons that children can learn and apply to their growth."
        },
        {
          question: "If my motivation is to exercise, a conventional bike is a better choice. Then why should I buy an eBike?",
          answer: "eBikes brings the best of both worlds together (option of cycling in the traditional form or using a motor when needed). For someone who is motivated from fitness perspective, one can still use an eBike in traditional form. But due to the various road and weather scenarios (like steep gradients, stop and go traffic, etc), an eBike can make your exercise more joyful."
        },
        {
          question: "I want to exercise but do not have time for it. How can an eBike help me?",
          answer: "Our recommendation - you can use the eBike on electric mode while going to work/study/to meet someone so that you are still fresh and energetic. While returning, you can either completely switch off the assist or lower the assist (based on your need) and return back home, completing your exercise for the day. In this way, you do not have to reserve time specifically for exercise."
        }
      ]
    },
    {
      category: "Delivery",
      questions: [
        {
          question: "What is the delivery time frame?",
          answer: "We are currently delivering the RAPTRIC Bikes within 10 working days"
        },
        {
          question: "How is the RAPTRIC delivered to me and from where?",
          answer: "We will deliver your RAPTRIC Bike right at your doorstep, in a safe and well-packaged condition from our Bengaluru office."
        },
        {
          question: "Can the Bike be delivered sooner?",
          answer: "We are trying our best to reduce the delivery time. However, due to various dependencies on third party logistics providers for delivery, it wouldn't be possible to deliver sooner for now. But we would still recommend you to call once at our sales number +91-9380276355 and check."
        },
        {
          question: "Do you ship all across the country?",
          answer: "In order to provide the best in class service to our customers, we are only delivering within Bengaluru for now. We will soon be expanding to other cities too. Please check our store locations here for more details."
        }
      ]
    },
    {
      category: "Company",
      questions: [
        {
          question: "How old is your brand?",
          answer: "eSthira Mobility is a startup which was founded in 2018. In the last 5 years, we have studied the market, analyzed all the existing eBikes and perfected our product RAPTRIC eBikes, that offers a very safe and quality product to our consumers."
        },
        {
          question: "Where is your company based out of?",
          answer: "The headquarters of eSthira Mobility is located in the garden and silicon city - Bengaluru"
        },
        {
          question: "I would like to order a RAPTRIC Bike. How do I do that?",
          answer: "Firstly, congratulations!!! You are going to have a great riding experience with your RAPTRIC Bike, get ready to create some fun riding memories. You can order a RAPTRIC here on our website or visit our store. Order your RAPTRIC and in most cases you will have your bike delivered within 5-10 working days."
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
    setExpandedItems(prev => {
      // If clicking on already expanded item, collapse it
      if (prev.includes(itemKey)) {
        return []
      }
      // Otherwise, collapse all others and expand only this one
      return [itemKey]
    })
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
    <>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
  <i className="fas fa-question-circle"></i>
</BannerIcon>
            <BannerTitle>Frequently Asked Questions</BannerTitle>
            <BannerSubtitle>
              Find answers to common questions about eSthira eBikes, services, and support.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>
      <FAQSection>
        <Container>
          <FAQContainer>
            <FAQHeader>
              <FAQTitle>Browse by Category</FAQTitle>
              <FAQSubtitle>
                Select a category to view related questions and answers.
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
          </FAQContainer>
          
          <FAQCTA>
            <h3 style={{ color: '#00a652', marginBottom: '1rem' }}>Still have questions?</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <CTAButton to="/contact">
              <i className="fas fa-phone"></i>
              Contact Support
            </CTAButton>
          </FAQCTA>
        </Container>
      </FAQSection>
    </>
  )
}

export default FAQ
