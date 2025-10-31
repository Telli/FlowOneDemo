import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AIService {
  /**
   * Configuration Agent: Interprets natural language and generates agent config
   */
  async interpretConfigRequest(userMessage: string, conversationHistory: any[]) {
    const systemPrompt = `You are a helpful AI configuration assistant for FlowOne Voice.
Your job is to interpret user requests to create or modify AI agents and return structured JSON.

When a user describes an agent they want, extract:
- name: A short, descriptive name
- persona: Personality traits (friendly, professional, casual, technical, etc)
- systemPrompt: A detailed system prompt for the agent
- voice: Voice characteristics (warm, energetic, calm, authoritative)
- tools: Array of tool names (if mentioned: search, calculator, calendar, etc)
- tags: Relevant categorization tags

ALWAYS respond with valid JSON in this exact format:
{
  "action": "create" | "modify" | "delete" | "query",
  "agent": {
    "name": "string",
    "persona": "string",
    "systemPrompt": "string",
    "voice": "string",
    "tools": ["string"],
    "tags": ["string"]
  },
  "explanation": "Brief explanation of what you understood"
}

If the request is unclear, set action to "query" and ask for clarification in the explanation.

Examples:
User: "Create a friendly math tutor that encourages students"
Response: {
  "action": "create",
  "agent": {
    "name": "Math Tutor",
    "persona": "friendly, encouraging, patient",
    "systemPrompt": "You are an encouraging math tutor who helps students understand concepts through clear explanations and positive reinforcement. Break down complex problems into simple steps. Always be supportive and celebrate progress.",
    "voice": "warm, patient, upbeat",
    "tools": ["calculator"],
    "tags": ["education", "math", "tutoring"]
  },
  "explanation": "I'll create a friendly math tutor agent with an encouraging personality."
}

User: "I need someone to help with sales calls"
Response: {
  "action": "create",
  "agent": {
    "name": "Sales Coach",
    "persona": "professional, confident, persuasive",
    "systemPrompt": "You are a professional sales coach who helps salespeople improve their pitch and close more deals. Provide specific, actionable advice based on sales best practices. Be confident and motivating.",
    "voice": "confident, energetic, authoritative",
    "tools": ["crm", "calendar"],
    "tags": ["sales", "business", "coaching"]
  },
  "explanation": "I'll create a professional sales coach to help with sales calls."
}`;

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          ...conversationHistory,
          { role: 'user', content: userMessage }
        ]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        // Parse JSON response
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }

      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  /**
   * Run a conversational agent (user-created agent)
   */
  async runAgent(agentConfig: any, userMessage: string, conversationHistory: any[]) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: agentConfig.systemPrompt,
        messages: [
          ...conversationHistory,
          { role: 'user', content: userMessage }
        ]
      });

      const content = response.content[0];
      return content.type === 'text' ? content.text : '';
    } catch (error) {
      console.error('Run Agent Error:', error);
      throw error;
    }
  }

  /**
   * Modify agent persona in real-time
   */
  async adaptPersona(currentPrompt: string, newPersona: string) {
    const adaptationPrompt = `Given this system prompt:
"${currentPrompt}"

Rewrite it to embody this new persona: "${newPersona}"
Keep the core functionality but adjust tone, style, and approach to match the new persona.

Return ONLY the new system prompt, no explanation or additional text.`;

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: adaptationPrompt }]
      });

      const content = response.content[0];
      return content.type === 'text' ? content.text : currentPrompt;
    } catch (error) {
      console.error('Adapt Persona Error:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
