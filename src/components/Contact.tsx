"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  }

  return (
    <section className="mt-24" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl ring-1 ring-resin-blue/20 p-8 bg-white/5 resin-glow">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight gradient-resin-text">Need Help or Professional Installation?</h2>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div>
                <div className="opacity-70">Phone</div>
                <div className="font-medium">(319) 750-2648</div>
              </div>
              <div>
                <div className="opacity-70">Email</div>
                <a className="font-medium hover:underline" href="mailto:scootermeds@gmail.com">scootermeds@gmail.com</a>
              </div>
              <div>
                <div className="opacity-70">Location</div>
                <div className="font-medium">Fort Madison, IA</div>
              </div>
            </div>
            <form onSubmit={submit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm opacity-80">Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-sm opacity-80">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-sm opacity-80">Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-sm opacity-80">Message</label>
                <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" />
              </div>
              {status === "error" && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              {status === "success" && (
                <div className="text-green-500 text-sm">Thanks! We received your message.</div>
              )}
              <div>
                <button disabled={status === "submitting"} className="rounded-full px-5 py-3 bg-resin-blue text-white hover:bg-resin-blue-light disabled:opacity-50 transition-colors resin-glow">
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


