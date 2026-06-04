import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Button({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "group bg-accent text-bg hover:bg-string inline-flex cursor-pointer items-center gap-2 px-4 py-2 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      <span className="font-mono font-medium">{children}</span>{" "}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}
