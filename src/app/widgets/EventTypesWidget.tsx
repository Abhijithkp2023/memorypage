const EVENT_TYPES = [
  { emoji: "/couple.png", label: "Wedding", count: "1 template" },
  { emoji: "/birthday.png", label: "Birthday", count: "Coming soon" },
  { emoji: "/wedding_ring.png", label: "Engagement", count: "Coming soon" },
  // { emoji: "🏠", label: "Housewarming", count: "Coming soon" },
];

export default function EventTypesWidget() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-350 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-stone-800 mb-3">
            Every occasion, beautifully covered
          </h2>
          <p className="text-stone-500">Templates designed for every milestone in life</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {EVENT_TYPES.map(({ emoji, label, count }) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-center border border-stone-100 hover:border-rose-200 hover:shadow-md transition-all cursor-default"
            >
              <img src={emoji} className="text-3xl mb-2" />
              <p className="text-sm font-medium text-stone-700">{label}</p>
              <p className="text-xs text-stone-400 mt-1">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
