# Talkwer Component Audit Skill

## Purpose

Audit component duplication, coupling, and abstraction quality.

## Trigger

Use when asked to review reusable components, modularity, or architecture quality.

## Minimal context bundle

- `AGENTS.md`
- `.cursor/rules/talkwer-architecture.mdc`
- `src/components/ui/**/*`
- `src/features/**/*`
- `src/shared/**/*`

## Checklist

1. Identify repeated markup/class patterns.
2. Detect duplicated local types/data arrays.
3. Flag feature/shared boundary violations.
4. Recommend extraction candidates with priority.
5. Preserve visual contracts in recommendations.

## Output format

- Severity-ranked findings
- Candidate extractions
- Suggested file destinations
- Estimated refactor effort (S/M/L)

