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
    box-shadow: 0 4px 6px rgba(255,255,255,0.1) !important;
    padding: 1rem !important;
  }

  .trustindex-widget a {
    color: #00a652 !important;
  }

  .trustindex-widget .trustindex-review-card {
    background: #1a1a1a !important;
    color: #fff !important;
    border-radius: 12px !important;
    padding: 1rem !important;
  }

  .trustindex-widget .trustindex-rating {
    color: #ffd700 !important;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .trustindex-widget {
      padding: 0.5rem !important;
    }

    .trustindex-widget .trustindex-review-card {
      padding: 0.5rem !important;
    }
  }
`

const SocialProof = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);

  h3 {
    color: #00a652;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }
`

const Testimonials: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!widgetRef.current) return

    // Remove any previous widget scripts to avoid duplicates
    widgetRef.current.innerHTML = ''

    // Create the TrustIndex script
    const script = document.createElement('script')
    script.src = 'https://widget.trustindex.io/trustindex.js'
    script.async = true
    script.setAttribute('data-widget-id', '2556ccd678277553247689bc53b') // Your Widget ID
    widgetRef.current.appendChild(script)
  }, [])

  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle>Real Riders. Real Experiences.</SectionTitle>

        {/* TrustIndex Widget */}
        <WidgetContainer ref={widgetRef}></WidgetContainer>

        <SocialProof>
          <h3>Join Our Growing Community</h3>
          <p>Based on 1000+ Google Reviews with 4.8★ average rating!</p>
        </SocialProof>
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials