from deepface import DeepFace
import numpy as np
import os
from scipy.spatial.distance import cosine
import cv2
import face_recognition

import cv2
import numpy as np
import requests
from deepface import DeepFace

def extract_features_from_image(url_or_path):
    # Check if input is URL
    if url_or_path.startswith("http://") or url_or_path.startswith("https://"):
        response = requests.get(url_or_path)
        if response.status_code == 200:
            img_array = np.frombuffer(response.content, np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        else:
            raise Exception(f"Failed to download image from {url_or_path}")
    else:
        img = cv2.imread(url_or_path)

    if img is None:
        raise Exception(f"Failed to load image from {url_or_path}")

    # Convert BGR to RGB
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Get embedding
    embedding_obj = DeepFace.represent(img_path=rgb_img, model_name='ArcFace', enforce_detection=True)
    embedding = np.array(embedding_obj[0]["embedding"])

    return embedding

def find_user(username, password, current_embedding, data_path="user_data.npy", threshold=0.3):
    # Load saved user data
    try:
        user_data = np.load(data_path, allow_pickle=True)
    except FileNotFoundError:
        print("❌ User data file not found.")
        return False

    # Loop through users
    for user in user_data:
        if user["username"] == username and user["password"] == password:
            saved_embedding = user["embedding"]
            current_embedding = current_embedding
            
            # Compute cosine similarity
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


DATA_PATH = "user_data.npy"

import os
import cv2
import numpy as np
import requests
from deepface import DeepFace
from io import BytesIO
from PIL import Image

def create_user(username, password, img_path, model_name='ArcFace', user_data_path="user_data.npy"):
    try:
        # Step 1: Read image from URL or path
        if img_path.startswith("http://") or img_path.startswith("https://"):
            response = requests.get(img_path)
            img = Image.open(BytesIO(response.content)).convert("RGB")
            img = np.array(img)
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)  # Convert to BGR for consistency
        else:
            img = cv2.imread(img_path)
            if img is None:
                print("❌ Image not found at:", img_path)
                return

        # Step 2: Convert to RGB for DeepFace
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Step 3: Extract face
        faces = DeepFace.extract_faces(img_path=img_rgb, enforce_detection=True)
        if not faces:
            print("❌ No face detected.")
            return
        face = faces[0]['face']

        # Step 4: Resize and grayscale
        resized_face = cv2.resize(face, (100, 100))
        gray_face = cv2.cvtColor(resized_face, cv2.COLOR_RGB2GRAY)
        final_face = cv2.cvtColor(gray_face, cv2.COLOR_GRAY2RGB)  # DeepFace needs 3 channels

        # Step 5: Generate embedding
        embedding_obj = DeepFace.represent(img_path=final_face, model_name=model_name, enforce_detection=False)
        embedding = np.array(embedding_obj[0]["embedding"])

        # Step 6: Load existing data
        if os.path.exists(user_data_path):
            user_data = np.load(user_data_path, allow_pickle=True).tolist()
        else:
            user_data = []

        # Step 7: Append new user
        user_data.append({
            "username": username,
            "password": password,
            "embedding": embedding
        })

        # Step 8: Save updated data
        np.save(user_data_path, user_data)
        print("✅ User data saved as .npy")

    except Exception as e:
        print("⚠️ Error in create_user:", e)

import cv2
import numpy as np
import requests
from deepface import DeepFace

def generate_embeddings(img_path):
    # Check if img_path is a URL
    if img_path.startswith("http://") or img_path.startswith("https://"):
        response = requests.get(img_path)
        if response.status_code == 200:
            img_array = np.frombuffer(response.content, np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        else:
            raise Exception(f"Failed to download image from {img_path}")
    else:
        img = cv2.imread(img_path)

    if img is None:
        raise Exception(f"Failed to load image from {img_path}")

    # Convert BGR to RGB
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Get embedding
    current_embedding_obj = DeepFace.represent(img_path=rgb_img, model_name='ArcFace', enforce_detection=True)
    current_embedding = np.array(current_embedding_obj[0]["embedding"])

    return current_embedding

  
user_data = [
    {"username": "Vyas", "password": "1234", "embedding": generate_embeddings("/Users/ranawatprajinrajbhavesh/Desktop/c619597c-d17b-4c1d-9699-2f73c0dded13.jpg")},
    {"username": "Bhut", "password": "12345", "embedding": generate_embeddings("https://firebasestorage.googleapis.com/v0/b/blog-37a17.appspot.com/o/users%2F0xDummyAddress123-1742650787170-charles.jpg?alt=media&token=3d20387f-072e-4ecf-b1a2-cf05240e9bcb")},
    {"username": "Veer", "password": "123456", "embedding": generate_embeddings("/Users/ranawatprajinrajbhavesh/Desktop/66ed4c04-0d4d-43e2-91e9-9260eeca610e.jpg")},
    {"username": "Meet", "password": "1234567", "embedding": generate_embeddings("/Users/ranawatprajinrajbhavesh/Desktop/d928bae9-fcc3-4571-a590-5980c7ddd9c6.jpg")},
    {"username": "Prajin", "password": "12345678", "embedding": generate_embeddings("/Users/ranawatprajinrajbhavesh/Desktop/1e9ddc52-c444-4711-b9ba-4258eebe1596.jpg")}
]

# Save to a file
np.save("user_data.npy", user_data, allow_pickle=True)
print("✅ User data saved as .npy")

# Now, load another image and check for a match
current_img_path = "/Users/ranawatprajinrajbhavesh/Desktop/f5044828-cc46-415a-a22f-675a483b0140.jpg"
current_embedding_obj = DeepFace.represent(img_path=current_img_path, model_name='ArcFace', enforce_detection=True)
current_embedding = np.array(current_embedding_obj[0]["embedding"])

# Check user match
find_user("Bhut", "12345", extract_features_from_image("https://firebasestorage.googleapis.com/v0/b/blog-37a17.appspot.com/o/users%2F0xDummyAddress123-1742650787170-charles.jpg?alt=media&token=3d20387f-072e-4ecf-b1a2-cf05240e9bcb"))
