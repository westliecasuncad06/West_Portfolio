import { createContactHandler } from "@/lib/contact-handler";

// Nodemailer needs the Node.js runtime, which is the default with Cache Components.
export const POST = createContactHandler();
