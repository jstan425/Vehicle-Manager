# AI Agent Policy & Operational Rules (Vehicle Management Tracker)

This document defines the operational boundaries and working style for any AI coding agent working on the **Vehicle Management Tracker** codebase.

The operating mode combines **Ponytail** principles (solve the whole problem with the least new code, no over-engineering or unrequested bloat, complete every part the task actually touches) with strict project invariants for this repository.

---

## 1. Core Philosophy & The Prime Directive
- **Ask First on Scope Changes:** Do not add, remove, or fundamentally alter user-facing features without explicit user approval. Propose new features first and wait for `"APPROVED"` or `"EXECUTE"` before writing implementation code.
- **Smallest Complete Change (Ponytail):** Take the first option that fully works with the least new code:
  1. Does it need to exist? Skip unrequested features, options, flexibility, abstractions, wrappers, or "for later" code.
  2. Already in this codebase? Reuse existing helpers, components, stores, or patterns as surrounding code does.
  3. Standard library or platform feature? Use it unless the project already has a house utility/component.
  4. Already-installed dependency? Use it. Never add a new dependency for a few lines.
  5. Can it be one clear line? Prefer one line if a reader gets it at a glance without decoding.
  6. Otherwise: write the minimum code that works.
- **Finish the Touchpoints:** Be lazy about complexity, never about completeness. Update every caller, test, fixture, config, or export affected by your change.
- **Never Cut Critical Safeguards:** Never skip validation at trust boundaries, error handling that prevents data loss, security, accessibility, or anything explicitly requested.

---

## 2. Authorized Actions (Green Light)
You may autonomously perform changes within existing scope:
- **Refactoring:** Improve readability, extract shared logic only when genuinely duplicated and helpful, or optimize performance without changing external behavior or UI.
- **Bug Fixing:** Trace callers, fix the root cause once in shared code rather than patching symptoms, and keep existing error handling/validation intact when moving or merging code.
- **Type Safety:** Add or tighten TypeScript types and Zod schemas to satisfy strict mode without unnecessary type-conversion layers.
- **Documentation & Comments:** Update `README.md` or JSDoc when code state changes. Keep inline comments concise—only explain *why* when code cannot show it, or mark intentional shortcuts with `shortcut: <the limit>, <when to upgrade>`.
- **Verification:** Add a small test or assert-based self-check for non-trivial new logic (branches, loops, parsers, money/calculations, or security).
- **Styling Tweaks:** Adjust spacing or colors within the existing design system (Light, Dark, Secret Black) without adding new UI elements.
- **Feature Suggestions:** Propose improvements using Section 4 and wait for approval.

---

## 3. Forbidden Actions (Red Light)
Without explicit user approval, do not:
- **Add/Remove Features or Fields:** Create new screens, database tables, or user flows, or remove existing fields/screens.
- **Install Dependencies:** Run `npm install` or add packages unless explicitly instructed.
- **Change Architecture:** Switch frameworks, routing (Expo Router), state stores (Zustand), or form/validation stack (`react-hook-form` + `zod`).
- **Introduce Breaking Changes:** Alter exported function signatures, database schemas, or API contracts in ways that break existing callers.
- **Hardcode Config or Math:** Hardcode unit conversion math, colors, or mock data that belong in config/utilities.
- **Ignore Cross-Platform Behavior:** Assume Web and Mobile behave identically without checking platform constraints.

---

## 4. Feature Suggestion Protocol
When spotting a gap or useful improvement, present it in this format and wait for approval:

> **💡 Feature Suggestion: [Name of Feature]**
> - **Problem:** [What is missing or could be improved]
> - **Proposed Solution:** [Minimal solution fitting the current stack]
> - **Impact:** [Affected stores, components, schemas, or dependencies]
> - **Action Required:** Reply with `"APPROVED"` or `"EXECUTE"` to implement, or `"REJECT"` to discard.

---

## 5. Codebase Technical Rules

### 5.1 Stack & Architecture
- **App Stack:** React Native + Expo (SDK 51+), no ejecting. File-based routing via **Expo Router**.
- **State & Forms:** **Zustand** for global state; `useState`/`useReducer` for local state. **react-hook-form** + **zod** for user inputs.

### 5.2 Styling & Theming
- Use **NativeWind** (TailwindCSS) exclusively; avoid inline `StyleSheet.create` except where required for dynamic animations.
- **Secret Black Mode:** Backgrounds must use pure `#000000`, never `#121212`.

### 5.3 Vehicle Profile Logic
- **Placeholder Name:** Empty `name` must resolve to `${model}_${plateNumber}` (for example, `Vios_ABC1234`) via a central utility or schema default—not duplicated inside UI components.
- **Dual Fuel (PHEV):** When `isDualFuel` is `false`, `secondaryFuelUnit` and `secondaryTankCapacity` must be `null`, and the UI must hide those fields.

### 5.4 Unit Conversions
- Route all unit conversions through pure functions in `/lib/units.ts`. Never inline conversion factors (such as `0.621371`) inside components.

---

## 6. Pre-Flight & Response Sign-Off
Before emitting code or edits, check:
1. **Scope & Touchpoints:** Does this change only what was asked, across all affected callers, tests, and schemas?
2. **Project Rules:** Strict TypeScript (no `any`), cross-platform (Mobile + Web), NativeWind, Vehicle placeholder/PHEV rules, and `/lib/units.ts` conversions respected?
3. **Edge Cases & Checks:** Edge cases handled cleanly, and non-trivial logic has a minimal test or assertion check?

**End-of-Reply Sign-Off:** Finish coding replies with one or two concise lines stating what was skipped or not checked, and any risk the user should know.

---

## 7. Web Research, GitHub Issues & MCP Tools
- **Web Research:** Use OpenWeb (`web_search` / `web_extract`) when verifying API docs, library behavior, or external facts.
- **GitHub Issue Creator (`"git issue it"`):** When the message contains `"git issue it"` (case-insensitive):
  - Search existing issues first to prevent duplicates.
  - Put missing reproduction steps, expected behavior, or acceptance criteria under **Open Questions** rather than guessing.
  - Keep issues atomic and present drafts for review before creating them.
  - Use GitHub Flavored Markdown with **Title** (Conventional Commits style), **Description / Context** (bug summary or user story), **Reproduction Steps** (bugs only), **Acceptance Criteria**, and **Suggested Metadata** (`Labels`, `Priority`).
- **GitHub MCP:** Use `get_mcp_info`, `get_mcp_tools_info`, and `call_mcp_tool` for repository operations.