import React from "react"
import {
  Brain,
  Wallet,
  Map,
  Calendar,
  Timer,
  Glasses,
  Camera,
  Users,
  Shield,
  Smartphone,
  Globe,
  Headphones,
  Star,
  CheckCircle,
  Play,
  ArrowRight
} from "lucide-react"

const Features = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Trip Planning",
      features: [
        "Mood-based destination suggestions",
        "Smart activity recommendations",
        "Personalized travel routes",
        "Weather-aware planning"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Wallet,
      title: "Smart Budget Optimization",
      features: [
        "Real-time price tracking",
        "Budget breakdown analysis",
        "Cost-saving suggestions",
        "Currency conversion"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Map,
      title: "Interactive Travel Maps",
      features: [
        "Offline map access",
        "Local points of interest",
        "Navigation integration",
        "Photo location tagging"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Calendar,
      title: "Trip Organization Suite",
      features: [
        "Automatic itinerary sync",
        "Countdown timers",
        "Reminder notifications",
        "Shared trip planning"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Timer,
      title: "Trip Countdown Timer",
      features: [
        "Stay excited with real-time countdowns",
        "Countdown to trip start",
        "Countdown to key activities",
        "Share countdowns with friends",
        "Customizable reminders"
      ],
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: Glasses,
      title: "VR Destination Explorer",
      features: [
        "Virtual reality previews",
        "Explore destinations in 360°",
        "Interactive VR tours",
        "Experience local culture virtually"
      ],
      color: "from-teal-500 to-cyan-600"
    }
  ]

  const additionalFeatures = [
    {
      icon: Camera,
      title: "Photo Management",
      description: "Organize and share your travel memories"
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Collaborate with friends and family"
    },
    {
      icon: Shield,
      title: "Travel Safety",
      description: "Safety alerts and emergency contacts"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Access everything on-the-go"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "200+ countries and destinations"
    },
    {
      icon: Headphones,
      title: "Premium Support",
      description: "24/7 customer support"
    }
  ]

  const steps = [
    {
      number: 1,
      title: "Tell Us Your Preferences",
      description:
        "Share your mood, budget, and preferences. Our AI understands your style.",
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "AI Creates Your Itinerary",
      description:
        "We craft personalized destinations, activities, and accommodations.",
      color: "bg-purple-500"
    },
    {
      number: 3,
      title: "Book & Enjoy",
      description: "Review and book your perfect trip. Then relax and enjoy!",
      color: "bg-green-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text:
        "GoWithMood completely transformed how I plan my travels. The AI suggestions are incredibly accurate!"
    },
    {
      name: "Mike Chen",
      rating: 5,
      text:
        "The budget optimization feature saved me over $500 on my last trip to Japan. Amazing tool!"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text:
        "Having all my trips organized in one place is invaluable. GoWithMood makes it effortless."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Travel Planning
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover how GoWithMood's advanced features make travel planning
            effortless, intelligent, and enjoyable for every type of traveler.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-blue-200">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span>Try Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Core Features That{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Set Us Apart
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the future of travel planning with our intelligent,
              comprehensive feature set
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-100"
                >
                  
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-2 text-gray-600"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Additional Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need for comprehensive travel planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How GoWithMood Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl`}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience the Future of Travel?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <button className="inline-flex items-center space-x-3 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <span>Start Planning Now</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
                <button className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <span>Save for Later</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
