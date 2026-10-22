import Image from "next/image";
import { Mail } from "lucide-react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { profile } from "@/content/profile";

const links = [
  ["About", "about"],
  ["Work", "work"],
  ["Skills", "skills"],
  ["Path", "path"],
  ["Certificates", "certificates"],
  ["Contact", "contact"],
] as const;

export function Footer({ base = "" }: { base?: "" | "/" }) {
  return (
    <footer className="border-t border-slate bg-graphite/40">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div className="flex items-start gap-4">
          <Image src="/images/logo-mark.png" alt="" width={44} height={44} className="size-11" />
          <div>
            <p className="font-semibold text-paper">{profile.name}</p>
            <p className="text-sm text-dim">{profile.role}</p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {links.map(([label, id]) => (
              <li key={id}>
                <a href={`${base}#${id}`} className="text-mist transition-colors hover:text-paper">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3">
          <li>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-md border border-rule text-mist transition-colors hover:text-paper">
              <Mail className="size-5" />
            </a>
          </li>
          <li>
            <a href={profile.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-md border border-rule text-mist transition-colors hover:text-paper">
              <SiWhatsapp className="size-5" />
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-md border border-rule text-mist transition-colors hover:text-paper">
              <SiGithub className="size-5" />
            </a>
          </li>
        </ul>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-slate py-6 text-sm text-dim sm:flex-row sm:justify-between">
        <p>© 2026 {profile.name}. Built with Next.js.</p>
        <a
          href="https://westliecasuncad06.github.io/West_Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-paper"
        >
          See the previous version of this site
        </a>
      </div>
    </footer>
  );
}
