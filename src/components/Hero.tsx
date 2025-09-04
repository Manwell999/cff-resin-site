
export default function Hero() {
  return (
    <section className="pt-28 sm:pt-32" id="home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Welcome to <span className="gradient-resin-text resin-glow-text">CFF Resin</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl opacity-80 leading-relaxed">
              Discover custom epoxy solutions for homes and businesses. From luxury tables to durable floors—crafted to last with premium resin technology.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a href="#showcase" className="rounded-full px-6 py-3 bg-resin-blue text-white hover:bg-resin-blue-light transition-colors resin-glow">View Gallery</a>
              <a href="#calculator" className="rounded-full px-6 py-3 bg-resin-blue-light text-white hover:bg-resin-blue transition-colors">Calculate Materials</a>
              <a href="#about" className="rounded-full px-6 py-3 border border-resin-blue/30 hover:bg-resin-blue/10 transition-colors">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


