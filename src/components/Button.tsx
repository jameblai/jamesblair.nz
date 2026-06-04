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
        "bg-accent text-bg inline-flex cursor-pointer items-center gap-2 px-4 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      <span className="font-mono font-medium">{children}</span>{" "}
      <ArrowRight className="size-4" />
    </button>
  );
}
