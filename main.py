from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import JSONResponse
import numpy as np
import os
import cv2
from deepface import DeepFace

app = FastAPI()

DATA_PATH = "user_data.npy"

def create_user_logic(username, password, img_array, model_name='ArcFace', user_data_path=DATA_PATH):
    try:
        # Convert to RGB for DeepFace
        img_rgb = cv2.cvtColor(img_array, cv2.COLOR_BGR2RGB)

        # Extract face
        faces = DeepFace.extract_faces(img_path=img_rgb, enforce_detection=True)
        if not faces:
            return {"status": "fail", "message": "No face detected"}
        face = faces[0]['face']

        # Resize and convert to 3 channels
        resized_face = cv2.resize(face, (100, 100))
        gray_face = cv2.cvtColor(resized_face, cv2.COLOR_RGB2GRAY)
        final_face = cv2.cvtColor(gray_face, cv2.COLOR_GRAY2RGB)

        # Generate embedding
        embedding_obj = DeepFace.represent(img_path=final_face, model_name=model_name, enforce_detection=False)
        embedding = np.array(embedding_obj[0]["embedding"])

        # Load existing data
        if os.path.exists(user_data_path):
            user_data = np.load(user_data_path, allow_pickle=True).tolist()
        else:
            user_data = []

        # Append new user
        user_data.append({
            "username": username,
            "password": password,
            "embedding": embedding
        })

        # Save updated data
        np.save(user_data_path, user_data)
        return {"status": "success", "message": "User created successfully"}

    except Exception as e:
        return {"status": "fail", "message": str(e)}

@app.post("/create_user")
async def create_user(
    username: str = Form(...),
    password: str = Form(...),
    image: UploadFile = File(...)
):
    try:
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        result = create_user_logic(username, password, img_np)
        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"status": "fail", "message": str(e)})
