import { ExternalLinkIcon } from "lucide-react";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Link({
  href,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof NextLink>) {
  const external = href.toString().startsWith("http");
  const target = external ? "_blank" : undefined;

  return (
    <NextLink
      {...props}
      href={href}
      target={target}
      className={cn("inline-flex items-center gap-2 text-violet", className)}
    >
      {props.children}
      {external && <ExternalLinkIcon className="size-4" />}
    </NextLink>
  );
}
