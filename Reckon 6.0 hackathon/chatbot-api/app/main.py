from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models.diet import UserInput, DietPlan
from .services.diet_service import DietService

app = FastAPI(title="Fit India Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

diet_service = DietService()

@app.post("/api/diet-plan")
async def get_diet_plan(user_input: UserInput) -> DietPlan:
    try:
        return await diet_service.generate_diet_plan(user_input)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 