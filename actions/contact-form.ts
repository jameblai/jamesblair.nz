"use server";

import z from "zod";
import {
  type ContactFormState,
  contactFormSchema,
  defaultContactFormValues,
  getContactFormValues,
} from "@/lib/contact-form";
import { sendContactFormSubmission } from "@/lib/resend";

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = getContactFormValues(formData);

  const result = contactFormSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      errors: z.flattenError(result.error).fieldErrors,
      values,
    };
  }

  await sendContactFormSubmission(result.data);

  return {
    status: "success",
    values: defaultContactFormValues,
  };
}
