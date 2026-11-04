# 3D Print Forge — Candidate Supervised Business Workflow

**Status:** Workflow design complete; not live, not integrated, and not counted as an operational vertical slice.

## Why it belongs in Agentarium

The 3D Print Forge is a strong early Forge candidate because it has a tangible, inspectable outcome and a deliberately bounded operating loop. It turns attributable market research into original product candidates, then routes each consequential step through a review and human approval gate before physical production.

## Canonical route

```text
Command → Nova → 3D Print Forge → Governor → human approval → physical production/QA → Archives
```

## Forge definition

- **Business:** original, functional, personalized 3D-printed goods; Etsy-first discovery.
- **Initial product families:** desk/workshop organization, personalized small goods, one higher-margin hero product.
- **Production owner:** Forge builds the packet; a human physically runs the printer, removes parts, inspects, packs, and ships.
- **Maturity:** `idea` with `supervised design complete` workflow specification.
- **External posture:** all storefront, payment, printer, shipping, spend, and customer-commitment actions remain approval-gated.

## Required future proof before any maturity increase

1. Configured attributable evidence source for Nova.
2. Real local product packet and original/eligible design proof.
3. Deterministic Governor checks for IP, safety/claims, economics, and fitment.
4. Human approval record before any physical print or external action.
5. Recorded production/QA artifact and replayable runtime audit event.
6. Runtime authority; browser-local commissioning alone is not enough.

## Source project

`/root/Kenn/projects/3d-print-forge/`

- Workflow: `docs/workflows/supervised-production-workflow.md`
- Forge manifest: `agentarium/3d-print-forge-manifest.json`
- Research: `docs/research/3d-print-business-opportunity-brief.md`
