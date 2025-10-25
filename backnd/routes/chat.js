const express = require('express');
const router = express.Router();

// Mock AI responses for testing
const mockResponses = [
  "Based on your preferences, here are some amazing destinations:\n\nDestinations:\n1. Tokyo, Japan - Perfect for food lovers and culture enthusiasts\n2. Santorini, Greece - Stunning sunsets and romantic atmosphere\n3. Bali, Indonesia - Tropical paradise with beautiful beaches\n\nEach destination offers unique experiences and unforgettable memories!",
  "Great choice! Here are some fantastic travel options:\n\nDestinations:\n1. Paris, France - City of love with amazing art and cuisine\n2. New York City, USA - The city that never sleeps\n3. London, England - Rich history and modern attractions\n\nThese destinations offer incredible experiences for every type of traveler!",
  "Excellent! I have some wonderful suggestions for you:\n\nDestinations:\n1. Rome, Italy - Ancient history meets modern charm\n2. Barcelona, Spain - Vibrant culture and stunning architecture\n3. Amsterdam, Netherlands - Beautiful canals and friendly atmosphere\n\nEach location provides unique cultural experiences and amazing sights!"
];

// Proxy endpoint to forward chat requests to OpenRouter using a server-side key
router.post('/', async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_KEY;
    
    // If no API key or it's the placeholder, use mock responses
    if (!apiKey || apiKey === 'your_openrouter_key_here') {
      console.log('Using mock AI responses (no valid OpenRouter key)');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a random mock response
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      return res.json({
        choices: [{
          message: {
            content: randomResponse
          }
        }]
      });
    }

    // Forward the incoming body to OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    // Return the proxied response (preserve status and body)
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error('Chat proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
});

module.exports = router;
