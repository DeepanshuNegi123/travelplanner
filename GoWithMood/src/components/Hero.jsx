import React, { useState } from "react";
import { Rocket } from "lucide-react";
import { aiservices } from "../services/api";
const Hero = () => {
  const [finaloutput , setfinaloutput] = useState(null);
  // In a shared parent component or context:
const [currentStep, setCurrentStep] = useState(1);
const [destinations, setDestinations] = useState([]);
const [aiTripParams, setAiTripParams] = useState(null); // Store AI-generated params
  // State management
  const [loading, setLoading] = useState(false); // Tracks loading state for API calls
  const [isPlanning, setIsPlanning] = useState(false); // Controls flip animation
  const [destination, setDestination] = useState(""); // Stores user input
  const [chatHistory, setChatHistory] = useState([]); // Stores chat messages

  // Scrolls to planning section and triggers flip animation
  const scrollToPlanning = () => {
    setIsPlanning(true);
    setTimeout(() => {
      document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleForward = async()=>{
    if (!chatHistory.length) return;

    const lastmessage = [...chatHistory].reverse().find(msg => msg.type === "ai")?.message;
    if(!lastmessage){
      console.log("no messages");
      return;
    }

    const extractDestinationNames = (text) => {
    const destinationRegex = /(?:destinations|places|locations)[^:]*:\s*([\s\S]+)/i;
    const match = text.match(destinationRegex);

    if (!match) return [];

    return match[1]
      .split('\n')
      .map(line => {
        const cleaned = line.split(/[-:]/)[0].replace(/[^a-zA-Z\s]/g, '').trim();
        return cleaned;
      })
      .filter(name => name.length > 0);
  };

  const destinationNames = extractDestinationNames(lastmessage);

 try {
  console.log(destinationNames);
  const result = await aiservices.getAIdestinations(destinationNames);
  console.log(result.destinations);  


} catch (error) {
  console.error("API failed:", error);
}





  }

  // Handles sending user message to AI and processing response
  const handleSend = async () => {
    if (!destination.trim()) return; // Ignore empty messages

    // Add user's message to chat history
    const userInput = destination.trim();
    setChatHistory((prev) => [...prev, { type: "user", message: userInput }]);

    // AI prompt that guides the response
    const prompt = `Act as a professional travel agent. Based on the user's mood or idea suggest them destinations:
    make sure to include break line after each answer
      first question what is your feeling 
      second question your budget 
      third duration of trip
      User's input: "${userInput}"`;

    setLoading(true);
    try {
      // API call to OpenRouter AI
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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", // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528",
          messages: [
            {
              role: "system",
              content: "You are a helpful travel assistant",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";

      // Add AI response to chat history
      setChatHistory((prev) => [...prev, { type: "ai", message: aiReply }]);
      
    } catch (err) {
      console.error("API request failed", err);
      setChatHistory((prev) => [
        ...prev,
        { type: "ai", message: "❌ Failed to connect to the AI service" },
      ]);
    }

    setLoading(false);
    setDestination(""); // Clear input field
  };

  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main content container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Header section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GoWithMood
          </span>
        </h1>

        {/* Subheader text */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Your Personal AI Travel Designer
          <br />
          Dreaming of the perfect getaway? Whether you're in the mood for
          adventure, relaxation, romance, or fun with friends, GoWithMood
          curates personalized travel plans just for you.
        </p>

        {/* Start planning button */}
        <button
          onClick={scrollToPlanning}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Rocket className="w-5 h-5" />
          <span>Start Planning</span>
        </button>

        {/* Flip container for image/chat interface */}
        <div className="mt-16 h-[400px] w-full max-w-4xl mx-auto perspective-1000" id="plan">
          <div className={`relative w-full h-full transition-all duration-500 ${isPlanning ? "rotate-y-180" : ""}`}>
            
            {/* Front side - Destination image */}
            <div className={`absolute inset-0 backface-hidden ${isPlanning ? "opacity-0" : "opacity-100"}`}>
              <img
                src="https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Beach couple enjoying vacation"
                className="w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-500"
              />
            </div>

            {/* Back side - Chat interface */}
            <div className={`absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl p-6 flex flex-col ${isPlanning ? "opacity-100 rotate-y-180" : "opacity-0"}`}>
              
              {/* Chat header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold">✈️ Travel Assistant</h3>
              </div>

              {/* Chat message display area */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {/* Initial greeting */}
                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                  <p>Hello! Tell me about your dream trip...</p>
                </div>

                {/* Dynamic chat messages */}
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-[80%] ${msg.type === "user" 
                      ? "bg-blue-500 text-white ml-auto" 
                      : "bg-gray-100 mr-auto"}`}
                  >
                    {msg.message}
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] w-fit">
                    <p>Thinking...</p>
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Describe your ideal trip..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  Send
                </button>
<button
  onClick={handleForward}
  disabled={!chatHistory.some(msg => msg.type === "ai")}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
>
  FORWARD
</button>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;