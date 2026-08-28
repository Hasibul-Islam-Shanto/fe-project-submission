import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[var(--color-aurora-1)]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-32 h-64 w-64 rounded-full bg-[var(--color-aurora-3)]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-sm text-[var(--color-text-secondary)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-aurora-1)]" />
          <span>Your trusted electronics marketplace</span>
        </div>

        <h1
          className="animate-fade-in text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Shop smarter with <span className="text-aurora">TonMart</span>
        </h1>

        <p
          className="animate-fade-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          Discover premium electronics and home appliances — curated deals,
          genuine products, and a seamless shopping experience.
        </p>

        <div
          className="animate-fade-in mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/products"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_32px_rgba(99,102,241,0.4)] sm:w-auto"
          >
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] sm:w-auto"
          >
            View all deals
          </Link>
        </div>

        <p
          className="animate-fade-in mt-6 text-sm text-[var(--color-text-muted)]"
          style={{ animationDelay: "320ms" }}
        >
          Free delivery on select items · Official warranty included
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
