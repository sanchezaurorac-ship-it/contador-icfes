'use strict';

'use client';

import React, { useState } from 'react';
import styles from './MotivationalCard.module.css';

interface Tip {
  text: string;
  tag: string;
  tagClass: string;
}

const ICFES_TIPS: Tip[] = [
  {
    text: "Matemáticas: No te apresures a operar. Muchas preguntas se resuelven descartando opciones ilógicas o usando aproximaciones.",
    tag: "Matemáticas",
    tagClass: styles['tag-matematicas']
  },
  {
    text: "Lectura Crítica: Identifica la tesis (opinión del autor) y los argumentos en textos filosóficos o de opinión antes de mirar las respuestas.",
    tag: "Lectura Crítica",
    tagClass: styles['tag-lectura']
  },
  {
    text: "Ciencias Naturales: Repasa la diferencia entre variable dependiente (lo que mides) e independiente (lo que controlas) en los experimentos.",
    tag: "Ciencias",
    tagClass: styles['tag-ciencias']
  },
  {
    text: "Sociales y Ciudadanas: El ICFES evalúa el respeto por los derechos humanos y la Constitución. Las respuestas que violen la dignidad humana suelen descartarse.",
    tag: "Sociales",
    tagClass: styles['tag-sociales']
  },
  {
    text: "Inglés: concéntrate en el vocabulario cotidiano y la comprensión de avisos (Parte 1 y 2). Muchas respuestas están implícitas en el contexto visual.",
    tag: "Inglés",
    tagClass: styles['tag-ingles']
  },
  {
    text: "Manejo del Tiempo: Tienes en promedio 2 minutos y 15 segundos por pregunta. Si te trabas en una, márcala en el cuadernillo, avanza y regresa después.",
    tag: "Estrategia",
    tagClass: styles['tag-general']
  },
  {
    text: "Técnica de Descarte: Por lo general, hay 2 opciones totalmente erróneas. Identifícalas rápido para enfocar tu análisis en las 2 restantes.",
    tag: "Estrategia",
    tagClass: styles['tag-general']
  },
  {
    text: "¡Mantén la calma!: El ICFES es una prueba de resistencia y concentración. Una mente tranquila asimila mejor la información compleja.",
    tag: "Motivación",
    tagClass: styles['tag-general']
  },
  {
    text: "Preparación Física: La noche anterior cena ligero y duerme 8 horas. El cansancio acumulado influye directamente en la comprensión de lectura.",
    tag: "Salud",
    tagClass: styles['tag-general']
  }
];

export default function MotivationalCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleShuffle = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 400); // match CSS rotation time
    
    // Pick a random index different from current one
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * ICFES_TIPS.length);
    }
    setCurrentIndex(newIndex);
  };

  const currentTip = ICFES_TIPS[currentIndex];

  return (
    <div className={`${styles.card} glass-card`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Consejo del Día</h3>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.tipText}>
          {currentTip.text}
        </p>
        <div className={styles.tagContainer}>
          <span className={`${styles.tag} ${currentTip.tagClass}`}>
            {currentTip.tag}
          </span>
          <span className={`${styles.tag} ${styles['tag-general']}`}>
            #ICFES2026
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.btnShuffle} 
          onClick={handleShuffle}
          title="Ver otro consejo"
          aria-label="Siguiente consejo de estudio"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className={`${isRotating ? styles.rotateIcon : ''}`} 
            style={{ width: '16px', height: '16px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Siguiente Tip
        </button>
      </div>
    </div>
  );
}
