interface StoryContent {
  title: string;
  text: string;
  proposalPlace: string;
  proposalDate: string;
}

export default function EngagementStory({ content }: { content: StoryContent }) {
  return (
    <section className="py-24 px-6" style={{ background: "#fffbfc" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-pink-400 mb-3">How it happened</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d1a22" }}
          >
            {content.title}
          </h2>
          <div className="w-16 h-px bg-pink-200 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-lg leading-relaxed italic"
              style={{ fontFamily: "'Playfair Display', serif", color: "#6b2737" }}
            >
              &ldquo;{content.text}&rdquo;
            </p>
          </div>
          <div className="bg-pink-50 rounded-3xl p-8 text-center border border-pink-100">
            <div className="text-5xl mb-4">💍</div>
            <p className="text-xs uppercase tracking-widest text-pink-400 mb-2">The Proposal</p>
            <h3
              className="text-2xl mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d1a22" }}
            >
              {content.proposalPlace}
            </h3>
            <p className="text-sm text-pink-400">{content.proposalDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
