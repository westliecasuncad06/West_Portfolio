export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  pdf: string;
  thumb: string;
};

const cert = (slug: string, rest: Omit<Certificate, "slug" | "pdf" | "thumb">): Certificate => ({
  slug,
  pdf: `/certificates/${slug}.pdf`,
  thumb: `/certificates/thumbs/${slug}.webp`,
  ...rest,
});

/** Newest first. */
export const certificates: Certificate[] = [
  cert("php-essential-training", {
    title: "PHP Essential Training",
    issuer: "LinkedIn Learning",
    date: "Oct 21, 2025",
    detail: "4 hours 4 minutes",
  }),
  cert("concentrix-php-training", {
    title: "Certificate of Training Completion: PHP Essential Training",
    issuer: "Concentrix University",
    date: "Oct 21, 2025",
  }),
  cert("python-essentials-2", {
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "Nov 19, 2024",
  }),
  cert("python-essentials-1", {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Nov 12, 2024",
  }),
  cert("udemy-certificate-2", {
    title: "Advanced WordPress Course for Professionals",
    issuer: "Udemy",
    date: "Oct 24, 2024",
    detail: "7.5 hours",
  }),
  cert("udemy-certificate-1", {
    title: "HTML, CSS, React: Certification Course for Beginners",
    issuer: "Udemy",
    date: "Oct 18, 2024",
    detail: "14.5 hours",
  }),
];
