from pydantic import BaseModel

# Define the structure of the incoming data from the frontend
class CustomerData(BaseModel):
    tenure: int
    MonthlyCharges: float
    TotalCharges: float
    gender: int
    SeniorCitizen: int
    Partner: int
    Dependents: int
    PaperlessBilling: int