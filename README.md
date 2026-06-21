# 🌍 EcoTrack — Carbon Footprint Platform

![EcoTrack Cover Image](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80)

> A premium, AI-powered carbon footprint tracking platform built to help you understand, monitor, and reduce your daily environmental impact through actionable, data-driven insights.

## ✨ Features

### 🤖 EcoBot Smart Assistant
A fully conversational, contextual AI chat built right into the platform. 
- **Intent Recognition:** Understands queries about status, tips, trends, and comparisons.
- **Contextual Data:** Analyzes your *actual* local data to provide specific, quantified advice rather than generic tips.

### 🧠 Advanced Decision Engine
The core intelligence analyzing your behavior:
- **Pattern Detection:** Identifies weekday vs. weekend emission patterns.
- **Top Emitters:** Automatically surfaces and ranks your highest-impact activities.
- **Actionable Insights:** Calculates specific CO₂ savings for personalized lifestyle swaps (e.g., swapping short car trips for cycling).

### 🎯 Smart Goal Tracking
- Set a monthly carbon budget (e.g., 200 kg CO₂).
- Dynamic progress bar providing visual alerts as you near your limit.
- Real-time **Projected Month-End Total** calculations.

### 📊 Comprehensive Dashboard
- **Live Metrics:** Total CO₂ this month, daily average, and trees needed to offset.
- **Interactive Visualizations:** Doughnut breakdown charts and gradient-filled line charts powered by Chart.js.

### 🎮 Gamification & Achievements
Stay motivated with an integrated achievement system:
- **16 Unlockable Badges** (e.g., "Car-Free Day", "Plant Pioneer").
- **XP & Leveling System** with 8 ranks from Seedling to Climate Hero.
- **Daily Streak Tracking** to encourage consistent logging.

---

## 🛠️ Technology Stack

EcoTrack is built entirely with vanilla web technologies, demonstrating clean architecture without the overhead of modern JavaScript frameworks.

- **HTML5:** Semantic, accessible structure.
- **CSS3:** Custom BEM-inspired styling, glassmorphism UI, CSS variables, and native micro-animations.
- **JavaScript (ES6+):** Strict IIFE module pattern with 8 distinct, separated modules.
- **Data Persistence:** Browser `localStorage` (No backend required).
- **Libraries:** Chart.js (via CDN) for data visualization.

### Architecture
The application logic (`app.js`) is decoupled into the following modules:
1. `ActivityDatabase`: Scientific emission factors.
2. `StateManager`: Persistence and hydration.
3. `EmissionCalculator`: Pure aggregation logic.
4. `DecisionEngine`: Pattern analysis and anomaly detection.
5. `EcoBot`: Intent-driven conversational AI.
6. `InsightsGenerator`: UI-ready insights.
7. `GoalTracker`: Target projections.
8. `AchievementSystem`: Badges and levels.
9. `ChartManager`: Chart.js wrapper.
10. `UIController`: DOM manipulation and orchestration.

---

## 🚀 Getting Started

Running EcoTrack is incredibly simple as it requires no build steps, node modules, or database setup.

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/carbon-footprint-platform.git
   cd carbon-footprint-platform
   ```

2. **Serve locally**
   You can use any local web server. For example, using Python 3:
   ```bash
   python -m http.server 8080
   ```
   Or using Node.js `npx`:
   ```bash
   npx serve .
   ```

3. **Open the App**
   Navigate to `http://localhost:8080` in your web browser.

> **Note:** Upon first load, EcoTrack will automatically generate 30 days of realistic sample data so you can immediately see the dashboard, charts, and smart insights in action.

---

## 📝 Usage

- **Logging:** Use the "Log Activity" page to record daily actions across Transport, Food, Energy, Shopping, and Other.
- **Insights:** Check the "Insights" page for personalized recommendations based on your habits.
- **Chat:** Click the floating "AI" button in the bottom right to talk to EcoBot.
- **Reset Data:** To clear sample data and start fresh, open your browser console (F12) and run:
  ```js
  localStorage.removeItem('ecotrack_state');
  location.reload();
  ```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
