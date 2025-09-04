import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-resin-blue/20 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo />
          <p className="text-sm mt-3 opacity-80">Providing exceptional resin products and materials since 2024.</p>
        </div>
        <div>
          <h3 className="font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-resin-blue-light transition-colors">Home</a></li>
            <li><a href="#store" className="hover:text-resin-blue-light transition-colors">Store</a></li>
            <li><a href="#about" className="hover:text-resin-blue-light transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-resin-blue-light transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>(319) 750-2648</li>
            <li><a className="hover:text-resin-blue-light transition-colors" href="mailto:scootermeds@gmail.com">scootermeds@gmail.com</a></li>
            <li>Fort Madison, IA</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-3">Follow Us</h3>
          <p className="text-sm opacity-80">Coming soon</p>
        </div>
      </div>
      <div className="text-center text-xs py-6 border-t border-resin-blue/10 opacity-70">© 2024 CFF Resin. All rights reserved.</div>
    </footer>
  );
}


