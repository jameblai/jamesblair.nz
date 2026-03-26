import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z.string().min(50, "Please enter at least 50 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string[]>
>;

export type ContactFormState =
  | {
      status: "idle";
      values: ContactFormValues;
    }
  | {
      status: "error";
      values: ContactFormValues;
      errors: ContactFormErrors;
    }
  | {
      status: "success";
      values: ContactFormValues;
    };

export const defaultContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

export const defaultContactFormState: ContactFormState = {
  status: "idle",
  values: defaultContactFormValues,
};

export function getContactFormValues(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}
