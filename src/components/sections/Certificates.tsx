import { certificates } from "@/content/certificates";
import { Section } from "@/components/ui/Section";
import { CertificateGrid } from "./CertificateGrid";

export function Certificates() {
  return (
    <Section id="certificates" clip="Certificates" title="Certificates" intro="Courses I finished alongside school and work. Open any certificate to view or download the PDF.">
      <CertificateGrid certificates={certificates} />
    </Section>
  );
}
