export default function About() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-32 bg-[var(--bg-primary)]">
      <div className="text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-medium font-[family-name:var(--font-display)] text-[var(--text-primary)] leading-tight">
          I build at the intersection of <span className="text-[var(--accent)] font-bold">hardware</span> and <span className="text-[var(--accent)] font-bold">software</span>.
        </h2>
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl mx-auto">
          From VEX competition robots to wearable devices to accessibility tools. Every project starts with a problem worth solving.
        </p>
      </div>
    </section>
  );
}
