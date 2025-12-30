class ChatbotUI {
    constructor() {
        this.form = document.getElementById('diet-form');
        this.chatContainer = document.getElementById('chat-container');
        this.initializeEventListeners();
        this.checkAPIHealth();
    }

    async checkAPIHealth() {
        try {
            const response = await fetch('http://127.0.0.1:8000/health');
            const data = await response.json();
            console.log('API Health Check:', data);
        } catch (error) {
            console.error('API Health Check Failed:', error);
            this.displayError('API server is not responding. Please ensure the server is running.');
        }
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission();
        });
    }

    async handleFormSubmission() {
        try {
            this.chatContainer.innerHTML = '<div class="text-center">Processing your request...</div>';

            const formData = {
                diet_type: document.getElementById('diet-type').value,
                gender: document.getElementById('gender').value,
                age: parseInt(document.getElementById('age').value),
                height: parseFloat(document.getElementById('height').value),
                weight: parseFloat(document.getElementById('weight').value),
                activity_level: document.getElementById('activity-level').value
            };

            // Validate input
            if (!this.validateInput(formData)) {
                throw new Error('Please fill in all fields with valid values');
            }

            console.log('Sending request:', formData);
            const response = await this.getDietPlan(formData);
            console.log('Received response:', response);

            if (response.status === 'error') {
                throw new Error(response.detail);
            }

            this.displayResponse(response);
        } catch (error) {
            console.error('Error:', error);
            this.displayError(error.message);
        }
    }

    validateInput(data) {
        return data.age > 0 && 
               data.height > 0 && 
               data.weight > 0 && 
               data.diet_type && 
               data.gender && 
               data.activity_level;
    }

    async getDietPlan(userData) {
        const response = await fetch('http://127.0.0.1:8000/get_diet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to get diet plan');
        }

        return data;
    }

    displayResponse(data) {
        const plan = data.daily_plan;
        const responseHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md space-y-6">
                <div class="border-b pb-4">
                    <h3 class="text-xl font-semibold text-green-600">Daily Calorie Target</h3>
                    <p class="text-lg">${Math.round(plan.calories_needed)} calories</p>
                </div>
                
                <div class="border-b pb-4">
                    <h3 class="text-xl font-semibold text-green-600">Macronutrients</h3>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Protein: ${plan.macronutrients.protein_grams}g</li>
                        <li>Fats: ${plan.macronutrients.fats_grams}g</li>
                        <li>Carbs: ${plan.macronutrients.carbs_grams}g</li>
                    </ul>
                </div>

                <div class="border-b pb-4">
                    <h3 class="text-xl font-semibold text-green-600">Meal Plan</h3>
                    ${Object.entries(plan.meal_plan).map(([meal, foods]) => `
                        <div class="mt-4">
                            <h4 class="text-lg font-medium capitalize mb-2">${meal}</h4>
                            <div class="bg-gray-50 rounded-lg p-4">
                                <table class="min-w-full">
                                    <thead>
                                        <tr class="border-b">
                                            <th class="text-left pb-2">Meal</th>
                                            <th class="text-left pb-2">Portion</th>
                                            <th class="text-left pb-2">Calories</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${foods.map(food => `
                                            <tr class="border-b last:border-0">
                                                <td class="py-2">${food.meal}</td>
                                                <td class="py-2 text-gray-600">${food.portion}</td>
                                                <td class="py-2 text-gray-600">${food.calories} kcal</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="border-b pb-4">
                    <h3 class="text-xl font-semibold text-green-600">Exercise Recommendations</h3>
                    <ul class="list-disc pl-5">
                        ${plan.exercise_recommendations.map(exercise => `<li>${exercise}</li>`).join('')}
                    </ul>
                </div>

                <div class="border-b pb-4">
                    <h3 class="text-xl font-semibold text-green-600">Health Tips</h3>
                    <ul class="list-disc pl-5">
                        ${plan.health_tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-semibold text-green-600">Water Intake</h3>
                    <p>Recommended daily water intake: ${plan.water_intake}</p>
                </div>
            </div>
        `;
        
        this.chatContainer.innerHTML = responseHTML;
    }

    displayError(message) {
        this.chatContainer.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline">${message}</span>
            </div>
        `;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatbotUI();
}); 