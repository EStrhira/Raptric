import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { getCartCount } from '../utils/cart'

const HeaderContainer = styled.header`
  background: #000000;
  box-shadow: 0 2px 10px rgba(255,255,255,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`

const Nav = styled.nav`
  padding: 1rem 0;
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;

  img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const NavMenu = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.$isOpen ? '0' : '-100%'};
    top: 70px;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0,0,0,0.05);
    padding: 2rem 0;
  }
`

const NavItem = styled.li`
  position: relative;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #cccccc;
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: #000000;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;

  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background: #1a1a1a;
    margin-top: 0.5rem;
    padding: 2rem 0;
  }
`

const DropdownItem = styled.li`
  list-style: none;
`

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a1a1a;
    color: #cccccc;
  }
`

const Hamburger = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 25px;
    height: 3px;
    background: #333;
    margin: 3px 0;
    transition: 0.3s;

    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }

    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'translateY(8px) rotate(45deg)' : 'none'};
    }

    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'};
    }
  }
`

const CartIcon = styled(Link)`
  position: relative;
  color: #ffffff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #00a652;
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #00a652;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setCartCount(getCartCount())
    
    const handleStorageChange = () => {
      setCartCount(getCartCount())
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [location]) // Update when route changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <HeaderContainer>
      <Nav>
        <NavContainer>
          <Logo to="/">
            <img src="/E Sthira Logo Black.png" alt="eSthira" />
          </Logo>
          <NavMenu $isOpen={isMenuOpen}>
            <NavItem>
              <NavLink to="/why-ebikes" onClick={closeMenu}>Why eBikes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/ebikes">
                Shop <i className="fas fa-chevron-down"></i>
              </NavLink>
              <DropdownMenu>
                <DropdownItem><DropdownLink to="/ebikes" onClick={closeMenu}>eBikes</DropdownLink></DropdownItem>
                <DropdownItem><DropdownLink to="/cycles" onClick={closeMenu}>Cycles</DropdownLink></DropdownItem>
                <DropdownItem><DropdownLink to="/accessories" onClick={closeMenu}>Accessories</DropdownLink></DropdownItem>
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/faq">
                Support <i className="fas fa-chevron-down"></i>
              </NavLink>
              <DropdownMenu>
                <DropdownItem><DropdownLink to="/faq" onClick={closeMenu}>FAQ</DropdownLink></DropdownItem>
                <DropdownItem><DropdownLink to="/service" onClick={closeMenu}>Service</DropdownLink></DropdownItem>
                <DropdownItem><DropdownLink to="/safety-tips" onClick={closeMenu}>Safety Tips</DropdownLink></DropdownItem>
                <DropdownItem><DropdownLink to="/manual" onClick={closeMenu}>Manual</DropdownLink></DropdownItem>
              </DropdownMenu>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <CartIcon to="/cart" onClick={closeMenu}>
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
              </CartIcon>
            </NavItem>
            
          </NavMenu>
          <Hamburger $isOpen={isMenuOpen} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
        </NavContainer>
      </Nav>
    </HeaderContainer>
  )
}

export default Header
