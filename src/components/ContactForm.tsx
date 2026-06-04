import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/Button";
import {
  type ContactFormErrors,
  defaultContactFormState,
  defaultContactFormValues,
} from "@/lib/contact-form";
import { cn } from "@/lib/cn";

function Label({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn("text-accent font-mono font-medium", className)}
      {...props}
    />
  );
}

function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "border-border bg-bg-elevated placeholder:text-fg-dim focus:border-accent border px-2.5 py-2 transition-colors duration-200 outline-none",
        className,
      )}
      {...props}
    />
  );
}

function TextArea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(
        "border-border bg-bg-elevated placeholder:text-fg-dim focus:border-accent min-h-48 border px-2.5 py-2 transition-colors duration-200 outline-none",
        className,
      )}
      {...props}
    />
  );
}

interface FormFieldProps {
  name: "name" | "email" | "message";
  label: string;
  error?: string[];
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-errormessage"?: string;
  }) => React.ReactNode;
}

function FormField({ name, label, error, children }: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      {children({
        id: name,
        name,
        "aria-invalid": !!error?.length,
        "aria-errormessage": error?.length ? errorId : undefined,
      })}
      {error?.[0] && (
        <span id={errorId} className="text-error">
          {error[0]}
        </span>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState(defaultContactFormState);
  const [pending, setPending] = useState(false);
  const errors: ContactFormErrors | undefined =
    state.status === "error" ? state.errors : undefined;

  function updateValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setState((current) => ({
      ...current,
      values: {
        ...current.values,
        [name]: value,
      },
    }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as
        | { status: "success" }
        | {
            status: "error";
            errors?: ContactFormErrors;
          };

      if (response.ok && payload.status === "success") {
        setState({
          status: "success",
          values: defaultContactFormValues,
        });
        return;
      }

      setState({
        status: "error",
        values: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
        errors:
          payload.status === "error"
            ? (payload.errors ?? {
                form: [
                  "Sorry, your message could not be sent. Please try again later.",
                ],
              })
            : {
                form: [
                  "Sorry, your message could not be sent. Please try again later.",
                ],
              },
      });
    } catch {
      setState((current) => ({
        status: "error",
        values: current.values,
        errors: {
          form: [
            "Sorry, your message could not be sent. Please try again later.",
          ],
        },
      }));
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-4xl flex-col gap-4" onSubmit={submit}>
      {state.status === "success" && (
        <div className="border-accent bg-accent/20 border p-4">
          Thank you for your message! :)
        </div>
      )}
      {errors?.form?.[0] && (
        <div className="border-error bg-error/20 border p-4">
          {errors.form[0]}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField name="name" label="Name" error={errors?.name}>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              value={state.values.name}
              onChange={updateValue}
              placeholder="Stelle"
              className="w-full"
            />
          )}
        </FormField>

        <FormField name="email" label="Email" error={errors?.email}>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              value={state.values.email}
              onChange={updateValue}
              type="email"
              placeholder="stelle@astral.express"
              className="w-full"
            />
          )}
        </FormField>
      </div>

      <FormField name="message" label="Message" error={errors?.message}>
        {(fieldProps) => (
          <TextArea
            {...fieldProps}
            value={state.values.message}
            onChange={updateValue}
            placeholder="The Express needs a full-stack dev for a side quest."
            className="w-full"
          />
        )}
      </FormField>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
