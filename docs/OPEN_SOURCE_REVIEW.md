# Open-source preparation review

Reviewed October 27, 2026. This records the preparation work and checks
performed in the local workspace; it is not a claim that every route and browser
has been exhaustively tested.

## Changes

- Added the root MIT license and package metadata for Sovers Tonmoy Pandey
  (s0vers).
- Included author-generated demo imagery under MIT with explicit author
  authorization. Retained generation provenance, file hashes, component notices,
  and the Inter OFL.
- Rewrote the public README, added contribution and private security-reporting
  guides, updated GitHub templates and the offline guide, and separated
  historical marketplace records from current release requirements.
- Upgraded Next.js and `eslint-config-next` from 16.3.8 to 16.4.3 after the
  production audit reported two critical and two high advisories. The
  post-upgrade audit reports no known vulnerabilities.
- Aligned dependency CI with Node.js 22 and the package's declared pnpm version;
  added a production audit to pull-request verification and restricted workflow
  token permissions to reading repository contents.
- Rejected malformed booking slots before date formatting and persisted the
  selected time zone in the URL.
- Based the calendar default date and minimum selectable day on the selected
  time zone.
- Corrected doubled locale prefixes in booking navigation, connected the
  calendar to the active page locale, and formatted the time-list date in the
  selected zone instead of the browser zone.
- Derived the selected booking date from URL state rather than copying it into
  state in an effect.
- Hardened demo return-path validation against backslashes, control characters,
  and normalized protocol-relative paths; preserved URL fragments when adding
  demo feedback parameters.
- Replaced carousel effect-driven state updates with external-store
  subscriptions and removed both Embla event listeners on cleanup.
- Initialized testimonial autoplay once and removed unused animation hooks and
  the unused direct `framer-motion` dependency. The app continues to use
  `motion`.
- Replaced the session-storage hydration sentinel with an undefined server
  snapshot, so an arbitrary stored string cannot keep checkout permanently
  unready.
- Skipped animation teardown for download links, expanded local
  environment/restore ignores, and removed an author-account-specific deployment
  deletion script.
- Kept the optional legacy placeholder ZIP working, including the MIT license
  and contributor documents.

## Verification

Local runtime: Node.js 24.19.0 and pnpm 12.6.0 on Windows. CI is configured for
Node.js 22; that CI run was not executed from this workspace.

| Check                                             | Result                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `pnpm install --frozen-lockfile`                  | Passed                                                                                                                   |
| `pnpm verify`                                     | Passed: lint, TypeScript, filenames, image sizes, source-image byte budget, production build                             |
| `pnpm deps:audit`                                 | No known production vulnerabilities reported after upgrade                                                               |
| `pnpm audit:preview-links http://localhost:45671` | 43 English anchor destinations checked; zero failures                                                                    |
| Ad hoc helper regressions                         | 16 assertions passed for unsafe return paths, query/fragment preservation, malformed storage, date and zone validation   |
| Asset inventory                                   | All 50 public raster images have provenance; all recorded SHA-256 hashes match                                           |
| Documentation links                               | Relative links in README, CONTRIBUTING, SECURITY, and docs index resolve                                                 |
| Credential-pattern scan                           | No matches in current tracked text files for selected private-key and token patterns; repository history was not scanned |
| Optional `pnpm package:theme`                     | Completed; produced a placeholder ZIP and collected dependency notices                                                   |
| `git diff --check`                                | Passed                                                                                                                   |

A local headless Chrome production preview exercised:

- Malformed booking query handling without a runtime crash.
- Booking a November 1 slot in Asia/Tokyo with the browser in
  America/Los_Angeles, verifying the day label stays November 1.
- Time-zone persistence after refresh, guest form submission, demo card
  autofill, confirmation creation, handoff cleanup, and absence of card fields
  in the stored confirmation.
- Spanish booking navigation and a Spanish calendar month label.
- Twelve showcase routes: the three homes, three destination listings, a tour
  detail, a story detail, login, dashboard, Spanish home, and Japanese home.
- Carousel controls, mobile booking at 390 by 844 without horizontal overflow,
  and screenshot inspection of the desktop carousel and mobile booking layout.
- Client navigation from home-3 to about and back with ordinary motion enabled.

No uncaught browser page errors occurred in those checks. Browser tooling and
temporary screenshots were kept outside the repository; no test runner was
added.

## Remaining limitations

An [October 28 follow-up](reviews/2026-10-28/README.md) records the editorial
refinements, application performance changes, expanded route checks, and five
passing mobile LCP runs. The project uses supported `next build --webpack` and
ordinary `next start`.

- Authentication, dashboards, checkout, contact, and newsletter remain
  demonstrations with the boundaries documented in the README. No backend or
  production access control was added.
- Spanish and Japanese translation coverage remains partial outside the
  localized interface and booking calendar.
- There is no persistent unit, integration, or browser test suite. These checks
  do not replace future regression coverage.
- Existing repository-wide formatting inconsistencies remain; touched UI/helper
  files were formatted without a whole-project rewrite.
- The project has not undergone exhaustive Safari/Firefox, physical-device,
  screen-reader, contrast, or performance testing in this review.
- Repository visibility and hosting configuration were not changed.
