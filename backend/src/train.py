import os
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.mixture import GaussianMixture

# ================= PATH SETUP =================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, "../data/heart.csv")
MODEL_DIR = os.path.join(BASE_DIR, "../models")

# Create models directory if it doesn't exist
os.makedirs(MODEL_DIR, exist_ok=True)

# ================= LOAD DATA =================

df = pd.read_csv(DATA_PATH)

# ================= SPLIT =================

X = df.drop("target", axis=1)
y = df["target"]

# ================= SCALING =================

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ================= GMM MODEL =================

# 🔥 IMPORTANT: 2 clusters for binary risk
gmm = GaussianMixture(n_components=2, random_state=42)
gmm.fit(X_scaled)

# ================= ASSIGN CLUSTERS =================

df["cluster"] = gmm.predict(X_scaled)

# ================= MAP CLUSTERS TO RISK =================

cluster_map = {}

print("\n📊 Cluster Analysis:")

for c in sorted(df["cluster"].unique()):
    ratio = df[df["cluster"] == c]["target"].mean()

    if ratio < 0.5:
        cluster_map[c] = "Low"
    else:
        cluster_map[c] = "High"

    print(f"Cluster {c}: {cluster_map[c]} (Disease Ratio={ratio:.2f})")

# ================= SAVE MODELS =================

joblib.dump(gmm, os.path.join(MODEL_DIR, "gmm_model.pkl"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
joblib.dump(cluster_map, os.path.join(MODEL_DIR, "cluster_map.pkl"))

print("\n✅ Models saved successfully!")
print("🎉 Training complete!")