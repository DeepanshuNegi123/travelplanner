# Travel Planner Project Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)
- Git

## Environment Setup

### 1. Backend Setup
```bash
cd backnd
npm install
```

### 2. Frontend Setup
```bash
cd GoWithMood
npm install
```

### 3. Environment Variables
Create/update `.env` file in `backnd/` directory:
```
MONGO_URI=mongodb://localhost:27017/travelplanner
PORT=4002
OPENROUTER_KEY=your_openrouter_key_here
```

## Running the Project

### Option 1: Run Both Frontend and Backend
```bash
cd GoWithMood
npm run dev:fullstack
```

### Option 2: Run Separately

**Backend:**
```bash
cd backnd
npm run dev
```

**Frontend:**
```bash
cd GoWithMood
npm run dev
```

## Project Structure

```
travelplanner/
├── backnd/                 # Backend (Node.js/Express)
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── index.js          # Main server file
│   └── package.json      # Backend dependencies
├── GoWithMood/           # Frontend (React)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── context/      # React context
│   └── package.json      # Frontend dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user/:id` - Get user data

### Trip Management
- `POST /api/trip/book` - Book a trip

### Contact
- `POST /api/contact` - Send contact message

### Chat
- `POST /api/chat` - AI chat functionality

## Features

### Frontend Features
- ✅ React 19 with modern hooks
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Responsive design
- ✅ Component-based architecture

### Backend Features
- ✅ Express.js RESTful API
- ✅ MongoDB with Mongoose
- ✅ JWT authentication
- ✅ CORS enabled
- ✅ Error handling
- ✅ Route organization

### Integration Features
- ✅ AI Chat (OpenRouter)
- ✅ Mock Travel APIs
- ✅ Country API integration
- ✅ VR content simulation
- ✅ Hotel booking simulation

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `sudo systemctl start mongod`
   - Check connection string in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using port: `lsof -ti:4002 | xargs kill -9`

3. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **CORS Issues**
   - Backend has CORS enabled for all origins
   - Check if backend is running on correct port

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **Logs**: Check console for detailed error messages
3. **Database**: MongoDB collections are created automatically
4. **API Testing**: Use Postman or curl to test endpoints

## Production Deployment

### Backend Deployment
1. Set production MongoDB URI
2. Set secure JWT secret
3. Configure CORS for production domain
4. Use PM2 for process management

### Frontend Deployment
1. Run `npm run build`
2. Deploy `dist/` folder to hosting service
3. Configure environment variables

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use secure key management
3. **CORS**: Configure for specific domains in production
4. **Authentication**: Implement proper JWT validation
5. **Input Validation**: Add validation middleware

## Performance Optimization

1. **Database Indexing**: Add indexes for frequently queried fields
2. **Caching**: Implement Redis for session management
3. **CDN**: Use CDN for static assets
4. **Compression**: Enable gzip compression
5. **Monitoring**: Add logging and monitoring tools
