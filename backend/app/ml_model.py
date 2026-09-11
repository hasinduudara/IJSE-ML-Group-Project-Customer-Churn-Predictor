import joblib
import pandas as pd
import shap
import numpy as np

# Import the reason dictionaries from our new mapping file
from .reasons_mapping import CHURN_REASONS, STAY_REASONS

# Load the saved ML model and scaler
try:
    rf_model = joblib.load('../ml/models/rf_model.pkl')
    scaler = joblib.load('../ml/models/scaler.pkl')
    
    # Extract the exact column names the model was trained on
    expected_features = rf_model.feature_names_in_
    
    # Initialize SHAP explainer
    explainer = shap.TreeExplainer(rf_model)
    
    print("Model, Scaler, and Explainer loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")


# Function to handle the real prediction logic
def predict_churn(data_dict):
    try:
        # Calculate TenureInYears based on tenure
        data_dict['TenureInYears'] = data_dict['tenure'] / 12.0
        
        # Create a DataFrame with the incoming data
        df = pd.DataFrame([data_dict])
        
        # Align the new data with the expected columns
        df = df.reindex(columns=expected_features, fill_value=0)
        
        # Scale the numerical columns
        num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'TenureInYears']
        df[num_cols] = scaler.transform(df[num_cols])
        
        # Make the prediction
        prediction = rf_model.predict(df)
        is_churn = bool(prediction[0] == 1)
        
        # Calculate SHAP values for explainability
        shap_values = explainer.shap_values(df)
        
        # Handle SHAP format (List or 3D Array)
        if isinstance(shap_values, list):
            shap_impact = shap_values[1][0]
        else:
            shap_impact = shap_values[0, :, 1]
            
        # Select the mapping dictionary and full ranked index order based on the prediction
        if is_churn:
            # All indices ranked by positive SHAP values (Pushing towards Churn), highest first
            ranked_indices = np.argsort(shap_impact)[::-1]
            mapping_dict = CHURN_REASONS
        else:
            # All indices ranked by negative SHAP values (Pushing towards Stay), lowest first
            ranked_indices = np.argsort(shap_impact)
            mapping_dict = STAY_REASONS

        # Get descriptive reasons for the top features, skipping ones that map to
        # a reason text we've already shown (e.g. "tenure" and "TenureInYears" are
        # collinear and would otherwise both surface the same displayed reason)
        top_reasons = []
        seen_reasons = set()
        for idx in ranked_indices:
            if len(top_reasons) >= 3:
                break
            raw_feature = expected_features[idx]
            # Use the specific reason, or default to the raw feature name if not mapped
            readable_name = mapping_dict.get(raw_feature, raw_feature)
            if readable_name in seen_reasons:
                continue
            seen_reasons.add(readable_name)
            top_reasons.append(readable_name)
            
        return {
            "status": "success",
            "prediction": is_churn,
            "message": "The customer is likely to churn (Leave)." if is_churn else "The customer is likely to stay.",
            "reasons": top_reasons
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }