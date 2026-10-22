import { present, shot, type Shot } from "./media";

export type RoleGallery = { role: string; blurb?: string; shots: Shot[] };

export type ProjectLink = { href: string; label: string; download?: boolean };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  client?: string;
  year: string;
  myRole: string;
  status: string;
  tagline: string;
  summary: string;
  problem: string;
  roles: string[];
  features: string[];
  /** Names must match entries in skills.ts so the Skills section can link back. */
  stack: string[];
  highlights?: { value: string; label: string }[];
  links: { primary?: ProjectLink; secondary?: ProjectLink };
  featured: boolean;
  galleries: RoleGallery[];
};

const g = (role: string, shots: (Shot | null)[], blurb?: string): RoleGallery => ({ role, blurb, shots: present(shots) });

const grc = (name: string, caption: string, alt: string) =>
  shot(`/work/grc-connect/${name}.webp`, caption, `GRC Connect, ${alt}`);
const grcPhone = (name: string, caption: string, alt: string) =>
  shot(`/work/grc-connect/${name}.webp`, caption, `GRC Connect on a phone, ${alt}`, "phone");
const ch = (name: string, caption: string, alt: string, device: "desktop" | "phone" | "tall" = "desktop") =>
  shot(`/work/campus-hub/${name}.webp`, caption, `Elevate Campus Hub, ${alt}`, device);

export const projects: Project[] = [
  {
    slug: "grc-connect",
    name: "GRC Connect",
    kind: "College enrollment platform",
    client: "Global Reciprocal Colleges, Caloocan City",
    year: "2026",
    myRole: "Full-stack developer",
    status: "Live",
    tagline: "A college's entire enrollment, from advising to the official COR, in one portal.",
    summary:
      "GRC Connect replaces a paper enrollment that sent students through 6 to 11 steps across separate offices. Students choose sections that pass prerequisite checks, pay through a live accounting queue, and download their Certificate of Registration the moment payment clears. Every staff role gets its own workspace, from registrar approvals to dean sign-offs and CHED compliance reports.",
    problem:
      "Enrollment at Global Reciprocal Colleges meant lining up at admission, the program chair, the registrar and accounting, with paper forms carried between them. Staff had no shared view of who was enrolled, sections filled unevenly, and reports for CHED were assembled by hand.",
    roles: [
      "Student",
      "Admission staff",
      "Registrar head and staff",
      "Accounting staff",
      "Faculty",
      "Program chair",
      "Dean",
      "Executive director",
      "Super admin",
    ],
    features: [
      "Digital advising with prerequisite-checked subject and section selection",
      "Registrar approval flow with section-change and enrollment requests",
      "Live accounting payment queue with a now-serving kiosk display",
      "Automatic digital Certificate of Registration after payment",
      "Grade submission by faculty and grade approval by the registrar",
      "Schedule building, faculty loading and room management for program chairs",
      "Curriculum and schedule approvals for the dean and executive director",
      "Attrition-risk and section-demand forecasting from a private machine-learning service",
      "CHED compliance reports, transcripts, honors evaluation and audit logs",
      "Mobile-friendly student portal",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Base UI",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Motion",
      "GSAP",
      "Recharts",
      "Laravel",
      "Laravel Sanctum",
      "REST APIs",
      "PHP",
      "MySQL",
      "SQL",
      "Python",
      "FastAPI",
      "scikit-learn",
      "XGBoost",
      "Vitest",
      "Testing Library",
      "Playwright",
      "PHPUnit",
      "Larastan",
      "Pint",
      "pytest",
      "Ruff",
      "mypy",
      "ESLint",
      "Claude Code",
    ],
    highlights: [
      { value: "9 roles", label: "each with its own workspace" },
      { value: "6–11 steps", label: "of paper enrollment replaced" },
      { value: "2 forecasts", label: "attrition risk and section demand" },
    ],
    links: { primary: { href: "https://www.grc-enrollment.tech/", label: "Open live site" } },
    featured: true,
    galleries: [
      g(
        "Student",
        [
          grc("portal-home", "Student portal home", "the student portal home with enrollment, schedule and account cards"),
          grc("student-enrollment", "Enrollment workspace", "the enrollment workspace listing subjects for the term"),
          grc("student-section-dialog", "Choosing a section", "a dialog for choosing a class section"),
          grc("student-irregular-arranged", "Irregular student plan", "an arranged subject plan for an irregular student"),
          grc("student-schedule", "Weekly schedule", "the student's weekly class schedule"),
          grc("student-statement-of-account", "Statement of account", "the student's statement of account with fees"),
          grc("student-digital-com", "Digital COR", "the digital Certificate of Registration"),
          grc("student-grades", "Grades", "the student's grades by term"),
          grc("student-prospectus", "Prospectus", "the program prospectus with completed subjects"),
          grc("student-student-information", "Student information", "the student information form"),
          grc("portal-notifications", "Notifications", "the notifications panel"),
          grc("login", "Sign in", "the sign-in page"),
          grc("login-code", "Email code sign-in", "signing in with an emailed code"),
          grc("account-setup", "Account setup", "first-time account setup"),
          grcPhone("phone-login", "Sign in on a phone", "the sign-in page"),
          grcPhone("phone-menu", "Menu on a phone", "the navigation menu"),
          grcPhone("phone-enrollment", "Enrollment on a phone", "the enrollment workspace"),
        ],
        "Students enroll, pay, and get their COR without visiting an office.",
      ),
      g(
        "Registrar",
        [
          grc("registrar-head-enrollment-dashboard", "Enrollment dashboard", "the registrar enrollment dashboard with live counts by department"),
          grc("registrar-review-enrollment", "Reviewing an enrollment", "the registrar reviewing a student's enrollment"),
          grc("registrar-head-enrollment-approvals", "Enrollment approvals", "the queue of enrollments waiting for approval"),
          grc("registrar-head-registrar-analytics", "Registrar analytics", "enrollment analytics charts"),
          grc("registrar-head-attrition-analytics", "Attrition analytics", "attrition-risk analytics from the forecasting service"),
          grc("registrar-head-ched-reports", "CHED reports", "CHED compliance reports"),
          grc("registrar-head-academic-transcripts", "Transcripts", "academic transcripts"),
          grc("registrar-head-audit-logs", "Audit logs", "the audit log of staff actions"),
          grc("registrar-head-term-form", "New academic term", "the form for opening a new academic term"),
        ],
        "The registrar approves enrollments and sees the whole college at a glance.",
      ),
      g(
        "Accounting",
        [
          grc("accounting-payment-queue", "Payment queue", "the live payment queue"),
          grc("accounting-now-serving", "Now serving", "the now-serving kiosk display"),
          grc("accounting-confirm-payment", "Confirming a payment", "confirming a student's payment"),
          grc("accounting-enrollment-dashboard", "Accounting dashboard", "the accounting enrollment dashboard"),
          grc("accounting-statement-of-account", "Statement of account", "a student's statement of account"),
          grc("accounting-fee-settings", "Fee settings", "tuition and miscellaneous fee settings"),
        ],
        "Accounting serves a numbered queue and confirms payments that unlock the COR.",
      ),
      g(
        "Admission",
        [
          grc("admission-enrollment-dashboard", "Admission dashboard", "the admission dashboard"),
          grc("admission-create-account-filled", "Creating a student account", "creating a freshman or transferee account"),
          grc("admission-student-directory", "Student directory", "the student directory"),
          grc("admission-student-records", "Student records", "a student's admission records"),
        ],
      ),
      g(
        "Faculty",
        [
          grc("faculty-teaching-schedule", "Teaching schedule", "a professor's teaching schedule"),
          grc("faculty-grade-submission", "Grade submission", "submitting grades for a class"),
          grc("faculty-availability-preferences", "Availability", "setting teaching availability and preferences"),
        ],
      ),
      g(
        "Program chair",
        [
          grc("chair-schedule", "Schedule builder", "building class schedules"),
          grc("chair-faculty-loading", "Faculty loading", "assigning teaching loads to faculty"),
          grc("chair-program-chair-analytics", "Program analytics", "program analytics"),
          grc("chair-subjects-prerequisites", "Prerequisites", "subjects and their prerequisites"),
          grc("chair-student-prospectus", "Student prospectus", "a student's prospectus"),
        ],
      ),
      g(
        "Dean",
        [
          grc("dean-enrollment-dashboard", "Dean dashboard", "the dean's enrollment dashboard"),
          grc("dean-faculty-load-monitoring", "Faculty load", "monitoring faculty teaching loads"),
          grc("dean-schedule-approvals", "Schedule approvals", "approving submitted schedules"),
          grc("dean-honors", "Honors evaluation", "evaluating students for honors"),
        ],
      ),
      g(
        "Executive",
        [
          grc("executive-institution-dashboard", "Institution dashboard", "the institution-wide dashboard"),
          grc("executive-master-schedule", "Master schedule", "the master schedule"),
          grc("executive-curriculum-approvals", "Curriculum approvals", "approving curriculum changes"),
        ],
      ),
    ],
  },
  {
    slug: "campus-hub",
    name: "Elevate Campus Hub",
    kind: "Campus ministry operations app",
    client: "Elevate, a campus ministry",
    year: "2026",
    myRole: "Full-stack developer",
    status: "Live",
    tagline: "QR check-ins, follow-ups and weekly reports for a campus ministry across several schools.",
    summary:
      "Elevate Campus Hub moves a campus ministry's attendance off paper and spreadsheets. Facilitators scan students' QR cards into a session, record each conversation, and the Campus Head watches it happen live. At the end of the day the official report fills itself in and submits with one click.",
    problem:
      "Campus teams tracked attendance and follow-ups on paper and in Google Sheets. Reports were rebuilt by hand every week, it was hard to see which students were drifting away, and there was no safe, approved way for students and facilitators to message each other.",
    roles: ["Super admin", "Campus head", "Facilitator", "Student"],
    features: [
      "QR attendance: scan or look up students into a session",
      "A four-question engagement check recorded for every student",
      "Live view of which facilitator is with which student, refreshed every 10 seconds",
      "Attendance sheet with consistency status from Consistent to At-risk, plus CSV export",
      "Daily report that fills in and submits the ministry's Google Form in one click",
      "Roster import from Google Sheets with fuzzy name matching to new accounts",
      "Same-gender chat between students and facilitators",
      "Real-time notifications by role",
      "Multi-campus support for facilitators who serve several schools",
      "Invite-only registration with a Data Privacy Act (RA 10173) consent flow",
      "Two-factor sign-in, Google sign-in, rate-limited login and audit logs",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Base UI",
      "Supabase",
      "PostgreSQL",
      "SQL",
      "Google Apps Script",
      "Vitest",
      "ESLint",
      "Vercel",
      "Claude Code",
    ],
    highlights: [
      { value: "4 roles", label: "from IT to students" },
      { value: "1 click", label: "to submit the daily report" },
      { value: "10 s", label: "live-view refresh" },
    ],
    links: { primary: { href: "https://elevate-campus-hub.vercel.app/", label: "Open live site" } },
    featured: true,
    galleries: [
      g(
        "Public site",
        [
          ch("landing", "Landing page", "the landing page headline: change the campus one student at a time"),
          ch("landing-full", "Full landing page", "the full landing page with mission, vision and how it works", "tall"),
          ch("login", "Sign in", "the sign-in page with Google and email options"),
          ch("landing-phone", "Landing on a phone", "the landing page on a phone", "phone"),
          ch("login-phone", "Sign in on a phone", "the sign-in page on a phone", "phone"),
        ],
        "What every campus team sees before signing in.",
      ),
      g(
        "Facilitator",
        [
          ch("facilitator-today", "Today's session", "the facilitator's session for today"),
          ch("facilitator-today-phone", "Scanning on a phone", "checking students in on a phone", "phone"),
          ch("facilitator-students", "My students", "the facilitator's students"),
          ch("facilitator-history", "Session history", "past sessions"),
          ch("facilitator-chat-phone", "Chat on a phone", "chatting with a student", "phone"),
        ],
        "Facilitators check students in and record every conversation.",
      ),
      g(
        "Campus head",
        [
          ch("head-dashboard", "Campus dashboard", "the campus head dashboard"),
          ch("head-live", "Live view", "the live view of facilitators and students"),
          ch("head-attendance", "Attendance sheet", "the attendance sheet with consistency status"),
          ch("head-reports", "Daily report", "the daily report ready to submit"),
          ch("head-students", "Students", "the campus student list"),
          ch("head-facilitators", "Facilitators", "the campus facilitators"),
          ch("head-history", "Batch history", "the history of sessions"),
        ],
        "The Campus Head watches sessions live and sends the report.",
      ),
      g(
        "Student",
        [
          ch("student-home-phone", "QR ID card", "the student's QR card on a phone", "phone"),
          ch("student-attendance-phone", "My attendance", "the student's attendance history on a phone", "phone"),
          ch("student-home", "Student home", "the student home page"),
        ],
      ),
      g(
        "Super admin",
        [
          ch("admin-dashboard", "Admin dashboard", "the super admin dashboard"),
          ch("admin-users", "Users", "managing user accounts"),
          ch("admin-campuses", "Campuses", "managing campuses"),
          ch("admin-programs", "Programs", "managing programs"),
          ch("admin-logs", "System logs", "the system logs"),
        ],
      ),
    ],
  },
  {
    slug: "b1g-timer",
    name: "B1G Timer",
    kind: "Live event timer and scripture display",
    year: "2026",
    myRole: "Full-stack developer",
    status: "Production ready",
    tagline: "One operator runs every countdown, message and Bible verse on the stage screens.",
    summary:
      "B1G Timer is a real-time stage timer for conferences and church services. An operator builds the run of show in a control dashboard, and every connected stage display updates in under 150 milliseconds. It also sends messages to speakers and puts scripture on screen in six translations, including Tagalog.",
    problem:
      "Event teams needed speakers to see exactly how much time they had left, and a way to cue them without walking on stage. Church services also needed scripture on the same screens, run by the same operator.",
    roles: ["Event operator", "Speaker on stage", "Audience"],
    features: [
      "Run of show with drag-to-reorder timers",
      "Countdown progress that shifts from green to red as time runs out",
      "Blackout and flash controls for the stage screen",
      "Styled messages sent to the speaker's display",
      "Separate rooms for parallel sessions",
      "Scripture View with search and saved verses in ESV, NLT, KJV, NASB, AMP and Tagalog",
      "Output links for stage, viewer and preview screens",
      "Real-time sync across displays in under 150 ms",
    ],
    stack: ["PHP", "JavaScript", "HTML", "CSS", "MySQL", "SQL", "Pusher", "REST APIs", "Playwright", "InfinityFree", "Claude Code"],
    links: {
      primary: { href: "https://b1gtimer.gt.tc/", label: "Open live site" },
      secondary: { href: "https://github.com/westliecasuncad06/b1gTimer", label: "View the code on GitHub" },
    },
    featured: false,
    galleries: [
      g("Operator", [
        shot("/work/b1g-timer/dashboard-live.webp", "Live control dashboard", "B1G Timer control dashboard with a timer counting down and a message to the stage"),
        shot("/work/b1g-timer/dashboard-run-of-show.webp", "Run of show", "B1G Timer run of show with five timers"),
        shot("/work/b1g-timer/scripture-view.webp", "Scripture View", "B1G Timer Scripture View showing John chapter 3"),
        shot("/work/b1g-timer/room-picker.webp", "Room picker", "B1G Timer room picker"),
      ]),
      g("Stage", [shot("/work/b1g-timer/stage-display.webp", "Stage display", "B1G Timer stage display counting down")]),
    ],
  },
  {
    slug: "grc-attendance",
    name: "GRC Attendance Monitoring System",
    kind: "Attendance web application",
    client: "Global Reciprocal College",
    year: "2025",
    myRole: "Full-stack developer",
    status: "Live and operational",
    tagline: "Digitized attendance tracking for 3.5K students, with same-day analytics for program chairs.",
    summary:
      "A comprehensive attendance monitoring system designed for Global Reciprocal College. The system provides real-time attendance tracking, reporting, and analytics for students and professors.",
    problem:
      "Attendance lived in paper logs, so program chairs only saw problems weeks later. The system eliminated paper logs and unlocked same-day analytics.",
    roles: ["Student", "Professor", "Program chair"],
    features: [
      "Real-time attendance tracking and monitoring",
      "Professor dashboard with class management",
      "Student portal for attendance history",
      "Responsive design for mobile and desktop",
      "Automated attendance reports and analytics",
      "Secure authentication and role-based access",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "SQL", "AJAX", "Bootstrap"],
    highlights: [
      { value: "3.5K+", label: "students onboarded" },
      { value: "6 dashboards", label: "role-based experiences" },
      { value: "8 weeks", label: "design to deployment" },
    ],
    links: { primary: { href: "http://grc.gt.tc", label: "Open live site" } },
    featured: false,
    galleries: [
      g("Web", [
        shot("/work/grc-attendance/homepage.webp", "Homepage dashboard", "GRC Attendance homepage dashboard view"),
        shot("/work/grc-attendance/professor-view.webp", "Professor dashboard", "GRC Attendance professor dashboard for attendance management"),
      ]),
      g("Mobile", [
        shot("/work/grc-attendance/student-mobile.webp", "Student view", "GRC Attendance student view on a phone", "phone"),
        shot("/work/grc-attendance/mobile-view.webp", "Mobile layout", "GRC Attendance responsive layout on a phone", "phone"),
      ]),
    ],
  },
  {
    slug: "west-shop",
    name: "West Shop",
    kind: "E-commerce platform",
    year: "2025",
    myRole: "Full-stack developer",
    status: "Live and operational",
    tagline: "A full online store with separate buyer and seller portals.",
    summary:
      "A complete e-commerce solution featuring product management, shopping cart, order processing, and user authentication, built to give shoppers a seamless experience.",
    problem:
      "Buyers and sellers needed one place to shop, sell and track orders. Unifying both sides cut manual order reconciliation time by 40% and enabled near real-time stock insights.",
    roles: ["Buyer", "Seller", "Admin"],
    features: [
      "User authentication and account management",
      "Product catalog with search and filtering",
      "Shopping cart and checkout system",
      "Order tracking and history",
      "Buyer and seller dashboards",
      "Secure payment processing integration",
      "Responsive design for all devices",
      "Admin panel for inventory management",
    ],
    stack: ["PHP", "HTML", "CSS", "JavaScript", "Bootstrap", "MySQL", "SQL"],
    highlights: [
      { value: "1.2K+", label: "monthly shoppers" },
      { value: "40%", label: "faster fulfillment" },
      { value: "10 modules", label: "of seller tooling" },
    ],
    links: { primary: { href: "http://westshop.gt.tc", label: "Open live site" } },
    featured: false,
    galleries: [
      g("Buyer", [
        shot("/work/west-shop/homepage.webp", "Homepage and catalog", "West Shop homepage and product catalog, full page", "tall"),
        shot("/work/west-shop/buyer-dashboard.webp", "Buyer dashboard", "West Shop buyer dashboard for order management", "tall"),
        shot("/work/west-shop/buyer-orders.webp", "Order tracking", "West Shop order tracking and history", "tall"),
      ]),
    ],
  },
  {
    slug: "coffee-shop-app",
    name: "Coffee Shop App",
    kind: "Mobile commerce app",
    year: "2025",
    myRole: "Mobile app developer",
    status: "Beta release",
    tagline: "A branded ordering app for boutique cafés, built with Flutter and Firebase.",
    summary:
      "A Flutter-based mobile commerce experience tailored for boutique coffee shops. Firebase handles sign-in, real-time catalog updates and cloud-hosted orders, so the app streamlines ordering, loyalty rewards and pick-up.",
    problem:
      "Boutique cafés needed a branded mobile ordering flow with offline browsing, loyalty-ready promos, and instant inventory updates.",
    roles: ["Customer", "Café staff"],
    features: [
      "Curated coffee catalog with variants and add-ons",
      "Firebase Authentication for customer sign-in and guest checkout",
      "Cloud Firestore-backed cart, orders, and inventory sync",
      "Push-ready notification layer for order status updates",
      "Built-in loyalty tracking and promo banner slots",
      "Offline-first caching for menu browsing",
    ],
    stack: ["Flutter", "Dart", "Firebase"],
    highlights: [
      { value: "<5 s", label: "average checkout" },
      { value: "4 screens", label: "in the order journey" },
      { value: "Realtime", label: "inventory sync" },
    ],
    links: {
      primary: {
        href: "https://github.com/westliecasuncad06/West_Portfolio/raw/v1-static/assets/img/e-commerce%20apps/app-release.apk",
        label: "Download the Android APK",
        download: true,
      },
    },
    featured: false,
    galleries: [
      g("App", [
        shot("/work/coffee-shop-app/onboarding.webp", "Onboarding", "Coffee Shop app onboarding screen", "phone"),
        shot("/work/coffee-shop-app/product-grid.webp", "Product grid", "Coffee Shop app product grid", "phone"),
        shot("/work/coffee-shop-app/product-detail.webp", "Product and cart", "Coffee Shop app product detail and cart", "phone"),
        shot("/work/coffee-shop-app/order-summary.webp", "Order summary", "Coffee Shop app order summary", "phone"),
      ]),
    ],
  },
];

/** Galleries with at least one captured image. */
export const visibleGalleries = (project: Project) => project.galleries.filter((gal) => gal.shots.length > 0);

export const allShots = (project: Project) => visibleGalleries(project).flatMap((gal) => gal.shots);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
