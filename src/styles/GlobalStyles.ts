import { createGlobalStyle, styled } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #ffffff;
    background-color: #000000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .btn {
    display: inline-block;
    padding: 12px 24px;
    background: #ffffff;
    color: #000000;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;

    &:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }
  }

  .btn-primary {
    background: #ffffff;
    color: #000000;

    &:hover {
      background: #f0f0f0;
    }
  }

  .btn-secondary {
    background: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;

    &:hover {
      background: #ffffff;
      color: #000000;
    }
  }
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`
