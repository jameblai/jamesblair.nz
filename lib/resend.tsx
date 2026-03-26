import { ContactFormValues } from "@/lib/contact-form";
import { Resend } from "resend";
import ContactFormEmail from "@/emails/contact-form";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactFormSubmission(values: ContactFormValues) {
  await resend.emails.send({
    from: "Website <website@blair.nz>",
    to: "james@blair.nz",
    replyTo: `${values.email}`,
    subject: `Received a message from ${values.name}`,
    react: <ContactFormEmail {...values} />,
  });
}
