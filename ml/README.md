# Customer Churn Predictor: Machine Learning

The `ml` directory contains the dataset, training notebook, and serialized artifacts used by the customer churn prediction backend.

## Directory Structure

```text
ml/
|-- data/
|   `-- raw_data.csv
|-- models/
|   |-- rf_model.pkl
|   `-- scaler.pkl
`-- notebooks/
	`-- train_model.ipynb
```

## Dataset

The notebook uses the IBM Telco Customer Churn dataset. The raw CSV is stored at `ml/data/raw_data.csv` and contains customer demographic, account, service, and churn information. The target column is `Churn`.

## Training Workflow

The `notebooks/train_model.ipynb` notebook performs the following steps:

1. Explore the dataset, data types, missing values, duplicates, and the `TotalCharges` quality issue.
2. Convert `TotalCharges` to numeric values and replace missing values with `0`.
3. Remove the `customerID` column.
4. Create `TenureInYears` from the `tenure` value.
5. Encode binary categories as `0` and `1` and one-hot encode multi-class categories.
6. Standardize `tenure`, `MonthlyCharges`, `TotalCharges`, and `TenureInYears` with `StandardScaler`.
7. Split the data into 80% training and 20% testing sets using `random_state=42`.
8. Train a `RandomForestClassifier` with 100 estimators.
9. Evaluate the model with accuracy and a classification report.
10. Generate SHAP summary and feature-importance plots.

## Run the Notebook

Install the Python dependencies from the backend, then start Jupyter from the repository root:

```powershell
python -m pip install -r backend/requirements.txt
python -m pip install notebook ipykernel matplotlib seaborn
jupyter notebook ml/notebooks/train_model.ipynb
```

Run the notebook cells in order. The notebook uses relative paths such as `../data/raw_data.csv`, so open or execute it with `ml/notebooks` as the notebook directory. In VS Code, select a Python interpreter with the required packages installed before running the cells.

## Generated Artifacts

The final notebook cells save these files in `ml/models/`:

- `rf_model.pkl`: trained Random Forest model, including the feature names used during training.
- `scaler.pkl`: fitted `StandardScaler` for the numeric features.

The backend loads both files at startup. Keep the model feature order and preprocessing steps synchronized with the backend input schema when retraining the model.

## Backend Integration

The backend derives `TenureInYears` from `tenure`, aligns incoming data with the trained feature columns, applies the saved scaler, and uses the saved Random Forest model for prediction. SHAP is then used to select the leading reasons for a churn or stay prediction.

After retraining, verify that both artifact files exist and restart the backend so it loads the new versions.
