# Security policy

Talkwer is a frontend demonstration. Its authentication and dashboards do not enforce access control, and its booking flow does not process payments or reserve inventory. These documented demo boundaries are not security controls for a production application.

## Supported version

Security fixes target the latest code on `main`. There is no commitment to backport fixes to older snapshots. Keep dependencies updated and run `pnpm deps:audit` before deploying.

## Report a vulnerability

Please email [support@s0vers.com](mailto:support@s0vers.com) with the subject `Talkwer security report`. Include affected routes or files, a minimal reproduction, potential impact, and the commit or dependency version involved. Do not include real credentials or personal data.

Please avoid public issues containing exploit details until the maintainer has had an opportunity to investigate and release a fix. Reports are handled on a best-effort basis; no response-time guarantee or bounty is offered.
