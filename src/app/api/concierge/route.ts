import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

export const maxDuration = 30;

const MAX_MESSAGES = 12;
const MAX_CHARS = 600;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

const INSTRUCTIONS = `You are the concierge of "Riad Yasmine", a fictional 6-room guesthouse in the Marrakech medina (this is a portfolio demo).
Facts you can use:
- Check-in 14:00, check-out 11:00. Early check-in on request, free if the room is ready.
- Rooms: Jasmine (double, 90 EUR/night), Orange Blossom (double with balcony, 110 EUR), Atlas Suite (family, 4 people, 160 EUR). Breakfast included.
- Rooftop terrace with plunge pool; hammam on site (35 EUR per person, book a day ahead).
- Airport pickup: 20 EUR, 25 minutes. The car stops at Bab Doukkala; staff walk guests 5 minutes to the riad.
- 10 minutes walk to Jemaa el-Fna. Day trips: Ourika valley, Agafay desert dinner, Essaouira.
Answer in the same language the guest writes in (English, French or Arabic, including Moroccan Darija). Be warm and brief: 2-5 sentences.
If asked something you don't know (exact availability, payments), say the team will confirm by email. Never invent prices beyond the list above.`;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return new Response("Too many messages - please wait a minute.", { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  const { messages }: { messages: UIMessage[] } = await req.json();
  const trimmed = messages.slice(-MAX_MESSAGES).map((m) => ({
    ...m,
    parts: m.parts.map((p) => (p.type === "text" ? { ...p, text: p.text.slice(0, MAX_CHARS) } : p)),
  }));

  const result = streamText({
    model: "anthropic/claude-haiku-5.5",
    instructions: INSTRUCTIONS,
    messages: await convertToModelMessages(trimmed),
    maxOutputTokens: 350,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
