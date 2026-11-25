# AI Agent Policy & Operational Rules

This document defines the strict operational boundaries, permissions, and protocols for any AI coding agent (e.g., Cursor, GitHub Copilot, autonomous dev agents) working on the Vehicle Management Tracker codebase. 

**Failure to adhere to these rules will result in rejected pull requests or corrupted codebase states.**

---

## 1. The Prime Directive: Ask First
**The AI agent MUST NOT add, remove, or fundamentally alter any user-facing feature without explicit, written approval from the user.** 
- If a feature is missing, broken, or could be improved, the agent must **suggest** it first and wait for a "Yes" or "EXECUTE" command before writing the implementation code.
- Silent feature additions or deletions are strictly prohibited.

---

## 2. What the Agent CAN Do (Green Light ✅)
The agent is authorized to perform the following actions autonomously:
- **Refactoring:** Improve code readability, extract reusable components, or optimize performance *without* changing the external behavior or UI.
- **Bug Fixing:** Resolve crashes, type errors, or logical bugs in *existing* features.
- **Type Safety:** Add or refine TypeScript interfaces, types, and Zod schemas to enforce strict mode.
- **Documentation:** Update `README.md`, inline comments, or JSDoc to reflect the current state of the code.
- **Testing:** Write or update unit/integration tests for existing logic.
- **Styling Tweaks:** Adjust padding, margins, or colors to match the existing design system (Light, Dark, Secret Black) without introducing new UI elements.
- **Feature Suggestion:** Propose new features or improvements using the *Feature Suggestion Protocol* (see Section 4).

---

## 3. What the Agent CANNOT Do (Red Light 🛑)
The agent is strictly forbidden from doing the following without explicit user approval:
- **Adding/Removing Features:** Do not create new screens, new database tables, or new user flows. Do not delete existing fields or screens.
- **Installing Dependencies:** Do not run `npm install` or add new libraries (e.g., new UI kits, state management tools) unless explicitly commanded.
- **Architecture Changes:** Do not migrate from Expo Router to React Navigation, or from Zustand to Redux, etc.
- **Breaking Changes:** Do not alter the signature of exported functions, database schemas, or API contracts in a way that breaks existing code.
- **Hardcoding:** Do not hardcode values (especially unit conversions, colors, or mock data) that should be dynamic or stored in config files.
- **Ignoring Context:** Do not assume platform-specific behavior (e.g., assuming something works on Web just because it works on Mobile) without verifying cross-platform compatibility.

---

## 4. Feature Suggestion Protocol
If the agent identifies a gap, a better UX pattern, or a useful new feature, it must present the suggestion in the following format and **wait for approval**:

> **💡 Feature Suggestion: [Name of Feature]**
> - **Problem:** [Briefly explain what is missing or could be improved]
> - **Proposed Solution:** [Describe the feature and how it fits the current tech stack]
> - **Impact:** [e.g., "Requires 1 new Zustand store, 2 new components, and updates to the Vehicle schema"]
> - **Action Required:** Please reply with "APPROVED" or "EXECUTE" to implement, or "REJECT" to discard.

*Example:* 
> "💡 Feature Suggestion: Odometer Photo Attachment. Problem: Users might misread their odometer. Proposed Solution: Add an optional `expo-image-picker` to the Fuel Log screen. Impact: Requires adding `expo-image-picker` dependency and a new `photoUri` field to `FuelLog`. Action Required: Reply 'APPROVED' to implement."

---

## 5. Codebase-Specific Technical Policies
When authorized to write code, the agent must strictly adhere to these technical rules:

### 5.1 Stack & Architecture
- **Framework:** React Native + Expo (SDK 51+). No ejecting.
- **Routing:** Expo Router (file-based). 
- **State:** Zustand for global state. Local state via `useState`/`useReducer`.
- **Forms:** `react-hook-form` + `zod` for all user inputs.

### 5.2 Styling & Theming
- Use **NativeWind** (TailwindCSS) exclusively. No inline `StyleSheet.create` unless absolutely necessary for dynamic animations.
- **Secret Black Mode:** Must use pure `#000000` for backgrounds. Do not use dark gray (`#121212`) when Secret Black is active.

### 5.3 Vehicle Profile Logic (Strict Enforcement)
- **Placeholder Name:** If `name` is empty, it **must** resolve to `${model}_${plateNumber}` (e.g., `Vios_ABC1234`). This logic must live in a central utility or schema default, not duplicated in UI components.
- **Dual Fuel (PHEV):** If `isDualFuel` is `false`, `secondaryFuelUnit` and `secondaryTankCapacity` must be `null`. The UI must conditionally hide these fields.

### 5.4 Unit Conversions
- All unit conversions must be handled by pure functions in `/lib/units.ts`. 
- Never hardcode conversion math (e.g., `* 0.621371`) inside React components.

---

## 6. Agent Pre-Flight Checklist
Before outputting any code block or executing a file change, the agent must mentally verify:
- [ ] Am I adding or removing a feature? If yes, **STOP** and ask for permission.
- [ ] Is this code strictly typed (no `any`)?
- [ ] Does this work on both Mobile and Web?
- [ ] Am I using NativeWind for styling?
- [ ] Did I respect the Vehicle Name placeholder and Dual Fuel logic rules?

---

## 7. Web Browsing Capabilities
The agent has access to OpenWeb for research and information gathering:
- **Access Any Website**: Use `/openweb` tool to browse any website through the web_search or web_extract tools.
- **Research Tasks**: Ideal for finding API documentation, library tutorials, best practices, or verifying external data.
- **Extraction**: Can pull specific content from multiple URLs simultaneously using `web_extract` with a clear objective.

*Example usage:* 
> "I'll search for the latest React Native performance tips to inform our optimization strategy."

---

## 8. GitHub Issue Creator Activation Rule
When the user's message contains the trigger phrase **"git issue it"** (case-insensitive), the agent must switch into **GitHub Issue Creator** mode:

### 8.1 Workflow & Rules
- **Check for duplicates first:** Search existing issues before drafting a new one to avoid duplicates.
- **Ask before assuming:** If critical reproduction steps, expected behavior, or acceptance criteria are missing, list them under an "Open Questions" section rather than inventing technical facts.
- **Keep it atomic:** Break multiple unrelated bugs/features into separate, focused issues.
- **Human-in-the-loop:** Present the drafted issue for review before executing any API/CLI creation commands.

### 8.2 Issue Structure (when activated)
Format every issue using valid GitHub Flavored Markdown with these sections:

**Title:** Concise, action-forward title using Conventional Commits style (e.g., `fix(auth): prevent token expiration crash on refresh`).

**Description / Context:**
- For Bugs: Briefly summarize what is broken and user impact.
- For Features: Write a short user story ("As a [user], I want [goal], so that [benefit]").

**Reproduction Steps (Bugs only):**
1. Step-by-step actions to trigger the issue.
2. Expected behavior.
3. Actual behavior (include error logs or screenshots if provided).

**Acceptance Criteria:**
Testable checklist defining "Done".

**Suggested Metadata:**
- **Labels:** bug, enhancement, documentation, good first issue
- **Priority:** Low | Medium | High | Critical

---

## 9. MCP Tools Availability
The agent has access to the GitHub MCP server for repository operations:
- Use `get_mcp_info` to list available tools from an MCP server.
- Use `get_mcp_tools_info` to get descriptions and parameter schemas for selected tools.
- Use `call_mcp_tool` to execute MCP server tools.

---

*End of Policy. Acknowledge these rules before generating any code.*