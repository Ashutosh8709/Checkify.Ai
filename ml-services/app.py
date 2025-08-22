from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from typing import Dict

app = FastAPI(title="Medical Diagnosis API", description="ML backend for diagnosis system", version="1.0")

# Allow frontend (React) + Node backend to talk to this service


#uvicorn app:app --reload.  for running in local system


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GitHub Release URLs for models
MODEL_URLS = {
    "brain_tumor": "https://github.com/Ashutosh8709/Health-Disease-Diagnosis-system/releases/download/v1.01/brain_tumor.h5",
    "retinopathy": "https://github.com/Ashutosh8709/Health-Disease-Diagnosis-system/releases/download/v1.01/retinopathy.h5",
    "osteoarthritis": "https://github.com/Ashutosh8709/Health-Disease-Diagnosis-system/releases/download/v1.01/osteoarthritis.h5",
    "chest_xray": "https://github.com/Ashutosh8709/Health-Disease-Diagnosis-system/releases/download/v1.01/chest_xray.h5"
}

# Local models directory
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

# Model details
MODEL_DETAILS: Dict[str, Dict] = {
    "brain_tumor": {"classes": ["Glioma", "Meningioma", "NO Tumor", "Pituitary"]},
    "retinopathy": {"classes": ["Diabitic Ratinopathy", "NO Diabitic Ratinopathy"]},
    "osteoarthritis": {"classes": ["Normal", "Osteopenia", "Osteoporosis"]},
    "chest_xray": {"classes": ["COVID-19", "Normal", "Pneumonia", "Tuberculosis"]}
}

# Cache for loaded models
loaded_models: Dict[str, any] = {}

def download_model(model_name: str):
    """Download model if not already available locally"""
    model_path = os.path.join(MODEL_DIR, f"{model_name}.h5")
    if not os.path.exists(model_path):
        url = MODEL_URLS.get(model_name)
        if not url:
            raise HTTPException(status_code=404, detail="Model URL not found")
        
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(model_path, "wb") as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
        else:
            raise HTTPException(status_code=500, detail="Failed to download model")
    return model_path

def get_model(model_name: str):
    """Load model into memory (cached)"""
    if model_name not in loaded_models:
        model_path = download_model(model_name)
        loaded_models[model_name] = load_model(model_path)
    return loaded_models[model_name]

@app.get("/models")
def list_models():
    """List available diagnostic models"""
    return {"models": list(MODEL_DETAILS.keys())}



@app.post("/predict/{model_name}")
async def predict(model_name: str, file: UploadFile = File(...)):
    """Run prediction on uploaded image"""
    if model_name not in MODEL_DETAILS:
        raise HTTPException(status_code=404, detail="Model not found")

    # Load model
    model = get_model(model_name)
    classes = MODEL_DETAILS[model_name]["classes"]

    # Read image
    contents = await file.read()
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(contents)

    # Preprocess
    img = image.load_img(temp_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Predict
    preds = model.predict(img_array)
    preds = np.array(preds)

    # --- Fix: handle binary vs multi-class ---
    if preds.shape[1] == len(classes):
        # Multi-class (softmax) case
        predicted_class = classes[int(np.argmax(preds))]
        confidence = float(np.max(preds) * 100)
        all_predictions = {classes[i]: float(preds[0][i]) for i in range(len(classes))}
    elif len(classes) == 2 and preds.shape[1] == 1:
        # Binary (sigmoid) case
        prob = float(preds[0][0])
        predicted_class = classes[1] if prob >= 0.5 else classes[0]
        confidence = prob * 100 if predicted_class == classes[1] else (1 - prob) * 100
        all_predictions = {
            classes[0]: 1 - prob,
            classes[1]: prob
        }
    else:
        raise HTTPException(status_code=500, detail="Model output shape does not match class labels")

    # Remove temp file
    os.remove(temp_path)

    return {
        "model": model_name,
        "prediction": predicted_class,
        "confidence": confidence,
        "all_predictions": all_predictions
    }
