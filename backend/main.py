from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import models
import database

app = FastAPI(title="Lazzy Notes API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Lazzy Notes API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/register")
def register(user: models.UserCreate):
    existing = database.users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user.dict()
    # In a real app, hash the password before saving
    database.users_collection.insert_one(user_dict)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: models.UserLogin):
    existing = database.users_collection.find_one({"email": user.email, "password": user.password})
    if not existing:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Return a fake token for now
    return {"access_token": "fake-jwt-token-123", "token_type": "bearer"}
