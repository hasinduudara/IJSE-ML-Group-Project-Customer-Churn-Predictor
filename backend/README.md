<div align="center">

# ⚙️ Customer Churn Predictor — Backend

### FastAPI Service for ML-Powered Churn Prediction & SHAP Explainability

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Uvicorn](https://img.shields.io/badge/Uvicorn-2A2A2A?style=for-the-badge&logo=gunicorn&logoColor=white)](https://www.uvicorn.org/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![SHAP](https://img.shields.io/badge/SHAP-Explainable_AI-8A2BE2?style=for-the-badge)](https://github.com/shap/shap)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

<br/>

## 📖 Table of Contents

- [⚙️ Customer Churn Predictor — Backend](#️-customer-churn-predictor--backend)
    - [FastAPI Service for ML-Powered Churn Prediction \& SHAP Explainability](#fastapi-service-for-ml-powered-churn-prediction--shap-explainability)
  - [📖 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Features](#-features)
  - [🧰 Prerequisites](#-prerequisites)
  - [📦 Installation](#-installation)
  - [▶️ Running the API](#️-running-the-api)
  - [📡 API Reference](#-api-reference)
    - [`GET /`](#get-)
    - [`POST /predict`](#post-predict)
  - [📁 Project Structure](#-project-structure)
  - [🐳 Docker](#-docker)
  - [🔐 Environment Variables](#-environment-variables)
  - [🩺 Troubleshooting](#-troubleshooting)

<br/>

## 🎯 Overview

This directory contains the **FastAPI** service powering the Customer Churn Predictor. It loads the trained Random Forest model and scaler, serves real-time churn predictions, and generates **SHAP-based explanations** for every prediction — so the "why" is always as visible as the "what."

<br/>

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **FastAPI REST API** | Async, high-performance endpoints with auto-generated docs |
| 🌲 **Random Forest Inference** | Model loaded via `scikit-learn` + `joblib` |
| 🧠 **SHAP Explanations** | Human-readable reasons behind each prediction |
| 🔓 **CORS Enabled** | Configured for local frontend development out of the box |
| 🐳 **Container-Ready** | Ships with a dedicated `Dockerfile.backend` |

<br/>

## 🧰 Prerequisites

- **Python** ≥ 3.10
- Trained model artifacts present in `../ml/models/`:
  - `rf_model.pkl`
  - `scaler.pkl`

<br/>

## 📦 Installation

From the repository root, create a virtual environment and install dependencies.

**Windows (PowerShell):**

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

**macOS / Linux:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

<br/>

## ▶️ Running the API

Start the development server from the `backend` directory:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

| Resource | URL |
|---|---|
| API Base | http://127.0.0.1:8000 |
| Swagger Docs | http://127.0.0.1:8000/docs |
| ReDoc | http://127.0.0.1:8000/redoc |

<br/>

## 📡 API Reference

### `GET /`

Health-check endpoint — confirms the API is running.

**Response**
```json
{ "message": "Customer Churn Predictor API is running" }
```

---

### `POST /predict`

Predicts churn likelihood for a given customer and returns SHAP-based reasons.

**Request body**

```json
{
  "tenure": 12,
  "MonthlyCharges": 50.5,
  "TotalCharges": 600.0,
  "gender": 1,
  "SeniorCitizen": 0,
  "Partner": 1,
  "Dependents": 0,
  "PaperlessBilling": 1
}
```

| Field | Type | Notes |
|---|---|---|
| `tenure` | `number` | Months as a customer |
| `MonthlyCharges` | `number` | Current monthly charge |
| `TotalCharges` | `number` | Cumulative charges to date |
| `gender` | `0` \| `1` | Binary-encoded, per frontend mapping |
| `SeniorCitizen` | `0` \| `1` | Binary flag |
| `Partner` | `0` \| `1` | Binary flag |
| `Dependents` | `0` \| `1` | Binary flag |
| `PaperlessBilling` | `0` \| `1` | Binary flag |

All fields are validated by **Pydantic**; binary fields must be `0` or `1` as described in the frontend UI.

**Example request (cURL)**

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
        "tenure": 12,
        "MonthlyCharges": 50.5,
        "TotalCharges": 600.0,
        "gender": 1,
        "SeniorCitizen": 0,
        "Partner": 1,
        "Dependents": 0,
        "PaperlessBilling": 1
      }'
```

**Success response**

```json
{
  "status": "success",
  "prediction": true,
  "message": "Customer is likely to churn",
  "reasons": [
    "Short tenure increases churn risk",
    "High monthly charges relative to peers",
    "Paperless billing correlates with higher churn"
  ]
}
```

**Error response**

```json
{
  "status": "error",
  "message": "Invalid input: MonthlyCharges must be a positive number"
}
```

<br/>

## 📁 Project Structure

```text
backend/
├── app/
│   ├── main.py           # FastAPI app entrypoint & routes
│   ├── model.py          # Model/scaler loading + inference logic
│   ├── schemas.py        # Pydantic request/response models
│   └── explain.py        # SHAP explanation generation
├── .gitignore
├── README.md
└── requirements.txt
```

<br/>

## 🐳 Docker

Build and run the backend as a standalone container from the **repository root**:

```bash
docker build -f Dockerfile.backend -t customer-churn-backend .
docker run --rm -p 8000:8000 customer-churn-backend
```

The container listens on port `8000` by default and honors the `PORT` environment variable, making it deploy-ready for platforms like **Google Cloud Run**.

<br/>

## 🔐 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the server binds to (used by Cloud Run) | `8000` |
| `MODEL_PATH` | Path to the trained model file | `../ml/models/rf_model.pkl` |
| `SCALER_PATH` | Path to the fitted scaler file | `../ml/models/scaler.pkl` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:5173` |

<br/>

## 🩺 Troubleshooting

| Issue | Likely Cause | Fix |
|---|---|---|
| `FileNotFoundError: rf_model.pkl` | Model files missing from `../ml/models/` | Run the training notebook or copy the `.pkl` files into place |
| CORS errors in browser | Frontend origin not whitelisted | Update `ALLOWED_ORIGINS` in the backend config |
| `422 Unprocessable Entity` | Request body fails Pydantic validation | Check field types/ranges against the table above |
| Port already in use | Another process bound to `8000` | Run with `--port 8001` or stop the conflicting process |