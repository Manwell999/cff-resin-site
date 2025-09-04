import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight" id="home">
              Welcome to <span className="gradient-resin-text resin-glow-text">CFF Resin</span>
            </h1>
            <p className="mt-5 text-lg opacity-80 max-w-xl">
              Discover custom epoxy solutions for homes and businesses. From luxury tables to durable floors—crafted to last with premium resin technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#showcase" className="rounded-full px-5 py-3 bg-resin-blue text-white hover:bg-resin-blue-light transition-colors resin-glow">View Gallery</a>
              <a href="#calculator" className="rounded-full px-5 py-3 bg-resin-blue-light text-white hover:bg-resin-blue transition-colors">Calculate Materials</a>
              <a href="#about" className="rounded-full px-5 py-3 border border-resin-blue/30 hover:bg-resin-blue/10 transition-colors">Learn More</a>
            </div>
          </div>
          <div className="relative">
            {/* Large logo display */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Logo className="scale-150 lg:scale-200" />
                {/* Additional resin effect elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-resin-blue/20 rounded-full resin-glow"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-resin-blue-light/30 rounded-full resin-glow"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-resin-blue-bright/40 rounded-full resin-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


