export default function FooterWidget() {
  return (
    <footer className="py-8 px-6 border-t border-stone-100 bg-white">
      <div className="max-w-350 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-400">
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.4rem", color: "#c8896a" }}>
          MemoryPage
        </p>
        <p>© 2026 MemoryPage. Made with love.</p>
      </div>
    </footer>
  );
}
