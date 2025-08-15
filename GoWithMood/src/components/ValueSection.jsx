import React from "react"
import { ShieldCheck, Clock, Star } from "lucide-react"

const ValueSection = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Trusted & Secure",
      description: "Protected with enterprise-grade encryption.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "AI saves hours of planning and booking.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Star,
      title: "Personalized",
      description: "Tailored to your mood and preferences.",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Plan smarter. Travel better.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Live the mood.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ValueSection
