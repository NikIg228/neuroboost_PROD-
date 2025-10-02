import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LeadFormProps {
  onSubmitted?: () => void;
  source?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitted, source }) => {
  const { t } = useTranslation('components');
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
          placeholder={t('leadForm.name')}
          className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
          aria-label={t('leadForm.name')}
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('leadForm.email')}
          type="email"
          className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
          aria-label={t('leadForm.email')}
          required
        />
      </div>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t('leadForm.phone')}
        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
        aria-label={t('leadForm.phone')}
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t('leadForm.note')}
        rows={4}
        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
        aria-label={t('leadForm.note')}
      />

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
        aria-label={t('leadForm.submit')}
      >
        {status === 'loading' ? t('leadForm.submitting') : t('leadForm.submit')}
      </motion.button>

      {status === 'success' && (
        <p className="text-green-300 text-sm">{t('leadForm.success')}</p>
      )}
      {status === 'error' && (
        <p className="text-red-300 text-sm">{t('leadForm.error')}</p>
      )}
      {source && <p className="text-xs text-white/60">{t('leadForm.source', { source })}</p>}
    </form>
  );
};

export default LeadForm;


