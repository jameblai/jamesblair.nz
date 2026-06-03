"use server";

import z from "zod";
import {
  type ContactFormState,
  contactFormSchema,
  defaultContactFormValues,
  getContactFormValues,
} from "@/lib/contact-form";
import { sendContactFormSubmission } from "@/lib/discord";

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

  try {
    await sendContactFormSubmission(result.data);

    return {
      status: "success",
      values: defaultContactFormValues,
    };
  } catch {
    return {
      status: "error",
      errors: {
        message: [
          "Sorry, your message could not be sent. Please try again later.",
        ],
      },
      values,
    };
  }
}
