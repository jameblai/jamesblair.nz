import type { ComponentPropsWithoutRef } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  tag: HeadingTag;
  hashes?: number;
} & ComponentPropsWithoutRef<HeadingTag>;

export function Heading({
  tag: Tag,
  hashes: hashCount,
  children,
  ...props
}: HeadingProps) {
  const hashes = "#".repeat(hashCount ?? parseInt(Tag.charAt(1), 10));

  return (
    <Tag {...props} className="text-sky">
      <span className="text-subtle">{hashes}</span> {children}
    </Tag>
  );
}
