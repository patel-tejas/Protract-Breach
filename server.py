from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import cv2
import requests
from deepface import DeepFace
from scipy.spatial.distance import cosine
import os
from io import BytesIO
from PIL import Image

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
    """Ensure image array is in uint8 format"""
    if img.dtype != np.uint8:
        if img.max() <= 1.0:  # Handle normalized float images
            img = (img * 255).astype(np.uint8)
        else:
            img = img.astype(np.uint8)
    return img

def extract_features_from_image(url_or_path):
    if url_or_path.startswith(("http://", "https://")):
        response = requests.get(url_or_path)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content)).convert("RGB")
            img_array = np.array(img)
            img_array = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        else:
            raise Exception(f"Failed to download image from {url_or_path}")
    else:
        img_array = cv2.imread(url_or_path)

    if img_array is None:
        raise Exception(f"Failed to load image from {url_or_path}")

    # Ensure proper data type
    img_array = enforce_uint8(img_array)
    
    rgb_img = cv2.cvtColor(img_array, cv2.COLOR_BGR2RGB)
    embedding_obj = DeepFace.represent(img_path=rgb_img, model_name='ArcFace', enforce_detection=True)
    return np.array(embedding_obj[0]["embedding"])

def find_user(username, password, current_embedding, data_path="user_data.npy", threshold=0.3):
    try:
        user_data = np.load(data_path, allow_pickle=True)
    except FileNotFoundError:
        print("❌ User data file not found.")
        return False

    for user in user_data:
        if user["username"] == username and user["password"] == password:
            saved_embedding = user["embedding"]
            similarity = 1 - cosine(saved_embedding, current_embedding)
            print(f"✅ Cosine Similarity: {similarity:.4f}")
            
            if similarity > (1 - threshold):
                print("🎉 Face verified successfully!")
                return True
            else:
                print("⚠️ Face does not match!")
                return False

    print("❌ Username or password is incorrect.")
    return False

def create_user(username, password, img_path):
    try:
        if img_path.startswith(("http://", "https://")):
            response = requests.get(img_path)
            img = Image.open(BytesIO(response.content)).convert("RGB")
            img_array = np.array(img)
            img_array = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        else:
            img_array = cv2.imread(img_path)
            if img_array is None:
                print("❌ Image not found at:", img_path)
                return False

        # Ensure uint8 format
        img_array = enforce_uint8(img_array)

        # Convert to RGB for processing
        rgb_img = cv2.cvtColor(img_array, cv2.COLOR_BGR2RGB)
        
        # Extract faces with type safety
        faces = DeepFace.extract_faces(img_path=rgb_img, enforce_detection=True)
        if not faces:
            print("❌ No face detected.")
            return False

        # Process face image
        face = enforce_uint8(faces[0]['face'])
        resized_face = cv2.resize(face, (100, 100))
        
        # Convert to grayscale and back to RGB with proper typing
        gray_face = cv2.cvtColor(resized_face, cv2.COLOR_RGB2GRAY)
        gray_face = enforce_uint8(gray_face)  # Ensure uint8 before conversion
        final_face = cv2.cvtColor(gray_face, cv2.COLOR_GRAY2RGB)

        # Generate embedding
        embedding_obj = DeepFace.represent(img_path=final_face, model_name='ArcFace', enforce_detection=False)
        embedding = np.array(embedding_obj[0]["embedding"])

        # Update user data
        user_data = []
        if os.path.exists("user_data.npy"):
            user_data = np.load("user_data.npy", allow_pickle=True).tolist()
        
        print("📝 Saving user data...")
        print(f"Username: {username} Password: {password}")
        user_data.append({
            "username": username,
            "password": password,
            "embedding": embedding
        })

        np.save("user_data.npy", user_data)
        print("✅ User data saved as .npy")
        return True

    except Exception as e:
        print(f"⚠️ Error in create_user: {str(e)}")
        return False

@app.post("/register")
async def register_user(user: UserRegistration):
    try:
        success = create_user(user.username, user.password, user.image_url)
        return {"message": "User registered successfully" if success else "Registration failed"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/verify")
async def verify_face(verification: FaceVerification):
    print(f"🔍 Verifying {verification.username}... {verification.password}")
    try:
        current_embedding = extract_features_from_image(verification.image_url)
        result = find_user(
            verification.username,
            verification.password,
            current_embedding
        )
        return {"verified": result}
    except Exception as e:
        print(f"⚠️ Error in verify_face: {str(e)}")
        return {"verified": False}
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)