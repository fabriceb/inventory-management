---
name: redesign-saas
description: Redesign a Vue 3 application's UI into a modern SaaS-style interface with vertical sidebar navigation, consistent spacing, and a polished professional look. Transforms top nav bars into collapsible sidebars with icon+label navigation.
---

# SaaS UI Redesign Skill

Transform a Vue 3 application from a top-nav layout into a modern SaaS-style interface with a vertical sidebar navigation. This skill produces a polished, professional design consistent with tools like Linear, Notion, or Vercel Dashboard.

## MANDATORY: Use vue-expert subagent

All `.vue` file creation and significant modification MUST be done via the `vue-expert` subagent. Delegate the actual implementation to it. You may run multiple vue-expert agents in parallel for independent files.

## Design Specification

### Layout Architecture

**Target layout** (replace the existing top-nav + full-width content):

```
┌──────────┬──────────────────────────────────────────────┐
│          │  Filter Bar / Page Header                    │
│  Sidebar │──────────────────────────────────────────────│
│  (fixed) │                                              │
│          │  Main Content (scrollable)                   │
│  Logo    │                                              │
│  Nav     │                                              │
│  Items   │                                              │
│          │                                              │
│          │                                              │
│  ─────── │                                              │
│  Profile │                                              │
│  Footer  │                                              │
└──────────┴──────────────────────────────────────────────┘
```

- **Sidebar**: Fixed left, full viewport height, 240px wide (72px when collapsed)
- **Main area**: Fills remaining width, scrolls independently
- **Filter bar**: Sticky inside the main content area, below any page header

### Sidebar Specification

**Structure (top to bottom):**
1. **Logo section** — App logo/name at top, with collapse toggle button
2. **Navigation links** — Icon + label for each route, with active state highlighting
3. **Spacer** — Pushes bottom section down
4. **Bottom section** — Profile avatar + name, language switcher, settings link

**Behavior:**
- Collapsed state: Show only icons (72px wide), expand on hover or toggle click
- Active route: Highlighted background + accent color on left border or icon
- Hover: Subtle background highlight
- Smooth transition between expanded/collapsed states (0.2s ease)
- Persist collapsed/expanded state in localStorage

**Icons:** Use simple SVG icons inline (no icon library dependency). Each nav item needs an appropriate icon:
- Dashboard/Overview: grid or chart icon
- Inventory: box/package icon
- Orders: clipboard/list icon
- Finance/Spending: dollar/currency icon
- Demand: trending-up icon
- Reports: bar-chart icon

### Color System

Maintain the existing slate/gray palette but refine it for the sidebar:

| Element | Color |
|---|---|
| Sidebar background | `#0f172a` (dark navy) or `#1e293b` (slate-800) |
| Sidebar text | `#94a3b8` (slate-400, muted) |
| Sidebar text hover | `#e2e8f0` (slate-200) |
| Sidebar active item bg | `rgba(59, 130, 246, 0.1)` (blue tint) |
| Sidebar active text | `#3b82f6` (blue-500) |
| Sidebar active left border | `#3b82f6` (blue-500), 3px |
| Sidebar dividers | `rgba(148, 163, 184, 0.1)` |
| Main content background | `#f8fafc` (slate-50) |
| Cards | `#ffffff` with `border: 1px solid #e2e8f0` |
| Page header text | `#0f172a` |

### Spacing System

Use a consistent 8px grid:

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Tight gaps (icon-to-text in nav) |
| `--space-2` | 8px | Compact padding (badges, small gaps) |
| `--space-3` | 12px | Nav item vertical padding |
| `--space-4` | 16px | Card internal padding, standard gaps |
| `--space-5` | 20px | Section padding |
| `--space-6` | 24px | Card padding, main content gutters |
| `--space-8` | 32px | Section spacing |

### Typography Refinements

- Page titles: 24px, font-weight 600, color `#0f172a`
- Section headings: 16px, font-weight 600, color `#0f172a`
- Body text: 14px, color `#334155`
- Secondary text: 13px, color `#64748b`
- Nav items: 14px, font-weight 500

### Card Styling

All cards should follow this consistent pattern:
```css
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  /* NO box-shadow by default — only on hover if interactive */
}
.card:hover (interactive cards only) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
```

### Stat Cards

Refine stat cards to be cleaner:
- Remove colored left borders or top accents — use a subtle icon or colored text for the metric type
- Value: 28px, font-weight 700
- Label: 13px, uppercase, letter-spacing 0.5px, color `#64748b`

## Implementation Steps

### Step 1: Create Sidebar Component

Create a new `client/src/components/SidebarNav.vue` component:
- Accepts `collapsed` prop and emits `update:collapsed`
- Uses `useRoute()` from vue-router for active state
- Renders all navigation links with SVG icons
- Bottom section has profile menu trigger and language switcher
- Transition for width change

### Step 2: Modify App.vue Layout

Transform App.vue from:
```
<header.top-nav> → <FilterBar> → <main.main-content>
```
To:
```
<div.app-layout>
  <SidebarNav />
  <div.main-panel>
    <FilterBar />  (sticky, top: 0 within .main-panel)
    <main.main-content>
      <router-view />
    </main.main-content>
  </div>
</div>
```

- Remove the `.top-nav` header entirely
- Move ProfileMenu and LanguageSwitcher into the sidebar
- Update `.main-content` max-width to be fluid (no 1600px cap — let it fill the panel)
- `.main-panel` gets `margin-left` matching sidebar width, with transition

### Step 3: Update FilterBar

- Remove sticky top offset (was 70px for old header — now 0)
- Stretch full width of `.main-panel`
- Optionally refine styling: lighter, more compact, integrated feel

### Step 4: Update Global Styles

- Add CSS custom properties for spacing tokens on `:root`
- Update `.card` class to match new card spec (12px radius, border instead of shadow)
- Update `.stat-card` for cleaner look
- Ensure consistent `padding` and `gap` using spacing tokens across all views
- Set `body` / `#app` to `overflow: hidden; height: 100vh` so only main-panel scrolls

### Step 5: Polish View Pages

For each view, ensure:
- Page header uses consistent title styling
- Cards use consistent padding (24px)
- Grid gaps use spacing tokens
- Tables have consistent styling
- No visual conflicts with the new sidebar layout
- Content is not hidden behind the sidebar

## Key Rules

1. **Do NOT remove any functionality** — all routes, filters, modals, i18n, and profile features must continue working
2. **Do NOT change any API calls or data logic** — only layout and styling
3. **Keep all existing scoped styles** that don't conflict — only override what's needed for the new layout
4. **Mobile responsiveness**: On screens < 768px, sidebar should auto-collapse to icon-only mode
5. **Preserve the filter system** — FilterBar stays prominent and functional
6. **No new npm dependencies** — use inline SVGs, CSS transitions, and localStorage only
7. **Test with Playwright** after implementation: use `mcp__playwright__*` tools to verify the sidebar renders, navigation works, and content displays properly at `http://localhost:3000`

## Verification Checklist

After implementation, verify:
- [ ] Sidebar renders with all 6 navigation links
- [ ] Active route is visually highlighted in sidebar
- [ ] Clicking nav links navigates correctly
- [ ] Sidebar collapse/expand works with smooth transition
- [ ] Collapsed state persists across page reloads (localStorage)
- [ ] Profile menu and language switcher accessible from sidebar
- [ ] Filter bar works correctly in new layout
- [ ] All 6 views render properly without layout overflow
- [ ] Cards have consistent border-radius and padding
- [ ] No horizontal scrollbar on main content
- [ ] Modals still open and display correctly
