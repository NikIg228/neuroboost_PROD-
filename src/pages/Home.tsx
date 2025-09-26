import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, Headphones, Globe, Sparkles, Star, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PremiumAnimatedSection from '@/components/PremiumAnimatedSection';
import CasesSection from '@/components/CasesSection';
import PartnersSection from '@/components/PartnersSection';

// ScrollTrigger is registered globally

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Премиум Hero анимация
    if (heroRef.current) {
      const tl = gsap.timeline();
      
      // Анимация появления с эффектом масштабирования
      tl.fromTo(heroRef.current, 
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.9,
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: "blur(0px)",
          duration: 2, 
          ease: "power3.out"
        }
      );

      // Дополнительные эффекты для премиум ощущения
      tl.to(heroRef.current, {
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        duration: 1,
        ease: "power2.out"
      }, "-=1");
    }


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Лёгкий фон: градиент + мягкие размытия вместо тяжёлых канвас-анимаций */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" style={{ zIndex: 0 }}></div>
        
        {/* Премиум градиентные оверлеи */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 pointer-events-none" style={{ zIndex: 1 }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none" style={{ zIndex: 2 }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
          <PremiumAnimatedSection className="text-center" delay={0.3}>
            <div ref={heroRef} className="bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                {/* Премиум бейдж */}
                <motion.div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white/90">Премиум ИИ-решения</span>
                  <Star className="h-4 w-4 text-yellow-400" />
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
                    className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent inline-block"
                    style={{
                      backgroundSize: '200% 100%'
                    }}
                  >
                    {/* Исправленный текст без эффекта печатной машинки */}
                   Партнёр для бизнеса в любой точке планеты!
                  </motion.span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
                Мы помогаем бизнесам внедрять ИИ-решения для автоматизации процессов, 
                увеличения продаж и повышения эффективности работы. Более 20 стран доверяют нам.
              </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                    }}
                  whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full sm:w-auto"
                >
                <Link
                  to="/catalog"
                      className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl cursor-pointer text-base sm:text-lg w-full sm:w-auto shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                  style={{ pointerEvents: 'auto' }}
                >
                  Посмотреть каталог
                      <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                </motion.div>
                  
                <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                  whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full sm:w-auto"
                >
                <Link
                  to="/contact"
                      className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer text-base sm:text-lg w-full sm:w-auto backdrop-blur-sm"
                  style={{ pointerEvents: 'auto' }}
                >
                  Получить консультацию
                </Link>
                </motion.div>
              </div>
            </div>
            </div>
          </PremiumAnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-pink-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <PremiumAnimatedSection direction="left" delay={0.3}>
              <div className="space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                    О нас
                  </h2>
                  <h3 className="text-xl sm:text-2xl text-blue-300 font-semibold mb-6 sm:mb-8">
                Мы помогаем бизнесам внедрять ИИ
              </h3>
                </motion.div>
                
                <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
                  >
                    <p>
                      <span className="text-blue-300 font-bold">Кто мы:</span> NeuroBoost — команда экспертов по искусственному интеллекту 
                  и автоматизации бизнес-процессов. Мы специализируемся на внедрении ИИ-решений 
                  для компаний любого масштаба.
                </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
                  >
                    <p>
                      <span className="text-purple-300 font-bold">Чем занимаемся:</span> Разрабатываем и внедряем индивидуальные ИИ-решения: 
                  от чат-ботов и автоматизации до полной цифровой трансформации бизнеса.
                </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
                  >
                    <p>
                      <span className="text-pink-300 font-bold">В чем наше отличие:</span> Мы не просто поставщики технологий — мы партнеры 
                  в вашем развитии. Каждое решение адаптируется под специфику вашего бизнеса.
                </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
                  >
                    <p>
                      <span className="text-orange-300 font-bold">Для кого:</span> Наши услуги предназначены для руководителей и владельцев 
                  бизнеса, которые стремятся оптимизировать процессы и повысить эффективность.
                </p>
                  </motion.div>
                </div>
              </div>
            </PremiumAnimatedSection>

            <PremiumAnimatedSection direction="right" delay={0.5}>
              <motion.div 
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                  </div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100+</div>
                    <div className="text-sm sm:text-base text-blue-200">реализованных проектов</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="h-8 w-8 text-white" />
                  </div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">от 5 дней</div>
                    <div className="text-sm sm:text-base text-purple-200">скорость внедрения</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Globe className="h-8 w-8 text-white" />
                  </div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">20+</div>
                    <div className="text-sm sm:text-base text-pink-200">стран с нами</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Headphones className="h-8 w-8 text-white" />
                  </div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">24/7</div>
                    <div className="text-sm sm:text-base text-orange-200">поддержка</div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-8 sm:mt-10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg sm:text-xl text-white font-semibold">
                    Команда из инженеров и маркетологов
                  </p>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
                </motion.div>
              </motion.div>
            </PremiumAnimatedSection>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-pink-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Левая часть - описание */}
            <PremiumAnimatedSection direction="left" delay={0.3}>
              <div className="space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                    </motion.div>
                    <span className="text-sm font-medium text-cyan-300">ИИ-Помощник</span>
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Умный чат-бот
                    </span>
                    <br />
                    <span className="text-white">для консультаций</span>
                  </h2>
                  
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                    Получите мгновенные ответы на вопросы о наших услугах, ценах и возможностях ИИ-решений. 
                    Наш ИИ-помощник работает 24/7 и готов помочь в любое время!
                  </p>
                </motion.div>
                
                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-cyan-400/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Мгновенные ответы</h3>
                        <p className="text-gray-300 text-sm sm:text-base">
                          Получайте ответы на вопросы о наших услугах, ценах и возможностях в режиме реального времени
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-400/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Работает 24/7</h3>
                        <p className="text-gray-300 text-sm sm:text-base">
                          Наш ИИ-помощник доступен круглосуточно и готов ответить на ваши вопросы в любое время
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-pink-400/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-pink-500 to-orange-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Headphones className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Персональный подход</h3>
                        <p className="text-gray-300 text-sm sm:text-base">
                          ИИ адаптируется под ваши потребности и дает рекомендации, подходящие именно вашему бизнесу
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="pt-4"
                >
                  <div className="inline-flex items-center gap-2 text-cyan-300 text-sm font-medium">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                    <span>Нажмите на кнопку справа, чтобы начать диалог</span>
                  </div>
                </motion.div>
              </div>
            </PremiumAnimatedSection>

            {/* Правая часть - визуализация */}
            <PremiumAnimatedSection direction="right" delay={0.5}>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Основной контейнер чата */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                  {/* Декоративные элементы */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                  
                  {/* Заголовок чата */}
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center"
                    >
                      <MessageCircle className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">ИИ-Помощник NeuroBoost</h3>
                      <p className="text-sm text-cyan-300">Онлайн • Готов помочь</p>
                    </div>
                    <motion.div
                      className="ml-auto w-3 h-3 bg-green-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Сообщения чата */}
                  <div className="space-y-4 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
                        <p className="text-white text-sm">Привет! Я ваш ИИ-помощник. Чем могу помочь?</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="flex items-start gap-3 justify-end"
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl px-4 py-3 max-w-xs">
                        <p className="text-white text-sm">Расскажите про ваши услуги</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
                        <p className="text-white text-sm">У нас есть 20+ ИИ-решений для автоматизации вашего бизнеса!</p>
                      </div>
                    </motion.div>
                    
                    {/* Индикатор печати */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-white/60 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-white/60 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-white/60 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Поле ввода */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.5 }}
                    className="mt-6 relative z-10"
                  >
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                      <input
                        type="text"
                        placeholder="Напишите ваш вопрос..."
                        className="flex-1 bg-transparent text-white placeholder-gray-300 text-sm focus:outline-none"
                        disabled
                      />
                      <motion.button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="h-4 w-4 text-white" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
                
                {/* Плавающие элементы */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="h-4 w-4 text-white" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, 10, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Sparkles className="h-3 w-3 text-white" />
                </motion.div>
              </motion.div>
            </PremiumAnimatedSection>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <CasesSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <PremiumAnimatedSection delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl"
            >
              {/* Премиум бейдж */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-base font-bold text-white">Эксклюзивное предложение</span>
                <Star className="h-5 w-5 text-yellow-300" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Готовы начать цифровую трансформацию?
            </h2>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Получите бесплатную консультацию и узнайте, как ИИ может изменить ваш бизнес
            </p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
            <Link
              to="/contact"
                    className="inline-flex items-center justify-center px-10 sm:px-12 py-5 sm:py-6 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 text-lg sm:text-xl shadow-2xl hover:shadow-white/25"
            >
              Получить консультацию
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center px-10 sm:px-12 py-5 sm:py-6 border-2 border-white/50 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg sm:text-xl backdrop-blur-sm"
                  >
                    Посмотреть каталог
            </Link>
                </motion.div>
              </motion.div>
              
              {/* Дополнительная информация */}
              <motion.div 
                className="mt-12 sm:mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-sm sm:text-base text-white/70 mb-4">
                  Бесплатная консультация • Персональный подход • Гарантия результата
                </p>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">15 мин</div>
                    <div className="text-xs text-white/70">время консультации</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-white/70">конфиденциальность</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/70">поддержка</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </PremiumAnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;