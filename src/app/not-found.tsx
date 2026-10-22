import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="shell flex min-h-dvh flex-col justify-center py-24">
      <p className="type-tabular text-dim">00:00:00:00</p>
      <h1 className="type-title mt-4 text-6xl sm:text-8xl">This clip isn&apos;t in the edit</h1>
      <p className="mt-6 max-w-[48ch] text-lg text-mist">The page you opened doesn&apos;t exist. It may have moved when this portfolio was rebuilt.</p>
      <div className="mt-10">
        <Link href="/" className={buttonClass("primary")}>
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
