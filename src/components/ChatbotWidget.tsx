import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

interface ChatbotWidgetProps {
  className?: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ className = '' }) => {
  const { t } = useTranslation('components');
  const { t: tHome } = useTranslation('home');
  const { isOpen, setIsOpen, messages, addMessage, isLoading, setIsLoading } = useChatbot();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Добавляем приветственное сообщение при первом открытии
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: tHome('chatbot.messages.bot_hello'),
        isUser: false,
        timestamp: new Date()
      };
      addMessage(welcomeMessage);
    }
  }, [isOpen, messages.length, addMessage, tHome]);

  // Управление скроллом body при открытии/закрытии чат-бота
  useEffect(() => {
    // Убираем все блокировки скролла - позволяем пользователю свободно скроллить страницу
    // Чат-бот будет отображаться поверх контента без блокировки взаимодействия
  }, [isOpen]);

  // Поддержка iOS клавиатуры: двигаем нижнюю панель, если visualViewport меняется
  useEffect(() => {
    if (!isOpen || !window.visualViewport) return;
    
    const onResize = () => {
      const vh = window.visualViewport!.height;
      document.documentElement.style.setProperty('--vvh', `${vh}px`);
    };
    
    onResize();
    window.visualViewport.addEventListener('resize', onResize);
    
    return () => window.visualViewport?.removeEventListener('resize', onResize);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();
    addMessage({
      text: messageText,
      isUser: true
    });
    setInputValue('');
    setIsLoading(true);

    try {
      // Нормализуем базовый URL: убираем хвостовые слэши и финальный "/chat"
      const rawBase: string = (import.meta as any).env?.VITE_BACKEND_URL || 'https://neuroboostaichatbot-production.up.railway.app';
      const apiBaseUrl = rawBase.replace(/\/+$/g, '').replace(/\/?chat$/i, '');

      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error(t('chatbot.serverError'));
      }

      const data = await response.json();
      
      addMessage({
        text: data.reply,
        isUser: false
      });
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      addMessage({
        text: t('chatbot.errorMessage'),
        isUser: false
      });
    } finally {
      setIsLoading(false);
      // Фокусируемся на поле ввода после завершения загрузки
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && inputValue.trim()) {
        sendMessage();
      }
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsOpen(false);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (date: Date) => {
    const locale = t('common.locale', { defaultValue: 'ru-RU' });
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Кнопка открытия чата - скрыта на мобильных устройствах */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`hidden md:block fixed right-6 top-1/2 transform -translate-y-1/2 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className} ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ 
          scale: 1.1, 
          y: -5,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -10, 0]
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200,
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          className="relative"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MessageCircle className="h-6 w-6" />
          {/* Пульсирующее кольцо */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          {/* Блестящий эффект */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
            animate={{ x: [-100, 100] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 3
            }}
          />
        </motion.div>
      </motion.button>

      {/* Чат-окно */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Мобильная версия - модальное окно */}
            <motion.div
              className="fixed inset-0 z-[80] bg-black/50 flex items-end justify-center md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
            >
              <motion.div
                className="w-full max-w-md bg-white rounded-t-2xl flex flex-col max-h-[80vh]"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
              {/* Заголовок чата - фиксированный */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{tHome('chatbot.chat_title')}</h3>
                    <p className="text-xs text-blue-100">{tHome('chatbot.chat_status')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={handleClose}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title={t('chatbot.close')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0 max-h-full chatbot-messages-mobile" style={{ scrollbarWidth: 'thin' }}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${message.isUser ? 'bg-blue-600' : 'bg-gray-100'}`}>
                        {message.isUser ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="p-2 rounded-full bg-gray-100">
                        <Bot className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-2">
                        <div className="flex items-center space-x-1">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                          <span className="text-sm text-gray-500">{t('chatbot.thinking')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

                {/* Поле ввода - sticky с safe-area для iOS */}
                <div className="sticky bottom-0 px-3 py-2 border-t border-gray-200 bg-white/95 backdrop-blur pb-[calc(env(safe-area-inset-bottom,0px)+8px)]">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isLoading ? t('chatbot.placeholderLoading') : tHome('chatbot.placeholder')}
                      className={`flex-1 rounded-xl border px-3 py-2 outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 ${
                        isLoading 
                          ? 'border-blue-300 bg-blue-50 opacity-60' 
                          : 'border-gray-300 bg-white'
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-60 transition-all duration-200"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {t('chatbot.sendHint')}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Десктопная версия */}
            <motion.div
              className={`fixed z-[80] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col hidden md:flex ${
                isExpanded 
                  ? 'w-[640px] h-[768px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] bottom-6 right-6' 
                  : 'w-80 h-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] bottom-6 right-6'
              }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            layout
          >
            {/* Заголовок чата - фиксированный */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{tHome('chatbot.chat_title')}</h3>
                  <p className="text-xs text-blue-100">{tHome('chatbot.chat_status')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleExpand}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                  title={isExpanded ? t('chatbot.minimize') : t('chatbot.expand')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </motion.div>
                </motion.button>
                <motion.button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                  title={t('chatbot.close')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.isUser ? 'bg-blue-600' : 'bg-gray-100'}`}>
                      {message.isUser ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-gray-100">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">{t('chatbot.thinking')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="border-t border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isLoading ? t('chatbot.placeholderLoading') : tHome('chatbot.placeholder')}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 ${
                    isLoading 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-300 bg-white'
                  }`}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {t('chatbot.sendHint')}
              </p>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
