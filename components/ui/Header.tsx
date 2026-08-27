import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-4 sm:px-6 lg:px-8">
      <div className="glass mx-auto flex h-[3.75rem] max-w-5xl items-center justify-between rounded-full border border-[var(--glass-border)] px-3 pl-4 shadow-[var(--glass-shadow)] backdrop-blur-xl sm:px-4 sm:pl-5">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full py-1.5 pr-3 transition-colors hover:bg-[var(--color-surface-hover)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-aurora-1)] to-[var(--color-aurora-2)] text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)] transition-transform duration-300 group-hover:scale-105">
            <ShoppingBag
              className="h-[1.125rem] w-[1.125rem]"
              aria-hidden="true"
            />
          </span>
          <span className="text-lg font-bold tracking-tight text-aurora sm:text-xl">
            TonMart
          </span>
        </Link>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-[1.125rem] w-[1.125rem]" />
          <span className="absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-bold text-white ring-2 ring-[var(--color-bg-primary)]">
            0
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
