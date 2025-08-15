import React, { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { aiservices } from "../services/api";

const Hero = () => {
    // State management
    const [finaloutput, setfinaloutput] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [destinations, setDestinations] = useState([]);
    const [aiTripParams, setAiTripParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPlanning, setIsPlanning] = useState(false);
    const [destination, setDestination] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { type: "ai", message: "Hello! Tell me about your dream trip..." }
    ]);
    const [apiError, setApiError] = useState(null);

    // Scroll to planning section
    const scrollToPlanning = () => {
        setIsPlanning(true);
        setTimeout(() => {
            document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
        }, 500);
    };

    // Extract destination names from AI response
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

    // Handle forwarding to get destination details
    const handleForward = async () => {
        if (!chatHistory.length) return;

        const lastmessage = [...chatHistory].reverse().find(msg => msg.type === "ai")?.message;
        if (!lastmessage) {
            setApiError("No AI messages found");
            return;
        }

        try {
            const destinationNames = extractDestinationNames(lastmessage);
            if (destinationNames.length === 0) {
                throw new Error("No destinations found in the message");
            }

            setLoading(true);
            const result = await aiservices.getAIdestinations(destinationNames);

            if (result.destinations) {
                setDestinations(result.destinations);
                setCurrentStep(2);
                setChatHistory(prev => [...prev, {
                    type: "ai",
                    message: `I found these destinations for you: ${result.destinations.join(", ")}`
                }]);
            }
        } catch (error) {
            console.error("API failed:", error);
            setApiError("Failed to fetch destination details");
            setChatHistory(prev => [...prev, {
                type: "ai",
                message: "❌ Failed to get destination details. Please try again."
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Handle sending messages to AI
    const handleSend = async () => {
        if (!destination.trim()) return;

        const userInput = destination.trim();
        setChatHistory(prev => [...prev, { type: "user", message: userInput }]);
        setLoading(true);
        setDestination("");
        setApiError(null);

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
                    "HTTP-Referer": window.location.href,
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1-0528",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful travel assistant. Provide travel destination suggestions in this format:\n\nDestinations:\n1. Place A\n2. Place B\n3. Place C\n\nGive brief reasons for each suggestion."
                        },
                        {
                            role: "user",
                            content: `I want to plan a trip. Here's what I'm looking for: ${userInput}`
                        }
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const aiReply = data.choices?.[0]?.message?.content || "I couldn't process your request.";

            setChatHistory(prev => [...prev, { type: "ai", message: aiReply }]);
        } catch (err) {
            console.error("API request failed", err);
            setApiError(err.message);
            setChatHistory(prev => [...prev, {
                type: "ai",
                message: "❌ Failed to connect to the AI service"
            }]);
        } finally {
            setLoading(false);
        }
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
                            <div className="mb-4 flex justify-between items-center">
                                <h3 className="text-2xl font-bold">✈️ Travel Assistant</h3>
                                {apiError && (
                                    <span className="text-red-500 text-sm">{apiError}</span>
                                )}
                            </div>

                            {/* Chat message display area */}
                            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                                {chatHistory.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg max-w-[80%] ${msg.type === "user"
                                            ? "bg-blue-500 text-white ml-auto"
                                            : "bg-gray-100 mr-auto"}`}
                                    >
                                        {msg.message.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                ))}

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
                                    disabled={loading}
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
                                    disabled={!chatHistory.some(msg => msg.type === "ai") || loading}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                                >
                                    Forward
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