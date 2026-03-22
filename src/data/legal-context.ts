export type MentionType = "document" | "matter" | "client";

export interface MentionCandidate {
  type: MentionType;
  label: string;
  subtitle?: string;
}

export interface LegalSource {
  id: string;
  label: string;
}

export const LEGAL_SOURCES: LegalSource[] = [
  { id: "westlaw", label: "Westlaw" },
  { id: "imanage", label: "iManage" },
  { id: "court-records", label: "Court Records" },
  { id: "internal-memos", label: "Internal Memos" },
];

export const MENTION_TYPE_META: Record<
  MentionType,
  { label: string; displayLabel: string }
> = {
  document: { label: "Document", displayLabel: "Documents" },
  matter: { label: "Matter", displayLabel: "Matters" },
  client: { label: "Client", displayLabel: "Clients" },
};

export const MENTION_TYPE_ORDER: MentionType[] = [
  "document",
  "matter",
  "client",
];

export const MENTION_CANDIDATES: MentionCandidate[] = [
  // Documents
  {
    type: "document",
    label: "Smith v. Acme Corp — Complaint.pdf",
    subtitle: "Litigation",
  },
  {
    type: "document",
    label: "Employment Agreement — J. Martinez 2024",
    subtitle: "Contract",
  },
  {
    type: "document",
    label: "Non-Compete Clause — Standard Template",
    subtitle: "Template",
  },
  {
    type: "document",
    label: "Board Resolution — Q4 2025",
    subtitle: "Corporate",
  },
  {
    type: "document",
    label: "Merger Agreement — Draft v3",
    subtitle: "M&A",
  },
  {
    type: "document",
    label: "Patent License — US-2024-1847",
    subtitle: "IP",
  },
  { type: "document", label: "NDA — TechFlow Inc", subtitle: "Contract" },
  {
    type: "document",
    label: "Settlement Agreement — Doe v. Smith",
    subtitle: "Litigation",
  },

  // Matters
  {
    type: "matter",
    label: "Smith v. Acme Corp",
    subtitle: "24-CV-1847",
  },
  {
    type: "matter",
    label: "In re: Martinez Employment",
    subtitle: "2025-001",
  },
  {
    type: "matter",
    label: "TechFlow Acquisition",
    subtitle: "M&A-2025-03",
  },
  {
    type: "matter",
    label: "Patent Portfolio Review",
    subtitle: "IP-2024-12",
  },
  {
    type: "matter",
    label: "Annual Compliance Audit",
    subtitle: "REG-2025-Q1",
  },

  // Clients
  { type: "client", label: "Acme Corporation" },
  { type: "client", label: "Jennifer Martinez" },
  { type: "client", label: "TechFlow Inc." },
  { type: "client", label: "Sterling Partners LP" },
  { type: "client", label: "Global Dynamics Ltd." },
];
