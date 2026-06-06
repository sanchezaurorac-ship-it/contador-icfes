'use strict';

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contador ICFES 2026 - ¿Cuánto falta para la prueba Saber 11?",
  description: "Cronómetro en tiempo real en días, horas, minutos y segundos para el examen ICFES Saber 11 del 26 de Julio de 2026 a las 7:30 AM. Incluye temporizador Pomodoro para estudiar y checklist para el examen.",
  keywords: ["ICFES", "Saber 11", "Contador ICFES", "ICFES 2026", "cuanto falta para el icfes", "Calendario A 2026", "estudiar icfes", "pomodoro icfes"],
  authors: [{ name: "ICFES Tracker Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
