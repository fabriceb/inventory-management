# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Factory Inventory Management System — full-stack demo app with Vue 3 frontend, Python FastAPI backend, and in-memory mock data (no database).

## Commands

```bash
# Start both servers
./scripts/start.sh
# Or manually:
cd server && uv run python main.py          # Backend: http://localhost:8001
cd client && npm install && npm run dev      # Frontend: http://localhost:3000

# Stop servers
./scripts/stop.sh

# Run backend tests
cd tests && uv run pytest backend/ -v

# Run a single test file or test
cd tests && uv run pytest backend/test_inventory.py -v
cd tests && uv run pytest backend/test_inventory.py::TestInventoryEndpoints::test_get_all_inventory -v

# Build frontend
cd client && npm run build
```

## Architecture

**Data flow**: Vue filters → `client/src/api.js` (axios) → FastAPI endpoints → in-memory filtering via `apply_filters()`/`filter_by_month()` → Pydantic validation → JSON response → Vue computed properties

**Backend** (`server/`): Single-file API in `main.py`. All data loaded from `server/data/*.json` at startup via `mock_data.py` — lives in memory, changes don't persist across restarts. Filtering uses two helpers: `apply_filters()` for warehouse/category/status and `filter_by_month()` for time period (supports both `2025-01` and `Q1-2025` formats).

**Frontend** (`client/`): Vue 3 Composition API with vue-router. Routes defined inline in `main.js` (no separate router file). Seven views: Dashboard, Inventory, Orders, Demand, Spending, Reports, Backlog. All API calls centralized in `api.js`. Global styles in `App.vue`. Charts are custom SVG, no charting library.

**Filter system**: 4 filters (Time Period, Warehouse, Category, Order Status) passed as query params. Inventory endpoint only supports warehouse + category (no time dimension). The `'all'` value means "no filter" — both frontend and backend check for it.

**Tests** (`tests/backend/`): pytest with FastAPI TestClient. Fixtures in `conftest.py` add `server/` to sys.path and provide a `client` fixture. Tests use class-based organization (`class TestXxxEndpoints`).

## API Endpoints

- `GET /api/inventory` — warehouse, category filters
- `GET /api/orders` — warehouse, category, status, month filters
- `GET /api/dashboard/summary` — all filters
- `GET /api/demand`, `/api/backlog` — no filters
- `GET /api/spending/{summary,monthly,categories,transactions}` — no filters
- `GET /api/reports/{quarterly,monthly-trends}` — no filters

## Common Issues

1. Use unique keys in v-for (`sku`, `month`, etc.) — never array index
2. Validate dates before `.getMonth()` calls
3. Update Pydantic models in `main.py` when changing JSON data structure
4. Revenue goals: $800K/month single warehouse, $9.6M YTD all months

## Critical Tool Usage Rules

### Subagents
- **vue-expert**: MANDATORY for creating or significantly modifying `.vue` files
- **code-reviewer**: Use after writing significant code
- **Explore**: For understanding codebase structure

### Skills
- **backend-api-test**: Use when writing or modifying tests in `tests/backend/`

### MCP Tools
- **Always use GitHub MCP tools** (`mcp__github__*`) for GitHub operations (exception: local branches use `git checkout -b`)
- **Always use Playwright MCP tools** (`mcp__playwright__*`) for browser testing against `http://localhost:3000` (frontend) and `http://localhost:8001` (API)

## Design System
- Colors: Slate/gray palette (#0f172a, #64748b, #e2e8f0), status colors: green/blue/yellow/red
- Charts: Custom SVG, CSS Grid layouts
- No emojis in UI
