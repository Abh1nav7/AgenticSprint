import os
import aiohttp
import json
from fastapi import APIRouter, UploadFile, HTTPException, File, Form
from typing import Dict, Any, List
from pathlib import Path
from dotenv import load_dotenv

router = APIRouter()

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
load_dotenv(str(env_path))

# Get API key and validate it
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise HTTPException(
        status_code=500,
        detail="OpenRouter API key not configured. Please add OPENROUTER_API_KEY to .env file"
    )
    
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async def analyze_medical_document(text: str) -> Dict[str, Any]:
    """
    Analyze medical document using OpenRouter AI API
    """
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    print(f"Using API key: {OPENROUTER_API_KEY[:10]}...")  # Debug log

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "OpenAI-Organization": "org-123",  # Required by OpenRouter
        "X-Title": "Agentic AI Medical Analysis"
    }

    # System prompt for medical analysis
    system_prompt = """You are an expert medical analysis AI. Analyze the provided medical document 
    and extract key findings, potential red flags, risk levels, and recommendations. Format your 
    response as a JSON object with the following structure:
    {
        "red_flags": [],
        "key_findings": [],
        "risk_stratification": [],
        "recommendations": [],
        "validation_notes": [],
        "confidence_metrics": {
            "diagnostic_confidence": number,
            "risk_levels": [],
            "abnormal_indicators": [],
            "measurement_accuracy": []
        }
    }"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": text}
    ]

    payload = {
        "model": "deepseek/deepseek-chat-v3.1:free",
        "messages": messages,
        "temperature": 0.7,
        "response_format": { "type": "json_object" }
    }

    try:
        print("Making request to OpenRouter API...")  # Debug log
        async with aiohttp.ClientSession() as session:
            print("Request payload:", json.dumps(payload, indent=2))  # Debug log
            async with session.post(OPENROUTER_URL, headers=headers, json=payload) as response:
                print(f"OpenRouter API Response Status: {response.status}")  # Debug log
                response_text = await response.text()
                print(f"OpenRouter API Response: {response_text}")  # Debug log
                
                if response.status != 200:
                    raise HTTPException(
                        status_code=response.status,
                        detail=f"OpenRouter API error: {response_text}"
                    )
                
                data = json.loads(response_text)
                if not data.get('choices') or not data['choices'][0].get('message'):
                    raise HTTPException(
                        status_code=500,
                        detail="Invalid response format from OpenRouter API"
                    )
                
                analysis = json.loads(data['choices'][0]['message']['content'])
                print("Parsed analysis:", json.dumps(analysis, indent=2))  # Debug log
                return analysis

    except Exception as e:
        print(f"Error during analysis: {str(e)}")  # Debug log
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@router.post("/medical/analyze")
async def analyze_medical_file(
    file: UploadFile = File(...),
    analysis_type: str = Form(default="general")
):
    """
    Endpoint to analyze medical documents
    """
    try:
        # Read file content
        content = await file.read()
        text = content.decode('utf-8')
        
        # Perform analysis
        result = await analyze_medical_document(text)
        
        return {
            "filename": file.filename,
            "analysis_type": analysis_type,
            "analysis_result": result
        }
        
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="File must be a text document"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@router.get("/medical/test-api")
async def test_openrouter_api():
    """Test endpoint to verify OpenRouter API connectivity"""
    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "OpenAI-Organization": "org-123",
            "X-Title": "Agentic AI Medical Analysis"
        }

        payload = {
            "model": "deepseek/deepseek-chat-v3.1:free",
            "messages": [{"role": "user", "content": "Hi, this is a test message."}],
            "temperature": 0.7
        }

        async with aiohttp.ClientSession() as session:
            print(f"Test request headers: {json.dumps(headers, indent=2)}")
            print(f"Test request payload: {json.dumps(payload, indent=2)}")
            
            async with session.post(OPENROUTER_URL, headers=headers, json=payload) as response:
                response_text = await response.text()
                print(f"Test response status: {response.status}")
                print(f"Test response body: {response_text}")
                
                return {
                    "status": response.status,
                    "response": response_text
                }
                
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"API test failed: {str(e)}"
        )