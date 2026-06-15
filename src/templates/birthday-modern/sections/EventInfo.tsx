import { MapPin, Clock, Calendar } from "lucide-react";

interface EventInfoContent {
  title: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  dresscode: string;
}

export default function BirthdayEventInfo({ content }: { content: EventInfoContent }) {
  const items = [
    { icon: <Calendar size={20} />, label: "Date", value: content.date },
    { icon: <Clock size={20} />, label: "Time", value: content.time },
    { icon: <MapPin size={20} />, label: "Venue", value: content.venue },
    { icon: <MapPin size={20} className="opacity-50" />, label: "Address", value: content.address },
  ];

  return (
    <section className="py-24 px-6" style={{ background: "#f7f7fe" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-400 mb-3">Party Details</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {content.title}
          </h2>
          {content.dresscode && (
            <p className="mt-4 text-sm text-purple-500 uppercase tracking-widest">
              Dress Code: {content.dresscode}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-purple-50"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500 shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                <p className="text-gray-800 font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
