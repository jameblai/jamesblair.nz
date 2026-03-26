import { ContactFormValues } from "@/lib/contact-form";
import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ContactFormEmail({
  name,
  email,
  message,
}: ContactFormValues) {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body className="bg-white text-black font-sans">
          <Text className="leading-none">
            A message has been received from the website.
          </Text>
          <Section>
            <Text className="font-bold leading-none">Name</Text>
            <Text className="leading-none">{name}</Text>
          </Section>
          <Section>
            <Text className="font-bold leading-none">Email</Text>
            <Text className="leading-none">{email}</Text>
          </Section>
          <Section>
            <Text className="font-bold leading-none">Message</Text>
            <Text className="leading-none">{message}</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

ContactFormEmail.PreviewProps = {
  name: "James Blair",
  email: "james@blair.nz",
  message: "Hello, world!",
};
