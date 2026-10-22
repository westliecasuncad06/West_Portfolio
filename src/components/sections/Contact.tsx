import { Mail } from "lucide-react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "WhatsApp", value: profile.whatsapp.display, href: profile.whatsapp.href, Icon: SiWhatsapp },
  { label: "GitHub", value: "westliecasuncad06", href: profile.github, Icon: SiGithub },
];

export function Contact() {
  return (
    <Section id="contact" clip="Contact" title="Contact">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="max-w-[40ch] text-2xl leading-snug font-semibold text-paper">
            Have a system that needs building or a video that needs cutting? Tell me about it.
          </p>
          <p className="mt-4 text-mist">I reply within 1–2 days. You&apos;ll get a confirmation email as soon as you send.</p>
          <ul className="mt-10 grid gap-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-md border border-slate bg-graphite px-4 py-3 transition-colors hover:border-rule"
                >
                  <Icon aria-hidden className="size-5 shrink-0 text-dim transition-colors group-hover:text-leaf" />
                  <span className="min-w-0">
                    <span className="block text-sm text-dim">{label}</span>
                    <span className="block truncate text-paper">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
