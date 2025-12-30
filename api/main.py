from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="Fit India API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    diet_type: str  # vegetarian, vegan, non-veg
    gender: str  # male, female
    age: int
    height: float
    weight: float
    activity_level: str  # sedentary, moderate, active

def calculate_calories(age: int, height: float, weight: float, gender: str, activity_level: str) -> float:
    """Calculate daily calorie needs"""
    try:
        if gender.lower() == "male":
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        else:
            bmr = 10 * weight + 6.25 * height - 5 * age - 161

        activity_multiplier = {
            "sedentary": 1.2,
            "moderate": 1.55,
            "active": 1.9
        }
        
        if activity_level not in activity_multiplier:
            raise ValueError("Invalid activity level")

        calories = bmr * activity_multiplier[activity_level]
        return round(calories * 0.8, 2)  # 20% deficit for weight loss
    except Exception as e:
        raise ValueError(f"Error calculating calories: {str(e)}")

def get_macros(calories: float) -> Dict[str, float]:
    """Calculate macronutrient distribution"""
    protein = round((calories * 0.3) / 4)  # 30% protein, 4 calories per gram
    fats = round((calories * 0.25) / 9)    # 25% fats, 9 calories per gram
    carbs = round((calories * 0.45) / 4)   # 45% carbs, 4 calories per gram
    return {"protein": protein, "fats": fats, "carbs": carbs}

def get_meal_plan(diet_type: str, calories: float) -> Dict[str, List[Dict[str, str]]]:
    """Generate detailed meal plan based on diet type and calories"""
    meal_plans = {
        "vegetarian": {
            "breakfast": [
                {"meal": "Oatmeal with nuts and fruits", "portion": "1 cup oats + 1/4 cup mixed nuts + 1 cup berries", "calories": "350"},
                {"meal": "Greek yogurt parfait", "portion": "1 cup yogurt + 1/2 cup granola + 1 cup mixed berries", "calories": "300"},
                {"meal": "Whole grain toast with avocado", "portion": "2 slices toast + 1 medium avocado + cherry tomatoes", "calories": "380"}
            ],
            "lunch": [
                {"meal": "Lentil and spinach curry", "portion": "1 cup lentils + 2 cups spinach + 1/2 cup rice", "calories": "450"},
                {"meal": "Chickpea quinoa bowl", "portion": "1 cup chickpeas + 1/2 cup quinoa + mixed vegetables", "calories": "400"},
                {"meal": "Mediterranean pasta salad", "portion": "1.5 cups whole grain pasta + vegetables + olives", "calories": "480"}
            ],
            "dinner": [
                {"meal": "Stir-fried tofu with vegetables", "portion": "200g tofu + 2 cups mixed vegetables + 1/2 cup brown rice", "calories": "400"},
                {"meal": "Black bean tacos", "portion": "2 corn tortillas + 1 cup beans + vegetables", "calories": "380"},
                {"meal": "Mushroom risotto", "portion": "1.5 cups risotto + 1 cup mushrooms", "calories": "420"}
            ],
            "snacks": [
                {"meal": "Mixed nuts and dried fruits", "portion": "1/4 cup nuts + 2 tbsp dried fruits", "calories": "180"},
                {"meal": "Apple with peanut butter", "portion": "1 medium apple + 2 tbsp peanut butter", "calories": "200"},
                {"meal": "Hummus with carrots", "portion": "1/3 cup hummus + 1 cup carrot sticks", "calories": "160"}
            ]
        },
        "vegan": {
            "breakfast": [
                {"meal": "Chia pudding with fruits", "portion": "1/4 cup chia + 1 cup almond milk + fruits", "calories": "300"},
                {"meal": "Tofu scramble with vegetables", "portion": "200g tofu + vegetables + 1 slice toast", "calories": "340"},
                {"meal": "Overnight oats with berries", "portion": "1 cup oats + plant protein + berries", "calories": "380"}
            ],
            "lunch": [
                {"meal": "Quinoa Buddha bowl", "portion": "1 cup quinoa + roasted vegetables + tahini dressing", "calories": "440"},
                {"meal": "Tempeh stir-fry", "portion": "150g tempeh + vegetables + 1/2 cup rice", "calories": "420"},
                {"meal": "Lentil soup with bread", "portion": "1.5 cups soup + 2 slices whole grain bread", "calories": "380"}
            ],
            "dinner": [
                {"meal": "Chickpea curry", "portion": "1 cup chickpeas + curry sauce + 1/2 cup rice", "calories": "440"},
                {"meal": "Bean and sweet potato tacos", "portion": "2 corn tortillas + 1 cup beans + vegetables", "calories": "400"},
                {"meal": "Grilled vegetables with quinoa", "portion": "2 cups grilled vegetables + 1 cup quinoa", "calories": "380"}
            ],
            "snacks": [
                {"meal": "Trail mix", "portion": "1/4 cup mix (nuts and dried fruits)", "calories": "160"},
                {"meal": "Energy balls", "portion": "2 medium balls (dates and nuts)", "calories": "180"},
                {"meal": "Vegetables with hummus", "portion": "1/3 cup hummus + vegetables", "calories": "150"}
            ]
        },
        "non-veg": {
            "breakfast": [
                {"meal": "Scrambled eggs with toast", "portion": "3 eggs + 2 slices whole grain toast", "calories": "400"},
                {"meal": "Greek yogurt protein bowl", "portion": "1 cup yogurt + 1/2 cup granola + berries", "calories": "350"},
                {"meal": "Chicken sausage with potatoes", "portion": "2 sausages + 1 cup sweet potatoes", "calories": "450"}
            ],
            "lunch": [
                {"meal": "Grilled chicken salad", "portion": "150g chicken + 3 cups mixed greens + dressing", "calories": "400"},
                {"meal": "Tuna wrap", "portion": "1 can tuna + whole grain wrap + vegetables", "calories": "380"},
                {"meal": "Turkey quinoa bowl", "portion": "150g turkey + 1 cup quinoa + vegetables", "calories": "450"}
            ],
            "dinner": [
                {"meal": "Baked salmon", "portion": "180g salmon + 2 cups roasted vegetables", "calories": "440"},
                {"meal": "Lean beef stir-fry", "portion": "150g beef + vegetables + 1/2 cup rice", "calories": "480"},
                {"meal": "Grilled chicken breast", "portion": "180g chicken + 1 sweet potato + vegetables", "calories": "420"}
            ],
            "snacks": [
                {"meal": "Boiled eggs", "portion": "2 large eggs", "calories": "140"},
                {"meal": "Protein shake", "portion": "1 scoop protein + 1 cup milk", "calories": "160"},
                {"meal": "Greek yogurt with nuts", "portion": "1 cup yogurt + 1 tbsp nuts", "calories": "170"}
            ]
        }
    }
    
    # Return the meal plan for the specified diet type
    return meal_plans.get(diet_type, {})

def get_exercise_recommendations(activity_level: str) -> List[str]:
    """Provide exercise recommendations based on activity level"""
    recommendations = {
        "sedentary": [
            "Start with 15-20 minute walks daily",
            "Basic stretching exercises",
            "Light yoga for beginners",
            "Simple bodyweight exercises",
            "Swimming for beginners"
        ],
        "moderate": [
            "30-45 minute cardio sessions 3-4 times/week",
            "Strength training 2-3 times/week",
            "High-Intensity Interval Training (HIIT)",
            "Yoga or Pilates classes",
            "Cycling or jogging"
        ],
        "active": [
            "60-minute intense workouts 5-6 times/week",
            "Mixed cardio and strength training",
            "Sports activities (basketball, tennis, etc.)",
            "Advanced HIIT workouts",
            "Long-distance running or cycling"
        ]
    }
    return recommendations.get(activity_level, [])

def calculate_micronutrients(diet_type: str, calories: float) -> Dict[str, Dict[str, float]]:
    """Calculate recommended daily micronutrients based on diet type and calories"""
    base_micros = {
        "vitamins": {
            "A": 900,  # mcg
            "C": 90,   # mg
            "D": 15,   # mcg
            "E": 15,   # mg
            "K": 120,  # mcg
            "B12": 2.4 # mcg
        },
        "minerals": {
            "calcium": 1000,     # mg
            "iron": 18,          # mg
            "magnesium": 400,    # mg
            "zinc": 11,          # mg
            "potassium": 3500,   # mg
            "selenium": 55       # mcg
        }
    }
    
    # Adjust based on diet type
    if diet_type == "vegan":
        base_micros["vitamins"]["B12"] *= 1.5  # Higher B12 needs for vegans
        base_micros["minerals"]["iron"] *= 1.8  # Higher iron needs for plant-based diets
    
    # Adjust based on caloric intake
    calorie_factor = calories / 2000  # Standard 2000 calorie diet as baseline
    for category in base_micros:
        for nutrient in base_micros[category]:
            base_micros[category][nutrient] *= calorie_factor
    
    return base_micros

def get_food_sources(diet_type: str, micronutrient: str) -> List[str]:
    """Get food sources for specific micronutrients based on diet type"""
    sources = {
        "A": {
            "vegetarian": ["Sweet potatoes", "Carrots", "Spinach", "Eggs", "Milk"],
            "vegan": ["Sweet potatoes", "Carrots", "Spinach", "Pumpkin", "Kale"],
            "non-veg": ["Liver", "Fish", "Eggs", "Milk", "Sweet potatoes"]
        },
        "C": {
            "vegetarian": ["Oranges", "Strawberries", "Bell peppers", "Broccoli"],
            "vegan": ["Oranges", "Strawberries", "Bell peppers", "Broccoli"],
            "non-veg": ["Oranges", "Strawberries", "Bell peppers", "Broccoli"]
        },
        # Add more micronutrients and their sources
    }
    return sources.get(micronutrient, {}).get(diet_type, [])

@app.get("/")
async def root():
    """Root endpoint to verify API is working"""
    return {"status": "ok", "message": "Welcome to Fit India API"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

@app.post("/get_diet")
async def get_diet(user: UserInput):
    """Get comprehensive diet and fitness recommendations"""
    try:
        # Validate input
        if not all([user.diet_type, user.gender, user.age, user.height, user.weight, user.activity_level]):
            raise HTTPException(status_code=400, detail="All fields are required")

        # Calculate daily calories
        calorie_target = calculate_calories(user.age, user.height, user.weight, user.gender, user.activity_level)
        
        # Calculate macronutrients
        macros = get_macros(calorie_target)
        
        # Calculate micronutrients
        micros = calculate_micronutrients(user.diet_type, calorie_target)
        
        # Get meal plan
        meal_plan = get_meal_plan(user.diet_type, calorie_target)
        
        # Get exercise recommendations
        exercise_plan = get_exercise_recommendations(user.activity_level)

        return JSONResponse(content={
            "status": "success",
            "daily_plan": {
                "calories_needed": calorie_target,
                "macronutrients": macros,
                "micronutrients": micros,
                "meal_plan": meal_plan,
                "exercise_recommendations": exercise_plan,
                "water_intake": f"{round(user.weight * 0.033, 1)} liters per day"
            }
        })

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "detail": exc.detail}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 