<div align="center">

# 🎨 Customer Churn Predictor — Frontend

### React + Vite Interface for Bilingual Churn Prediction & Explainability

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

</div>

<br/>

## 📖 Table of Contents

- [🎨 Customer Churn Predictor — Frontend](#-customer-churn-predictor--frontend)
    - [React + Vite Interface for Bilingual Churn Prediction \& Explainability](#react--vite-interface-for-bilingual-churn-prediction--explainability)
  - [📖 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Features](#-features)
  - [🛠️ Technology](#️-technology)
  - [🧰 Prerequisites](#-prerequisites)
  - [📦 Installation](#-installation)
  - [▶️ Development](#️-development)
  - [📝 Form Fields Reference](#-form-fields-reference)
  - [📁 Project Structure](#-project-structure)
  - [📜 Available Scripts](#-available-scripts)
  - [🔐 Environment Variables](#-environment-variables)
  - [🏗️ Building for Production](#️-building-for-production)
  - [🩺 Troubleshooting](#-troubleshooting)

<br/>

## 🎯 Overview

The `frontend` directory hosts the **React** user interface for the Customer Churn Predictor. It provides a clean, responsive form for submitting customer information to the **FastAPI** backend, then displays the resulting churn prediction along with the **SHAP-based explanation** behind it — in both **English 🇬🇧** and **Sinhala 🇱🇰**.

<br/>

## ✨ Features

| Feature | Description |
|---|---|
| 🌐 **Bilingual UI** | English and Sinhala labels and field descriptions throughout |
| 🔮 **Live Predictions** | Submits customer data to the backend `/predict` endpoint |
| 🧠 **Explainability Display** | Renders the model's reasoning returned by the backend |
| 📱 **Responsive Layout** | Single-page, no-scroll design that adapts to any screen size |

<br/>

## 🛠️ Technology

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **ESLint**

<br/>

## 🧰 Prerequisites

- **Node.js** ≥ 18
- The backend running locally at `http://127.0.0.1:8000` (see [backend README](../backend/README.md))

<br/>

## 📦 Installation

From the repository root:

```bash
cd frontend
npm install
```

<br/>

## ▶️ Development

Start the Vite development server:

```bash
npm run dev
```

Open the URL Vite prints — usually **http://localhost:5173**.

The frontend sends prediction requests to:

```text
POST http://127.0.0.1:8000/predict
```

<br/>

## 📝 Form Fields Reference

| Field | Type | Notes |
|---|---|---|
| Tenure | Number | Months as a customer |
| Monthly Charges | Number | Current monthly charge |
| Total Charges | Number | Cumulative charges to date |
| Gender | `1` / `0` | `1` = Male, `0` = Female |
| Senior Citizen | `1` / `0` | `1` = Yes, `0` = No |
| Partner | `1` / `0` | `1` = Yes, `0` = No |
| Dependents | `1` / `0` | `1` = Yes, `0` = No |
| Paperless Billing | `1` / `0` | `1` = Yes, `0` = No |

> Binary fields consistently use `1` for "yes/male" and `0` for "no/female," as labeled in the form itself.

<br/>

## 📁 Project Structure

```text
frontend/
├── public/
├── src/
│   ├── components/        # Form, result, and explanation UI components
│   ├── locales/           # English & Sinhala translation strings
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

<br/>

## 📜 Available Scripts

Run these from the `frontend` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the application for production into `dist/` |
| `npm run lint` | Check the source code with ESLint |
| `npm run preview` | Preview the production build locally |

<br/>

## 🔐 Environment Variables

Create a `.env` file in `frontend/` to point at a non-default backend URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

<br/>

## 🏗️ Building for Production

```bash
npm run build
npm run preview
```

The optimized static build is output to `dist/` and can be served by any static host or the provided `Dockerfile.frontend`.

<br/>

## 🩺 Troubleshooting

| Issue | Likely Cause | Fix |
|---|---|---|
| Requests fail / network error | Backend not running on `127.0.0.1:8000` | Start the backend first — see [backend README](../backend/README.md) |
| CORS error in browser console | Frontend origin not whitelisted on backend | Update `ALLOWED_ORIGINS` in the backend's `.env` |
| Blank page after `npm run dev` | Dependencies not installed or stale cache | Delete `node_modules` and re-run `npm install` |
| Sinhala text not rendering correctly | Missing font support in browser/OS | Ensure a Unicode Sinhala font is installed system-wide |