export type SourceId =
  | "imanage"
  | "westlaw"
  | "sharepoint"
  | "outlook"
  | "netdocuments";

export type DocType =
  | "contract"
  | "brief"
  | "memo"
  | "statute"
  | "email"
  | "opinion"
  | "template";

export interface SearchDocument {
  id: string;
  title: string;
  source: SourceId;
  type: DocType;
  snippet: string;
  author: string;
  date: string;
  matter?: string;
  tags?: string[];
  preview: {
    fullDescription: string;
    keyClauses?: string[];
    metadata: Record<string, string>;
  };
}

export interface IntegrationSource {
  id: SourceId;
  name: string;
  description: string;
  docCount: string;
  color: string;
}

export const INTEGRATION_SOURCES: IntegrationSource[] = [
  {
    id: "imanage",
    name: "iManage",
    description: "Document Management",
    docCount: "1,247 documents",
    color: "#0066CC",
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description: "Internal Knowledge",
    docCount: "847 files",
    color: "#038387",
  },
  {
    id: "outlook",
    name: "Outlook",
    description: "Email & Calendar",
    docCount: "12.4k emails",
    color: "#0078D4",
  },
  {
    id: "netdocuments",
    name: "NetDocuments",
    description: "Cloud DMS",
    docCount: "3,412 documents",
    color: "#4B0082",
  },
];

export const SOURCE_LABELS: Record<SourceId, string> = {
  imanage: "iManage",
  westlaw: "Westlaw",
  sharepoint: "SharePoint",
  outlook: "Outlook",
  netdocuments: "NetDocuments",
};

export const SEARCH_DOCUMENTS: SearchDocument[] = [
  {
    id: "1",
    title: "Non-Compete Clause — Standard Template",
    source: "imanage",
    type: "template",
    snippet:
      "Firm-wide template for non-competition covenants with configurable duration, geography, and activity restrictions.",
    author: "Sarah Chen",
    date: "2 weeks ago",
    matter: undefined,
    tags: ["non-compete", "employment", "template"],
    preview: {
      fullDescription:
        "This is the firm's standard non-compete template, last updated to reflect changes in FTC guidance and state law developments through Q1 2026. The template includes configurable sections for duration (recommended 12-24 months), geographic scope (tied to employer's actual market presence), and prohibited activities.\n\nThe template incorporates carve-outs for California-based employees per Business & Professions Code § 16600, and includes choice-of-law analysis guidance for multi-state scenarios. Garden leave provisions are included as an optional addendum.\n\nApproved by the Employment Practice Group for use across all offices. Partners should review with associates before customizing for specific client needs.",
      keyClauses: [
        "Non-solicitation of clients (§ 3.1)",
        "Non-solicitation of employees (§ 3.2)",
        "Geographic scope limitations (§ 4)",
        "Duration: configurable, default 18 months (§ 5)",
        "Garden leave option (Addendum A)",
        "California carve-out (§ 7.2)",
      ],
      metadata: {
        "Document ID": "IM-TPL-2024-0047",
        Created: "January 12, 2024",
        "Last Modified": "March 8, 2026",
        Author: "Sarah Chen",
        "Practice Group": "Employment & Labor",
        Classification: "Confidential — Internal",
      },
    },
  },
  {
    id: "2",
    title: "Employment Agreement — J. Martinez 2024",
    source: "imanage",
    type: "contract",
    snippet:
      "Executive employment agreement with 24-month non-compete, covering fintech and payments sectors in Texas and California.",
    author: "David Park",
    date: "3 months ago",
    matter: "In re: Martinez Employment (2025-001)",
    tags: ["non-compete", "employment", "executive", "fintech"],
    preview: {
      fullDescription:
        "Employment agreement for Jennifer Martinez as VP of Product at Acme Corporation, executed December 2024. The agreement includes a 24-month post-termination non-compete covering the fintech and digital payments sectors within the United States.\n\nNotable provisions include a $150,000 garden leave payment, IP assignment clause covering all work product, and a mandatory arbitration clause with Dallas, TX as the venue. The non-compete specifically restricts employment with competitors in 'digital payments processing, cross-border payment platforms, and embedded finance solutions.'\n\nPotential enforceability concern flagged: Martinez has since relocated to San Francisco, CA, raising California Bus. & Prof. Code § 16600 issues.",
      keyClauses: [
        "Non-compete: 24 months, US-wide (§ 8.1)",
        "Restricted sectors: fintech, payments, embedded finance (§ 8.2)",
        "Garden leave: $150,000 (§ 8.4)",
        "IP assignment: all work product (§ 9)",
        "Arbitration: mandatory, Dallas TX venue (§ 12)",
        "Choice of law: Texas (§ 14.3)",
      ],
      metadata: {
        "Document ID": "IM-2024-12847",
        Created: "December 3, 2024",
        "Last Modified": "December 18, 2024",
        Author: "David Park",
        "Counterparty": "Jennifer Martinez",
        Matter: "In re: Martinez Employment (2025-001)",
      },
    },
  },
  {
    id: "3",
    title: "Cal. Bus. & Prof. Code § 16600",
    source: "westlaw",
    type: "statute",
    snippet:
      "California statute voiding contracts restraining lawful profession, trade, or business. Foundation of CA non-compete ban.",
    author: "California Legislature",
    date: "Current",
    tags: ["non-compete", "california", "statute"],
    preview: {
      fullDescription:
        'Section 16600 provides: "Except as provided in this chapter, every contract by which anyone is restrained from engaging in a lawful profession, trade, or business of any kind is to that extent void."\n\nThis is the foundational California statute that effectively bans non-compete agreements. The California Supreme Court in Edwards v. Arthur Andersen LLP (2008) 44 Cal.4th 937 held that § 16600 broadly prohibits non-compete agreements, rejecting the "narrow restraint" exception.\n\nRecent legislative amendments (AB 1076, SB 699) have further strengthened protections by making it unlawful to even attempt to enforce a void non-compete and extending protections to employees who signed agreements in other states.',
      metadata: {
        "Citation": "Cal. Bus. & Prof. Code § 16600",
        "Effective Date": "1941 (amended 2023)",
        "Key Cases": "Edwards v. Arthur Andersen LLP (2008)",
        "Recent Amendments": "AB 1076 (2020), SB 699 (2023)",
        Database: "Westlaw Edge",
      },
    },
  },
  {
    id: "4",
    title: "Smith v. Acme Corp — Complaint",
    source: "imanage",
    type: "brief",
    snippet:
      "Initial complaint filing in patent infringement action. Claims relate to consolidated trading platform technology.",
    author: "Michael Torres",
    date: "1 month ago",
    matter: "Smith v. Acme Corp (24-CV-1847)",
    tags: ["patent", "litigation", "complaint"],
    preview: {
      fullDescription:
        "Complaint filed in the United States District Court for the Northern District of Texas alleging patent infringement under 35 U.S.C. § 271. Plaintiff alleges that Acme Corporation's payment processing platform infringes U.S. Patent No. 19,123,456 relating to 'consolidated trading platforms with transactional-level currency conversion.'\n\nThe complaint asserts both literal infringement and infringement under the doctrine of equivalents. Willfulness is alleged based on pre-suit notice letters sent in Q3 2024. Plaintiff seeks injunctive relief and damages including enhanced damages for willful infringement.\n\nInitial case assessment memo is pending. Key defense theories include non-infringement (Acme's platform is a payments system, not a trading platform) and invalidity based on prior art.",
      metadata: {
        "Document ID": "IM-LIT-2025-0193",
        Created: "February 14, 2025",
        Author: "Michael Torres",
        "Case Number": "24-CV-1847",
        Court: "N.D. Tex.",
        "Filing Date": "February 15, 2025",
      },
    },
  },
  {
    id: "5",
    title: "Merger Agreement — TechFlow Acquisition Draft v3",
    source: "netdocuments",
    type: "contract",
    snippet:
      "Third draft of stock purchase agreement for TechFlow Inc. acquisition. Includes revised reps & warranties.",
    author: "Lisa Wong",
    date: "1 week ago",
    matter: "TechFlow Acquisition (M&A-2025-03)",
    tags: ["merger", "acquisition", "m&a", "stock purchase"],
    preview: {
      fullDescription:
        "Third draft of the definitive stock purchase agreement for the acquisition of TechFlow Inc. by Sterling Partners LP. Transaction value: $47.2M. This draft incorporates comments from buyer's counsel received March 14, 2026.\n\nKey changes from v2: (1) Revised fundamental representations survival period from 36 to 24 months; (2) Added basket/cap structure to indemnification (0.75% basket, 15% cap); (3) Revised definition of Material Adverse Effect to exclude general market conditions; (4) Added IP escrow provisions for source code.\n\nTarget closing date: April 30, 2026. HSR filing not required (transaction below threshold). Board approval obtained from both parties.",
      keyClauses: [
        "Purchase price: $47.2M (§ 2.1)",
        "Indemnification basket: 0.75% / cap: 15% (§ 9.4)",
        "Fundamental reps survival: 24 months (§ 9.1)",
        "IP escrow: source code (§ 6.8)",
        "Non-compete: 3 years for founders (§ 7.3)",
        "Material Adverse Effect definition (§ 1.1)",
      ],
      metadata: {
        "Document ID": "ND-MA-2025-0347-v3",
        Created: "February 28, 2026",
        "Last Modified": "March 15, 2026",
        Author: "Lisa Wong",
        Matter: "TechFlow Acquisition (M&A-2025-03)",
        Status: "Under Review",
      },
    },
  },
  {
    id: "6",
    title: "Board Resolution — Q4 2025 Quarterly Approval",
    source: "sharepoint",
    type: "memo",
    snippet:
      "Board resolution approving Q4 2025 financial statements, dividend declaration, and officer appointments.",
    author: "Corporate Secretary",
    date: "2 months ago",
    tags: ["corporate", "governance", "board"],
    preview: {
      fullDescription:
        "Minutes and resolutions of the Board of Directors of Acme Corporation from the regular quarterly meeting held January 15, 2026. The board reviewed and approved Q4 2025 unaudited financial statements showing revenue of $89.3M (up 12% YoY).\n\nThe board declared a quarterly dividend of $0.35 per share payable February 28, 2026 to shareholders of record as of February 14, 2026. The board also approved the appointment of Maria Santos as Chief Compliance Officer effective February 1, 2026.\n\nAdditional matters discussed under executive session (see privileged supplement).",
      metadata: {
        "Document ID": "SP-GOV-2026-0012",
        Created: "January 15, 2026",
        Author: "Corporate Secretary",
        Classification: "Board Confidential",
        "Next Meeting": "April 15, 2026",
      },
    },
  },
  {
    id: "7",
    title: "NDA — TechFlow Inc. Mutual Confidentiality",
    source: "imanage",
    type: "contract",
    snippet:
      "Mutual NDA governing exchange of confidential information in connection with potential acquisition discussions.",
    author: "Lisa Wong",
    date: "6 weeks ago",
    matter: "TechFlow Acquisition (M&A-2025-03)",
    tags: ["nda", "confidentiality", "m&a"],
    preview: {
      fullDescription:
        "Mutual non-disclosure agreement between Sterling Partners LP and TechFlow Inc. governing the exchange of confidential information in connection with a potential business combination transaction.\n\nThe NDA includes standard mutual confidentiality obligations with a 3-year term, customary exclusions for publicly available information, and a standstill provision with a 12-month fall-away. The agreement permits disclosure to representatives (defined to include legal and financial advisors) under a 'need to know' standard.\n\nResidual knowledge clause was negotiated and removed at TechFlow's request.",
      keyClauses: [
        "Confidentiality period: 3 years (§ 4)",
        "Standstill: 12 months with fall-away (§ 8)",
        "Representatives: legal, financial advisors (§ 1(d))",
        "No residual knowledge clause",
        "Governing law: Delaware (§ 12)",
      ],
      metadata: {
        "Document ID": "IM-MA-2025-0291",
        Created: "February 5, 2026",
        "Last Modified": "February 10, 2026",
        Author: "Lisa Wong",
        Counterparty: "TechFlow Inc.",
        Matter: "TechFlow Acquisition (M&A-2025-03)",
      },
    },
  },
  {
    id: "8",
    title: "Patent Portfolio Review — IP Landscape Analysis",
    source: "netdocuments",
    type: "memo",
    snippet:
      "Comprehensive analysis of Acme Corp's patent portfolio with freedom-to-operate assessment for payments technology.",
    author: "James Liu",
    date: "3 weeks ago",
    matter: "Patent Portfolio Review (IP-2024-12)",
    tags: ["patent", "ip", "fto", "payments"],
    preview: {
      fullDescription:
        "This memorandum presents a comprehensive analysis of Acme Corporation's patent portfolio (47 issued US patents, 12 pending applications) with a focus on freedom-to-operate in the cross-border payments and embedded finance space.\n\nKey findings: (1) Acme's core payment processing patents (US 10,XXX,XXX family) provide strong defensive coverage for the current platform; (2) Three third-party patents identified as potential risk in the FX conversion space; (3) Recommended filing strategy for 5 additional provisional applications to strengthen position in real-time settlement technology.\n\nThe FTO analysis specifically addresses the allegations in the Smith v. Acme complaint and concludes that the accused functionality does not practice the asserted claims when properly construed.",
      metadata: {
        "Document ID": "ND-IP-2025-0089",
        Created: "February 28, 2026",
        Author: "James Liu",
        Matter: "Patent Portfolio Review (IP-2024-12)",
        Classification: "Attorney Work Product — Privileged",
      },
    },
  },
  {
    id: "9",
    title: "Settlement Agreement — Doe v. Smith",
    source: "imanage",
    type: "contract",
    snippet:
      "Confidential settlement agreement resolving employment discrimination claims. Includes mutual release and non-disparagement.",
    author: "Rachel Kim",
    date: "4 months ago",
    tags: ["settlement", "employment", "discrimination"],
    preview: {
      fullDescription:
        "Confidential settlement agreement resolving all claims in Doe v. Smith, Case No. 2024-CV-3847 (S.D.N.Y.). The agreement provides for a lump-sum payment of $275,000 to plaintiff, plus 12 months of COBRA continuation coverage.\n\nKey terms include mutual general release of all claims, mutual non-disparagement obligations, cooperation clause for any related proceedings, and a confidentiality provision covering the terms of settlement. Plaintiff agreed to dismiss with prejudice within 5 business days of payment.\n\nThe settlement was reached following a full-day mediation with retired Judge Patricia Hammond.",
      keyClauses: [
        "Settlement amount: $275,000 lump sum (§ 2)",
        "COBRA: 12 months employer-paid (§ 3)",
        "Mutual release of all claims (§ 4)",
        "Non-disparagement: mutual (§ 6)",
        "Confidentiality of terms (§ 7)",
        "Dismissal with prejudice: 5 business days (§ 8)",
      ],
      metadata: {
        "Document ID": "IM-LIT-2024-1293",
        Created: "November 20, 2025",
        Author: "Rachel Kim",
        "Case Number": "2024-CV-3847",
        Court: "S.D.N.Y.",
        Classification: "Confidential",
      },
    },
  },
  {
    id: "10",
    title: "RE: Martinez Non-Compete — Enforceability Analysis",
    source: "outlook",
    type: "email",
    snippet:
      "Partner email thread discussing California enforceability concerns for Martinez employment agreement non-compete.",
    author: "David Park",
    date: "2 weeks ago",
    matter: "In re: Martinez Employment (2025-001)",
    tags: ["non-compete", "california", "email", "enforceability"],
    preview: {
      fullDescription:
        "Email chain between David Park (Employment) and Sarah Chen (Employment) discussing enforceability concerns regarding the Martinez non-compete clause following her relocation to California.\n\nKey points discussed:\n- Martinez signed the employment agreement in Texas with Texas choice-of-law\n- She relocated to SF in January 2026 to join a competing fintech startup\n- California BPC § 16600 likely voids the non-compete regardless of choice-of-law\n- SB 699 (2023) strengthens CA's position against out-of-state non-competes\n- Recommendation to pursue trade secret claims under DTSA as alternative\n- Client meeting scheduled for March 25 to discuss strategy",
      metadata: {
        "Message ID": "OL-2026-03-08-DP-847",
        Date: "March 8, 2026",
        From: "David Park",
        To: "Sarah Chen",
        CC: "Managing Partner",
        Subject: "RE: Martinez Non-Compete — Enforceability Analysis",
      },
    },
  },
  {
    id: "11",
    title: "Annual Compliance Audit — Regulatory Checklist",
    source: "sharepoint",
    type: "memo",
    snippet:
      "Q1 2026 regulatory compliance checklist covering SEC, FINRA, and state bar requirements for the firm.",
    author: "Maria Santos",
    date: "1 week ago",
    matter: "Annual Compliance Audit (REG-2025-Q1)",
    tags: ["compliance", "regulatory", "audit"],
    preview: {
      fullDescription:
        "Comprehensive regulatory compliance checklist for Q1 2026 audit cycle. This document covers the firm's obligations under SEC regulations, FINRA rules (for the broker-dealer advisory arm), and state bar requirements across all 12 jurisdictions where the firm is registered.\n\nStatus: 87% complete. Outstanding items include updated CLE tracking for 3 associates and the annual IOLTA reconciliation for the trust accounts. All SEC filings are current. The anti-money laundering (AML) program review was completed and approved by the compliance committee on March 1, 2026.",
      metadata: {
        "Document ID": "SP-COMP-2026-Q1-001",
        Created: "January 5, 2026",
        "Last Modified": "March 15, 2026",
        Author: "Maria Santos",
        Status: "87% Complete",
        "Due Date": "March 31, 2026",
      },
    },
  },
  {
    id: "12",
    title: "Tex. Bus. & Com. Code § 15.50 — Covenants Not to Compete",
    source: "westlaw",
    type: "statute",
    snippet:
      "Texas statute governing enforceability of covenants not to compete. Requires ancillary to enforceable agreement.",
    author: "Texas Legislature",
    date: "Current",
    tags: ["non-compete", "texas", "statute"],
    preview: {
      fullDescription:
        'Section 15.50 provides that a covenant not to compete is enforceable if it is ancillary to or part of an otherwise enforceable agreement at the time the agreement is made to the extent that it contains limitations as to time, geographical area, and scope of activity to be restrained that are reasonable and do not impose a greater restraint than is necessary to protect the goodwill or other business interest of the promisee.\n\nTexas courts have broad reformation authority under § 15.51(c), allowing courts to reform an unreasonable covenant rather than void it entirely. This "blue pencil" approach distinguishes Texas from jurisdictions that take an all-or-nothing approach to non-compete enforcement.',
      metadata: {
        Citation: "Tex. Bus. & Com. Code § 15.50",
        "Key Provision": "Ancillary to enforceable agreement",
        "Reformation Authority": "§ 15.51(c)",
        "Key Cases": "Marsh USA Inc. v. Cook (Tex. 2011)",
        Database: "Westlaw Edge",
      },
    },
  },
  {
    id: "13",
    title: "Edwards v. Arthur Andersen LLP — Case Brief",
    source: "westlaw",
    type: "opinion",
    snippet:
      "California Supreme Court case establishing broad interpretation of § 16600, rejecting narrow restraint exception.",
    author: "Cal. Supreme Court",
    date: "2008",
    tags: ["non-compete", "california", "case law", "landmark"],
    preview: {
      fullDescription:
        "Edwards v. Arthur Andersen LLP (2008) 44 Cal.4th 937\n\nHolding: Section 16600 of the Business and Professions Code prohibits non-compete agreements regardless of whether the restraint is 'narrow' or 'broad.' The court rejected the Ninth Circuit's 'narrow restraint' exception, holding that California law settles the question in favor of open competition.\n\nFacts: Raymond Edwards II, a tax manager at Arthur Andersen, was required to sign a non-competition agreement as a condition of employment. After he was terminated, Edwards sued, alleging the agreement was void under § 16600.\n\nSignificance: This case is the definitive authority on California's approach to non-compete agreements and is routinely cited in conflicts-of-law analyses involving California employees.",
      metadata: {
        Citation: "44 Cal.4th 937 (2008)",
        Court: "California Supreme Court",
        "Decision Date": "August 7, 2008",
        "Key Holding": "§ 16600 broadly prohibits non-competes",
        Database: "Westlaw Edge",
      },
    },
  },
  {
    id: "14",
    title: "Client Memo — Sterling Partners Investment Thesis",
    source: "sharepoint",
    type: "memo",
    snippet:
      "Internal memo analyzing Sterling Partners' acquisition strategy and portfolio company compliance requirements.",
    author: "Partner Group",
    date: "5 days ago",
    tags: ["client", "sterling", "investment", "strategy"],
    preview: {
      fullDescription:
        "Internal memorandum prepared for the firm's M&A practice group summarizing Sterling Partners LP's current investment thesis and acquisition criteria. Sterling is targeting mid-market fintech and payments companies with $20-75M in revenue and EBITDA margins above 15%.\n\nThe TechFlow acquisition (M&A-2025-03) is Sterling's third platform investment in the embedded finance space. Key compliance considerations include HSR filing thresholds (currently $119.5M, not triggered), CFIUS review (unlikely given domestic-only operations), and state money transmitter licensing requirements.\n\nAction items: Complete due diligence checklist by March 28; schedule regulatory counsel call for April 1.",
      metadata: {
        "Document ID": "SP-CLIENT-2026-0089",
        Created: "March 17, 2026",
        Author: "Partner Group",
        Client: "Sterling Partners LP",
        Classification: "Attorney-Client Privileged",
      },
    },
  },
  {
    id: "15",
    title: "FTC Non-Compete Ban — Final Rule Analysis",
    source: "westlaw",
    type: "memo",
    snippet:
      "Analysis of FTC's final rule banning non-compete clauses nationwide, current injunction status, and practice implications.",
    author: "Employment Practice Group",
    date: "Updated 1 month ago",
    tags: ["non-compete", "ftc", "federal", "regulatory"],
    preview: {
      fullDescription:
        "Comprehensive analysis of the FTC's final rule (16 CFR Part 910) banning non-compete clauses nationwide, issued April 23, 2024. The rule was scheduled to take effect September 4, 2024 but has been blocked by multiple federal court injunctions.\n\nCurrent status: The Northern District of Texas in Ryan LLC v. FTC permanently enjoined the rule nationwide (August 2024). The matter is on appeal to the Fifth Circuit. Several other challenges are pending.\n\nPractice implications: While the federal rule remains enjoined, the momentum has accelerated state-level non-compete reform. Minnesota, California, North Dakota, and Oklahoma now ban non-competes entirely. Several other states (Colorado, Oregon, Washington, Illinois) have imposed significant restrictions.\n\nRecommendation: Continue advising clients to draft narrow, well-supported non-competes and to explore alternative protections (NDAs, non-solicitation, garden leave) as the legal landscape continues to shift.",
      metadata: {
        Citation: "16 CFR Part 910",
        "FTC Rule Status": "Enjoined (Ryan LLC v. FTC)",
        "Last Updated": "February 2026",
        Author: "Employment Practice Group",
        Database: "Westlaw Edge / Internal Analysis",
      },
    },
  },
  {
    id: "16",
    title: "RE: TechFlow Due Diligence — IP Concerns",
    source: "outlook",
    type: "email",
    snippet:
      "Discussion of open-source license compliance issues discovered during TechFlow acquisition due diligence.",
    author: "Lisa Wong",
    date: "4 days ago",
    matter: "TechFlow Acquisition (M&A-2025-03)",
    tags: ["due diligence", "ip", "open source", "m&a"],
    preview: {
      fullDescription:
        "Email from Lisa Wong to the M&A deal team flagging open-source license compliance issues identified during TechFlow's IP due diligence review.\n\nIssues identified:\n1. TechFlow's core payments SDK includes AGPL-3.0 licensed components that may trigger copyleft obligations for the proprietary codebase\n2. Three npm dependencies with unclear licensing (no LICENSE file)\n3. One component using a Creative Commons NonCommercial license in a commercial product\n\nRecommended actions:\n- Request TechFlow's SBOM (Software Bill of Materials)\n- Engage IP counsel for AGPL copyleft analysis\n- Include open-source remediation as a pre-closing condition\n- Consider IP indemnification provisions in the SPA",
      metadata: {
        "Message ID": "OL-2026-03-18-LW-293",
        Date: "March 18, 2026",
        From: "Lisa Wong",
        To: "M&A Deal Team",
        Subject: "RE: TechFlow Due Diligence — IP Concerns",
      },
    },
  },
  {
    id: "17",
    title: "Patent License Agreement — US-2024-1847",
    source: "netdocuments",
    type: "contract",
    snippet:
      "Executed patent cross-license agreement with GlobalPay covering payment processing and FX conversion patents.",
    author: "James Liu",
    date: "6 months ago",
    tags: ["patent", "license", "cross-license", "payments"],
    preview: {
      fullDescription:
        "Patent cross-license agreement between Acme Corporation and GlobalPay Technologies, providing mutual freedom-to-operate for each party's patent portfolio in the payments processing and foreign exchange conversion technology space.\n\nThe agreement covers Acme's 47-patent portfolio (payment processing, real-time settlement) and GlobalPay's 31-patent portfolio (FX conversion, multi-currency routing). The cross-license is royalty-free for existing products and includes a 5% running royalty on new products that substantially rely on the other party's patents.\n\nTerm: 7 years with automatic 3-year renewals. Either party may terminate on 12 months' written notice.",
      keyClauses: [
        "Scope: payments processing + FX conversion (§ 2)",
        "Royalty: free for existing, 5% for new products (§ 4)",
        "Term: 7 years + auto-renewal 3 years (§ 10)",
        "Termination: 12 months notice (§ 10.3)",
        "Sublicense: to affiliates only (§ 3.2)",
      ],
      metadata: {
        "Document ID": "ND-IP-2025-0034",
        Created: "September 15, 2025",
        Author: "James Liu",
        Counterparty: "GlobalPay Technologies",
        Matter: "Patent Portfolio Review (IP-2024-12)",
      },
    },
  },
  {
    id: "18",
    title: "Associate Training — Non-Compete Enforceability Guide",
    source: "sharepoint",
    type: "memo",
    snippet:
      "50-state survey of non-compete enforceability standards. Covers key factors, recent reforms, and practice tips.",
    author: "Sarah Chen",
    date: "1 month ago",
    tags: ["non-compete", "training", "50-state", "survey"],
    preview: {
      fullDescription:
        "Comprehensive 50-state survey of non-compete enforceability prepared for the firm's annual associate training program. The guide covers each state's approach to non-compete enforcement, including:\n\n- States with outright bans (California, Minnesota, North Dakota, Oklahoma)\n- States with significant statutory restrictions (Colorado, Oregon, Washington, Illinois, Maine, Maryland, New Hampshire, Rhode Island, Virginia)\n- States following the reasonableness standard (Texas, New York, Florida, most others)\n- States with blue-pencil/reformation authority vs. all-or-nothing approach\n\nThe guide includes a decision tree for multi-state non-compete analysis, sample language for various restriction levels, and recent case law developments through Q1 2026.",
      metadata: {
        "Document ID": "SP-TRAIN-2026-0008",
        Created: "February 15, 2026",
        Author: "Sarah Chen",
        "Practice Group": "Employment & Labor",
        "Target Audience": "Junior Associates",
      },
    },
  },
];
