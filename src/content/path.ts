export type PathEntry = {
  kind: "work" | "school";
  place: string;
  title: string;
  dates: string;
  /** Sort key: year the entry started (decimal months for same-year ordering). */
  start: number;
};

/** Newest first. */
export const path: PathEntry[] = [
  { kind: "work", place: "Concentrix", title: "Customer Support Representative", dates: "Aug 2025", start: 2025.7 },
  { kind: "work", place: "Alorica", title: "Technical Support Representative", dates: "Dec 2024 – Jul 2025", start: 2024.95 },
  { kind: "work", place: "Foundever Philippines", title: "Technical Support Representative", dates: "2022 – 2024", start: 2022 },
  { kind: "school", place: "Global Reciprocal Colleges", title: "BS Information Technology", dates: "2020 – present", start: 2020 },
  { kind: "school", place: "Bagong Barrio National High School", title: "High school", dates: "2009 – 2013", start: 2009 },
  { kind: "school", place: "Bonifacio Elementary School", title: "Elementary", dates: "2003 – 2009", start: 2003 },
];
