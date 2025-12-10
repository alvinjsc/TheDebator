// app/components/ThemeToggle.jsx
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
// You would use icons here, but we'll use text for simplicity
// npm install react-icons (if you want real icons like FiSun/FiMoon)

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only in the browser, solving SSR/hydration issues
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // Don't render until mounted to prevent flash
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="persona-btn persona-inactive"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}