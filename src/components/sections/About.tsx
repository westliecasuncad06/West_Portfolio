import Image from "next/image";
import { Plus } from "lucide-react";
import { image } from "@/content/media";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";

const photo = image("/images/westlie-about.webp");

export function About() {
  return (
    <Section id="about" clip="About" title="About">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h3 className="text-3xl leading-tight font-semibold sm:text-4xl">{profile.about.heading}</h3>
          <div className="mt-6 grid max-w-[62ch] gap-4 text-mist">
            {profile.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate pt-6">
            {profile.about.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="type-title text-3xl text-paper sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-sm text-dim">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-lg border border-slate bg-graphite lg:ml-auto">
            <Image src={photo.src} width={photo.width} height={photo.height} alt="Westlie Casuncad smiling, holding a laptop" className="aspect-square w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="type-title text-4xl sm:text-5xl">What I do</h3>
        <ul className="mt-8 border-t border-slate">
          {services.map((service) => (
            <li key={service.title} className="border-b border-slate">
              <details className="group">
                <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid gap-2 md:grid-cols-[16rem_1fr] md:gap-8">
                    <span className="text-2xl font-semibold text-paper">{service.title}</span>
                    <span className="max-w-[60ch] text-mist">{service.summary}</span>
                  </span>
                  <span className="mt-1 grid size-9 place-items-center rounded-md border border-rule text-paper transition-transform duration-300 group-open:rotate-45">
                    <Plus aria-hidden className="size-4" />
                    <span className="sr-only">Show details</span>
                  </span>
                </summary>
                <ul className="grid gap-2 pb-7 text-mist md:ml-[18rem] md:grid-cols-2 md:gap-x-8">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-[2px] w-3 shrink-0 bg-leaf" />
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
