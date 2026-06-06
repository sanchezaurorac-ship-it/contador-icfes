'use strict';

import React from 'react';
import styles from './page.module.css';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import CountdownTimer from '@/components/CountdownTimer';
import StudyTimer from '@/components/StudyTimer';
import ExamTips from '@/components/ExamTips';
import MotivationalCard from '@/components/MotivationalCard';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Ambient background animations */}
      <BackgroundBlobs />

      <main className={styles.mainContent}>
        {/* Navigation / Header bar */}
        <header className={styles.navHeader}>
          <div className={styles.logoText}>
            <span className={styles.logoDot} />
            <span>ICFES Tracker</span>
          </div>
          <span className={styles.badgeYear}>Saber 11 • 2026</span>
        </header>

        {/* Main Countdown Timer Section */}
        <section className={styles.countdownWrapper}>
          <CountdownTimer />
        </section>

        {/* Sub-widgets interactive dashboard grid */}
        <section className={styles.dashboardGrid}>
          <div id="pomodoro-widget">
            <StudyTimer />
          </div>
          
          <div id="checklist-widget">
            <ExamTips />
          </div>

          <div id="tips-widget">
            <MotivationalCard />
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <footer className={styles.footer}>
        <div className="container">
          <p>
            Construido para estudiantes aspirantes a la educación superior en Colombia. ¡Éxito en tu camino!
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.8 }}>
            Examen oficial programado para el 26 de Julio de 2026 a las 07:30 AM (COT).
          </p>
        </div>
      </footer>
    </div>
  );
}
