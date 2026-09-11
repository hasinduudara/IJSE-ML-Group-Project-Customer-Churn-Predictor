# Customer Churn Predictor Frontend

The `frontend` directory contains the React user interface for the Customer Churn Predictor. It provides a responsive form for submitting customer information to the FastAPI backend and displays the resulting churn prediction and explanation.

## Features

- English and Sinhala labels and field descriptions
- Customer churn predictions through the backend `/predict` endpoint
- Model explanation details returned by the backend
- Responsive, single-page layout

## Technology

- React 19
- Vite
- Tailwind CSS 4
- ESLint

## Prerequisites

- Node.js 18 or later
- The project backend running locally on `http://127.0.0.1:8000`

## Installation

From the repository root, run:

```bash
cd frontend
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Open the URL shown by Vite, usually <http://localhost:5173>.

The frontend sends prediction requests to:

```text
POST http://127.0.0.1:8000/predict
```

Enter values for tenure, monthly charges, total charges, gender, senior citizen status, partner status, dependents, and paperless billing. Binary fields use `1` for yes/male and `0` for no/female, as described in the form.

## Available Scripts

Run these commands from the `frontend` directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the application for production in `dist/`. |
| `npm run lint` | Check the source code with ESLint. |
| `npm run preview` | Preview the production build locally. |