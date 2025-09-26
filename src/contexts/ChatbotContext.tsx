import React, { createContext, useContext, useState, ReactNode } from 'react';
import { sendChatMessage } from '@/utils/api.ts';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  source?: 'local' | 'openrouter';
}

interface ChatbotContextType {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setIsLoading: (loading: boolean) => void;
  setIsOpen: (open: boolean) => void;
  sendMessage: (message: string) => Promise<void>;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // Добавляем сообщение пользователя
    addMessage({
      text: messageText,
      isUser: true,
    });

    setIsLoading(true);

    try {
      const data = await sendChatMessage(messageText);
      
      // Добавляем ответ бота
      addMessage({
        text: data.reply,
        isUser: false,
        source: data.source,
      });
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      
      // Fallback ответы для разных типов вопросов
      const fallbackResponse = getFallbackResponse(messageText);
      addMessage({
        text: fallbackResponse,
        isUser: false,
        source: 'local',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для генерации fallback ответов
  const getFallbackResponse = (message: string): string => {
    const messageLower = message.toLowerCase();
    
    // Приветствие
    if (messageLower.includes('привет') || messageLower.includes('здравствуй')) {
      return 'Привет! Я умный помощник NeuroBoost. К сожалению, сейчас у меня проблемы с подключением к серверу, но я могу рассказать о наших услугах:\n\n• AI-аудит бизнеса\n• ChatGPT-консультант\n• Автоматизация заявок\n• Внедрение ИИ-решений\n\nОбратитесь к нам по телефону +7 (707) 506 29 00 или email: galuza_nikita@mail.ru';
    }
    
    // Услуги
    if (messageLower.includes('услуг') || messageLower.includes('сервис')) {
      return 'Мы предоставляем следующие услуги:\n\n🤖 AI-аудит бизнеса - анализ процессов и рекомендации по внедрению ИИ\n💬 ChatGPT-консультант - настройка и внедрение чат-бота\n⚡ Автоматизация заявок - оптимизация бизнес-процессов\n🚀 Внедрение ИИ-решений - комплексные решения для вашего бизнеса\n\nДля получения консультации звоните: +7 (707) 506 29 00';
    }
    
    // Цены
    if (messageLower.includes('цена') || messageLower.includes('стоимость')) {
      return 'Стоимость наших услуг зависит от сложности проекта и ваших потребностей. Мы предлагаем индивидуальные решения для каждого клиента.\n\nДля расчета стоимости обратитесь к нам:\n📞 +7 (707) 506 29 00\n📧 galuza_nikita@mail.ru';
    }
    
    // Контакты
    if (messageLower.includes('контакт') || messageLower.includes('связать')) {
      return 'Наши контакты:\n\n📞 Телефон: +7 (707) 506 29 00\n📧 Email: galuza_nikita@mail.ru\n🏢 Адрес: г. Алматы, ул. Темирязева, 69, кв. 32\n\nМы работаем с 9:00 до 18:00 по времени Алматы';
    }
    
    // Общий ответ
    return 'Извините, сейчас у меня проблемы с подключением к серверу. Но я могу помочь с информацией о наших услугах:\n\n• AI-аудит бизнеса\n• ChatGPT-консультант  \n• Автоматизация заявок\n• Внедрение ИИ-решений\n\nДля получения подробной консультации звоните: +7 (707) 506 29 00';
  };

  const value: ChatbotContextType = {
    messages,
    isLoading,
    isOpen,
    addMessage,
    clearMessages,
    setIsLoading,
    setIsOpen,
    sendMessage,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};