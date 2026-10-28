# Talkwer Release Check Skill

## Purpose

Run a deterministic pre-merge quality gate for Talkwer.

## Trigger

Use before declaring refactor work complete.

## Minimal context bundle

- `AGENTS.md`
- `.cursor/rules/talkwer-quality.mdc`
- `.cursor/rules/talkwer-design.mdc`
- changed files

## Checklist

1. Run `pnpm verify`.
2. Confirm no visual-contract violation introduced by refactor.

## Output format

- Command results summary
- Any failures and likely causes
- Pass/fail verdict

