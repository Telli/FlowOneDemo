# FlowOne Voice - Setup Guide

## 🚀 Quick Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Backend Environment

Create `backend/.env` file:
```bash
PORT=3001
ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** Replace `your_actual_anthropic_api_key_here` with your real Anthropic API key from https://console.anthropic.com/

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Configure Frontend Environment

Create `frontend/.env` file:
```bash
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
```

### Step 5: Start the Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

You should see:
```
╔═══════════════════════════════════════════╗
║   FlowOne Voice Backend Server            ║
║   Running on port 3001                    ║
║   Environment: development                ║
╚═══════════════════════════════════════════╝
```

### Step 6: Start the Frontend App

Open a **new terminal** and run:
```bash
cd frontend
npm start
```

The app will automatically open at http://localhost:3000

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:3001
- [ ] Frontend running on http://localhost:3000
- [ ] No console errors in the terminal
- [ ] Anthropic API key is set correctly in backend/.env

## 🎮 Testing the Application

### Test 1: Create Agent with Voice
1. Click the blue floating button (AI Assistant)
2. Click "Voice" tab
3. Click the microphone and say: "Create a friendly math tutor"
4. Watch the agent appear on the canvas

### Test 2: Create Agent with Chat
1. Click the AI Assistant button
2. Stay in "Chat" tab
3. Type: "Create a professional sales coach"
4. Press Enter or click Send
5. New agent appears on canvas

### Test 3: Use Agent Templates
1. Look at the left sidebar (Agent Palette)
2. Click any template (Math Tutor, Sales Coach, etc.)
3. Agent instantly appears on canvas

### Test 4: Test an Agent
1. Click "Test" button on any agent node
2. Type a message in the test panel
3. Get a response from your agent

### Test 5: 🌟 Real-Time Persona Switching (The WOW Feature!)
1. While testing an agent, click a persona preset (e.g., "Professional")
2. Watch the canvas node flash
3. Continue the conversation
4. Notice how the agent's tone changes completely

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:** Make sure the backend server is running on port 3001

### Issue: "Voice recognition not working"
**Solution:**
- Use Chrome, Edge, or Safari (Firefox doesn't support Web Speech API)
- Grant microphone permissions when prompted
- Use the Chat mode as an alternative

### Issue: "API key error"
**Solution:**
- Check that `ANTHROPIC_API_KEY` is set in `backend/.env`
- Make sure there are no quotes around the key
- Verify your API key at https://console.anthropic.com/

### Issue: "Port already in use"
**Solution:**
- Kill the process using port 3001: `lsof -ti:3001 | xargs kill -9`
- Or change the port in `backend/.env` and `frontend/.env`

### Issue: "Module not found" errors
**Solution:**
- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │  Agent   │  │ ReactFlow│  │  AI Config Assistant │ │
│  │ Palette  │  │  Canvas  │  │  (Voice + Chat)      │ │
│  └──────────┘  └──────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                        ↕ HTTP + WebSocket
┌─────────────────────────────────────────────────────────┐
│                     BACKEND                             │
│  ┌──────────────┐  ┌────────────┐  ┌────────────────┐ │
│  │ Claude API   │  │  REST API  │  │   WebSocket    │ │
│  │ (Sonnet 4.5) │  │  Endpoints │  │   Real-time    │ │
│  └──────────────┘  └────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 🎬 Demo Flow (5 Minutes)

### Minute 0-1: Introduction
- "What if you could build AI agents without filling out forms?"
- Show the clean interface

### Minute 1-2: Voice Configuration
- Click AI Assistant
- Use voice: "Create a friendly math tutor"
- Agent appears instantly

### Minute 2-3: Agent Testing
- Click Test on the agent
- Ask: "Explain quadratic equations"
- Show natural conversation

### Minute 3-4: 🌟 Persona Switching (WOW Moment)
- During conversation, click "Professional" persona
- Watch node flash
- Next response is completely different
- "Same agent. Different persona. Real-time."

### Minute 4-5: Technical Discussion & Q&A
- Show architecture
- Discuss Claude integration
- Answer questions

## 📝 Key Features to Highlight

1. **Zero-Form Configuration** - No traditional UI forms
2. **Voice & Chat Input** - Choose your interface
3. **Real-Time Updates** - WebSocket integration
4. **Visual Workflow** - ReactFlow canvas
5. **Persona Switching** - Runtime behavior modification
6. **Professional UI** - Tailwind CSS with animations

## 🔑 Important Notes

- **Voice works best in Chrome/Edge/Safari**
- **Data is stored in memory** (lost on server restart)
- **Single-user demo mode** (no authentication)
- **Requires Anthropic API key** (get one at console.anthropic.com)

## 🚧 Next Steps After Demo

After the demo, consider:
- Adding persistent database (PostgreSQL)
- Implementing user authentication
- Adding text-to-speech responses
- Creating agent workflow orchestration
- Deploying to production

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review the main README.md
3. Check console logs in both terminals
4. Verify environment variables are set correctly

---

Good luck with your demo! 🎉
