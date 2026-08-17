# Investment Research Agent — Plain JavaScript (React + Vite)

This is the React + Vite frontend with every `.ts`/`.tsx` file converted to
`.js`/`.jsx`. No UI, animation, responsiveness, functionality, or design was
changed — only the language: TypeScript's type annotations are gone, plain
JavaScript is what's left.

## How to run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # builds to dist/ (no type-checking step anymore)
npm run preview   # serves the production build locally
```

## How the conversion was done

Every type annotation, interface, generic, and type-only import was stripped
using Babel (`@babel/preset-typescript`) rather than by hand — this avoids the
human-error risk of manually deleting `: Type` annotations across 16 files
line by line. Babel parses the real TypeScript AST and removes exactly the
TS-only nodes, leaving every runtime statement (JSX, logic, state, effects)
byte-for-byte the same. The output was then run through Prettier for
formatting only.

## What changed, file by file

**All 11 `components/*.tsx` → `components/*.jsx`, `src/App.tsx` → `App.jsx`,
`src/main.tsx` → `main.jsx`, `lib/mockAgent.ts` → `mockAgent.js`** — type
annotations, interfaces, and generics removed; all JSX, JS logic, hooks,
effects, event handlers, and Tailwind classes untouched. For example:

```diff
- const [stage, setStage] = useState<Stage>("landing");
+ const [stage, setStage] = useState("landing");

- function goToApp(): void { ... }
+ function goToApp() { ... }

- export default function GlassCard({ strong, glow = "none", ... }: GlassCardProps) {
+ export default function GlassCard({ strong, glow = "none", ... }) {
```

**`lib/types.ts` → `lib/types.js`.** This file was *only* TypeScript
`interface`/`type` declarations — no runtime code at all. Plain JavaScript
has no interfaces, so there's nothing to functionally convert. Rather than
leave an empty file, every shape (`AgentResult`, `Verdict`, `PipelineStage`,
etc.) is preserved as a JSDoc `@typedef` comment — purely documentation, still
gives autocomplete/hover hints in most editors, zero runtime effect.

**Type-only imports removed.** Every file that imported a type from
`lib/types` purely for annotations (e.g. `import { AgentResult } from
"../lib/types"`) had that import deleted, since `AgentResult` etc. no longer
exist as real values. Verified each one had zero non-import usages before
removing.

**One dead import Babel's conversion surfaced:** `GlassCard.tsx` imported
`HTMLAttributes` from `"react"` for its props interface. `HTMLAttributes` is
a TypeScript-only type (from `@types/react`), not a real export of the
`react` package — after the interface was stripped, this import was left
unused and removed.

**`vite.config.ts` → `vite.config.js`.** No TypeScript syntax was actually
in this file (just plain JS with a `.ts` extension for editor tooling), so
this was a rename, nothing else.

**Removed:** `tsconfig.json`, `tsconfig.node.json` — no longer needed with no
TypeScript in the project. **`package.json`** — `typescript`, `@types/react`,
`@types/react-dom` removed from `devDependencies`; the `build` script no
longer runs `tsc` first (there's nothing to type-check). `tailwind.config.js`'s
`content` globs were trimmed from `{js,ts,jsx,tsx}` to `{js,jsx}`.

**`index.html`** — the `<script>` tag now points at `/src/main.jsx` instead
of `/src/main.tsx`.

## Verified

- `npm install` — clean install, no vulnerabilities
- `npm run build` — builds with zero errors and zero warnings (aside from
  the pre-existing, expected "recharts is a large chunk" notice, unrelated
  to this conversion)
- `npm run dev` — dev server boots and serves the app (confirmed with an
  HTTP request against the running server)
- Manually reviewed every converted file's import list for leftover
  type-only imports before shipping

## Trade-off worth knowing

You lose compile-time type checking — if a future change passes the wrong
shape into `runAgent()` or a component prop, JavaScript won't catch it until
runtime (or not at all, if the bug never executes that code path). The JSDoc
typedefs in `lib/types.js` bring back editor hints but not enforcement. If
this matters for the assignment's grading criteria, it's worth mentioning
in your own submission notes that the TS→JS conversion was a deliberate,
requested trade-off.
