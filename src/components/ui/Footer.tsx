import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--bg-primary)]/60 backdrop-blur-sm py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link href="/" className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] hover:opacity-70 transition-opacity">
            James Hou
          </Link>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Software & Hardware Engineer
          </p>
        </div>
        
        <div className="flex space-x-6 text-sm font-medium text-[var(--text-secondary)]">
          <a href="mailto:james.william.hou@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">Email</a>
          <a href="https://github.com/jameshou28" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/jameshou28/" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
