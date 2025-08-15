import React from "react"
import {
  Brain,
  CloudDrizzle,
  Wallet,
  Map,
  Timer,
  Glasses,
  Route,
  Mountain
} from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Packing Assistant",
      description:
        "Smart packing suggestions based on destination and activities.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CloudDrizzle,
      title: "Weather-Based Slots",
      description: "Activities planned around weather forecasts.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Wallet,
      title: "Smart Budget Breakdown",
      description: "Detailed expense planning and cost optimization.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Map,
      title: "Interactive Map Suggestions",
      description: "Visual trip planning with interactive maps.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Timer,
      title: "Trip Countdown Timer",
      description: "Build excitement with countdown to your trip.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Glasses,
      title: "VR Destination Explorer",
      description: "Virtual reality previews of destinations.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Route,
      title: "Trip Timeline on Map",
      description: "Visual journey timeline with location markers.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Mountain,
      title: "Adventure Suggestions",
      description: "Must-see curated spots and experiences.",
      color: "from-amber-500 to-orange-500"
    }
  ]



  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Unlock a customized travel experience with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Technology
            </span>
          </h2>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>

            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
