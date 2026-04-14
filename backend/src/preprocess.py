import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_pipeline(df):
    # Fill missing values
    df = df.fillna(df.mean())

    # Split
    X = df.drop("target", axis=1)
    y = df["target"]

    # Scale
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler, X.columns