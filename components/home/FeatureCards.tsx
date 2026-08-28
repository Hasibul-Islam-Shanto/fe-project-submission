import { Headphones, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick shipping across major cities with real-time tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description:
      "100% authentic items backed by official manufacturer warranty.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Friendly help before and after your purchase, every step.",
  },
];

const FeatureCards = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3 sm:gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="card-premium animate-fade-in p-6"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/15 text-[var(--color-text-accent)]">
              <feature.icon className="h-5 w-5" />
            </span>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
