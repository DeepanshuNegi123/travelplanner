import React from "react"
import AITripPlanner from "./components/aitripplanner"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./components/Hero"
import TripPlanner from "./components/TripPlanner"
import MyTrips from "./components/MyTrips"
import FeaturesSection from "./components/Features"
import Booking from "./components/Booking"
import ValueSection from "./components/ValueSection"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import LoginModal from "./components/LoginModal"
import Features from "./pages/Features"
import Register from "./pages/Register"
import Subscription from "./pages/Subscription"
import MyBookings from "./pages/MyBookings"
import { TripProvider } from "./context/TripContext"
import Profile from "./pages/profile"
import "./styles/globals.css"
import ContactUs from "./pages/contact"

function App() {
  return (
    <TripProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Hero />
                  {/* <TripPlanner /> */}
                  <FeaturesSection />
                  <Booking />
                  <ValueSection />
                  <CTA />
                </main>
              }
            />
            <Route path="/features" element={<Features />} />
            <Route path="/plan" element={<TripPlanner />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/register" element={<Register />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <Footer />
          <LoginModal />
        </div>
      </Router>
    </TripProvider>
  )
}

export default App
