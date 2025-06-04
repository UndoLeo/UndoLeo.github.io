'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto container-padding">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-1 mb-6">
              Автоматизация управления конфигурациями
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Дипломный проект по разработке современной системы автоматизации
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 1 Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container mx-auto container-padding">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 mb-8">Глава 1. Анализ исходных данных</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="heading-3 mb-4">1.1. Изучение предметной области</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Анализ современных подходов к управлению конфигурациями и автоматизации процессов.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="heading-3 mb-4">1.2. Требования к системе</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Формулирование ключевых требований и критериев эффективности системы.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2 Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto container-padding">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 mb-8">Глава 2. Разработка и внедрение</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="heading-3 mb-4">2.1. Архитектура</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Проектирование оптимальной архитектуры решения.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="heading-3 mb-4">2.2. Структура проекта</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Разработка эффективной структуры проекта Ansible.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="heading-3 mb-4">2.3. Реализация</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Создание и оптимизация ключевых Playbooks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container mx-auto container-padding">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="heading-2 mb-6">Заключение</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Результаты внедрения системы автоматизации и перспективы дальнейшего развития
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 