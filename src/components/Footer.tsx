export default function Footer() {
  return (
    <footer className="bg-ink text-paper px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-4 font-mono text-sm">
        <p>© {new Date().getFullYear()} Alireza Sakhaeirad (and Claude Code xD).</p>
        <p className="flex gap-6">
          <a href="/movies" className="hover:text-coral transition-colors">
            movies →
          </a>
          <a href="#home" className="hover:text-coral transition-colors">
            back to top ↑
          </a>
        </p>
      </div>
    </footer>
  )
}
