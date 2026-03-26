import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  tag: HeadingTag;
  hashes?: number;
} & ComponentPropsWithoutRef<HeadingTag>;

const headingVariants = cva("font-mono font-bold text-sky leading-none", {
  variants: {
    tag: {
      h1: "text-2xl",
      h2: "text-xl",
      h3: "text-lg",
      h4: "text-base",
      h5: "text-base",
      h6: "text-base",
    },
  },
});

export function Heading({
  tag: Tag,
  hashes,
  children,
  className,
  ...props
}: HeadingProps) {
  const prefix = "#".repeat(parseInt(Tag.charAt(1), 10));

  return (
    <Tag {...props} className={cn(headingVariants({ tag: Tag }), className)}>
      <span className="text-subtle">{prefix}</span> {children}
    </Tag>
  );
}
