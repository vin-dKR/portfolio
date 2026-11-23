# Experience thread and WakaTime refinement

> **For agentic workers:** Use subagent-driven development for the two independent component tasks, followed by integrated browser verification.

**Goal:** Connect the three existing experiences with one measured, flowing thread and make the WakaTime card show complementary information.

**Architecture:** The timeline measures its actual nodes and stable card wrappers in one SVG coordinate system. Vertical-tangent cubic curves travel outside cards and turn through measured gaps. WakaTime keeps the language chart and uses genuine fields from the same API period for its additional detail.

**Tech stack:** Existing Next.js, React, CSS, SVG, ResizeObserver, IntersectionObserver, and existing motion primitives. No new runtime dependencies.

**Spec:** The user's three-node timeline request and fourth image, plus the request to remove duplicated language data in WakaTime.

## Constraints

- Scope is Timeline, its Work presentation, and WakaTime only; preserve the rest of the portfolio.
- Preserve all three experiences, dates, images, Clothing GO carousel, and client-work link.
- Desktop cards alternate right, left, right; mobile uses a left rail with cards on the right.
- A single continuous path starts above the first node, passes through all three actual centers, and ends below the last.
- Use cubic Béziers with continuous tangents; the thread must stay outside card surfaces.
- Recalculate on layout, font, and viewport changes; keep scroll animation lightweight.
- Respect reduced motion, keyboard, touch, and existing theme/typeface choices.
- Additional WakaTime data must be real, optional when unavailable, and from the same period as the chart.

## Review focus

1. Font changes or resize must not move nodes off the path.
2. Entrance transforms must not contaminate geometry measurements.
3. Mobile cards and controls must fit without horizontal overflow.
4. Scroll reveal must reach the final node and end correctly, including reduced motion.
5. Missing/private WakaTime fields must not create invented values or empty placeholder rows.

## Tasks

- [x] Timeline: inspect current DOM and reproduce the awkward three-node curve; capture the baseline.
- [x] Timeline: restructure the card hierarchy and measured geometry in `components/ui/Timeline.tsx` and `Timeline.css`; keep existing content and carousel behavior.
- [x] Timeline: verify exact node/path alignment, card clearance, continuous tangents, scroll reveal, responsive layout, and font changes in the browser.
- [x] WakaTime: inspect the live public response and official API documentation, then extend `lib/wakatimeClient.ts` with only the genuine complementary fields used by the card.
- [x] WakaTime: replace the duplicated percentage list with compact chart controls and a useful detail panel in `WakatimeStats.tsx` and WakaTime-scoped styles.
- [x] WakaTime: verify missing fields, errors, refresh, touch/keyboard chart selection, reduced motion, and consistent reporting periods.
- [x] Integration: run production build, changed-source lint, whitespace checks, desktop/tablet/phone browser QA, and capture the final components.
- [x] Save and update the existing draft PR after verification; do not merge or redesign unrelated pages.

## Verification results

Production build and changed-source lint pass. Production browser geometry checks pass across both themes, four fonts, six widths including the mobile breakpoint, and all six carousel slides: maximum node-to-path distance 0.109px, exact C1 joins, and no card intersections. The thread fully reveals at the bottom of the page. WakaTime API fixtures and production browser tests pass for real metadata, absent/private/malformed values, same-period data, hover/keyboard/touch controls, refresh, and reduced motion. Homepage initial JavaScript remains 155 kB. Independent read-only code review found no actionable issue.
