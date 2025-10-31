# FlowOne Voice - AI Agent Builder Demo

**A revolutionary visual AI agent builder where users create and configure conversational AI agents using natural language (voice or chat) instead of traditional forms.**

## 🎯 Project Overview

FlowOne Voice is a production-ready demo application that showcases:
- **Voice/Chat-configured agents** - Create AI agents by describing them naturally
- **Real-time persona adaptation** - Change agent behavior mid-conversation
- **Visual workflow builder** - Professional ReactFlow-based canvas
- **Powered by Claude Sonnet 4.5** - Advanced AI orchestration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Anthropic API key

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=3001
ANTHROPIC_API_KEY=your_anthropic_api_key_here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
```

Start frontend:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📋 Features

### 1. Voice/Chat Configuration
- Click the blue floating button to open the AI Assistant
- Switch between Chat and Voice modes
- Say or type: "Create a friendly math tutor"
- Watch your agent appear on the canvas

### 2. Agent Testing
- Click "Test" on any agent node
- Have a conversation with your agent
- Test different scenarios

### 3. Real-Time Persona Switching (🌟 The Wow Feature)
- During a conversation, click a persona preset
- Watch the node flash on the canvas
- Agent's next response reflects the new personality
- **Same agent, different persona, real-time!**

### 4. Agent Templates
- Quick-start with pre-configured agent templates:
  - Math Tutor
  - Sales Coach
  - Wellness Coach
  - Code Reviewer

## 🏗️ Architecture

```
Backend (Node.js + Express)
├── AI Services (Anthropic Claude)
│   ├── Configuration Agent (interprets user requests)
│   ├── Conversational Agents (user-created)
│   └── Persona Adaptation (real-time modifications)
├── REST API (Agent CRUD, chat endpoints)
└── WebSocket (real-time updates)

Frontend (React + TypeScript)
├── ReactFlow Canvas (visual builder)
├── Zustand State Management
├── React Query (data fetching)
└── Framer Motion (animations)
```

## 🎬 Demo Script (5 minutes)

### [0:00 - 0:30] Hook
"What if configuring AI agents didn't require forms?"

### [0:30 - 1:30] Voice Configuration
1. Click AI Assistant
2. Switch to Voice mode
3. Say: "Create a friendly math tutor"
4. Agent appears instantly

### [1:30 - 2:30] Testing
1. Click "Test" on Math Tutor
2. Ask: "Can you explain quadratic equations?"
3. Follow-up questions

### [2:30 - 3:30] 🌟 Persona Switch (WOW Moment)
1. Click "Professional Advisor" preset
2. Watch canvas node flash
3. Next response is dramatically different
4. "Same agent. Different persona. Real-time."

### [3:30 - 5:00] Technical Deep Dive & Q&A

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express + TypeScript
- Anthropic Claude Sonnet 4.5
- Socket.io (WebSocket)
- In-memory storage (demo)

**Frontend:**
- React 18 + TypeScript
- ReactFlow v11
- Zustand (state)
- React Query (data)
- Framer Motion (animations)
- Tailwind CSS
- Lucide React (icons)

## 📝 API Endpoints

### Agents
- `GET /api/agents` - List all agents
- `POST /api/agents` - Create agent
- `PATCH /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent

### Chat
- `POST /api/chat/config` - AI configuration assistant
- `POST /api/chat/test` - Test agent conversation
- `POST /api/chat/adapt-persona` - Adapt agent persona

### WebSocket Events
- `agent-created` - New agent created
- `agent-changed` - Agent updated
- `persona-changed` - Persona adapted

## 🎨 Key Components

### Frontend
- `FlowCanvas` - ReactFlow canvas with agent nodes
- `AgentNode` - Visual agent representation
- `AIConfigAssistant` - Voice/chat configuration interface
- `VoiceInput` - Web Speech API integration
- `VoiceTestPanel` - Agent testing with persona switching
- `AgentPalette` - Quick template selection

### Backend
- `AIService` - Claude API integration
- `AgentController` - REST API handlers
- `ChatController` - Configuration & testing logic
- `WebSocket Handler` - Real-time updates

## 🔑 Key Innovations

1. **Zero-form UX** - No traditional configuration forms
2. **Natural Language Processing** - Claude interprets intent
3. **Runtime Prompt Engineering** - Real-time persona switching
4. **Visual + Voice Interface** - Best of both worlds

## 🐛 Known Limitations

- Voice recognition requires Chrome/Edge/Safari
- In-memory storage (data lost on restart)
- No authentication (demo mode)
- Single-user only

## 🚧 Future Enhancements

- Text-to-speech responses
- Persistent database (PostgreSQL)
- Multi-user support with auth
- Agent workflow orchestration
- Export/import configurations
- Production deployment

## 📚 Resources

- [ReactFlow Docs](https://reactflow.dev/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 📄 License

MIT

## 🎉 Demo Event

**Frontier Builds Demo Night**
Allen Institute for AI
November 12, 2025

---

Built with ❤️ for the AI research community
