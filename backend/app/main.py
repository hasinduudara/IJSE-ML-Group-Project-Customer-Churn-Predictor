from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import CustomerData
from .ml_model import predict_churn

# Initialize the FastAPI application
app = FastAPI(title="Customer Churn Prediction API")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic route to test if API is running
@app.get("/")
def read_root():
    return {"message": "Welcome to the Customer Churn Prediction API!"}

# Prediction route to receive POST requests
@app.post("/predict")
def make_prediction(data: CustomerData):
    # Convert incoming JSON data to a dictionary
    input_data = data.model_dump()
    
    # Pass the data to the prediction function
    result = predict_churn(input_data)
    
    return result