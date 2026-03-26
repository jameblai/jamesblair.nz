"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/actions/contact-form";
import { Button } from "@/components/button";
import { FormField, Input, TextArea } from "@/components/form";
import { defaultContactFormState } from "@/lib/contact-form";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    defaultContactFormState,
  );
  const errors = state.status === "error" ? state.errors : undefined;

  return (
    <form className="flex flex-col gap-4 max-w-4xl" action={formAction}>
      {state.status === "success" && (
        <div className="border border-sky border-dashed bg-sky/20 p-4">
          Thank you for your message! :)
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField name="name" label="Name" error={errors?.name}>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              defaultValue={state.values.name}
              className="w-full"
            />
          )}
        </FormField>

        <FormField name="email" label="Email" error={errors?.email}>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              defaultValue={state.values.email}
              type="email"
              className="w-full"
            />
          )}
        </FormField>
      </div>

      <FormField name="message" label="Message" error={errors?.message}>
        {(fieldProps) => (
          <TextArea
            {...fieldProps}
            defaultValue={state.values.message}
            className="w-full"
          />
        )}
      </FormField>

      <Button type="submit" disabled={pending} className="self-start">
        Send
      </Button>
    </form>
  );
}
