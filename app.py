from flask import Flask, render_template, request, jsonify
from chat import get_response
import os
import nltk
nltk.download('punkt')

app = Flask(__name__)

@app.get('/')
def index_get():
    return render_template('index.html')

@app.post("/predict")
def predict():
    text = request.json.get("message")
    
    # TODO: check if text is valid
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    port=int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0",port=port)