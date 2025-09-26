// Simple API client for chatbot requests

export type ChatSource = 'openrouter' | 'local';

export interface ChatApiResponse {
  reply: string;
  source: ChatSource;
}

const API_BASE_URL: string =
  (import.meta as any)?.env?.VITE_BACKEND_URL || 'https://neuroboostaichatbot-production.up.railway.app';

export async function sendChatMessage(message: string): Promise<ChatApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`API error ${response.status}: ${text}`);
    }

    const data = (await response.json()) as { reply: string };
    return { reply: data.reply, source: 'openrouter' };
  } finally {
    clearTimeout(timeoutId);
  }
}


