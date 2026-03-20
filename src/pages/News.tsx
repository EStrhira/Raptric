import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { client, NewsPost, urlFor } from '../lib/sanity'
import { useScrollToTop } from '../hooks/useScrollToTop'

const NewsSection = styled.section`
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

const NewsContainer = styled.div`
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

const NewsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const NewsTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const NewsSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const NewsCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00a652;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.15);
  }
`

const NewsImage = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

const NewsTitleCard = styled.h3`
  color: #00a652;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const NewsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const NewsDate = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`

const NewsCategory = styled.div`
  background: #00a652;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`

const NewsExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const NewsButton = styled(Link)`
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
  width: 100%;
  justify-content: center;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`

const News: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)

  // Scroll to top when page loads or navigates
  useScrollToTop()

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const data = await (client as any).fetch('*[_type == "news"] | order(publishedAt desc) { _id, title, slug, excerpt, content, publishedAt, image, featured }')
        setNewsArticles(data)
      } catch (error) {
        console.error('Error fetching news articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsArticles()
  }, [])

  if (loading) {
    return (
      <NewsSection>
        <Container>
          <NewsContainer>
            <NewsHeader>
              <NewsTitle>Loading...</NewsTitle>
            </NewsHeader>
          </NewsContainer>
        </Container>
      </NewsSection>
    )
  }

  return (
    <NewsSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>
            <i className="fas fa-newspaper"></i>
          </BannerIcon>
          <BannerTitle>eSthira News</BannerTitle>
          <BannerSubtitle>
            Stay updated with the latest news, announcements, and events from eSthira. Discover what's happening in the world of electric mobility and urban commuting.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <Container>
        <NewsContainer>
          <NewsHeader>
            <NewsTitle>Latest News & Updates</NewsTitle>
            <NewsSubtitle>
              Stay informed about eSthira products, company announcements, and community events. Get the latest updates on electric mobility and urban commuting trends.
            </NewsSubtitle>
          </NewsHeader>

          <NewsGrid>
            {newsArticles.map((article, index) => (
              <NewsCard key={index}>
                <NewsImage>
                  {article.image ? (
                    <img src={urlFor(article.image).width(400).height(200).url()} alt={article.title} />
                  ) : (
                    <i className="fas fa-newspaper"></i>
                  )}
                </NewsImage>
                <NewsTitleCard>{article.title}</NewsTitleCard>
                <NewsMeta>
                  <NewsDate>{new Date(article.publishedAt).toLocaleDateString()}</NewsDate>
                  <NewsCategory>News</NewsCategory>
                </NewsMeta>
                <NewsExcerpt>{article.excerpt}</NewsExcerpt>
                <NewsButton to={`/news/${article.slug.current}`}>
                  <i className="fas fa-arrow-right"></i>
                  Read More
                </NewsButton>
              </NewsCard>
            ))}
          </NewsGrid>
        </NewsContainer>
      </Container>
    </NewsSection>
  )
}

export default News
