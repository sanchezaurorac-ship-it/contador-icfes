'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

// Target Date: July 26, 2026 at 7:30 AM Colombian Time (UTC-5)
const TARGET_DATE_STRING = "2026-07-26T07:30:00-05:00";
// Baseline for study progress: Jan 1, 2026
const START_DATE_STRING = "2026-01-01T00:00:00-05:00";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    centiseconds: string;
    isCompleted: boolean;
  } | null>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetDate = new Date(TARGET_DATE_STRING);
    const startDate = new Date(START_DATE_STRING);
    const totalDuration = targetDate.getTime() - startDate.getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          centiseconds: '00',
          isCompleted: true,
        });
        setProgress(100);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const centiseconds = Math.floor((difference % 1000) / 10);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        centiseconds: String(centiseconds).padStart(2, '0'),
        isCompleted: false,
      });

      // Calculate progress percentage
      const elapsed = now - startDate.getTime();
      const pct = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      setProgress(pct);
    };

    // Initial call
    updateTimer();

    // High frequency interval (every ~30ms for smooth centiseconds ticker)
    const intervalId = setInterval(updateTimer, 30);

    return () => clearInterval(intervalId);
  }, []);

  // Show a loading skeleton or empty space to prevent Next.js hydration flashing
  if (!timeLeft) {
    return (
      <div className={styles.timerContainer}>
        <div className={styles.timerHeader}>
          <h1 className={`${styles.timerTitle} text-gradient`}>Prueba ICFES Saber 11</h1>
          <p className={styles.timerSubtitle}>Cargando cuenta regresiva...</p>
        </div>
        <div className={styles.timerGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.card}>
              <div className={styles.value}>--</div>
              <div className={styles.label}>Cargando</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (timeLeft.isCompleted) {
    return (
      <div className={styles.completedMessage}>
        <h2 className={styles.completedTitle}>¡Llegó el momento! 🚀</h2>
        <p className={styles.completedSubtitle}>Es hora de dar lo mejor de ti en el examen ICFES. ¡Mucho éxito!</p>
      </div>
    );
  }

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerHeader}>
        <h1 className={`${styles.timerTitle} text-gradient`}>El camino al ICFES</h1>
        <p className={styles.timerSubtitle}>26 de Julio, 2026 • 7:30 AM</p>
      </div>

      <div className={styles.timerGrid}>
        <div className={styles.card} id="timer-days">
          <div className={styles.valueContainer}>
            <span className={styles.value}>{timeLeft.days}</span>
          </div>
          <span className={styles.label}>Días</span>
        </div>

        <div className={styles.card} id="timer-hours">
          <div className={styles.valueContainer}>
            <span className={styles.value}>{timeLeft.hours}</span>
          </div>
          <span className={styles.label}>Horas</span>
        </div>

        <div className={styles.card} id="timer-minutes">
          <div className={styles.valueContainer}>
            <span className={styles.value}>{timeLeft.minutes}</span>
          </div>
          <span className={styles.label}>Minutos</span>
        </div>

        <div className={styles.card} id="timer-seconds">
          <div className={styles.valueContainer}>
            <span className={styles.value}>{timeLeft.seconds}</span>
            <span className={styles.centiseconds}>.{timeLeft.centiseconds}</span>
          </div>
          <span className={styles.label}>Segundos</span>
        </div>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressLabelContainer}>
          <span className={styles.progressText}>Progreso del periodo de preparación</span>
          <span className={styles.progressPercentage}>{progress.toFixed(4)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
