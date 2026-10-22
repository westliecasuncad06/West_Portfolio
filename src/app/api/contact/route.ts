import { createContactHandler } from "@/lib/contact-handler";

export const runtime = "nodejs";

// Nodemailer needs the Node.js runtime, which is the default with Cache Components.
export const POST = createContactHandler();
