import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GlobalStyle } from './styles/GlobalStyles'
import { PaymentProvider } from './context/PaymentContext'
import { AuthProvider } from './context/AuthContext'
import AuthErrorBoundary from './components/AuthErrorBoundary'
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
import LoginPage from './pages/LoginPage'
import PricingPolicy from './components/PricingPolicy'
import CancellationRefundReplacement from './components/CancellationRefundReplacement'
import PrivacyPolicy from './components/PrivacyPolicy'
import ShippingDelivery from './components/ShippingDelivery'
import TermsConditions from './components/TermsConditions'
import WarrantyManual from './components/WarrantyManual'
import WarrantyActivation from './components/WarrantyActivation'
import SafetyTips from './components/SafetyTips'
import FAQ from './components/FAQ'
import Manual from './components/Manual'
import UserAccount from './pages/UserAccount'
import Checkout from './pages/Checkout'
import CustomerDashboard from './pages/CustomerDashboard'
import OrderDetailPage from './pages/OrderDetailPage'
import AddressForm from './components/Address/AddressForm'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login']
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname)

  return (
    <>
      <GlobalStyle />
      {!shouldHideHeader && <Header />}
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
        <Route path="/warrantyactivation" element={<WarrantyActivation />} />
        <Route path="/safety-tips" element={<SafetyTips />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<ProtectedRoute><UserAccount /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/order/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
        <Route path="/address/add" element={<ProtectedRoute><AddressForm /></ProtectedRoute>} />
        <Route path="/address/edit/:addressId" element={<ProtectedRoute><AddressForm isEdit={true} /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      </Routes>
      {!shouldHideHeader && <Footer />}
    </>
  )
}

function App() {
  return (
    <AuthErrorBoundary>
      <AuthProvider>
        <PaymentProvider>
          <Router>
            <AppContent />
          </Router>
        </PaymentProvider>
      </AuthProvider>
    </AuthErrorBoundary>
  );
}

export default App
