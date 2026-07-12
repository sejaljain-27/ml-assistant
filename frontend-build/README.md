# ML assistant — Frontend

A React + Vite + Tailwind CSS dashboard for **ML Assiant**, an assistant that analyzes a
CSV dataset and gives you data-quality, preprocessing, feature-importance, and model
recommendations before you train anything.

This repo is **frontend only**. The backend (FastAPI) isn't wired up yet, so every screen
is powered by mock JSON data that's shaped exactly like the responses the real API will
eventually return. Swapping mock data for live data later is a one-line change per
endpoint — see [Connecting the real backend](#connecting-the-real-backend) below.

## Stack

- **React 18** + **Vite** — app shell & dev server
- **Tailwind CSS** — styling, dark theme
- **React Router v6** — client-side routing
- **Recharts** — donut/bar charts
- **lucide-react** — icons
- **axios** — HTTP client (ready for the real API)

## Getting started

```bash
npm install
npm run dev       # starts the dev server on http://localhost:5173
npm run build      # production build into /dist
npm run preview    # preview the production build locally
```

## Project structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Topbar, DashboardLayout (page shell)
│   ├── ui/               # Reusable primitives: Card, StatCard, Badge, DataTable, etc.
│   └── charts/           # Recharts wrappers (donut, horizontal bar)
├── context/
│   └── DatasetContext.jsx  # Tracks whether a dataset has been uploaded/analyzed
├── pages/                # One file per route (Dashboard, Upload, DataOverview, ...)
├── services/
│   ├── apiClient.js       # axios instance + USE_MOCK_DATA flag
│   ├── datasetService.js  # single service layer every page calls into
│   └── mockData/          # JSON-shaped mock responses, one file per endpoint
├── App.jsx                # route definitions
├── main.jsx                # app entry point
└── index.css                # Tailwind base + a few shared component classes
```

## Pages

| Route                      | Description                                            |
|-----------------------------|----------------------------------------------------------|
| `/`                          | Dashboard overview — health score, row/column counts, preview table |
| `/upload`                    | Drag-and-drop CSV upload + target column picker           |
| `/data-overview`             | Missing values breakdown (donut + per-column bar chart)   |
| `/preprocessing`             | Recommended cleaning/transform steps, detected outliers   |
| `/feature-analysis`          | Top features + mutual information chart                   |
| `/model-recommendations`     | Suggested models with fit scores and reasoning            |
| `/model-comparison`          | Benchmark table across trained models                     |
| `/reports`                   | Downloadable report cards + live preview                  |
| `/history`                   | Previous analysis runs                                     |

## Connecting the real backend

Every page calls into `src/services/datasetService.js` — nothing else in the app talks
to mock data or the network directly. To go live:

1. Set `VITE_API_BASE_URL` in a `.env` file (see `.env.example`) to point at your FastAPI
   server, e.g. `VITE_API_BASE_URL=http://localhost:8000/api`.
2. Flip `USE_MOCK_DATA` to `false` in `src/services/apiClient.js`.
3. Make sure your FastAPI endpoints match the routes already called in
   `datasetService.js` (`/dataset/overview`, `/dataset/missing-values`,
   `/features/importance`, `/preprocessing/recommendations`,
   `/models/recommendations`, `/models/comparison`, `/reports`, `/history`,
   `/dataset/upload`).
4. Match your response payload to the shape already defined in
   `src/services/mockData/*.js` — those files double as the API contract.

No component or page needs to change for this swap; they only ever import from
`datasetService`.

## Design notes

The UI follows a dark, purple/blue-gradient dashboard aesthetic: a fixed sidebar for
navigation, a topbar with the page title, and content built from a small set of reusable
primitives (`Card`, `StatCard`, `Badge`, `DataTable`, `RecommendationBox`,
`ProgressRing`) so new pages stay visually consistent without copy-pasting markup.

## Known limitations (by design, frontend-only build)

- All data is mocked with a simulated network delay (`setTimeout` in `datasetService.js`)
  so loading states are visible.
- File upload doesn't actually parse the CSV — it just captures the file object and
  target column, then routes to the dashboard.
- "Download Report" buttons generate a small placeholder text file client-side, since
  there's no backend yet to generate a real PDF/CSV.
