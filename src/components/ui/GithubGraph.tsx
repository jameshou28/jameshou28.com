"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { Activity } from 'react-github-calendar';

const GitHubCalendar = dynamic(() => import('react-github-calendar').then((mod) => mod.GitHubCalendar), {
  ssr: false,
});

// On narrow screens, show only the most recent weeks so the calendar fits
// without horizontal scrolling.
const MOBILE_WEEKS = 18;

function lastNWeeks(data: Activity[], weeks: number) {
  return data.slice(-weeks * 7);
}

export default function GithubGraph() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return (
    <div className="w-full">
      <div className="p-4 sm:p-8 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border)] flex justify-center overflow-x-auto overflow-y-hidden">
        <GitHubCalendar
          username="jameshou28"
          colorScheme="light"
          blockSize={isMobile ? 8 : 14}
          blockMargin={isMobile ? 3 : 5}
          fontSize={isMobile ? 10 : 14}
          transformData={isMobile ? (data) => lastNWeeks(data, MOBILE_WEEKS) : undefined}
          theme={{
            light: ['#ebe8e4', '#a1ecd4', '#5ddca9', '#2ab989', '#00b87a'],
            dark: ['#ebe8e4', '#a1ecd4', '#5ddca9', '#2ab989', '#00b87a']
          }}
        />
      </div>
    </div>
  );
}
