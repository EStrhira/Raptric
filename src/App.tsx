import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './styles/GlobalStyles'
import { PaymentProvider } from './context/PaymentContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EBikes from './pages/EBikes'
import EBikeDetail from './pages/EBikeDetail'
import Cycles from './pages/Cycles'
import CycleDetail from './pages/CycleDetail'
import Accessories from './pages/Accessories'
import AccessoryDetail from './pages/AccessoryDetail'
import Cart from './pages/Cart'
import CheckoutAddress from './pages/CheckoutAddress'
import OrderSuccess from './pages/OrderSuccess'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Blog from './pages/Blog'
import News from './pages/News'
import WhyEbikes from './pages/WhyEbikes'
import PricingPolicy from './components/PricingPolicy'
import CancellationRefundReplacement from './components/CancellationRefundReplacement'
import PrivacyPolicy from './components/PrivacyPolicy'
import ShippingDelivery from './components/ShippingDelivery'
import TermsConditions from './components/TermsConditions'
import WarrantyManual from './components/WarrantyManual'
import SafetyTips from './components/SafetyTips'
import FAQ from './components/FAQ'
import Manual from './components/Manual'

function App() {
  return (
    <PaymentProvider>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why-ebikes" element={<WhyEbikes />} />
          <Route path="/ebikes" element={<EBikes />} />
          <Route path="/ebike/:slug" element={<EBikeDetail />} />
          <Route path="/cycles" element={<Cycles />} />
          <Route path="/cycle/:slug" element={<CycleDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutAddress />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/accessory/:slug" element={<AccessoryDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/news" element={<News />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing-policy" element={<PricingPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
        <Route path="/cancellation-refund-replacement" element={<CancellationRefundReplacement />} />
        <Route path="/warranty" element={<WarrantyManual />} />
        <Route path="/safety-tips" element={<SafetyTips />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </Router>
    </PaymentProvider>
  )
}

export default App
