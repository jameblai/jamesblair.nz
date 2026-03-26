import type { ReactNode } from "react";

export function Card({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col p-4 gap-2 border border-dashed border-subtle">
      {children}
    </div>
  );
}
