import { MapPin, Clock, Calendar } from "lucide-react";

interface EventContent {
  title: string;
  ceremonyTitle: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyTime: string;
  receptionTitle: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionTime: string;
}

export default function EventDetails({ content }: { content: EventContent }) {
  return (
    <section className="py-24 px-6" style={{ background: "#fdf6f0" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-3">Save the Date</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            {content.title}
          </h2>
          <div className="w-16 h-px bg-rose-200 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div
            className="rounded-2xl p-8 text-center border border-rose-100 shadow-sm"
            style={{ background: "#fff" }}
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">💍</span>
            </div>
            <h3
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
            >
              {content.ceremonyTitle}
            </h3>

            <div className="space-y-3 text-sm" style={{ color: "#6b4c3b" }}>
              <div className="flex items-center gap-3 justify-center">
                <MapPin size={16} className="text-rose-400 shrink-0" />
                <span className="font-medium">{content.ceremonyVenue}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <MapPin size={16} className="text-rose-200 shrink-0" />
                <span className="text-rose-400/80">{content.ceremonyAddress}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Clock size={16} className="text-rose-400 shrink-0" />
                <span>{content.ceremonyTime}</span>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div
            className="rounded-2xl p-8 text-center border border-rose-100 shadow-sm"
            style={{ background: "#fff" }}
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🥂</span>
            </div>
            <h3
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
            >
              {content.receptionTitle}
            </h3>

            <div className="space-y-3 text-sm" style={{ color: "#6b4c3b" }}>
              <div className="flex items-center gap-3 justify-center">
                <MapPin size={16} className="text-rose-400 shrink-0" />
                <span className="font-medium">{content.receptionVenue}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <MapPin size={16} className="text-rose-200 shrink-0" />
                <span className="text-rose-400/80">{content.receptionAddress}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Clock size={16} className="text-rose-400 shrink-0" />
                <span>{content.receptionTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
