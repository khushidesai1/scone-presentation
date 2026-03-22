export interface WorkingStep {
  id: string;
  label: string;
  durationMs: number;
}

export interface LegalScenario {
  suggestedPrompts: string[];
  workingSteps: WorkingStep[];
  response: string;
}

export const LEGAL_SCENARIO: LegalScenario = {
  suggestedPrompts: [
    "Is the Martinez non-compete enforceable now that she moved to California?",
    "Summarize California BPC § 16600 and its impact on out-of-state non-competes",
    "What are Acme's options if the non-compete is void under California law?",
    "Compare Texas vs. California enforcement of non-compete clauses",
  ],

  workingSteps: [
    { id: "assess", label: "Assessing query", durationMs: 800 },
    { id: "jurisdiction", label: "Identifying applicable jurisdictions", durationMs: 600 },
    { id: "statutes", label: "Researching state-specific non-compete statutes", durationMs: 1200 },
    { id: "factors", label: "Analyzing enforceability factors", durationMs: 1000 },
    { id: "reasonableness", label: "Evaluating reasonableness of restrictions", durationMs: 900 },
    { id: "caselaw", label: "Reviewing recent case law developments", durationMs: 1100 },
    { id: "prepare", label: "Preparing comprehensive analysis", durationMs: 700 },
  ],

  response: `## Non-Compete Enforceability Analysis: Texas to California

Based on the jurisdictional analysis and applicable state statutes, here is a comprehensive assessment of the non-compete clause's enforceability when an employee relocates from Texas to California.

## Jurisdictional Analysis

The threshold issue is **which state's law governs** the non-compete agreement. This is critical because Texas and California take diametrically opposed approaches to non-compete enforcement.

- **California** (Bus. & Prof. Code § 16600) maintains a **near-total ban** on non-compete agreements. With narrow exceptions for the sale of a business, non-competes are void and unenforceable as a matter of public policy. California courts have consistently refused to enforce out-of-state non-competes against California residents, even when the agreement contains a choice-of-law provision selecting another state's law.
- **Texas** (Tex. Bus. & Com. Code § 15.50) permits non-compete agreements that are **ancillary to an otherwise enforceable agreement** and contain reasonable limitations as to time, geographic area, and scope of activity. Texas courts will reform overly broad restrictions rather than void the agreement entirely.

## Key Enforceability Factors

If Texas law were to apply, courts evaluate the following factors:

1. **Ancillary to enforceable agreement** — The non-compete must be part of an agreement that includes consideration such as access to trade secrets, confidential information, or specialized training
2. **Reasonable time limitation** — Restrictions of 1–2 years are generally upheld; anything beyond 3 years is presumptively unreasonable
3. **Reasonable geographic scope** — Must be tailored to the employer's actual competitive footprint rather than a blanket nationwide prohibition
4. **Reasonable activity restriction** — Must not prevent the employee from using general skills and knowledge; should be limited to competitive activities in the specific industry

## California's Strong Public Policy

California's position creates a powerful defense for the departing employee:

- **Edwards v. Arthur Andersen LLP (2008)**: The California Supreme Court held that § 16600 broadly prohibits non-compete agreements, rejecting the "narrow restraint" exception followed in some other jurisdictions
- **AB 1076 (2020) & SB 699 (2023)**: California has strengthened its protections by codifying that any non-compete agreement is void regardless of where and when it was signed, and by making it unlawful for an employer to even attempt to enforce a void non-compete
- **Choice-of-law provisions** selecting Texas law are likely to be disregarded by California courts as violating California's fundamental public policy under the *Restatement (Second) of Conflict of Laws § 187*

## Practical Recommendations

1. **If you represent the employee**: The strongest position is that California law applies once the employee resides and works in California. File any declaratory judgment action in California to obtain a ruling that the non-compete is void under § 16600
2. **If you represent the employer**: Consider whether the employee had access to genuine trade secrets. If so, pursue claims under the **Defend Trade Secrets Act (18 U.S.C. § 1836)** or the **California Uniform Trade Secrets Act**, which remain available even where non-compete agreements are void
3. **Interim relief**: Regardless of jurisdiction, the employer should assess whether a **TRO or preliminary injunction** is warranted based on trade secret misappropriation rather than the non-compete clause itself

## Conclusion

The non-compete clause is **very likely unenforceable** against an employee who has relocated to California. California's strong public policy against restraints on competition, reinforced by recent legislation, will almost certainly override any Texas choice-of-law provision. The employer's best avenue is to pursue trade secret protections rather than relying on the non-compete covenant.

> **Note**: This analysis is for informational purposes. Specific enforceability will depend on the precise language of the agreement, the nature of the employee's role, and the circumstances of the departure. A full review of the agreement and relevant facts is recommended.`,
};
