from flask import Flask, request, jsonify
from flask_cors import CORS
from src.predict import predict_risk

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Disease Risk API Running 🚀"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["features"]

    result = predict_risk(data)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)