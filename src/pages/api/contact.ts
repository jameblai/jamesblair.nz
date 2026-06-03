import type { APIRoute } from "astro";
import z from "zod";
import { contactFormSchema, getContactFormValues } from "@/lib/contact-form";
import { sendContactFormSubmission } from "@/lib/discord";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const values = getContactFormValues(await request.formData());
  const result = contactFormSchema.safeParse(values);

  if (!result.success) {
    return Response.json(
      {
        status: "error",
        errors: z.flattenError(result.error).fieldErrors,
        values,
      },
      { status: 400 },
    );
  }

  try {
    await sendContactFormSubmission(result.data);

    return Response.json({
      status: "success",
    });
  } catch {
    return Response.json(
      {
        status: "error",
        errors: {
          form: [
            "Sorry, your message could not be sent. Please try again later.",
          ],
        },
        values,
      },
      { status: 500 },
    );
  }
};
