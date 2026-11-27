# Graph Report - Vehicle-Manager  (2026-11-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 148 nodes · 203 edges · 25 communities (9 shown, 16 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `590e95cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `Theme` - 11 edges
3. `react` - 6 edges
4. `react-native` - 6 edges
5. `scripts` - 5 edges
6. `VehicleForm()` - 4 edges
7. `zod` - 4 edges
8. `InputField()` - 3 edges
9. `SelectDropdown()` - 3 edges
10. `ToggleSwitch()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `InputFieldProps` --references--> `Theme`  [EXTRACTED]
  src/components/form/InputField.tsx → src/lib/theme.ts
- `SelectDropdownProps` --references--> `Theme`  [EXTRACTED]
  src/components/form/SelectDropdown.tsx → src/lib/theme.ts
- `ToggleSwitchProps` --references--> `Theme`  [EXTRACTED]
  src/components/form/ToggleSwitch.tsx → src/lib/theme.ts
- `VehicleFormProps` --references--> `Theme`  [EXTRACTED]
  src/components/form/VehicleForm.tsx → src/lib/theme.ts
- `ThemeState` --references--> `Theme`  [EXTRACTED]
  src/lib/types.ts → src/lib/theme.ts

## Import Cycles
- None detected.

## Communities (25 total, 16 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (25): react@18.3.1, react-native@0.76.6, react, react-native, InputField(), InputFieldProps, styles, SelectDropdown() (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (9): zod@^3.23.0, zod, logImportFailure(), ValidationResult, FuelLogFormValues, fuelLogSchema, themeSchema, VehicleFormValues (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (11): AppState, ConsumptionUnit, DistanceUnit, FuelLog, FuelLogState, FuelType, FuelUnit, SecondaryFuelUnit (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (9): devDependencies, @babel/core@^7.25.2, tailwindcss@^3.4.0, @types/react@~18.3.12, typescript@~5.6.2, @babel/core, tailwindcss, @types/react (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (7): @expo/vector-icons@^14.0.0, @react-navigation/native@^7.0.0, main, name, version, @expo/vector-icons, @react-navigation/native

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (7): dependencies, expo@~52.0.0, expo-router@4.0.15, react-dom@18.3.1, expo, expo-router, react-dom

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (5): scripts, android, ios, start, web

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (3): ConsumptionCalculator, DistanceConverter, FuelConverter

## Knowledge Gaps
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 0` to `Community 5`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10984848484848485 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Community 0` to `Community 5`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Community 6` to `Community 0`, `Community 2`, `Community 5`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._