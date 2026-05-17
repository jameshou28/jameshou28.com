"use client";

import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(() => import('react-github-calendar').then((mod) => mod.GitHubCalendar), {
  ssr: false,
});

export default function GithubGraph() {
  return (
    <div className="w-full">
      <div className="p-8 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border)] flex justify-center overflow-x-auto overflow-y-hidden">
        <div className="min-w-[700px] flex justify-center">
          <GitHubCalendar 
            username="jameshou28" 
            colorScheme="light"
            blockSize={14}
            blockMargin={5}
            fontSize={14}
            theme={{
              light: ['#ebe8e4', '#a1ecd4', '#5ddca9', '#2ab989', '#00b87a'],
              dark: ['#ebe8e4', '#a1ecd4', '#5ddca9', '#2ab989', '#00b87a']
            }}
          />
        </div>
      </div>
    </div>
  );
}
