import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CtaBanner = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-4xl rounded-2xl border border-[var(--glass-border)] p-10 text-center sm:p-14">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          Ready to upgrade your setup?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-text-secondary)]">
          Explore hundreds of products with transparent pricing and hassle-free
          returns.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_32px_rgba(99,102,241,0.4)]"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
