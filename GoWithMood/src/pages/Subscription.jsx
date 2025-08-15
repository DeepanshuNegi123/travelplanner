import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Globe,
  Headphones,
  Camera
} from "lucide-react"

const Subscription = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState("pro")

  const plans = [
    {
      id: "free",
      name: "Explorer",
      price: 0,
      period: "Forever",
      description: "Perfect for occasional travelers",
      icon: <Star className="w-6 h-6" />,
      color: "from-gray-400 to-gray-600",
      features: [
        { text: "Basic trip planning", included: true },
        { text: "Up to 3 trips per month", included: true },
        { text: "Standard destinations", included: true },
        { text: "Basic budget calculator", included: true },
        { text: "Email support", included: true },
        { text: "AI recommendations", included: false },
        { text: "VR destination preview", included: false },
        { text: "Priority booking", included: false },
        { text: "Unlimited trips", included: false },
        { text: "Premium destinations", included: false }
      ]
    },
    {
      id: "pro",
      name: "Adventurer",
      price: billingPeriod === "monthly" ? 19 : 190,
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "Best for frequent travelers",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      popular: true,
      features: [
        { text: "Everything in Explorer", included: true },
        { text: "Unlimited trips", included: true },
        { text: "AI-powered recommendations", included: true },
        { text: "VR destination previews", included: true },
        { text: "Premium destinations", included: true },
        { text: "Advanced budget optimization", included: true },
        { text: "Priority customer support", included: true },
        { text: "Group trip planning", included: true },
        { text: "Offline maps", included: true },
        { text: "Concierge service", included: false }
      ]
    },
    {
      id: "premium",
      name: "Globetrotter",
      price: billingPeriod === "monthly" ? 49 : 490,
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "Ultimate travel experience",
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-600 to-pink-600",
      features: [
        { text: "Everything in Adventurer", included: true },
        { text: "24/7 concierge service", included: true },
        { text: "Exclusive luxury destinations", included: true },
        { text: "Personal travel consultant", included: true },
        { text: "VIP booking privileges", included: true },
        { text: "Travel insurance included", included: true },
        { text: "Airport lounge access", included: true },
        { text: "Custom itinerary creation", included: true },
        { text: "White-glove service", included: true },
        { text: "Unlimited everything", included: true }
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure & Protected",
      description:
        "Your data and payments are protected with enterprise-grade security"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Global Coverage",
      description:
        "Access to destinations and services in 200+ countries worldwide"
    },
    {
      icon: <Headphones className="w-8 h-8 text-purple-500" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your travel needs"
    },
    {
      icon: <Camera className="w-8 h-8 text-pink-500" />,
      title: "Memory Keeper",
      description: "Unlimited photo storage and automatic trip documentation"
    }
  ]

  const handleSubscribe = planId => {
    setSelectedPlan(planId)
    // Simulate payment processing
    alert(`Subscribing to ${plans.find(p => p.id === planId)?.name} plan!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Travel{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adventure Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered travel planning with
            features designed for every type of traveler, from weekend explorers
            to global adventurers.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                billingPeriod === "yearly"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular ? "ring-4 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4 text-white`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-800">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check
                        className={`w-5 h-5 mr-3 ${
                          feature.included ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.id === "free"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl hover:scale-105`
                  }`}
                >
                  {plan.id === "free"
                    ? "Get Started Free"
                    : `Choose ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose GoWithMood?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, all paid plans come with a 14-day free trial. No credit
                card required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can cancel your subscription at any time with no
                cancellation fees.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <span>Contact our team</span>
            <Headphones className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Subscription
