class ChatbotUI {
    constructor() {
        this.form = document.getElementById('diet-form');
        this.chatContainer = document.getElementById('chat-container');
        this.apiUrl = 'http://127.0.0.1:8000'; // FastAPI server URL
        this.initializeEventListeners();
        this.checkAPIHealth();
    }

    async checkAPIHealth() {
        try {
            const response = await fetch(`${this.apiUrl}/health`);
            const data = await response.json();
            console.log('API Health Check:', data);
            if (data.status !== 'healthy') {
                this.displayError('API server is not responding properly.');
            }
        } catch (error) {
            console.error('API Health Check Failed:', error);
            this.displayError('Cannot connect to the diet planner service. Please try again later.');
        }
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission();
        });

        // Add input validation listeners
        ['age', 'height', 'weight'].forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('input', () => this.validateNumber(input));
        });
    }

    validateNumber(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);

        if (isNaN(value) || value < min || value > max) {
            input.classList.add('border-red-500');
            return false;
        }
        input.classList.remove('border-red-500');
        return true;
    }

    async handleFormSubmission() {
        try {
            // Show loading state
            this.chatContainer.innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    <span class="ml-2">Generating your personalized diet plan...</span>
                </div>
            `;

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
        const response = await fetch(`${this.apiUrl}/get_diet`, {
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
            <div class="results-container space-y-6">
                <h2 class="text-2xl font-bold mb-4">Your Personalized Diet Plan</h2>
                
                <!-- Calorie and Macronutrients Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold mb-3">Daily Targets</h3>
                    <div class="text-center mb-4">
                        <span class="text-3xl font-bold text-green-600">${Math.round(plan.calories_needed)}</span>
                        <span class="text-gray-600"> kcal/day</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-green-50 rounded-lg text-center">
                            <p class="font-medium text-green-800">Protein</p>
                            <p class="text-2xl font-bold text-green-600">${Math.round(plan.macronutrients.protein)}g</p>
                            <p class="text-sm text-gray-600">${Math.round((plan.macronutrients.protein * 4 / plan.calories_needed) * 100)}% of calories</p>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-lg text-center">
                            <p class="font-medium text-blue-800">Carbs</p>
                            <p class="text-2xl font-bold text-blue-600">${Math.round(plan.macronutrients.carbs)}g</p>
                            <p class="text-sm text-gray-600">${Math.round((plan.macronutrients.carbs * 4 / plan.calories_needed) * 100)}% of calories</p>
                        </div>
                        <div class="p-4 bg-yellow-50 rounded-lg text-center">
                            <p class="font-medium text-yellow-800">Fats</p>
                            <p class="text-2xl font-bold text-yellow-600">${Math.round(plan.macronutrients.fats)}g</p>
                            <p class="text-sm text-gray-600">${Math.round((plan.macronutrients.fats * 9 / plan.calories_needed) * 100)}% of calories</p>
                        </div>
                    </div>
                </div>

                <!-- Micronutrients Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold mb-4">Micronutrients & Minerals</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Vitamins -->
                        <div>
                            <h4 class="font-medium text-lg mb-3 text-green-600">Vitamins</h4>
                            <div class="space-y-3">
                                ${Object.entries(plan.micronutrients.vitamins).map(([vitamin, amount]) => `
                                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span class="font-medium">Vitamin ${vitamin}</span>
                                        <span>${Math.round(amount * 10) / 10} ${vitamin === 'A' || vitamin === 'D' || vitamin === 'K' ? 'mcg' : 'mg'}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <!-- Minerals -->
                        <div>
                            <h4 class="font-medium text-lg mb-3 text-blue-600">Minerals</h4>
                            <div class="space-y-3">
                                ${Object.entries(plan.micronutrients.minerals).map(([mineral, amount]) => `
                                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span class="font-medium">${mineral.charAt(0).toUpperCase() + mineral.slice(1)}</span>
                                        <span>${Math.round(amount * 10) / 10} ${mineral === 'selenium' ? 'mcg' : 'mg'}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Meal Plan Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold mb-4">Daily Meal Plan</h3>
                    ${Object.entries(plan.meal_plan).map(([mealTime, meals]) => `
                        <div class="mb-6 last:mb-0">
                            <h4 class="font-medium text-lg text-green-600 mb-3 capitalize">${mealTime}</h4>
                            <div class="bg-gray-50 rounded-lg p-4">
                                <div class="overflow-x-auto">
                                    <table class="min-w-full">
                                        <thead>
                                            <tr class="border-b">
                                                <th class="text-left pb-2 px-2">Meal</th>
                                                <th class="text-left pb-2 px-2">Portion</th>
                                                <th class="text-left pb-2 px-2">Calories</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${meals.map(meal => `
                                                <tr class="border-b last:border-0">
                                                    <td class="py-2 px-2">${meal.meal}</td>
                                                    <td class="py-2 px-2 text-gray-600">${meal.portion}</td>
                                                    <td class="py-2 px-2 text-gray-600">${meal.calories} kcal</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Exercise and Hydration Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Exercise Recommendations -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-3">Exercise Plan</h3>
                        <ul class="list-disc list-inside space-y-2">
                            ${plan.exercise_recommendations.map(ex => `
                                <li class="text-gray-700">${ex}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Hydration and Tips -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-3">Hydration & Tips</h3>
                        <div class="space-y-4">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <p class="font-medium text-blue-800">Daily Water Intake</p>
                                <p class="text-2xl font-bold text-blue-600 mt-1">${plan.water_intake}</p>
                            </div>
                            <div class="space-y-2">
                                <p class="font-medium text-gray-700">Tips:</p>
                                <ul class="list-disc list-inside text-gray-600">
                                    <li>Spread your meals throughout the day</li>
                                    <li>Stay hydrated between meals</li>
                                    <li>Eat slowly and mindfully</li>
                                    <li>Track your progress regularly</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.chatContainer.innerHTML = responseHTML;
        this.chatContainer.scrollIntoView({ behavior: 'smooth' });
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