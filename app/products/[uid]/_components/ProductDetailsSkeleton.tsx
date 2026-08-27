const pulse = "animate-pulse rounded bg-[var(--color-bg-tertiary)]";

const ProductDetailsSkeleton = () => {
  return (
    <div
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading product details"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div
            className={`surface-card aspect-square ${pulse}`}
            aria-hidden="true"
          />
          <div className="flex justify-center gap-2" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-2.5 w-2.5 rounded-full ${pulse}`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3" aria-hidden="true">
            <div className={`h-8 w-full ${pulse}`} />
            <div className={`h-8 w-2/3 ${pulse}`} />
          </div>

          <div className="space-y-3" aria-hidden="true">
            <div className={`h-9 w-36 ${pulse}`} />
            <div className={`h-4 w-44 ${pulse}`} />
          </div>

          <div className="space-y-2" aria-hidden="true">
            <div className={`h-4 w-28 ${pulse}`} />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-[4.5rem] w-28 rounded-lg ${pulse}`}
                />
              ))}
            </div>
          </div>

          <div
            className={`h-12 w-full rounded-xl sm:w-40 ${pulse}`}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <div
          className="flex gap-4 border-b border-[var(--color-border)] pb-3"
          aria-hidden="true"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`h-9 w-24 rounded-lg ${pulse}`} />
          ))}
        </div>

        <div className="space-y-4" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4`}
            >
              <div className={`mb-3 h-4 w-32 ${pulse}`} />
              <div className="space-y-2">
                <div className={`h-3 w-full ${pulse}`} />
                <div className={`h-3 w-5/6 ${pulse}`} />
                <div className={`h-3 w-2/3 ${pulse}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
