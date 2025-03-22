from deepface import DeepFace
import numpy as np
import os
from scipy.spatial.distance import cosine
import cv2
import face_recognition

def extract_features_from_image(image_input):
    """
    Extract features (embedding) from a given image (path or frame).
    Only the detected face is used after resizing.
    """
    # Read the image if path is provided
    if isinstance(image_input, str):
        img = cv2.imread(image_input)
    else:
        img = image_input  # If already a frame (e.g. from webcam)

    # Convert to RGB
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Detect face locations
    face_locations = face_recognition.face_locations(rgb_img)

    if not face_locations:
        print("❌ No face detected.")
        return None

    # Use the first detected face
    top, right, bottom, left = face_locations[0]
    face_crop = rgb_img[top:bottom, left:right]

    # Resize to 112x112 (ArcFace requirement)
    face_resized = cv2.resize(face_crop, (112, 112))

    try:
        # Generate embedding
        embedding_obj = DeepFace.represent(img_path=face_resized, model_name="ArcFace", enforce_detection=False)
        embedding = np.array(embedding_obj[0]['embedding'])
        return embedding

    except Exception as e:
        print(f"❌ Error generating embedding: {e}")
        return None

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

def create_user(username, password, img_path, model_name='ArcFace', user_data_path="DATA_PATH"):
    try:
        # Step 1: Read image
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

def generate_embeddings(img_path):
  current_img_path = "/Users/ranawatprajinrajbhavesh/Desktop/fe88a689-0a69-479c-854b-510250737b41.jpg"
  
  current_embedding_obj = DeepFace.represent(img_path=current_img_path, model_name='ArcFace', enforce_detection=True)
  current_embedding = np.array(current_embedding_obj[0]["embedding"])
  return current_embedding
  
user_data = [
    {"username": "Vyas", "password": "1234", "embedding": generate_embeddings("/Users/ranawatprajinrajbhavesh/Desktop/c619597c-d17b-4c1d-9699-2f73c0dded13.jpg")},
    {"username": "Bhut", "password": "12345", "embedding": generate_embeddings("/Users/ranawatprajinrajbhavesh/Desktop/fe88a689-0a69-479c-854b-510250737b41.jpg")},
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
find_user("Bhut", "12345", extract_features_from_image("/Users/ranawatprajinrajbhavesh/Desktop/f5044828-cc46-415a-a22f-675a483b0140.jpg"))
