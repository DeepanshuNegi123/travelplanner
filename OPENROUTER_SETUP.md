# OpenRouter API Setup Guide

## Why You Need OpenRouter API Key
The AI travel assistant uses OpenRouter to provide intelligent travel recommendations. Without a valid API key, you'll see the error: "❌ Failed to connect to the AI service"

## How to Get a Free OpenRouter API Key

### Step 1: Create OpenRouter Account
1. Go to [https://openrouter.ai/](https://openrouter.ai/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get Your API Key
1. After logging in, go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Click "Create Key"
3. Give it a name like "Travel Planner"
4. Copy the generated API key

### Step 3: Update Your Environment
1. Open `/home/rohith/Documents/GitHub/travelplanner/backnd/.env`
2. Replace `your_openrouter_key_here` with your actual API key:
```
MONGO_URI=mongodb://localhost:27017/travelplanner
PORT=4002
OPENROUTER_KEY=sk-or-v1-your-actual-api-key-here
```

### Step 4: Restart Your Backend
```bash
cd backnd
npm run dev
```

## Alternative: Use Mock AI Service (For Testing)

If you want to test without OpenRouter, I can create a mock AI service that simulates responses.
