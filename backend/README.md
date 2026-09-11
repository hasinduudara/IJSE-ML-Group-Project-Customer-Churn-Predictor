# Customer Churn Predictor Backend

The `backend` directory contains the FastAPI service that loads the trained Random Forest model, predicts whether a customer is likely to churn, and returns SHAP-based explanation reasons.

## Features

- FastAPI REST API
- Random Forest model inference using scikit-learn and joblib
- SHAP-based prediction explanations
- CORS enabled for the local frontend

## Prerequisites

- Python 3.10 or later
- The trained model files in `../ml/models/`:
	- `rf_model.pkl`
	- `scaler.pkl`

## Installation

From the repository root, create and activate a virtual environment, then install the backend dependencies:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

On macOS or Linux, activate the environment with:

```bash
source .venv/bin/activate
```

## Run the API

Start the development server from the `backend` directory:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API is available at <http://127.0.0.1:8000>. Interactive API documentation is available at <http://127.0.0.1:8000/docs>.

## API Endpoints

### `GET /`

Returns a message confirming that the API is running.

### `POST /predict`

Accepts the following JSON body:

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

The numeric fields are validated by Pydantic. Binary fields use `1` or `0`, according to the descriptions shown in the frontend.

Example request:

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

A successful response contains `status`, a boolean `prediction`, a human-readable `message`, and a list of `reasons`. Prediction failures are returned with `status: "error"` and an explanatory message.

## Docker

From the repository root, build and run the backend image:

```bash
docker build -f Dockerfile.backend -t customer-churn-backend .
docker run --rm -p 8000:8000 customer-churn-backend
```

The container listens on port `8000` by default and accepts the `PORT` environment variable when deployed to a platform such as Cloud Run.
