interface StoryContent {
  title: string;
  text: string;
  groomName: string;
  brideName: string;
  groomImage?: string;
  brideImage?: string;
}

export default function Story({ content }: { content: StoryContent }) {
  return (
    <section className="py-24 px-6" style={{ background: "#fffbf7" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-3">Our Story</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            {content.title}
          </h2>
          <div className="w-16 h-px bg-rose-200 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Groom portrait */}
          <div className="text-center">
            <div
              className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden border-4 border-rose-100 shadow-lg"
              style={{ background: "#f8e8e0" }}
            >
              {content.groomImage ? (
                <img
                  src={content.groomImage}
                  alt={content.groomName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: "#c8896a" }}>
                    {content.groomName[0]}
                  </span>
                </div>
              )}
            </div>
            <h3
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
            >
              {content.groomName}
            </h3>
          </div>

          {/* Story text */}
          <div className="text-center md:text-left">
            <div className="text-5xl text-rose-200 mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>❝</div>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#6b4c3b", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              {content.text}
            </p>
          </div>

          {/* Bride portrait */}
          <div className="text-center">
            <div
              className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden border-4 border-rose-100 shadow-lg"
              style={{ background: "#f8e8e0" }}
            >
              {content.brideImage ? (
                <img
                  src={content.brideImage}
                  alt={content.brideName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: "#c8896a" }}>
                    {content.brideName[0]}
                  </span>
                </div>
              )}
            </div>
            <h3
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
            >
              {content.brideName}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
