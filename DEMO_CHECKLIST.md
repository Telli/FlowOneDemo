# FlowOne Voice - Demo Day Checklist

## 📋 Pre-Demo Preparation (1 day before)

### Technical Setup
- [ ] Test both backend and frontend start successfully
- [ ] Verify Anthropic API key is working
- [ ] Test voice input in Chrome/Edge/Safari
- [ ] Test all 4 persona switching presets
- [ ] Create 2-3 backup agents in advance (in case of live demo issues)
- [ ] Clear browser cache and test in clean state
- [ ] Test on the actual presentation machine
- [ ] Verify internet connection is stable
- [ ] Have backup hotspot ready

### Demo Content
- [ ] Memorize the 5-minute script
- [ ] Practice voice commands 5+ times
- [ ] Prepare 3 example agent creation phrases:
  - "Create a friendly math tutor"
  - "I need a professional sales coach"
  - "Make me a wellness advisor who's empathetic"
- [ ] Test persona switching with real conversations
- [ ] Prepare answers to expected questions

### Backup Plans
- [ ] Record a backup video demo (in case WiFi fails)
- [ ] Have screenshots of key moments
- [ ] Prepare fallback to chat mode if voice fails
- [ ] Have pre-created agents ready to show
- [ ] Print architecture diagram as backup

## 🎬 Demo Day - 30 Minutes Before

### Setup Checklist
1. [ ] Start backend server (`cd backend && npm run dev`)
2. [ ] Verify backend shows "Running on port 3001"
3. [ ] Start frontend (`cd frontend && npm start`)
4. [ ] Open http://localhost:3000
5. [ ] Close any unnecessary browser tabs
6. [ ] Clear any existing agents from canvas
7. [ ] Test microphone permissions
8. [ ] Zoom browser to 100% or 125% for visibility
9. [ ] Close developer tools
10. [ ] Have terminal windows ready but minimized

### Screen Layout
- Browser: Full screen or maximized
- Terminal 1 (backend): Minimized but accessible
- Terminal 2 (frontend): Minimized but accessible
- Backup video: Desktop ready
- Architecture diagram: Desktop ready

## 🎤 Demo Script (5 minutes)

### [0:00 - 0:30] The Hook
```
"What if configuring AI agents didn't require forms,
dropdowns, or complex UIs? What if you could just...
describe what you want? Let me show you."

[Show clean FlowOne Voice interface]
```

### [0:30 - 1:30] Voice Configuration
```
"I'll create an AI agent using only my voice."

[Click blue AI Assistant button]
[Switch to Voice tab]
[Click microphone]
[Say clearly]: "Create a friendly math tutor that encourages students"

[Watch agent appear on canvas]

"Zero forms. Zero configuration screens. Just natural language."
```

### [1:30 - 2:30] Agent Testing
```
"Let's test it."

[Click "Test" on the Math Tutor node]
[Type or say]: "Can you explain quadratic equations?"

[Agent responds]

[Follow up]: "How is this used in real-world business?"

[Show natural conversation flow]

"This is a fully functional AI agent, configured in seconds."
```

### [2:30 - 3:30] 🌟 The WOW Moment - Persona Switching
```
"Here's where it gets interesting. Watch this."

[During conversation, click "Professional Advisor" preset]

[Point to canvas]: "See that flash? The agent just changed."

[Continue conversation]

[Next response is noticeably different - formal, business-focused]

"Same agent. Same conversation context.
Completely different personality. In real-time.
No restart. No reconfiguration."

[Let this sink in]
```

### [3:30 - 4:30] Technical Deep Dive
```
"How does this work?"

[Show architecture if time permits]

"We use Claude Sonnet 4.5 in two ways:
1. Configuration Agent - interprets your natural language
2. Conversational Agents - your created agents

The persona switch? Runtime prompt engineering.
We reconstruct the system prompt in real-time,
preserving context but shifting personality."

[Optional]: "This shouldn't work this well, but it does."
```

### [4:30 - 5:00] Closing & Questions
```
"This is live. This is real. This is the future of
AI agent configuration.

Questions?"
```

## 🎯 Key Messages to Emphasize

1. **Zero-form UX** - "No traditional UI"
2. **Voice-first** - "Just describe what you want"
3. **Real-time adaptation** - "Changes mid-conversation"
4. **Research-grade** - "Pushing prompt engineering limits"
5. **Production-ready** - "Not a prototype"

## ❓ Anticipated Questions & Answers

**Q: What if voice recognition fails?**
A: "Great question! That's why we built chat mode as a fallback. Same functionality, different input."

**Q: How do you preserve context during persona switch?**
A: "We reconstruct the system prompt dynamically while maintaining the conversation history. The LLM sees a modified persona instruction but keeps all previous messages."

**Q: Can agents remember past conversations?**
A: "In this demo, yes - within a session. For production, we'd add persistent storage. The architecture supports it."

**Q: What about more complex agent workflows?**
A: "The canvas you see is ReactFlow - it fully supports connections between agents. We focused on the persona switching for this demo, but multi-agent orchestration is the natural next step."

**Q: How do you prevent prompt injection?**
A: "The configuration agent outputs structured JSON, not raw prompts. We validate and sanitize all inputs before they become system prompts."

**Q: What's the API cost?**
A: "Claude Sonnet 4.5 pricing varies, but for this demo, each agent creation is ~$0.01-0.03, and conversations are ~$0.005-0.02 per exchange. Very reasonable for the value."

**Q: Can I try it?**
A: "Not live right now since it's a demo environment, but the code will be available after this session. It's all TypeScript and React - easy to set up."

## 🚨 Emergency Scenarios

### Voice Input Not Working
→ "Let me switch to chat mode real quick" [Click Chat tab, type instead]

### Backend Crash
→ Show backup video or screenshots
→ "Technical gremlins! Let me show you the recording instead"

### Agent Response Slow/Error
→ "Claude's thinking hard!" [Wait 3 seconds]
→ If still failing: "Let me use a pre-configured agent" [Use template]

### Complete System Failure
→ Show backup video
→ Focus on architecture diagram
→ "Let's dive into the technical implementation instead"

### Internet Down
→ Use backup hotspot immediately
→ Or switch to offline slides/video

## 📊 Success Metrics

After the demo, you want audience to say:
- ✅ "That persona switch was impressive"
- ✅ "I want to try this"
- ✅ "This is actually useful"
- ✅ "The UX is so clean"
- ✅ "How did you build this?"

## 🎯 Post-Demo Actions

- [ ] Share GitHub repo link
- [ ] Provide setup instructions
- [ ] Offer to answer follow-up questions
- [ ] Collect feedback
- [ ] Note feature requests

## 💡 Pro Tips

1. **Speak clearly** - Voice recognition works best with clear, moderate-paced speech
2. **Pause for effect** - Let the persona switch moment breathe
3. **Show confidence** - Even if something fails, stay calm
4. **Focus on value** - Not the tech, but what it enables
5. **Have fun** - Your enthusiasm is contagious

## 🔑 The One Thing to Remember

**The persona switching is your WOW moment. Build up to it. Make it dramatic. Let people see the node flash. Let them see the response change. This is what makes your demo memorable.**

---

You've got this! 🚀

Good luck at Frontier Builds Demo Night!
