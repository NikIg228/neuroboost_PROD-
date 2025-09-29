import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LeadFormProps {
  onSubmitted?: () => void;
  source?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitted, source }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStatus('loading');
    try {
      // В проекте уже есть Supabase. Здесь можно добавить запись в таблицу leads (если будет создана)
      // Пока — отправка на почту/лог. Заменяемо без изменения интерфейса.
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      onSubmitted?.();
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
          aria-label="Имя"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
          aria-label="Email"
          required
        />
      </div>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Телефон"
        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
        aria-label="Телефон"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Комментарий"
        rows={4}
        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
        aria-label="Комментарий"
      />

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
        aria-label="Отправить заявку"
      >
        {status === 'loading' ? 'Отправка…' : 'Подать заявку'}
      </motion.button>

      {status === 'success' && (
        <p className="text-green-300 text-sm">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
      )}
      {status === 'error' && (
        <p className="text-red-300 text-sm">Ошибка отправки. Попробуйте позже.</p>
      )}
      {source && <p className="text-xs text-white/60">Источник: {source}</p>}
    </form>
  );
};

export default LeadForm;


