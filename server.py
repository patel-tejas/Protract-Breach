from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from deepface import DeepFace
import cv2
import requests
from io import BytesIO
from PIL import Image
from scipy.spatial.distance import cosine
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegistration(BaseModel):
    username: str
    password: str
    image_url: str

class FaceVerification(BaseModel):
    username: str
    password: str
    image_url: str

def enforce_uint8(img):
    """Ensure image is in 8-bit unsigned integer format"""
    if img.dtype != np.uint8:
        if img.max() <= 1.0:  # Handle normalized float images
            img = (img * 255).astype(np.uint8)
        else:
            img = img.astype(np.uint8)
    return img

def safe_cvt_color(img, conversion):  # Corrected function name
    """Safe color conversion wrapper"""
    img = enforce_uint8(img)
    return cv2.cvtColor(img, conversion)

def process_image_url(url):
    """Process image from URL with enhanced type handling"""
    response = requests.get(url)
    response.raise_for_status()
    
    img = Image.open(BytesIO(response.content)).convert("RGB")
    img_array = np.array(img)
    
    # Convert PIL array to OpenCV format with proper type
    img_array = safe_cvt_color(img_array, cv2.COLOR_RGB2BGR)  # Use corrected name
    return enforce_uint8(img_array)

def extract_features_from_image(url_or_path):
    try:
        if url_or_path.startswith(("http://", "https://")):
            img = process_image_url(url_or_path)
        else:
            img = cv2.imread(url_or_path)
            if img is None:
                raise Exception(f"Failed to load image from {url_or_path}")
            img = enforce_uint8(img)

        # Convert to RGB for DeepFace processing
        rgb_img = safe_cvt_color(img, cv2.COLOR_BGR2RGB)  # Use corrected name
        
        embedding_obj = DeepFace.represent(
            img_path=rgb_img, 
            model_name='ArcFace', 
            enforce_detection=True
        )
        return np.array(embedding_obj[0]["embedding"])
    
    except Exception as e:
        raise Exception(f"Image processing failed: {str(e)}")

def create_user(username, password, img_path):
    try:
        if img_path.startswith(("http://", "https://")):
            img = process_image_url(img_path)
        else:
            img = cv2.imread(img_path)
            if img is None:
                raise Exception("Image not found")
            img = enforce_uint8(img)

        # Convert to RGB for face extraction
        rgb_img = safe_cvt_color(img, cv2.COLOR_BGR2RGB)  # Use corrected name

        # Extract faces with type safety
        faces = DeepFace.extract_faces(img_path=rgb_img, enforce_detection=True)
        if not faces:
            raise Exception("No face detected")

        face = enforce_uint8(faces[0]['face'])
        
        # Resize and convert to grayscale
        resized_face = cv2.resize(face, (100, 100))
        gray_face = safe_cvt_color(resized_face, cv2.COLOR_RGB2GRAY)  # Use corrected name
        final_face = safe_cvt_color(gray_face, cv2.COLOR_GRAY2RGB)  # Use corrected name

        # Generate embedding
        embedding_obj = DeepFace.represent(
            img_path=final_face, 
            model_name='ArcFace', 
            enforce_detection=False
        )
        embedding = np.array(embedding_obj[0]["embedding"])

        # Save user data
        user_data = []
        if os.path.exists("user_data.npy"):
            user_data = np.load("user_data.npy", allow_pickle=True).tolist()
            
        user_data.append({
            "username": username,
            "password": password,
            "embedding": embedding
        })
        
        np.save("user_data.npy", user_data)
        return True
    
    except Exception as e:
        raise Exception(f"Registration failed: {str(e)}")

@app.post("/register")
async def register_user(user: UserRegistration):
    try:
        success = create_user(user.username, user.password, user.image_url)
        return {"message": "User registered successfully" if success else "Registration failed"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/verify")
async def verify_face(verification: FaceVerification):
    try:
        # Verify input parameters
        if not verification.username or not verification.password:
            raise HTTPException(status_code=400, detail="Missing credentials")
            
        # Extract features from input image
        current_embedding = extract_features_from_image(verification.image_url)
        current_embedding_array = np.array(current_embedding)
        
        # Load user data
        try:
            user_data = np.load("user_data.npy", allow_pickle=True).tolist()
        except FileNotFoundError:
            return {"verified": False, "error": "No registered users"}

        # Find matching user
        matched_user = next(
            (user for user in user_data 
             if user["username"] == verification.username 
             and user["password"] == verification.password),
            None
        )

        if not matched_user:
            return {"verified": False, "error": "Invalid credentials"}

        # Convert stored embedding
        saved_embedding = np.array(matched_user["embedding"])
        
        # Calculate similarity
        similarity = 1 - cosine(saved_embedding, current_embedding_array)
        threshold = 0.7  # Adjust this value as needed
        
        return {
            "verified": bool(similarity > threshold),
            "similarity_score": float(similarity),
            "threshold": float(threshold)
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)