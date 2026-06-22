import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  'whyEmissionsIncreased',
  'howImproveSustainability',
  'whatCausedRise',
  'generateMonthlyReport',
];

const mockResponses: Record<string, string> = {
  'whyEmissionsIncreased': 'Building A electricity consumption increased by 22% because of longer AC operation during peak hours. The system detected extended usage from 8 AM to 6 PM consistently.',
  'howImproveSustainability': 'Here are key recommendations:\n\n1. Reduce AC operating hours by 1 hour daily\n2. Set temperature to 24°C consistently\n3. Schedule monthly maintenance for HVAC systems\n4. Install smart sensors in high-usage areas\n5. Increase recycling bins by 20%',
  'whatCausedRise': 'The rise in electricity usage is primarily due to:\n\n- Science Building: Lab equipment running overnight\n- Cafeteria: Refrigeration units working harder\n- Admin: New server room additions\n\nTotal increase: 22% month-over-month.',
  'generateMonthlyReport': 'I have generated your monthly sustainability report:\n\nCarbon Footprint: 125 tCO₂ (-12%)\nEnergy Usage: 4,200 kWh (-8%)\nWater Usage: 1,800 L (-5%)\nTransport: 580 kg CO₂ (-15%)\nSustainability Score: 89/100\n\nKey finding: All metrics improved compared to last month.',
};

export default function AIAssistant() {
  const { lang } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: lang === 'ar'
        ? 'مرحباً! أنا مساعد نفس الذكي. كيف يمكنني مساعدتك في تحسين استدامة مدرستك؟'
        : 'Hello! I am the Nafas AI Assistant. How can I help you improve your school\'s sustainability?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Find matching mock response or generate generic
    setTimeout(() => {
      const matchedKey = Object.keys(mockResponses).find((key) =>
        messageText.toLowerCase().includes(key.toLowerCase()) ||
        t(key as any, lang).toLowerCase().includes(messageText.toLowerCase())
      );

      const response = matchedKey
        ? mockResponses[matchedKey]
        : lang === 'ar'
        ? 'شكراً لسؤالك! أحلل البيانات الآن وسأقدم لك توصيات قريباً.'
        : 'Thank you for your question! I am analyzing the data and will provide recommendations soon.';

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t('aiAssistant', lang)}</h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {lang === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary-500" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-primary-500 text-white rounded-tr-sm'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-500" />
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length < 3 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(t(q as any, lang))}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              {t(q as any, lang)}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('askQuestion', lang)}
          className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none text-sm"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-40 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
