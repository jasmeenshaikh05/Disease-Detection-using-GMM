import os
import joblib
import pandas as pd

# ================= LOAD =================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "../models")

gmm = joblib.load(os.path.join(MODEL_DIR, "gmm_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
cluster_map = joblib.load(os.path.join(MODEL_DIR, "cluster_map.pkl"))

columns = [
    "age","sex","cp","trestbps","chol",
    "fbs","restecg","thalach","exang",
    "oldpeak","slope","ca","thal"
]

# ================= RULE CHECK =================

def analyze_features(data):
    issues = []

    if data["age"] > 55:
        issues.append("higher age")

    if data["trestbps"] > 140:
        issues.append("high blood pressure")

    if data["chol"] > 240:
        issues.append("high cholesterol")

    if data["thalach"] < 100:
        issues.append("low heart rate")

    if data["oldpeak"] > 2:
        issues.append("abnormal ECG (oldpeak)")

    if data["exang"] == 1:
        issues.append("exercise induced angina")

    return issues

# ================= PREDICTION =================

def predict_risk(input_data):

    df = pd.DataFrame([input_data], columns=columns)
    X_scaled = scaler.transform(df)

    cluster = int(gmm.predict(X_scaled)[0])
    probs = gmm.predict_proba(X_scaled)[0]

    gmm_risk = cluster_map[cluster]

    # Analyze patient features
    issues = analyze_features(df.iloc[0])

    # Rule-based correction
    rule_risk = "High" if len(issues) >= 3 else "Low"

    # Final decision
    final_risk = rule_risk if gmm_risk != rule_risk else gmm_risk

    # Convert probabilities
    low_prob = 0
    high_prob = 0

    for i, p in enumerate(probs):
        if cluster_map[i] == "Low":
            low_prob += p
        else:
            high_prob += p

    # Force graph consistency
    if final_risk == "Low":
        low_prob = max(low_prob, 0.75)
        high_prob = 1 - low_prob
    else:
        high_prob = max(high_prob, 0.75)
        low_prob = 1 - high_prob

    # ================= EXPLANATION =================

    if final_risk == "Low":
        if len(issues) == 0:
            explanation = "All parameters are within healthy clinical ranges."
        else:
            explanation = "Minor variations observed: " + ", ".join(issues)
    else:
        explanation = "High risk due to: " + ", ".join(issues)

    return {
        "risk": final_risk,
        "low_prob": float(low_prob),
        "high_prob": float(high_prob),
        "explanation": explanation
    }