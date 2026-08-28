import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { CartButton } from "@/components/cart";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-4 sm:px-6 lg:px-8">
      <div className="glass mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between rounded-full border border-[var(--glass-border)] px-3 pl-4 shadow-[var(--glass-shadow)] backdrop-blur-xl sm:px-4 sm:pl-5">
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

        <CartButton />
      </div>
    </header>
  );
};

export default Header;
