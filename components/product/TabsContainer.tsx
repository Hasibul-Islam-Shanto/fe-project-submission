"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsContainerProps {
  tabs: Tab[];
}

const TabsContainer = ({ tabs }: TabsContainerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const baseId = useId();

  const updateIndicator = useCallback((index: number) => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    const button = tabList.children[index] as HTMLElement | undefined;
    if (!button) return;

    setIndicatorStyle({
      left: button.offsetLeft,
      width: button.offsetWidth,
    });
  }, []);

  const selectTab = useCallback(
    (index: number) => {
      setActiveIndex(index);
      updateIndicator(index);
    },
    [updateIndicator],
  );

  const handleTabListRef = useCallback(
    (node: HTMLDivElement | null) => {
      tabListRef.current = node;
      if (node) {
        requestAnimationFrame(() => updateIndicator(activeIndex));
      }
    },
    [activeIndex, updateIndicator],
  );

  if (tabs.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="relative border-b border-[var(--color-border)]">
        <div
          ref={handleTabListRef}
          role="tablist"
          aria-label="Product information tabs"
          className="relative flex gap-1 overflow-x-auto pb-px"
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${index}`}
                onClick={() => selectTab(index)}
                className={`relative z-10 shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          <span
            aria-hidden="true"
            className="absolute bottom-0 h-0.5 rounded-full bg-[var(--color-brand)] transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeIndex}`}
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
      >
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default TabsContainer;
