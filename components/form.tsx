import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps {
  name: string;
  label: string;
  error?: string[];
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-errormessage"?: string;
  }) => ReactNode;
}

export function FormField({ name, label, error, children }: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      {children({
        id: name,
        name,
        "aria-invalid": !!error?.length,
        "aria-errormessage": error?.length ? errorId : undefined,
      })}
      {error?.[0] && (
        <span id={errorId} className="text-coral">
          {error[0]}
        </span>
      )}
    </div>
  );
}

export function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "border border-dashed border-subtle px-2.5 py-2",
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(
        "border border-dashed border-subtle px-2.5 py-2 min-h-48",
        className,
      )}
      {...props}
    />
  );
}
