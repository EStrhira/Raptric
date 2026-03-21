import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'

// ---------- Styled Components ----------

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: #000000;
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

const WidgetContainer = styled.div`
  margin-top: 3rem;
`

// ---------- Component ----------

const Testimonials: React.FC = () => {

  useEffect(() => {
    const widgetId = '2556ccd678277553247689bc53b' // Replace with your TrustIndex Widget ID
    const scriptId = 'trustindex-widget-script'

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://widget.trustindex.io/widget/${widgetId}.js`
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle>Real Riders. Real Experiences.</SectionTitle>

        {/* TrustIndex Widget */}
        <WidgetContainer>
          <div className="trustindex-widget" data-locale="en"></div>
        </WidgetContainer>

        <SocialProof>
          <h3>Join Our Growing Community</h3>
          <p>Based on 1000+ Google Reviews with 4.8★ average rating!</p>
        </SocialProof>
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials