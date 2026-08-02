"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const GitHubCalendar = dynamic(() => import('react-github-calendar').then((mod) => mod.GitHubCalendar), {
  ssr: false,
});

const WEEKS_PER_YEAR = 53;
const LABEL_RESERVED_PX = 36;

const GITHUB_CONTRIBUTION_COLORS: string[] = [
  '#ebedf0',
  '#9be9a8',
  '#3daa5a',
  '#30a14e',
  '#216e39',
];

export default function GithubGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(14);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth - LABEL_RESERVED_PX;
      const margin = available < 350 ? 2 : 5;
      const size = Math.floor(available / WEEKS_PER_YEAR) - margin;
      setBlockSize(Math.max(4, Math.min(14, size)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const blockMargin = blockSize < 8 ? 2 : 5;
  const fontSize = Math.max(8, Math.min(14, blockSize));

  return (
    <div className="w-full">
      <div ref={containerRef} className="p-4 sm:p-8 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border)] flex justify-center overflow-hidden">
        <GitHubCalendar
          username="jameshou28"
          colorScheme="light"
          blockSize={blockSize}
          blockMargin={blockMargin}
          fontSize={fontSize}
          theme={{
            light: GITHUB_CONTRIBUTION_COLORS,
            dark: GITHUB_CONTRIBUTION_COLORS,
          }}
        />
      </div>
    </div>
  );
}
