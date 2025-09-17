from datetime import datetime, timedelta
import os
from typing import Optional
import shutil
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
load_dotenv(str(env_path))

from fastapi import FastAPI, Depends, HTTPException, status, Response, UploadFile, File, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from medical_analysis import router as medical_router
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String, DateTime, select, Text
from sqlalchemy.orm import declarative_base, Session, sessionmaker

# Config
SECRET_KEY = "supersecret_dev_key_change_me"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

DATABASE_URL = "sqlite:///./auth.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    # Profile fields
    avatar_url = Column(String, nullable=True)
    title = Column(String, nullable=True)
    company = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    timezone = Column(String, nullable=True)
    last_updated = Column(DateTime, nullable=True)


Base.metadata.create_all(bind=engine)


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    company: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    timezone: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_token(request: Request) -> str:
    auth = request.headers.get("Authorization")
    if not auth:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing"
        )
    
    scheme, _, token = auth.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme"
        )
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing"
        )
        
    return token


async def get_current_user(
    token: str = Depends(get_token),
    db: Session = Depends(get_db)
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate token"
        )

    user = db.scalar(select(User).where(User.id == int(user_id)))
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


app = FastAPI(title="Auth API")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # Add any other origins you need
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "accept", "Origin", 
                  "X-Requested-With", "Access-Control-Request-Method",
                  "Access-Control-Request-Headers"],
    expose_headers=["*"],
    max_age=600,
)

# Add OPTIONS endpoints for CORS preflight requests
@app.options("/auth/login")
async def auth_login_options():
    return {}

@app.options("/auth/signup")
async def auth_signup_options():
    return {}

@app.post("/auth/signup")
async def signup(payload: SignupRequest, db: Session = Depends(get_db), response: Response = None):
    try:
        # Check existing user
        if db.scalar(select(User).where(User.email == payload.email)):
            return JSONResponse(
                status_code=400,
                content={"detail": "User already exists"},
            )

        user = User(
            name=payload.name,
            email=payload.email,
            password_hash=get_password_hash(payload.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        token = create_access_token({"sub": str(user.id), "email": user.email})
        
        response = JSONResponse(
            content={
                "access_token": token,
                "token_type": "bearer",
                "user": {
                    "id": str(user.id),
                    "name": user.name,
                    "email": user.email,
                }
            },
        )
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        return response
        
    except Exception as e:
        print(f"Signup error: {str(e)}")  # Log the error
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error occurred during signup"},
        )


@app.post("/auth/login")
async def login(payload: LoginRequest, db: Session = Depends(get_db), response: Response = None):
    try:
        user = db.scalar(select(User).where(User.email == payload.email))
        if not user:
            return JSONResponse(
                status_code=404,
                content={"detail": "User not found"},
            )

        if not verify_password(payload.password, user.password_hash):
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid password"},
            )

        token = create_access_token({"sub": str(user.id), "email": user.email})
        
        response = JSONResponse(
            content={
                "access_token": token,
                "token_type": "bearer",
                "user": {
                    "id": str(user.id),
                    "name": user.name,
                    "email": user.email,
                    "title": user.title,
                    "company": user.company,
                    "bio": user.bio,
                    "avatarUrl": user.avatar_url,
                    "phone": user.phone,
                    "location": user.location,
                    "timezone": user.timezone,
                    "lastUpdated": user.last_updated.isoformat() if user.last_updated else None
                }
            },
        )
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        return response

    except Exception as e:
        print(f"Login error: {str(e)}")  # Log the error
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error occurred during login"},
        )


# Static files removed as we don't need them for the auth API


@app.get("/user/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "title": current_user.title,
        "company": current_user.company,
        "bio": current_user.bio,
        "avatarUrl": current_user.avatar_url,
        "phone": current_user.phone,
        "location": current_user.location,
        "timezone": current_user.timezone,
        "lastUpdated": current_user.last_updated.isoformat() if current_user.last_updated else None
    }


@app.put("/user/profile")
async def update_profile(
    updates: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Update user fields
        for field, value in updates.dict(exclude_unset=True).items():
            setattr(current_user, field, value)
        
        current_user.last_updated = datetime.utcnow()
        db.commit()
        db.refresh(current_user)

        return {
            "id": str(current_user.id),
            "name": current_user.name,
            "email": current_user.email,
            "title": current_user.title,
            "company": current_user.company,
            "bio": current_user.bio,
            "avatarUrl": current_user.avatar_url,
            "phone": current_user.phone,
            "location": current_user.location,
            "timezone": current_user.timezone,
            "lastUpdated": current_user.last_updated.isoformat()
        }
    except Exception as e:
        print(f"Profile update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update profile")


@app.post("/user/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Validate file type
        content_type = file.content_type
        if not content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Create uploads directory if it doesn't exist
        upload_dir = Path("static/uploads")
        upload_dir.mkdir(parents=True, exist_ok=True)

        # Generate unique filename
        file_ext = file.filename.split(".")[-1]
        filename = f"avatar_{current_user.id}_{datetime.utcnow().timestamp()}.{file_ext}"
        file_path = upload_dir / filename

        # Save file
        with file_path.open("wb") as f:
            shutil.copyfileobj(file.file, f)

        # Delete old avatar if it exists
        if current_user.avatar_url:
            old_avatar = Path(current_user.avatar_url.replace("/static/", "static/"))
            if old_avatar.exists():
                old_avatar.unlink()

        # Update user avatar URL
        avatar_url = f"/static/uploads/{filename}"
        current_user.avatar_url = avatar_url
        current_user.last_updated = datetime.utcnow()
        db.commit()

        return {"avatarUrl": avatar_url}

    except Exception as e:
        print(f"Avatar upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload avatar")


@app.post("/auth/logout")
async def logout(response: Response):
    # Since we're using JWT tokens, we don't need to do anything server-side
    # The client is responsible for removing the token
    response.delete_cookie("Authorization")
    return {"detail": "Successfully logged out"}


@app.get("/")
def root():
    return {"message": "API is running"}

# Include medical analysis routes
app.include_router(medical_router, prefix="/api/v1")