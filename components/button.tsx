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
        "border border-violet border-dashed px-4 py-2 inline-flex items-center gap-2 text-violet cursor-pointer",
        className,
      )}
    >
      {props.children} <ArrowRight className="size-4" />
    </button>
  );
}
