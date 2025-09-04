function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-resin-blue/20 shadow-sm resin-glow">
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="mt-2 text-sm opacity-80">{description}</p>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section className="mt-20" id="why">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight gradient-resin-text">Why Choose Us</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Premium Craftsmanship" description="We use top-tier epoxy materials and meticulous techniques to create stunning floors, custom tables, and artistic pieces built to last." />
          <Card title="Custom Creations" description="From luxury epoxy tables to unique floor designs and artwork, we bring your vision to life with fully personalized solutions." />
          <Card title="Safe & Professional" description="Every project follows strict safety protocols and is completed with expert precision—ensuring beautiful, durable, and safe results." />
        </div>
      </div>
    </section>
  );
}


