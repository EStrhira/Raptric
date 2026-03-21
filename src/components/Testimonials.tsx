import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: #000000;
`

const WidgetContainer = styled.div`
  margin-top: 3rem;

  .trustindex-widget {
    background: #1a1a1a !important;
    color: #fff !important;
    border-radius: 12px !important;
  }
`

const Testimonials: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!widgetRef.current) return

    // Create the script element using the correct TrustIndex embed URL
    const script = document.createElement('script')
    script.src = 'https://widget.trustindex.io/trustindex.js'
    script.async = true
    script.setAttribute('data-widget-id', '2556ccd678277553247689bc53b') // Your widget ID
    widgetRef.current.appendChild(script)

    return () => {
      // Clean up script on unmount
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle>Real Riders. Real Experiences.</SectionTitle>

        {/* TrustIndex Widget */}
        <WidgetContainer ref={widgetRef}></WidgetContainer>
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials