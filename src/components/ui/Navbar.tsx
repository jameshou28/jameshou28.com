import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border)]">
      <Link href="/" className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight text-[var(--text-primary)] hover:opacity-70 transition-opacity">
        James Hou
      </Link>
      
      <div className="flex items-center space-x-6 text-sm font-medium text-[var(--text-secondary)]">
        <Link href="/#about" className="hover:text-[var(--text-primary)] transition-colors">About</Link>
        <Link href="/programming" className="hover:text-[var(--text-primary)] transition-colors">Programming</Link>
        <Link href="/engineering" className="hover:text-[var(--text-primary)] transition-colors">Engineering</Link>
        <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
