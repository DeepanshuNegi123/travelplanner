import React from "react"
import { Link } from "react-router-dom"
import { Rocket } from "lucide-react"

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your GoWithMood Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who found their perfect getaway with AI.
            </p>
            
            <Link
            
              to="/register"
              className="inline-flex items-center space-x-3 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 no-underline"
            >
              <Rocket className="w-6 h-6" />
              <span>Start Now</span>

            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
