import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Button({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "border border-dashed border-violet px-4 py-2 inline-flex items-center gap-2 text-violet cursor-pointer",
        className,
      )}
    >
      <span className="font-mono font-medium">{props.children}</span>{" "}
      <ArrowRight className="size-4" />
    </button>
  );
}
