import { GoogleGenerativeAI } from "@google/generative-ai";
import aiChat from "../models/aiChat.js";
import Kundali from "../models/Kundali.js";
import User from "../models/User.js";
import { FREE_AI_LIMIT } from "../config/limits.js";

// ── Build system prompt from kundali data ─────────────────────────────────────
const buildSystemPrompt = (kundaliDoc, personName) => {
  const data = kundaliDoc.kundali_data?.data || {};
  const planets = data.planets || [];
  const rasi = data.chart?.rasi || [];
  const bd = data.birth_details || {};
  const birth = kundaliDoc.birth_details || {};

  const getSign = (houseNum) => {
    const h = rasi.find(h => h.house === houseNum);
    return h ? h.sign : "—";
  };

  const getPlanetsInHouse = (houseNum) => {
    const h = rasi.find(h => h.house === houseNum);
    if (!h || !h.planet) return "Empty";
    return h.planet;
  };

  const planetLines = planets.map(p =>
    `${p.name}: House ${p.house}, Sign ${p.sign}, Nakshatra ${p.nakshatra}, Degree ${p.degree}°${p.retrograde ? ", Retrograde" : ""}, Nakshatra Lord ${p.nakshatraLord}`
  ).join("\n");

  const houseLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(h =>
    `House ${h}: Sign ${getSign(h)}, Planets: ${getPlanetsInHouse(h)}`
  ).join("\n");

  const moon = planets.find(p => p.name === "Moon");
  const sun = planets.find(p => p.name === "Sun");

  return `
You are Nakshatra AI, an experienced and wise Vedic astrologer. You are having a natural, flowing conversation with ${personName || "a seeker"}.

PERSONALITY:
- Warm, wise, and grounded — like a trusted astrologer the person has known for years
- Speak naturally, not formally. Avoid robotic or repetitive phrasing
- Never introduce yourself or greet after the first message
- Never say "Namaste", "Hello", or any greeting in follow-up messages
- Build on previous messages in the conversation — remember what was discussed
- Respond conversationally, not like a report

RULES:
- Answer ONLY based on the Kundali data provided below
- Do NOT make extreme predictions about death, disasters, or definitive life events
- Do not repeat the person's name in every response — use it sparingly and naturally
- Keep responses concise — 2 to 4 paragraphs max
- Always end with a gentle reminder that astrology is for guidance, not certainty — but only once per conversation, not every message
- Never repeat information you have already shared in this conversation

PERSON'S KUNDALI DATA:
Name: ${personName || kundaliDoc.name || "Unknown"}
Date of Birth: ${birth.date || "—"}
Time of Birth: ${birth.time || "—"}
Place of Birth: ${birth.place || "—"}
Ascendant (Lagna): ${getSign(1)}
Moon Sign (Rashi): ${moon?.sign || "—"}
Sun Sign: ${sun?.sign || "—"}
Ayanamsa: ${bd.ayanamsaName || "Lahiri"} (${bd.ayanamsa || ""}°)
Latitude: ${bd.latitude || "—"}
Longitude: ${bd.longitude || "—"}

PLANETARY POSITIONS:
${planetLines}

HOUSE DETAILS:
${houseLines}
  `.trim();
};

// ── POST /api/ai/ask ──────────────────────────────────────────────────────────
export const askAI = async (req, res) => {
  try {
    const { kundali_id, message } = req.body;
    const user_id = req.user.user_id;

    if (!kundali_id || !message) {
      return res.status(400).json({ message: "kundali_id and message are required" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.ai_question_count >= FREE_AI_LIMIT) {
      return res.status(403).json({ message: "Free AI message limit reached. Please upgrade to continue." });
    }

    const kundaliDoc = await Kundali.findOne({ _id: kundali_id, user_id });
    if (!kundaliDoc) {
      return res.status(404).json({ message: "Kundali not found" });
    }

    const systemPrompt = buildSystemPrompt(kundaliDoc, kundaliDoc.name);

    let chat = await aiChat.findOne({ user_id, kundali_id });
    if (!chat) {
      chat = new aiChat({ user_id, kundali_id, messages: [] });
    }

    chat.messages.push({ role: "user", text: message });

    const recentMessages = chat.messages.slice(-10);
    const geminiHistory = recentMessages
      .slice(0, -1)
      .map(m => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }],
      }))
      .filter((_, i, arr) => {
        const firstUserIdx = arr.findIndex(m => m.role === "user");
        return i >= firstUserIdx;
      });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({ history: geminiHistory });
    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    chat.messages.push({ role: "ai", text: reply });
    await chat.save();

    user.ai_question_count += 1;
    await user.save();

    res.json({ reply });

  } catch (error) {
    console.error("askAI error:", error.message);
    res.status(500).json({ message: "AI request failed" });
  }
};

// ── GET /api/ai/history/:kundali_id ──────────────────────────────────────────
export const getChatHistory = async (req, res) => {
  try {
    const { kundali_id } = req.params;
    const user_id = req.user.user_id;

    const chat = await aiChat.findOne({ user_id, kundali_id });
    if (!chat) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chat.messages });

  } catch (error) {
    console.error("getChatHistory error:", error.message);
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
};