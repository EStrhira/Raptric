import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const ManualSection = styled.section`
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

const ManualContainer = styled.div`
  max-width: 1200px;
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

const ManualHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const ManualTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const ManualSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
`

const PDFViewer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(255,255,255,0.15);
  position: relative;
  height: 85vh;
  min-height: 600px;
  max-height: 900px;
  width: 100%;
  border: 2px solid rgba(0, 166, 82, 0.2);
`

const PDFIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
`

const PDFControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`

const ControlButton = styled.button`
  background: #00a652;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
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

const DownloadButton = styled.a`
  background: #00a652;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
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

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #ffffff;
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`

const PDFInfo = styled.div`
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`

const Manual: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Simulate loading check
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handlePDFLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handlePDFError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/eSthira_Raptric_Manual.pdf'
    link.download = 'eSthira_Raptric_Manual.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ManualSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>
            <i className="fas fa-book"></i>
          </BannerIcon>
          <BannerTitle>RAPTRIC eBike Manual</BannerTitle>
          <BannerSubtitle>
            Complete user manual for your RAPTRIC eBike. Browse through the interactive PDF viewer or download for offline reference.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>
      
      <Container>
        <ManualContainer>
          {isLoading && (
            <LoadingMessage>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
              <p>Loading manual...</p>
            </LoadingMessage>
          )}

          {hasError && (
            <ErrorMessage>
              <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff6b6b' }}></i>
              <h3>Unable to load PDF</h3>
              <p>The manual could not be loaded in the viewer. Please try downloading the PDF instead.</p>
              <DownloadButton href="/eSthira_Raptric_Manual.pdf" download="eSthira_Raptric_Manual.pdf">
                <i className="fas fa-download"></i>
                Download Manual
              </DownloadButton>
            </ErrorMessage>
          )}

          {!isLoading && !hasError && (
            <>
              <PDFViewer>
                <PDFIframe
                  src="/eSthira_Raptric_Manual.pdf#view=FitV&toolbar=1&navpanes=1&scrollbar=1"
                  title="eSthira RAPTRIC Manual"
                  onLoad={handlePDFLoad}
                  onError={handlePDFError}
                />
              </PDFViewer>

              <PDFControls>
                <DownloadButton href="/eSthira_Raptric_Manual.pdf" download="eSthira_Raptric_Manual.pdf">
                  <i className="fas fa-download"></i>
                  Download PDF
                </DownloadButton>
              </PDFControls>
            </>
          )}
        </ManualContainer>
      </Container>
    </ManualSection>
  )
}

export default Manual
