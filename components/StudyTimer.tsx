'use strict';

'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './StudyTimer.module.css';

type Mode = 'study' | 'rest';

const MODE_TIMES = {
  study: 25 * 60, // 25 minutes
  rest: 5 * 60,   // 5 minutes
};

export default function StudyTimer() {
  const [mode, setMode] = useState<Mode>('study');
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(MODE_TIMES.study);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a beautiful synthetic beep using the Web Audio API
  const playAlertSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      
      // Play double beep
      const playBeep = (time: number, frequency: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, time);
        
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.1, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        
        osc.start(time);
        osc.stop(time + duration);
      };
      
      const now = ctx.currentTime;
      playBeep(now, 880, 0.15); // A5 note
      playBeep(now + 0.2, 1046.5, 0.25); // C6 note
    } catch (e) {
      console.warn('Audio Context error (likely needs user interaction first):', e);
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Timer finished!
            setIsActive(false);
            playAlertSound();
            
            // Switch modes automatically
            const nextMode = mode === 'study' ? 'rest' : 'study';
            setMode(nextMode);
            return MODE_TIMES[nextMode];
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, mode]);

  const toggleStart = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(MODE_TIMES[mode]);
  };

  const switchMode = (newMode: Mode) => {
    setIsActive(false);
    setMode(newMode);
    setSecondsLeft(MODE_TIMES[newMode]);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = MODE_TIMES[mode];
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className={`${styles.card} glass-card`}>
      <div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Área de Estudio</h3>
          <span className={mode === 'study' ? styles.badge : styles.badgeRest}>
            {mode === 'study' ? 'En Enfoque' : 'Descanso'}
          </span>
        </div>

        <div className={styles.modeSelector}>
          <button
            className={`${styles.modeButton} ${mode === 'study' ? styles.modeButtonActiveStudy : ''}`}
            onClick={() => switchMode('study')}
          >
            Estudio (25m)
          </button>
          <button
            className={`${styles.modeButton} ${mode === 'rest' ? styles.modeButtonActiveRest : ''}`}
            onClick={() => switchMode('rest')}
          >
            Descanso (5m)
          </button>
        </div>

        <div className={styles.timerDisplay}>
          <div className={styles.time}>{displayTime}</div>
        </div>
      </div>

      <div>
        <div className={styles.controls}>
          <button 
            className={styles.btnControl} 
            onClick={handleReset} 
            title="Reiniciar"
            aria-label="Reiniciar temporizador"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>

          <button 
            className={`${styles.btnControl} ${mode === 'study' ? styles.btnPlay : styles.btnPlayRest}`} 
            onClick={toggleStart}
            title={isActive ? "Pausar" : "Iniciar"}
            aria-label={isActive ? "Pausar temporizador" : "Iniciar temporizador"}
          >
            {isActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '24px', height: '24px', marginLeft: '2px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.progressBarContainer}>
          <div 
            className={`${styles.progressBarFill} ${mode === 'study' ? styles.progressBarFillStudy : styles.progressBarFillRest}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
