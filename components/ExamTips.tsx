'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import styles from './ExamTips.module.css';

const CHECKLIST_ITEMS = [
  { id: 'id-doc', text: 'Documento de identidad original (Tarjeta de Identidad o Cédula)' },
  { id: 'pencil', text: 'Lápiz de grafito N.° 2 (se aconseja llevar dos)' },
  { id: 'eraser', text: 'Borrador de nata suave y un buen tajalápiz' },
  { id: 'citacion', text: 'Citación impresa (facilita ubicar tu salón rápidamente)' },
  { id: 'water-snack', text: 'Botella de agua y snack (maní o chocolate para energía)' },
  { id: 'clothing', text: 'Ropa cómoda y una chaqueta (los salones pueden ser fríos)' }
];

export default function ExamTips() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('icfes_exam_checklist');
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading checklist state:', e);
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    const nextState = {
      ...checkedItems,
      [id]: !checkedItems[id]
    };
    setCheckedItems(nextState);
    localStorage.setItem('icfes_exam_checklist', JSON.stringify(nextState));
  };

  const completedCount = CHECKLIST_ITEMS.filter(item => checkedItems[item.id]).length;

  return (
    <div className={`${styles.card} glass-card`}>
      <div>
        <div className={styles.header}>
          <h3 className={styles.title}>Kit del Día del Examen</h3>
          <span className={styles.progressText}>
            {isMounted ? `${completedCount}/${CHECKLIST_ITEMS.length}` : '0/6'}
          </span>
        </div>

        <div className={styles.list}>
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = isMounted && !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isChecked ? styles.completedItem : ''}`}
                onClick={() => handleToggle(item.id)}
                id={`checklist-item-${item.id}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Controlled via onClick on the parent div
                  className={styles.checkbox}
                  aria-label={item.text}
                />
                <span className={`${styles.itemText} ${isChecked ? styles.completedText : ''}`}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footerTip}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.footerIcon} style={{ width: '18px', height: '18px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <span>
          <strong>Importante:</strong> Está totalmente prohibido ingresar celulares, audífonos o cualquier dispositivo electrónico al salón.
        </span>
      </div>
    </div>
  );
}
