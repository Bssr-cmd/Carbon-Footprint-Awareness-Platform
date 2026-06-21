// ═══════════════════════════════════════════════════════════════
// EcoTrack — Carbon Footprint Awareness Platform
// Architecture: Modular IIFE with Clean Separation of Concerns
// ═══════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // MODULE 1: ActivityDatabase
    // Centralized registry of all trackable activities with
    // scientifically-sourced emission factors (EPA/DEFRA).
    // ═══════════════════════════════════════════════════════════

    /** 
     * @type {Object.<string, Array<{id:string, name:string, co2PerUnit:number, unit:string, icon:string, color:string}>>} 
     */
    const ActivityDatabase = {
        transport: [
            { id: 'car_petrol', name: 'Car (Petrol)', co2PerUnit: 0.21, unit: 'km', icon: '🚗', color: '#ef4444' },
            { id: 'car_diesel', name: 'Car (Diesel)', co2PerUnit: 0.17, unit: 'km', icon: '🚙', color: '#f97316' },
            { id: 'car_electric', name: 'Electric Car', co2PerUnit: 0.05, unit: 'km', icon: '⚡', color: '#10b981' },
            { id: 'bus', name: 'Bus', co2PerUnit: 0.089, unit: 'km', icon: '🚌', color: '#f59e0b' },
            { id: 'train', name: 'Train', co2PerUnit: 0.041, unit: 'km', icon: '🚆', color: '#3b82f6' },
            { id: 'flight_short', name: 'Short Flight', co2PerUnit: 0.255, unit: 'km', icon: '✈️', color: '#ef4444' },
            { id: 'flight_long', name: 'Long Flight', co2PerUnit: 0.195, unit: 'km', icon: '🛫', color: '#dc2626' },
            { id: 'bicycle', name: 'Bicycle', co2PerUnit: 0.0, unit: 'km', icon: '🚲', color: '#10b981' },
            { id: 'walking', name: 'Walking', co2PerUnit: 0.0, unit: 'km', icon: '🚶', color: '#10b981' },
            { id: 'motorcycle', name: 'Motorcycle', co2PerUnit: 0.103, unit: 'km', icon: '🏍️', color: '#f97316' },
            { id: 'subway', name: 'Subway/Metro', co2PerUnit: 0.033, unit: 'km', icon: '🚇', color: '#6366f1' },
            { id: 'taxi', name: 'Taxi/Rideshare', co2PerUnit: 0.23, unit: 'km', icon: '🚕', color: '#eab308' },
        ],
        food: [
            { id: 'beef', name: 'Beef Meal', co2PerUnit: 6.61, unit: 'serving', icon: '🥩', color: '#ef4444' },
            { id: 'lamb', name: 'Lamb Meal', co2PerUnit: 5.84, unit: 'serving', icon: '🍖', color: '#dc2626' },
            { id: 'pork', name: 'Pork Meal', co2PerUnit: 2.21, unit: 'serving', icon: '🥓', color: '#f97316' },
            { id: 'chicken', name: 'Chicken Meal', co2PerUnit: 1.82, unit: 'serving', icon: '🍗', color: '#f59e0b' },
            { id: 'fish', name: 'Fish Meal', co2PerUnit: 1.34, unit: 'serving', icon: '🐟', color: '#3b82f6' },
            { id: 'dairy', name: 'Dairy Products', co2PerUnit: 1.39, unit: 'serving', icon: '🧀', color: '#eab308' },
            { id: 'eggs', name: 'Eggs', co2PerUnit: 0.53, unit: 'serving', icon: '🥚', color: '#f59e0b' },
            { id: 'vegetarian', name: 'Vegetarian Meal', co2PerUnit: 0.51, unit: 'serving', icon: '🥗', color: '#10b981' },
            { id: 'vegan', name: 'Vegan Meal', co2PerUnit: 0.38, unit: 'serving', icon: '🌱', color: '#059669' },
            { id: 'coffee', name: 'Coffee', co2PerUnit: 0.21, unit: 'cup', icon: '☕', color: '#92400e' },
            { id: 'bottled_water', name: 'Bottled Water', co2PerUnit: 0.16, unit: 'bottle', icon: '💧', color: '#0ea5e9' },
            { id: 'restaurant', name: 'Restaurant Meal', co2PerUnit: 3.5, unit: 'meal', icon: '🍽️', color: '#f97316' },
        ],
        energy: [
            { id: 'electricity', name: 'Electricity', co2PerUnit: 0.42, unit: 'kWh', icon: '💡', color: '#eab308' },
            { id: 'natural_gas', name: 'Natural Gas', co2PerUnit: 2.0, unit: 'm³', icon: '🔥', color: '#f97316' },
            { id: 'heating_oil', name: 'Heating Oil', co2PerUnit: 2.52, unit: 'litre', icon: '🛢️', color: '#dc2626' },
            { id: 'ac_usage', name: 'AC Usage', co2PerUnit: 1.5, unit: 'hour', icon: '❄️', color: '#0ea5e9' },
            { id: 'heating', name: 'Space Heating', co2PerUnit: 1.2, unit: 'hour', icon: '🌡️', color: '#ef4444' },
            { id: 'laundry', name: 'Laundry Load', co2PerUnit: 0.6, unit: 'load', icon: '👕', color: '#6366f1' },
            { id: 'dishwasher', name: 'Dishwasher', co2PerUnit: 0.7, unit: 'load', icon: '🍽️', color: '#3b82f6' },
            { id: 'solar', name: 'Solar Energy', co2PerUnit: -0.42, unit: 'kWh', icon: '☀️', color: '#10b981' },
        ],
        shopping: [
            { id: 'clothing_new', name: 'New Clothing', co2PerUnit: 10.0, unit: 'item', icon: '👗', color: '#ec4899' },
            { id: 'clothing_thrift', name: 'Thrift Clothing', co2PerUnit: 0.5, unit: 'item', icon: '♻️', color: '#10b981' },
            { id: 'electronics', name: 'Electronics', co2PerUnit: 50.0, unit: 'item', icon: '📱', color: '#6366f1' },
            { id: 'furniture', name: 'Furniture', co2PerUnit: 75.0, unit: 'item', icon: '🪑', color: '#92400e' },
            { id: 'plastic_bag', name: 'Plastic Bags', co2PerUnit: 0.033, unit: 'bag', icon: '🛍️', color: '#ef4444' },
            { id: 'reusable_bag', name: 'Reusable Bag', co2PerUnit: 0.0, unit: 'use', icon: '👜', color: '#10b981' },
            { id: 'online_order', name: 'Online Order', co2PerUnit: 3.1, unit: 'package', icon: '📦', color: '#f59e0b' },
            { id: 'local_purchase', name: 'Local Purchase', co2PerUnit: 0.5, unit: 'item', icon: '🏪', color: '#10b981' },
        ],
        other: [
            { id: 'streaming', name: 'Video Streaming', co2PerUnit: 0.036, unit: 'hour', icon: '📺', color: '#8b5cf6' },
            { id: 'email', name: 'Emails Sent', co2PerUnit: 0.004, unit: 'email', icon: '📧', color: '#6366f1' },
            { id: 'cloud_storage', name: 'Cloud Storage', co2PerUnit: 0.01, unit: 'GB', icon: '☁️', color: '#3b82f6' },
            { id: 'pet_food', name: 'Pet Food', co2PerUnit: 0.8, unit: 'serving', icon: '🐾', color: '#f59e0b' },
            { id: 'garden', name: 'Gardening', co2PerUnit: -0.5, unit: 'hour', icon: '🌿', color: '#10b981' },
            { id: 'composting', name: 'Composting', co2PerUnit: -0.2, unit: 'kg', icon: '🌍', color: '#059669' },
            { id: 'tree_planting', name: 'Tree Planting', co2PerUnit: -22.0, unit: 'tree', icon: '🌳', color: '#10b981' },
            { id: 'waste', name: 'General Waste', co2PerUnit: 0.5, unit: 'kg', icon: '🗑️', color: '#9ca3af' },
        ]
    };

    /**
     * Look up an activity definition by its ID and category
     * @param {string} id - The activity ID
     * @param {string} category - The category key
     * @returns {Object|null} The activity definition
     */
    function findActivity(id, category) {
        return ActivityDatabase[category]?.find(a => a.id === id) || null;
    }


    // ═══════════════════════════════════════════════════════════
    // MODULE 2: StateManager
    // Handles localStorage persistence and manages application state.
    // ═══════════════════════════════════════════════════════════

    const StateManager = {
        _state: {
            activities: [],
            achievements: [],
            streak: 0,
            lastLogDate: null,
            xp: 0,
            viewedInsights: false,
            notifications: [],
            goal: { target: 200, period: 'month' }
        },

        /**
         * Load state from localStorage or seed sample data if empty
         */
        load() {
            try {
                const saved = localStorage.getItem('ecotrack_state');
                if (saved) {
                    this._state = { ...this._state, ...JSON.parse(saved) };
                }
            } catch (e) {
                console.warn('StateManager: load failed', e);
            }

            if (this._state.activities.length === 0) {
                this._seedSampleData();
            }
        },

        /**
         * Persist current state to localStorage
         */
        save() {
            try {
                localStorage.setItem('ecotrack_state', JSON.stringify(this._state));
            } catch (e) {
                console.warn('StateManager: save failed', e);
            }
        },

        /**
         * Get the current state (read-only reference)
         * @returns {Object} Application state
         */
        get() {
            return this._state;
        },

        /**
         * Merge partial updates into state and save
         * @param {Object} partial - Properties to update
         */
        update(partial) {
            Object.assign(this._state, partial);
            this.save();
        },

        /**
         * Generate 30 days of realistic sample data for initial load
         */
        _seedSampleData() {
            const now = new Date();
            const acts = [];
            for (let i = 30; i >= 0; i--) {
                const d = new Date(now); 
                d.setDate(d.getDate() - i);
                const ds = d.toISOString().split('T')[0];
                const isWeekend = d.getDay() === 0 || d.getDay() === 6;

                // Transport — more driving on weekdays
                if (!isWeekend && Math.random() > 0.2) {
                    acts.push(this._makeActivity('car_petrol', 'transport', 12 + Math.random() * 25, ds, 'Daily commute'));
                }
                if (Math.random() > 0.6) {
                    acts.push(this._makeActivity(isWeekend ? 'bicycle' : 'bus', 'transport', 3 + Math.random() * 12, ds, isWeekend ? 'Weekend ride' : 'Bus to work'));
                }
                
                // Food
                const r = Math.random();
                if (r < 0.25) acts.push(this._makeActivity('beef', 'food', 1, ds, 'Dinner'));
                else if (r < 0.45) acts.push(this._makeActivity('chicken', 'food', 1, ds, 'Lunch'));
                else if (r < 0.7) acts.push(this._makeActivity('vegetarian', 'food', 1 + Math.floor(Math.random() * 2), ds, 'Meals'));
                else acts.push(this._makeActivity('vegan', 'food', 1, ds, 'Lunch'));
                if (Math.random() > 0.35) acts.push(this._makeActivity('coffee', 'food', 1 + Math.floor(Math.random() * 3), ds, 'Morning coffee'));
                
                // Energy
                acts.push(this._makeActivity('electricity', 'energy', 5 + Math.random() * (isWeekend ? 18 : 12), ds, 'Home power usage'));
                if (Math.random() > 0.7) acts.push(this._makeActivity('laundry', 'energy', 1, ds, 'Laundry load'));
                
                // Shopping (occasional)
                if (Math.random() > 0.88) acts.push(this._makeActivity('online_order', 'shopping', 1, ds, 'Amazon delivery'));
                if (Math.random() > 0.95) acts.push(this._makeActivity('clothing_new', 'shopping', 1, ds, 'New shirt'));
                
                // Other
                if (Math.random() > 0.45) acts.push(this._makeActivity('streaming', 'other', 1 + Math.random() * 4, ds, 'Netflix'));
            }
            this._state.activities = acts;
            this._state.streak = 5;
            this._state.lastLogDate = new Date().toISOString().split('T')[0];
            this._state.xp = 85;
            this._state.achievements = ['first_log', 'ten_logs', 'all_categories'];
            this._state.notifications = [
                { id: 1, text: '🌿 Welcome to EcoTrack! Start tracking to get personalized insights.', time: 'Just now', read: false },
                { id: 2, text: '🏆 You earned "Getting Started" badge!', time: '2h ago', read: false },
            ];
            this.save();
        },

        /**
         * Helper: create an activity record based on definition
         */
        _makeActivity(actId, category, qty, date, notes) {
            const def = findActivity(actId, category);
            if (!def) return null;
            return {
                id: Date.now() + Math.random(),
                activityId: actId, 
                category,
                name: def.name, 
                icon: def.icon,
                co2: parseFloat((def.co2PerUnit * qty).toFixed(3)),
                co2PerUnit: def.co2PerUnit,
                quantity: parseFloat(qty.toFixed(1)),
                unit: def.unit, 
                date, 
                notes: notes || '',
                timestamp: new Date(date).getTime()
            };
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 3: EmissionCalculator
    // Pure calculation functions for aggregating and projecting carbon emissions.
    // ═══════════════════════════════════════════════════════════

    const EmissionCalculator = {
        /**
         * Filter activities to only include the current calendar month
         * @param {Array} acts 
         * @returns {Array} Filtered activities
         */
        getMonthActivities(acts) {
            const n = new Date();
            const start = new Date(n.getFullYear(), n.getMonth(), 1).toISOString().split('T')[0];
            return acts.filter(a => a.date >= start);
        },

        /**
         * Filter activities for the last 7 days
         * @param {Array} acts 
         * @returns {Array} Filtered activities
         */
        getWeekActivities(acts) {
            return this.getPeriodActivities(acts, 7);
        },

        /**
         * Filter activities for the last N days
         * @param {Array} acts 
         * @param {number} days 
         * @returns {Array} Filtered activities
         */
        getPeriodActivities(acts, days) {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - days);
            const start = cutoff.toISOString().split('T')[0];
            return acts.filter(a => a.date >= start);
        },

        /**
         * Sum total CO2 from an array of activities
         * @param {Array} acts 
         * @returns {number} Sum of CO2 in kg
         */
        getTotalCO2(acts) {
            return acts.reduce((s, a) => s + a.co2, 0);
        },

        /**
         * Get total CO2 broken down by category
         * @param {Array} acts 
         * @returns {Object} Category totals { category: totalCO2 }
         */
        getCategoryBreakdown(acts) {
            const b = {};
            acts.forEach(a => { b[a.category] = (b[a.category] || 0) + a.co2; });
            return b;
        },

        /**
         * Get daily CO2 totals for the last N days
         * @param {Array} acts 
         * @param {number} days 
         * @returns {Array<{date: string, label: string, total: number}>} Daily totals
         */
        getDailyTotals(acts, days) {
            const now = new Date();
            const result = [];
            for (let i = days - 1; i >= 0; i--) {
                const d = new Date(now); d.setDate(d.getDate() - i);
                const ds = d.toISOString().split('T')[0];
                const dayActs = acts.filter(a => a.date === ds);
                result.push({
                    date: ds,
                    label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    total: this.getTotalCO2(dayActs)
                });
            }
            return result;
        },

        /**
         * Calculate an eco score (0-100) based on projected monthly emissions relative to targets
         * @param {number} monthTotal - Total CO2 for the current month so far
         * @returns {number} Score from 0 to 100
         */
        calculateEcoScore(monthTotal) {
            const projected = this.getProjectedMonthly(monthTotal);
            if (projected <= 0) return 100;
            if (projected <= 167) return Math.min(100, Math.round(85 + (1 - projected / 167) * 15));
            if (projected <= 330) return Math.round(40 + (1 - (projected - 167) / (330 - 167)) * 45);
            return Math.max(5, Math.round(40 * (330 / projected)));
        },

        /**
         * Project what the month-end total will be based on the current run-rate
         * @param {number} monthTotal 
         * @param {number} [daysPassed] - Optional override for days passed
         * @returns {number} Projected CO2
         */
        getProjectedMonthly(monthTotal, daysPassed) {
            const now = new Date();
            const passed = daysPassed || now.getDate();
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            return passed > 0 ? (monthTotal / passed) * daysInMonth : 0;
        },

        /**
         * Calculate number of trees needed to offset the given CO2 (~22kg per tree per year)
         * @param {number} co2 - CO2 in kg
         * @returns {number} Number of trees
         */
        calculateTreesNeeded(co2) {
            return Math.ceil(co2 / 22);
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 4: DecisionEngine
    // Analyzes user data to detect patterns, trends, anomalies, and
    // produces actionable, personalized smart recommendations.
    // ═══════════════════════════════════════════════════════════

    const DecisionEngine = {
        /**
         * Run comprehensive pattern analysis on user's activity data
         * @param {Array} acts - All user activities
         * @returns {Object} Complete analysis report
         */
        analyzePatterns(acts) {
            const state = StateManager.get();
            const monthActs = EmissionCalculator.getMonthActivities(acts);
            const weekActs = EmissionCalculator.getWeekActivities(acts);
            
            // Calculate previous week's activities for trend comparison
            const prevWeekActs = acts.filter(a => {
                const d = a.date;
                const now = new Date();
                const pw = new Date(now); pw.setDate(pw.getDate() - 14);
                const we = new Date(now); we.setDate(we.getDate() - 7);
                return d >= pw.toISOString().split('T')[0] && d < we.toISOString().split('T')[0];
            });

            const monthTotal = EmissionCalculator.getTotalCO2(monthActs);
            const weekTotal = EmissionCalculator.getTotalCO2(weekActs);
            const prevWeekTotal = EmissionCalculator.getTotalCO2(prevWeekActs);
            const breakdown = EmissionCalculator.getCategoryBreakdown(monthActs);

            // Determine dominant category
            let dominantCat = { name: 'none', percentage: 0 };
            if (monthTotal > 0) {
                const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
                if (sorted.length > 0) {
                    dominantCat = { name: sorted[0][0], percentage: Math.round((sorted[0][1] / monthTotal) * 100), co2: sorted[0][1] };
                }
            }

            // Weekday vs Weekend Analysis
            const weekdayActs = acts.filter(a => { const d = new Date(a.date).getDay(); return d > 0 && d < 6; });
            const weekendActs = acts.filter(a => { const d = new Date(a.date).getDay(); return d === 0 || d === 6; });
            const uniqueWeekdays = new Set(weekdayActs.map(a => a.date)).size || 1;
            const uniqueWeekends = new Set(weekendActs.map(a => a.date)).size || 1;
            const weekdayAvg = EmissionCalculator.getTotalCO2(weekdayActs) / uniqueWeekdays;
            const weekendAvg = EmissionCalculator.getTotalCO2(weekendActs) / uniqueWeekends;

            let weekdayInsight = 'Emissions are fairly consistent throughout the week';
            if (weekendAvg > weekdayAvg * 1.3) weekdayInsight = 'Weekend emissions are significantly higher. Consider eco-friendly weekend activities.';
            else if (weekdayAvg > weekendAvg * 1.3) weekdayInsight = 'Weekday emissions are higher. This is likely commute-driven.';

            // Trend direction
            let trend = { direction: 'stable', percentage: 0, weekOverWeek: weekTotal - prevWeekTotal };
            if (prevWeekTotal > 0) {
                const change = ((weekTotal - prevWeekTotal) / prevWeekTotal) * 100;
                trend = {
                    direction: change < -5 ? 'improving' : change > 5 ? 'worsening' : 'stable',
                    percentage: Math.round(Math.abs(change)),
                    weekOverWeek: weekTotal - prevWeekTotal
                };
            }

            // High-impact activities
            const activityTotals = {};
            monthActs.forEach(a => {
                activityTotals[a.activityId] = (activityTotals[a.activityId] || { name: a.name, icon: a.icon, category: a.category, total: 0, count: 0 });
                activityTotals[a.activityId].total += a.co2;
                activityTotals[a.activityId].count++;
            });
            const highImpact = Object.values(activityTotals)
                .filter(a => a.total > 0)
                .sort((a, b) => b.total - a.total)
                .slice(0, 3);

            // Low hanging fruit (easy replacements)
            const lowHangingFruit = [];
            if (activityTotals['beef'] && activityTotals['beef'].count > 2) {
                lowHangingFruit.push({ from: 'Beef', to: 'Chicken or Plant-based', potentialSavings: activityTotals['beef'].total * 0.6 });
            }
            if (activityTotals['car_petrol'] && activityTotals['car_petrol'].count > 5) {
                lowHangingFruit.push({ from: 'Short Car Trips', to: 'Cycling or Walking', potentialSavings: activityTotals['car_petrol'].total * 0.2 });
            }

            // Time patterns
            const dailyTotals = EmissionCalculator.getDailyTotals(monthActs, 30);
            let peakDay = dailyTotals[0];
            let lowestDay = dailyTotals[0];
            dailyTotals.forEach(d => {
                if (d.total > (peakDay?.total || 0)) peakDay = d;
                if (d.total < (lowestDay?.total || Infinity)) lowestDay = d;
            });

            // Comparison & Goals
            const projected = EmissionCalculator.getProjectedMonthly(monthTotal);
            const goalProgress = GoalTracker.getGoalProgress();

            return {
                monthTotal: parseFloat(monthTotal.toFixed(1)),
                weekTotal: parseFloat(weekTotal.toFixed(1)),
                dominantCategory: dominantCat,
                weekdayVsWeekend: {
                    weekdayAvg: parseFloat(weekdayAvg.toFixed(1)),
                    weekendAvg: parseFloat(weekendAvg.toFixed(1)),
                    insight: weekdayInsight
                },
                trend,
                highImpactActivities: highImpact,
                lowHangingFruit,
                timePatterns: { peakDay, lowestDay },
                breakdown,
                consistencyScore: Math.max(0, 100 - (Math.abs(weekdayAvg - weekendAvg) / Math.max(weekdayAvg, 0.1) * 20)),
                comparisonToAvg: {
                    nationalAvg: 330,
                    parisTarget: 167,
                    userMonthly: projected,
                    status: projected < 167 ? 'excellent' : projected < 330 ? 'good' : 'needs improvement'
                },
                goalProgress,
                streakAnalysis: {
                    current: state.streak,
                    best: state.streak, // Keeping simple for now
                    message: state.streak > 5 ? "You're on a great logging streak!" : "Log daily to build your streak!"
                }
            };
        },

        /**
         * Get smart, actionable recommendations based on pattern analysis
         * @param {Object} analysis - Output from analyzePatterns
         * @returns {Array} Array of recommendation objects
         */
        getSmartRecommendations(analysis) {
            const recs = [];
            const { breakdown, monthTotal, goalProgress, highImpactActivities, weekdayVsWeekend } = analysis;
            const acts = StateManager.get().activities;

            // Transport Check
            if (breakdown.transport && (breakdown.transport / monthTotal) > 0.35) {
                recs.push({
                    priority: 1, category: 'transport',
                    title: '🚲 Switch Short Car Trips to Cycling',
                    description: `Transport is ${Math.round((breakdown.transport / monthTotal) * 100)}% of your footprint. Cycling for trips under 5km would save ~${(0.21 * 5).toFixed(1)}kg CO₂ per trip.`,
                    potentialSaving: `${(breakdown.transport * 0.3).toFixed(0)}kg/month`,
                    difficulty: 'medium',
                    actionable: true
                });
            }

            // Food Check - Specific swap
            const beefMeals = acts.filter(a => a.activityId === 'beef' && a.date >= new Date(new Date().setDate(1)).toISOString().split('T')[0]).length;
            if (beefMeals >= 3) {
                recs.push({
                    priority: 1, category: 'food',
                    title: '🥗 Replace 2 Beef Meals Weekly',
                    description: `You've logged ${beefMeals} beef meals this month. Swapping just 2/week to chicken saves ~${((6.61 - 1.82) * 2 * 4).toFixed(0)}kg CO₂/month, or ~${((6.61 - 0.51) * 2 * 4).toFixed(0)}kg if you go vegetarian.`,
                    potentialSaving: `${((6.61 - 1.82) * 2 * 4).toFixed(0)}kg/month`,
                    difficulty: 'easy',
                    actionable: true
                });
            }

            // Energy Check
            if (breakdown.energy && breakdown.energy > 50) {
                recs.push({
                    priority: 2, category: 'energy',
                    title: '💡 Reduce Standby Power Drain',
                    description: `Your energy footprint is ${breakdown.energy.toFixed(0)}kg. Unplugging devices on standby can save 10% — about ${(breakdown.energy * 0.1).toFixed(0)}kg CO₂/month.`,
                    potentialSaving: `${(breakdown.energy * 0.1).toFixed(0)}kg/month`,
                    difficulty: 'easy',
                    actionable: true
                });
            }

            // Commute Check
            if (weekdayVsWeekend.weekdayAvg > weekdayVsWeekend.weekendAvg * 1.4) {
                recs.push({
                    priority: 2, category: 'transport',
                    title: '🏠 Consider Remote Work Days',
                    description: `Your weekday emissions are significantly higher than weekends. One remote work day could cut weekly transport by 20%.`,
                    potentialSaving: `${(weekdayVsWeekend.weekdayAvg * 0.2 * 4).toFixed(0)}kg/month`,
                    difficulty: 'medium',
                    actionable: true
                });
            }

            // Goal Warning
            if (!goalProgress.onTrack && goalProgress.percentUsed > 80) {
                recs.push({
                    priority: 1, category: 'goal',
                    title: '🎯 Exceeding Carbon Target',
                    description: `You are projected to exceed your ${goalProgress.target}kg goal. Focus on reducing your top emitter: ${highImpactActivities[0]?.name || 'daily activities'}.`,
                    potentialSaving: `${(goalProgress.projected - goalProgress.target).toFixed(0)}kg to cut`,
                    difficulty: 'hard',
                    actionable: true
                });
            }

            // Shopping Check
            if (breakdown.shopping && breakdown.shopping > 20) {
                recs.push({
                    priority: 3, category: 'shopping',
                    title: '♻️ Try Secondhand Shopping',
                    description: 'Buying secondhand clothing reduces fashion\'s footprint by 82%. One thrift purchase vs. new saves ~9.5kg CO₂.',
                    potentialSaving: '9.5kg per item',
                    difficulty: 'easy',
                    actionable: true
                });
            }

            // General Baseline
            recs.push({
                priority: 4, category: 'general',
                title: '🌍 Carbon Offset with Trees',
                description: `Your monthly footprint of ${monthTotal.toFixed(0)}kg could be offset by planting ${EmissionCalculator.calculateTreesNeeded(monthTotal)} trees per year.`,
                potentialSaving: `${monthTotal.toFixed(0)}kg offset`,
                difficulty: 'easy',
                actionable: false
            });

            return recs.sort((a, b) => a.priority - b.priority);
        },

        /**
         * Detect unusual spikes in emissions
         * @param {Array} acts 
         * @returns {Array} List of anomalies
         */
        detectAnomalies(acts) {
            const anomalies = [];
            const dailyTotals = EmissionCalculator.getDailyTotals(acts, 30);
            if (dailyTotals.length < 5) return anomalies;

            // Calculate moving average
            let total = 0;
            dailyTotals.forEach(d => total += d.total);
            const avg = total / dailyTotals.length;
            const threshold = avg * 2.5; // 250% of average is an anomaly

            dailyTotals.forEach(d => {
                if (d.total > threshold && d.total > 10) {
                    anomalies.push({
                        date: d.date,
                        total: parseFloat(d.total.toFixed(1)),
                        reason: `Significantly higher than average daily use (${avg.toFixed(1)}kg)`
                    });
                }
            });
            return anomalies;
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 5: EcoBot
    // Smart conversational assistant module featuring intent
    // recognition and context-aware responses.
    // ═══════════════════════════════════════════════════════════

    const EcoBot = {
        conversationHistory: [],

        /** Intent regular expressions */
        _intents: {
            GREETING:    /^(hi|hello|hey|howdy|good\s*(morning|evening|afternoon)|sup|yo)\b/i,
            STATUS:      /\b(how am i|status|summary|overview|report|dashboard|doing)\b/i,
            TIPS:        /\b(tip|advice|suggest|recommend|help|what (can|should) i|reduce|improv|how to|save|lower)\b/i,
            COMPARE:     /\b(compare|average|others|normal|benchmark|vs|versus|national|global)\b/i,
            CATEGORY:    /\b(transport|food|energy|shopping|car|drive|commut|bus|train|fly|flight|cycl|walk|bike|eat|diet|meal|meat|beef|vegan|vegetarian|cook|restaurant|electric|power|heat|solar|gas|ac |air condition|laundry)\b/i,
            GOAL:        /\b(goal|target|aim|budget|limit|set)\b/i,
            TREND:       /\b(trend|progress|getting better|improv|week|month|change|over time)\b/i,
            ACHIEVEMENT: /\b(achieve|badge|level|xp|streak|reward|unlock|gamif)\b/i,
            IMPACT:      /\b(impact|worst|biggest|highest|most|top|major|main|primary)\b/i,
            OFFSET:      /\b(offset|tree|plant|compensat|neutraliz|carbon.?neutral)\b/i,
            FACT:        /\b(fact|did you know|interest|tell me|random|fun fact|trivia)\b/i,
            RESET:       /\b(reset|clear|start over|fresh|delete all)\b/i,
        },

        _facts: [
            'A single mature tree absorbs about 22kg of CO₂ per year and releases enough oxygen for 2 people.',
            'If food waste were a country, it would be the 3rd largest emitter of greenhouse gases.',
            'The internet produces roughly 3.7% of global carbon emissions — comparable to the airline industry.',
            'Producing 1kg of beef requires 15,000 liters of water and emits 27kg of CO₂.',
            'LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer.',
            'A round-trip flight from New York to London produces about 986kg of CO₂ per passenger.',
            'Electric vehicles produce 50-70% less CO₂ over their lifetime compared to petrol cars.',
            'Recycling one aluminum can saves enough energy to run a TV for 3 hours.',
            'The fashion industry produces 10% of global carbon emissions — more than aviation and shipping combined.',
            'Walking or cycling for short trips (under 2km) could eliminate 10% of transport emissions globally.'
        ],

        /**
         * Main entry point for the assistant
         * @param {string} userMessage 
         * @returns {string} Response HTML/text
         */
        processMessage(userMessage) {
            const msg = userMessage.trim();
            if (!msg) return "I didn't catch that. Try asking me about your carbon footprint, tips, or trends! 🌱";

            this.conversationHistory.push({ role: 'user', text: msg, timestamp: Date.now() });

            const acts = StateManager.get().activities;
            const analysis = DecisionEngine.analyzePatterns(acts);
            let response;

            // Intent routing (order dictates priority)
            if (this._intents.GREETING.test(msg)) response = this.handleGreeting(analysis);
            else if (this._intents.RESET.test(msg)) response = this.handleReset();
            else if (this._intents.GOAL.test(msg)) response = this.handleGoal(analysis);
            else if (this._intents.ACHIEVEMENT.test(msg)) response = this.handleAchievement();
            else if (this._intents.COMPARE.test(msg)) response = this.handleCompare(analysis);
            else if (this._intents.OFFSET.test(msg)) response = this.handleOffset(analysis);
            else if (this._intents.IMPACT.test(msg)) response = this.handleImpact(analysis);
            else if (this._intents.TREND.test(msg)) response = this.handleTrend(analysis);
            else if (this._intents.TIPS.test(msg)) response = this.handleTips(analysis);
            else if (this._intents.STATUS.test(msg)) response = this.handleStatus(analysis);
            else if (this._intents.CATEGORY.test(msg)) {
                // Determine which category specifically
                const cats = ['transport', 'food', 'energy', 'shopping'];
                const matchedCat = cats.find(c => msg.toLowerCase().includes(c)) || 'transport'; // crude fallback
                response = this.handleCategory(matchedCat, analysis);
            }
            else if (this._intents.FACT.test(msg)) response = this.handleFact();
            else response = this.handleFallback();

            this.conversationHistory.push({ role: 'bot', text: response, timestamp: Date.now() });
            return response;
        },

        handleGreeting(a) {
            return `Hey there! 🌿 Here's your quick snapshot:\n\n` +
                `📊 <strong>${a.monthTotal}kg CO₂</strong> this month\n` +
                `📈 Trend: <em>${a.trend.direction}</em> (${a.trend.percentage}% week-over-week)\n` +
                `⭐ Eco Score: <strong>${a.consistencyScore.toFixed(0)}/100 consistency</strong>\n\n` +
                `Ask me for tips, trends, or a detailed analysis!`;
        },

        handleStatus(a) {
            const gp = a.goalProgress;
            const goalLine = gp.onTrack
                ? `✅ On track for your ${gp.target}kg goal (projected: ${gp.projected}kg)`
                : `⚠️ Over target: projected ${gp.projected}kg vs ${gp.target}kg goal`;
            return `📋 <strong>Monthly Status Report</strong>\n\n` +
                `Total this month: <strong>${a.monthTotal}kg CO₂</strong>\n` +
                `Daily average: <strong>${(a.monthTotal / Math.max(new Date().getDate(), 1)).toFixed(1)}kg</strong>\n` +
                `Top category: <strong>${a.dominantCategory.name}</strong> (${a.dominantCategory.percentage}%)\n` +
                `Week-over-week: <em>${a.trend.direction}</em> ${a.trend.percentage}%\n` +
                `${goalLine}\n\n` +
                `${a.weekdayVsWeekend.insight}`;
        },

        handleTips(a) {
            const recs = DecisionEngine.getSmartRecommendations(a).slice(0, 3);
            let response = `💡 <strong>Your Top Personalized Recommendations:</strong>\n\n`;
            recs.forEach((r, i) => {
                response += `<strong>${i + 1}. ${r.title}</strong>\n${r.description}\n💰 Potential saving: <em>${r.potentialSaving}</em>\n\n`;
            });
            return response;
        },

        handleCompare(a) {
            const projected = a.comparisonToAvg.userMonthly;
            const pctOfAvg = Math.round((projected / a.comparisonToAvg.nationalAvg) * 100);
            const pctOfTarget = Math.round((projected / a.comparisonToAvg.parisTarget) * 100);
            const status = a.comparisonToAvg.status;
            return `📊 <strong>How You Compare:</strong>\n\n` +
                `Your projected monthly: <strong>${projected.toFixed(0)}kg CO₂</strong>\n\n` +
                `🏠 vs National Average (330kg): <em>${status}</em> at ${pctOfAvg}%\n` +
                `🌍 vs Paris Target (167kg): ${pctOfTarget <= 100 ? '✅ Meeting target!' : `${pctOfTarget}% of target`}\n\n` +
                `${pctOfAvg <= 80 ? 'Great work! You\'re beating the national average. 🌟' :
                   'You\'re above average. Let me suggest some impactful changes — ask for tips!'}`;
        },

        handleCategory(category, a) {
            const state = StateManager.get();
            const catActs = EmissionCalculator.getMonthActivities(state.activities).filter(act => act.category === category);
            const catTotal = EmissionCalculator.getTotalCO2(catActs);
            const pct = a.monthTotal > 0 ? Math.round((catTotal / a.monthTotal) * 100) : 0;
            const catName = category.charAt(0).toUpperCase() + category.slice(1);
            
            return `🔍 <strong>${catName} Analysis</strong>\n\n` +
                `Total: <strong>${catTotal.toFixed(1)}kg CO₂</strong> (${pct}% of your footprint)\n` +
                `Activities logged: <strong>${catActs.length}</strong>\n\n` +
                `If you want specific ways to reduce this, ask me for tips!`;
        },

        handleGoal(a) {
            const gp = a.goalProgress;
            return `🎯 <strong>Goal Progress</strong>\n\n` +
                `Target: <strong>${gp.target}kg/month</strong>\n` +
                `Used: <strong>${gp.current}kg</strong> (${gp.percentUsed}%)\n` +
                `Projected: <strong>${gp.projected}kg</strong>\n` +
                `Status: ${gp.onTrack ? '✅ On track!' : '⚠️ Over budget'}\n\n` +
                `${gp.onTrack ? 'Keep up the great work! You\'re on track to meet your goal. 🌟' :
                   'Try reducing your top emitter to get back on track. Ask me for specific tips!'}`;
        },

        handleTrend(a) {
            const emoji = a.trend.direction === 'improving' ? '📉' : a.trend.direction === 'worsening' ? '📈' : '➡️';
            const wvw = a.weekdayVsWeekend;
            return `${emoji} <strong>Trend Analysis</strong>\n\n` +
                `Week-over-week: <em>${a.trend.direction}</em> (${a.trend.percentage}% change)\n` +
                `This week total: <strong>${a.weekTotal}kg CO₂</strong>\n\n` +
                `📅 <strong>Weekday vs Weekend:</strong>\n` +
                `Weekday avg: ${wvw.weekdayAvg}kg/day\n` +
                `Weekend avg: ${wvw.weekendAvg}kg/day\n` +
                `${wvw.insight}`;
        },

        handleAchievement() {
            const state = StateManager.get();
            const level = AchievementSystem.getCurrentLevel(state.xp);
            return `🏆 <strong>Your Achievements</strong>\n\n` +
                `Badges: <strong>${state.achievements.length}/16</strong> unlocked\n` +
                `Level: <strong>${level.icon} ${level.name}</strong>\n` +
                `XP: <strong>${state.xp}</strong>\n` +
                `Streak: <strong>🔥 ${state.streak} days</strong>`;
        },

        handleImpact(a) {
            const hi = a.highImpactActivities;
            if (hi.length === 0) return 'No activities logged yet! Start tracking to see your impact breakdown. 📊';
            let response = `🔍 <strong>Your Biggest Impact Activities:</strong>\n\n`;
            hi.forEach((act, i) => {
                const medal = ['🥇', '🥈', '🥉'][i];
                response += `${medal} <strong>${act.icon} ${act.name}</strong>\n   ${act.total.toFixed(1)}kg CO₂ (${act.count} times)\n\n`;
            });
            return response;
        },

        handleOffset(a) {
            const trees = EmissionCalculator.treesNeeded(a.monthTotal);
            return `🌳 <strong>Carbon Offset Guide</strong>\n\n` +
                `Your monthly footprint: <strong>${a.monthTotal}kg CO₂</strong>\n` +
                `🌲 Trees needed to offset: <strong>${trees} trees/year</strong>\n\n` +
                `Remember: Reducing emissions is always better than offsetting! 💚`;
        },

        handleFact() {
            const fact = this._facts[Math.floor(Math.random() * this._facts.length)];
            return `🌍 <strong>Did You Know?</strong>\n\n${fact}\n\n💡 Ask me for another fact anytime!`;
        },

        handleReset() {
            return `⚠️ To reset your data, open browser console (F12) and run:\n<strong>localStorage.removeItem('ecotrack_state'); location.reload();</strong>\n\nThis will clear all data and start fresh.`;
        },

        handleFallback() {
            return `I can help with lots of things! Try asking me:\n\n` +
                `📊 <strong>"How am I doing?"</strong> — Full status report\n` +
                `💡 <strong>"Give me tips"</strong> — Personalized recommendations\n` +
                `📈 <strong>"Show my trend"</strong> — Week-over-week analysis\n` +
                `🔍 <strong>"What's my biggest impact?"</strong> — Top emitters\n` +
                `🎯 <strong>"Goal progress"</strong> — Monthly target tracking`;
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 6: InsightsGenerator
    // Specifically handles generating the UI insight cards for the 
    // dedicated Insights page based on DecisionEngine output.
    // ═══════════════════════════════════════════════════════════

    const InsightsGenerator = {
        /**
         * Generate insight objects for the UI
         * @returns {Array} Insights formatted for rendering
         */
        generateInsights() {
            const state = StateManager.get();
            const analysis = DecisionEngine.analyzePatterns(state.activities);
            const smartRecs = DecisionEngine.getSmartRecommendations(analysis);
            const anomalies = DecisionEngine.detectAnomalies(state.activities);

            let insightsList = [];

            // Add Smart Recommendations
            smartRecs.forEach(rec => {
                let type = 'info';
                if (rec.priority === 1) type = 'warning';
                if (rec.priority === 2) type = 'tip';

                let impact = 'info';
                if (rec.difficulty === 'easy' && parseFloat(rec.potentialSaving) > 10) impact = 'positive';
                if (rec.difficulty === 'hard') impact = 'high';

                insightsList.push({
                    type,
                    title: rec.title,
                    text: rec.description,
                    impact,
                    badge: `${rec.difficulty} · saves ${rec.potentialSaving}`
                });
            });

            // Add Anomaly Warnings
            anomalies.forEach(anomaly => {
                insightsList.push({
                    type: 'warning',
                    title: `⚠️ Unusual Spike on ${new Date(anomaly.date).toLocaleDateString()}`,
                    text: `Your emissions reached ${anomaly.total}kg on this day. ${anomaly.reason}. Review your history to find alternatives.`,
                    impact: 'high',
                    badge: 'Alert'
                });
            });

            // Fill up with general positive reinforcement if list is small
            if (insightsList.length < 8) {
                if (analysis.trend.direction === 'improving') {
                    insightsList.push({
                        type: 'tip',
                        title: '🌟 Consistent Improvement',
                        text: `You have reduced your footprint by ${analysis.trend.percentage}% compared to last week. Keep maintaining these habits!`,
                        impact: 'positive',
                        badge: 'great work'
                    });
                }
            }

            return insightsList;
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 7: GoalTracker
    // Manages the monthly carbon target system and projections.
    // ═══════════════════════════════════════════════════════════

    const GoalTracker = {
        /**
         * Calculate comprehensive goal progress
         * @returns {Object} Progress metrics
         */
        getGoalProgress() {
            const state = StateManager.get();
            const monthActs = EmissionCalculator.getMonthActivities(state.activities);
            const monthTotal = EmissionCalculator.getTotalCO2(monthActs);
            
            const target = state.goal?.target || 200;
            const projected = EmissionCalculator.getProjectedMonthly(monthTotal);
            
            return {
                target: target,
                current: parseFloat(monthTotal.toFixed(1)),
                projected: parseFloat(projected.toFixed(0)),
                onTrack: projected <= target,
                percentUsed: Math.min(100, Math.round((monthTotal / target) * 100))
            };
        },

        /** Get projected month-end total */
        getProjection() {
            return this.getGoalProgress().projected;
        },

        /** Check if current run-rate meets goal */
        isOnTrack() {
            return this.getGoalProgress().onTrack;
        },

        /** Provide specific advice to meet goal */
        getAdvice() {
            const prog = this.getGoalProgress();
            if (prog.onTrack) return "You're on track to meet your carbon budget. Keep it up!";
            return `You're projected to exceed your goal by ${(prog.projected - prog.target)}kg. Try cutting back on high-impact transport or red meat.`;
        },

        /** Update goal in state */
        setGoal(target) {
            StateManager.update({ goal: { target: parseInt(target), period: 'month' } });
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 8: AchievementSystem
    // Gamification framework managing XP, levels, and badges.
    // ═══════════════════════════════════════════════════════════

    const AchievementSystem = {
        ACHIEVEMENTS: [
            { id: 'first_log', name: 'First Step', desc: 'Log your first activity', icon: '🌱', xp: 10, check: s => s.totalLogs >= 1 },
            { id: 'ten_logs', name: 'Getting Started', desc: 'Log 10 activities', icon: '📝', xp: 25, check: s => s.totalLogs >= 10 },
            { id: 'fifty_logs', name: 'Dedicated Tracker', desc: 'Log 50 activities', icon: '📊', xp: 50, check: s => s.totalLogs >= 50 },
            { id: 'hundred_logs', name: 'Data Champion', desc: 'Log 100 activities', icon: '🏆', xp: 100, check: s => s.totalLogs >= 100 },
            { id: 'green_day', name: 'Green Day', desc: 'Log a day under 5kg CO₂', icon: '💚', xp: 30, check: s => s.hasGreenDay },
            { id: 'zero_transport', name: 'Car-Free Day', desc: 'No car usage for a day', icon: '🚶', xp: 20, check: s => s.hasCarFreeDay },
            { id: 'vegan_meal', name: 'Plant Pioneer', desc: 'Log 5 vegan meals', icon: '🌿', xp: 20, check: s => s.veganMeals >= 5 },
            { id: 'week_streak', name: 'Week Warrior', desc: '7-day logging streak', icon: '🔥', xp: 50, check: s => s.streak >= 7 },
            { id: 'month_streak', name: 'Monthly Master', desc: '30-day streak', icon: '⚡', xp: 150, check: s => s.streak >= 30 },
            { id: 'solar_user', name: 'Solar Powered', desc: 'Log solar energy', icon: '☀️', xp: 25, check: s => s.usedSolar },
            { id: 'tree_planter', name: 'Tree Hugger', desc: 'Plant a tree', icon: '🌳', xp: 50, check: s => s.plantedTree },
            { id: 'composter', name: 'Composting Pro', desc: 'Log 10 composting sessions', icon: '🌍', xp: 30, check: s => s.compostCount >= 10 },
            { id: 'cyclist', name: 'Pedal Power', desc: 'Log 100km cycling', icon: '🚲', xp: 40, check: s => s.cyclingKm >= 100 },
            { id: 'low_month', name: 'Eco Warrior', desc: 'Monthly under 200kg', icon: '🌟', xp: 100, check: s => s.monthlyUnder200 },
            { id: 'all_categories', name: 'Well-Rounded', desc: 'Log in all 5 categories', icon: '🎯', xp: 30, check: s => s.categoriesUsed >= 5 },
            { id: 'insight_reader', name: 'Knowledge Seeker', desc: 'View insights page', icon: '💡', xp: 10, check: s => s.viewedInsights },
        ],

        LEVELS: [
            { name: 'Seedling', icon: '🌱', xpRequired: 0 },
            { name: 'Sprout', icon: '🌿', xpRequired: 100 },
            { name: 'Sapling', icon: '🪴', xpRequired: 250 },
            { name: 'Young Tree', icon: '🌲', xpRequired: 500 },
            { name: 'Forest Guardian', icon: '🌳', xpRequired: 800 },
            { name: 'Eco Champion', icon: '🏆', xpRequired: 1200 },
            { name: 'Earth Keeper', icon: '🌍', xpRequired: 1800 },
            { name: 'Climate Hero', icon: '⭐', xpRequired: 2500 },
        ],

        /** Compile stats needed for achievement logic */
        _getStats(state) {
            const today = new Date().toISOString().split('T')[0];
            const monthActs = EmissionCalculator.getMonthActivities(state.activities);
            const todayActs = state.activities.filter(a => a.date === today);
            const todayTotal = EmissionCalculator.getTotalCO2(todayActs);
            return {
                totalLogs: state.activities.length,
                hasGreenDay: todayTotal > 0 && todayTotal < 5,
                hasCarFreeDay: this._checkCarFreeDay(state.activities),
                veganMeals: state.activities.filter(a => a.activityId === 'vegan').length,
                streak: state.streak,
                usedSolar: state.activities.some(a => a.activityId === 'solar'),
                plantedTree: state.activities.some(a => a.activityId === 'tree_planting'),
                compostCount: state.activities.filter(a => a.activityId === 'composting').length,
                cyclingKm: state.activities.filter(a => a.activityId === 'bicycle').reduce((s, a) => s + a.quantity, 0),
                monthlyUnder200: EmissionCalculator.getTotalCO2(monthActs) < 200 && monthActs.length > 0,
                categoriesUsed: new Set(state.activities.map(a => a.category)).size,
                viewedInsights: state.viewedInsights,
            };
        },

        _checkCarFreeDay(acts) {
            const dates = [...new Set(acts.map(a => a.date))];
            return dates.some(date => {
                const dayActs = acts.filter(a => a.date === date);
                return dayActs.length > 0 && !dayActs.some(a => ['car_petrol', 'car_diesel', 'taxi'].includes(a.activityId));
            });
        },

        /** Evaluate all achievements and award new ones */
        checkAll(state) {
            const stats = this._getStats(state);
            const newAwards = [];
            this.ACHIEVEMENTS.forEach(ach => {
                if (!state.achievements.includes(ach.id) && ach.check(stats)) {
                    state.achievements.push(ach.id);
                    state.xp += ach.xp;
                    newAwards.push(ach);
                    state.notifications.unshift({
                        id: Date.now() + Math.random(),
                        text: `🏆 Achievement: ${ach.name}!`,
                        time: 'Just now', read: false
                    });
                }
            });
            if (newAwards.length > 0) StateManager.save();
            return newAwards;
        },

        getCurrentLevel(xp) {
            let cur = this.LEVELS[0];
            for (const l of this.LEVELS) { if (xp >= l.xpRequired) cur = l; }
            return cur;
        },

        getNextLevel(xp) {
            const cur = this.getCurrentLevel(xp);
            const idx = this.LEVELS.indexOf(cur);
            return idx < this.LEVELS.length - 1 ? this.LEVELS[idx + 1] : null;
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 9: ChartManager
    // Wraps Chart.js to render and destroy visualizations.
    // ═══════════════════════════════════════════════════════════

    const ChartManager = {
        _charts: {},

        renderBreakdownChart(canvasId, acts) {
            const bd = EmissionCalculator.getCategoryBreakdown(acts);
            const cats = Object.keys(bd);
            const vals = Object.values(bd).map(v => parseFloat(v.toFixed(1)));
            const colorMap = { transport: '#3b82f6', food: '#f59e0b', energy: '#ef4444', shopping: '#8b5cf6', other: '#6b7280' };
            const colors = cats.map(c => colorMap[c] || '#6b7280');

            if (this._charts[canvasId]) this._charts[canvasId].destroy();

            const canvas = document.getElementById(canvasId);
            if (!canvas) return;

            this._charts[canvasId] = new Chart(canvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: cats.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
                    datasets: [{
                        data: vals,
                        backgroundColor: colors.map(c => c + 'cc'),
                        borderColor: colors,
                        borderWidth: 2, hoverBorderWidth: 3, hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, cutout: '65%',
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#9ca3af', font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true } },
                        tooltip: this._tooltipConfig()
                    },
                    animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' }
                }
            });
        },

        renderTrendChart(canvasId, acts, days) {
            const totals = EmissionCalculator.getDailyTotals(acts, days);
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            if (this._charts[canvasId]) this._charts[canvasId].destroy();

            const grad = ctx.createLinearGradient(0, 0, 0, 300);
            grad.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
            grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

            this._charts[canvasId] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: totals.map(d => d.label),
                    datasets: [{
                        label: 'Daily CO₂ (kg)',
                        data: totals.map(d => parseFloat(d.total.toFixed(1))),
                        borderColor: '#10b981', backgroundColor: grad,
                        borderWidth: 2.5, fill: true, tension: 0.4,
                        pointBackgroundColor: '#10b981', pointBorderColor: '#0a0f1a',
                        pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    interaction: { intersect: false, mode: 'index' },
                    scales: {
                        x: { grid: { color: '#1f293766' }, ticks: { color: '#6b7280', font: { family: 'Inter', size: 11 } } },
                        y: { grid: { color: '#1f293766' }, ticks: { color: '#6b7280', font: { family: 'Inter', size: 11 }, callback: v => v + ' kg' }, beginAtZero: true }
                    },
                    plugins: { legend: { display: false }, tooltip: this._tooltipConfig() },
                    animation: { duration: 1000, easing: 'easeOutQuart' }
                }
            });
        },

        destroyAll() {
            Object.values(this._charts).forEach(c => c.destroy());
            this._charts = {};
        },

        _tooltipConfig() {
            return {
                backgroundColor: '#1f2937', titleColor: '#f9fafb', bodyColor: '#d1d5db',
                borderColor: '#374151', borderWidth: 1, cornerRadius: 8, padding: 12,
                titleFont: { family: 'Inter', weight: '600' }, bodyFont: { family: 'Inter' }
            };
        }
    };


    // ═══════════════════════════════════════════════════════════
    // MODULE 10: UIController
    // All DOM manipulation, event handling, and rendering. 
    // Acts as the orchestrator connecting modules to the view.
    // ═══════════════════════════════════════════════════════════

    const UIController = {
        _selectedActivity: null,
        _currentCategory: 'transport',
        _chatOpen: false,

        /** DOM shortcuts */
        $(id) { return document.getElementById(id); },
        $$(sel) { return document.querySelectorAll(sel); },

        /** Animate a numeric value from start to end */
        animateValue(el, start, end, duration = 1200) {
            const t0 = performance.now();
            const isDecimal = end % 1 !== 0;
            const tick = (now) => {
                const p = Math.min((now - t0) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = isDecimal ? (start + (end - start) * eased).toFixed(1) : Math.round(start + (end - start) * eased);
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        },

        formatDate(ds) { return new Date(ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); },
        getCategoryColor(c) { return { transport: '#3b82f6', food: '#f59e0b', energy: '#ef4444', shopping: '#8b5cf6', other: '#6b7280' }[c] || '#6b7280'; },

        // ── Navigation ───────────────────────────────────────
        navigateTo(page) {
            this.$$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
            this.$$('.page').forEach(p => p.classList.toggle('active', p.id === `page-${page}`));

            switch (page) {
                case 'dashboard': this.renderDashboard(); break;
                case 'log': this.renderLogPage(); break;
                case 'insights':
                    StateManager.get().viewedInsights = true;
                    AchievementSystem.checkAll(StateManager.get());
                    this.renderInsights(); break;
                case 'achievements': this.renderAchievements(); break;
                case 'history': this.renderHistory(); break;
            }
            this.$('sidebar').classList.remove('open');
            this.$('sidebarOverlay').classList.remove('active');
        },

        showToast(msg) {
            this.$('toastMessage').textContent = msg;
            this.$('toast').classList.add('show');
            setTimeout(() => this.$('toast').classList.remove('show'), 3000);
        },

        // ── Dashboard Rendering ──────────────────────────────
        renderDashboard() {
            const state = StateManager.get();
            const ma = EmissionCalculator.getMonthActivities(state.activities);
            const mt = EmissionCalculator.getTotalCO2(ma);
            const dp = new Date().getDate();
            const da = dp > 0 ? mt / dp : 0;
            const trees = EmissionCalculator.calculateTreesNeeded(mt);
            const eco = EmissionCalculator.calculateEcoScore(mt);

            this.animateValue(this.$('totalCO2Value'), 0, parseFloat(mt.toFixed(1)));
            this.animateValue(this.$('dailyAvgValue'), 0, parseFloat(da.toFixed(1)));
            this.animateValue(this.$('treesValue'), 0, trees);
            this.animateValue(this.$('ecoScoreValue'), 0, eco);

            // Goal Tracking Display
            const goalProg = GoalTracker.getGoalProgress();
            this.$('goalStatus').textContent = `${mt.toFixed(0)} / ${goalProg.target} kg CO₂`;
            this.$('goalProjection').textContent = `Projected: ${goalProg.projected} kg`;
            const bar = this.$('goalProgress');
            bar.style.width = goalProg.percentUsed + '%';
            bar.className = 'goal-progress-fill' + (goalProg.percentUsed > 100 ? ' over-budget' : goalProg.percentUsed > 80 ? ' warning' : '');

            // Charts
            ChartManager.renderBreakdownChart('breakdownChart', ma);
            ChartManager.renderTrendChart('trendChart', state.activities, 7);
            
            // Dashboard Mini-Insights
            this._renderDashboardInsights();
        },

        _renderDashboardInsights() {
            const state = StateManager.get();
            const analysis = DecisionEngine.analyzePatterns(state.activities);
            const recs = DecisionEngine.getSmartRecommendations(analysis).slice(0, 3);
            const typeMap = { 1: 'warning', 2: 'tip', 3: 'info', 4: 'info' };
            const impactMap = { 1: 'high', 2: 'medium', 3: 'positive', 4: 'info' };

            this.$('dashboardInsights').innerHTML = recs.map((r, i) => `
                <div class="insight-card ${typeMap[r.priority] || 'info'} delay-${i + 1}">
                    <div class="insight-border"></div>
                    <div class="insight-content">
                        <div class="insight-header">
                            <span class="insight-badge ${impactMap[r.priority] || 'info'}">${r.difficulty}</span>
                            <h3>${r.title}</h3>
                        </div>
                        <p>${r.description}</p>
                    </div>
                </div>
            `).join('');
        },

        // ── Log Page Rendering ───────────────────────────────
        renderLogPage() {
            this._renderActivityCards(this._currentCategory);
            this.$('activityDate').value = new Date().toISOString().split('T')[0];
        },

        _renderActivityCards(cat) {
            const grid = this.$('activitiesGrid');
            grid.innerHTML = (ActivityDatabase[cat] || []).map(a => `
                <div class="activity-card" data-id="${a.id}" data-cat="${cat}">
                    <span class="activity-icon">${a.icon}</span>
                    <span class="activity-name">${a.name}</span>
                    <span class="activity-co2" style="color:${a.co2PerUnit <= 0 ? '#10b981' : a.co2PerUnit > 2 ? '#ef4444' : '#f59e0b'}">
                        ${a.co2PerUnit <= 0 ? '🌿 ' : ''}${Math.abs(a.co2PerUnit)} kg/${a.unit}
                    </span>
                </div>
            `).join('');

            grid.querySelectorAll('.activity-card').forEach(card => {
                card.addEventListener('click', () => this._selectActivity(card));
            });
        },

        _selectActivity(card) {
            const def = findActivity(card.dataset.id, card.dataset.cat);
            if (!def) return;
            this._selectedActivity = def;

            this.$$('.activity-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            this.$('activityInputBar').style.display = 'flex';
            this.$('selectedActivityName').textContent = `${def.icon} ${def.name}`;
            this.$('selectedActivityCO2').textContent = `${def.co2PerUnit} kg CO₂ per ${def.unit}`;

            const labels = { km: 'Distance (km)', serving: 'Servings', cup: 'Cups', kWh: 'Energy (kWh)', hour: 'Hours', load: 'Loads', item: 'Items', bag: 'Bags', package: 'Packages', tree: 'Trees', kg: 'Weight (kg)', email: 'Emails', GB: 'Data (GB)', meal: 'Meals', bottle: 'Bottles', use: 'Uses', 'm³': 'Volume (m³)', litre: 'Litres' };
            this.$('quantityLabel').textContent = labels[def.unit] || 'Quantity';
            this.$('activityQuantity').value = def.unit === 'km' ? 10 : 1;
        },

        _addActivity() {
            if (!this._selectedActivity) return;
            const qty = parseFloat(this.$('activityQuantity').value);
            if (!qty || qty <= 0) { 
                this.$('activityQuantity').classList.add('shake'); 
                setTimeout(() => this.$('activityQuantity').classList.remove('shake'), 600); 
                return; 
            }

            const state = StateManager.get();
            const act = StateManager._makeActivity(this._selectedActivity.id, this._currentCategory, qty, this.$('activityDate').value, this.$('activityNotes').value);
            if (!act) return;

            state.activities.push(act);
            this._updateStreak(act.date, state);
            AchievementSystem.checkAll(state);
            StateManager.save();
            this._updateNotifDot();

            const co2Text = act.co2 >= 0 ? `${act.co2.toFixed(2)}kg CO₂` : `offset ${Math.abs(act.co2).toFixed(2)}kg! 🌿`;
            this.showToast(`${act.icon} ${act.name} logged! ${co2Text}`);

            this._selectedActivity = null;
            this.$$('.activity-card').forEach(c => c.classList.remove('selected'));
            this.$('activityInputBar').style.display = 'none';
            this.$('activityNotes').value = '';
        },

        _updateStreak(logDate, state) {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (!state.lastLogDate || state.lastLogDate === yesterday) {
                if (logDate === today && state.lastLogDate !== today) state.streak++;
            } else if (state.lastLogDate !== today) {
                state.streak = 1;
            }
            if (logDate === today) state.lastLogDate = today;
        },

        // ── Insights Page ────────────────────────────────────
        renderInsights() {
            const insightsList = InsightsGenerator.generateInsights();
            const monthTotal = EmissionCalculator.getTotalCO2(EmissionCalculator.getMonthActivities(StateManager.get().activities));

            this.$('insightsContainer').innerHTML = insightsList.map((r, i) => `
                <div class="insight-card-full ${r.type} slide-up delay-${(i % 4) + 1}">
                    <div class="insight-border"></div>
                    <div class="insight-content">
                        <div class="insight-header">
                            <span class="insight-badge ${r.impact}">${r.badge}</span>
                            <h3>${r.title}</h3>
                        </div>
                        <p>${r.text}</p>
                    </div>
                </div>
            `).join('');

            this.$('yourFootprint').textContent = `${monthTotal.toFixed(1)} kg`;
        },

        // ── Achievements Page ────────────────────────────────
        renderAchievements() {
            const state = StateManager.get();
            this.$('streakCount').textContent = state.streak;
            this.$('streakMessage').textContent = state.streak > 0
                ? `Amazing! ${state.streak} days of consistent tracking!`
                : 'Log activities daily to build your streak!';

            const level = AchievementSystem.getCurrentLevel(state.xp);
            const next = AchievementSystem.getNextLevel(state.xp);
            this.$('levelBadge').textContent = level.icon;
            this.$('levelTitle').textContent = level.name;
            this.$('levelNumber').textContent = AchievementSystem.LEVELS.indexOf(level) + 1;

            const xpIn = state.xp - level.xpRequired;
            const xpFor = next ? next.xpRequired - level.xpRequired : 100;
            this.$('levelProgressBar').style.width = Math.min(100, (xpIn / xpFor) * 100) + '%';
            this.$('levelXP').textContent = next ? `${xpIn} / ${xpFor} XP` : `${state.xp} XP (Max Level!)`;

            this.$('achievementsGrid').innerHTML = AchievementSystem.ACHIEVEMENTS.map((a, i) => {
                const unlocked = state.achievements.includes(a.id);
                return `<div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'} delay-${(i % 4) + 1}">
                    <div class="achievement-icon-wrap"><span class="achievement-icon">${a.icon}</span>${unlocked ? '<div class="achievement-check">✓</div>' : ''}</div>
                    <span class="achievement-name">${a.name}</span>
                    <span class="achievement-desc">${a.desc}</span>
                    <span class="achievement-xp">${a.xp} XP</span>
                </div>`;
            }).join('');
        },

        // ── History Page ─────────────────────────────────────
        renderHistory() {
            const state = StateManager.get();
            let acts = [...state.activities];
            const filter = this.$('historyFilter').value;
            const sort = this.$('historySort').value;

            if (filter !== 'all') acts = acts.filter(a => a.category === filter);
            switch (sort) {
                case 'newest': acts.sort((a, b) => b.timestamp - a.timestamp); break;
                case 'oldest': acts.sort((a, b) => a.timestamp - b.timestamp); break;
                case 'highest': acts.sort((a, b) => b.co2 - a.co2); break;
                case 'lowest': acts.sort((a, b) => a.co2 - b.co2); break;
            }

            if (acts.length === 0) { 
                this.$('historyList').style.display = 'none'; 
                this.$('historyEmpty').style.display = 'flex'; 
                return; 
            }
            this.$('historyList').style.display = 'block'; 
            this.$('historyEmpty').style.display = 'none';

            const grouped = {};
            acts.forEach(a => { (grouped[a.date] = grouped[a.date] || []).push(a); });

            this.$('historyList').innerHTML = Object.entries(grouped).map(([date, dayActs]) => {
                const dt = EmissionCalculator.getTotalCO2(dayActs);
                return `<div class="history-date-group">
                    <div class="history-date-header"><span class="history-date">${this.formatDate(date)}</span><span class="history-day-total">${dt.toFixed(1)} kg CO₂</span></div>
                    ${dayActs.map(a => `<div class="history-item" data-id="${a.id}">
                        <span class="history-icon">${a.icon}</span>
                        <div class="history-item-info"><span class="history-item-name">${a.name}</span><span class="history-item-detail">${a.quantity} ${a.unit}${a.notes ? ' • ' + a.notes : ''}</span></div>
                        <span class="history-category-badge" style="background:${this.getCategoryColor(a.category)}22;color:${this.getCategoryColor(a.category)}">${a.category}</span>
                        <span class="history-item-co2 ${a.co2 < 0 ? 'negative' : ''}">${a.co2 >= 0 ? '+' : ''}${a.co2.toFixed(2)} kg</span>
                        <button class="history-delete-btn" data-id="${a.id}" title="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
                    </div>`).join('')}
                </div>`;
            }).join('');

            this.$('historyList').querySelectorAll('.history-delete-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    e.stopPropagation();
                    state.activities = state.activities.filter(a => a.id !== parseFloat(btn.dataset.id));
                    StateManager.save(); 
                    this.renderHistory(); 
                    this.showToast('Activity removed');
                });
            });
        },

        // ── Chat (EcoBot) ────────────────────────────────────
        renderChat() {
            this.toggleChat();
        },

        toggleChat() {
            this._chatOpen = !this._chatOpen;
            this.$('chatPanel').classList.toggle('open', this._chatOpen);
            this.$('chatToggle').classList.toggle('active', this._chatOpen);
            if (this._chatOpen && EcoBot.conversationHistory.length === 0) {
                this._addBotMessage('🌿 Hi! I\'m <strong>EcoBot</strong>, your smart carbon assistant. Ask me anything about your footprint, or try the suggestions below!');
            }
        },

        _sendChatMessage() {
            const input = this.$('chatInput');
            const msg = input.value.trim();
            if (!msg) return;

            this._addUserMessage(msg);
            input.value = '';

            // Add typing indicator
            const container = this.$('chatMessages');
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-msg bot';
            typingEl.innerHTML = '<div class="chat-msg-avatar">🤖</div><div class="chat-msg-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>';
            container.appendChild(typingEl);
            container.scrollTop = container.scrollHeight;

            // Process message and simulate delay
            setTimeout(() => {
                typingEl.remove();
                const response = EcoBot.processMessage(msg);
                this._addBotMessage(response);
            }, 600 + Math.random() * 400);
        },

        _addBotMessage(html) {
            const container = this.$('chatMessages');
            const el = document.createElement('div');
            el.className = 'chat-msg bot';
            el.innerHTML = `<div class="chat-msg-avatar">🤖</div><div class="chat-msg-bubble">${html.replace(/\n/g, '<br>')}</div>`;
            container.appendChild(el);
            container.scrollTop = container.scrollHeight;
        },

        _addUserMessage(text) {
            const container = this.$('chatMessages');
            const el = document.createElement('div');
            el.className = 'chat-msg user';
            el.innerHTML = `<div class="chat-msg-avatar">U</div><div class="chat-msg-bubble">${text}</div>`;
            container.appendChild(el);
            container.scrollTop = container.scrollHeight;
        },

        // ── Notifications ────────────────────────────────────
        _updateNotifDot() {
            const unread = StateManager.get().notifications.filter(n => !n.read).length;
            this.$('notifDot').style.display = unread > 0 ? 'block' : 'none';
        },

        _renderNotifications() {
            const state = StateManager.get();
            this.$('notifList').innerHTML = state.notifications.length === 0
                ? '<p class="notif-empty">No notifications</p>'
                : state.notifications.map(n => `<div class="notif-item ${n.read ? 'read' : ''}"><p>${n.text}</p><span class="notif-time">${n.time}</span></div>`).join('');
            state.notifications.forEach(n => n.read = true);
            StateManager.save();
            setTimeout(() => this._updateNotifDot(), 1000);
        },

        // ── Goal Modal ───────────────────────────────────────
        _openGoalModal() {
            this.$('goalModal').style.display = 'flex';
            this.$('goalInput').value = StateManager.get().goal?.target || 200;
        },

        _closeGoalModal() { 
            this.$('goalModal').style.display = 'none'; 
        },

        _saveGoal() {
            const target = parseInt(this.$('goalInput').value) || 200;
            GoalTracker.setGoal(target);
            this._closeGoalModal();
            this.renderDashboard();
            this.showToast(`Goal set to ${target} kg CO₂/month`);
        },

        // ── Initialization ───────────────────────────────────
        init() {
            // Navigation event listeners
            this.$$('.nav-link').forEach(l => l.addEventListener('click', e => { e.preventDefault(); this.navigateTo(l.dataset.page); }));
            this.$$('.see-all-link').forEach(l => l.addEventListener('click', e => { e.preventDefault(); this.navigateTo(l.dataset.page); }));

            // Sidebar mobile controls
            this.$('hamburgerBtn').addEventListener('click', () => { this.$('sidebar').classList.add('open'); this.$('sidebarOverlay').classList.add('active'); });
            this.$('sidebarClose').addEventListener('click', () => { this.$('sidebar').classList.remove('open'); this.$('sidebarOverlay').classList.remove('active'); });
            this.$('sidebarOverlay').addEventListener('click', () => { this.$('sidebar').classList.remove('open'); this.$('sidebarOverlay').classList.remove('active'); });

            // Category tabs
            this.$('categoryTabs').addEventListener('click', e => {
                const tab = e.target.closest('.category-tab');
                if (!tab) return;
                this._currentCategory = tab.dataset.category;
                this._selectedActivity = null;
                this.$('activityInputBar').style.display = 'none';
                this.$$('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this._renderActivityCards(this._currentCategory);
            });

            // Activity logging
            this.$('addActivityBtn').addEventListener('click', () => this._addActivity());

            // Charts period tabs
            this.$$('.chart-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const card = tab.closest('.chart-card');
                    card.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    const p = tab.dataset.period;
                    const state = StateManager.get();
                    if (card.querySelector('#trendChart')) {
                        ChartManager.renderTrendChart('trendChart', state.activities, p === '7d' ? 7 : p === '30d' ? 30 : 90);
                    } else if (card.querySelector('#breakdownChart')) {
                        const acts = p === 'week' ? EmissionCalculator.getPeriodActivities(state.activities, 7) :
                                     p === 'month' ? EmissionCalculator.getMonthActivities(state.activities) : state.activities;
                        ChartManager.renderBreakdownChart('breakdownChart', acts);
                    }
                });
            });

            // History filters
            this.$('historyFilter').addEventListener('change', () => this.renderHistory());
            this.$('historySort').addEventListener('change', () => this.renderHistory());

            // Notification panel toggle
            this.$('notificationBtn').addEventListener('click', () => {
                const p = this.$('notificationPanel'); p.classList.toggle('open');
                if (p.classList.contains('open')) this._renderNotifications();
            });
            this.$('clearNotifs').addEventListener('click', () => { StateManager.update({ notifications: [] }); this._renderNotifications(); this._updateNotifDot(); });
            document.addEventListener('click', e => {
                const p = this.$('notificationPanel');
                if (!p.contains(e.target) && !this.$('notificationBtn').contains(e.target)) p.classList.remove('open');
            });

            // EcoBot chat events
            this.$('chatToggle').addEventListener('click', () => this.toggleChat());
            this.$('chatMinimize').addEventListener('click', () => this.toggleChat());
            this.$('chatSend').addEventListener('click', () => this._sendChatMessage());
            this.$('chatInput').addEventListener('keydown', e => { if (e.key === 'Enter') this._sendChatMessage(); });
            this.$$('.chat-suggestion-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.$('chatInput').value = btn.dataset.msg;
                    this._sendChatMessage();
                });
            });

            // Goal modal events
            this.$('goalEditBtn').addEventListener('click', () => this._openGoalModal());
            this.$('goalModalClose').addEventListener('click', () => this._closeGoalModal());
            this.$('goalModalCancel').addEventListener('click', () => this._closeGoalModal());
            this.$('goalModalSave').addEventListener('click', () => this._saveGoal());
            this.$$('.goal-preset').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.$$('.goal-preset').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.$('goalInput').value = btn.dataset.goal;
                });
            });
            this.$('goalModal').addEventListener('click', e => { if (e.target === this.$('goalModal')) this._closeGoalModal(); });

            // Keyboard accessibility
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    this.$('notificationPanel').classList.remove('open');
                    this.$('sidebar').classList.remove('open');
                    this.$('sidebarOverlay').classList.remove('active');
                    if (this._chatOpen) this.toggleChat();
                    this._closeGoalModal();
                }
            });

            // Set Header Greeting & Date
            const hr = new Date().getHours();
            this.$('greetingText').textContent = hr < 12 ? 'Good Morning ☀️' : hr < 17 ? 'Good Afternoon 🌤️' : 'Good Evening 🌙';
            this.$('dateDisplay').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            // Final initialization steps
            this._updateNotifDot();
            this.renderDashboard();
        }
    };

    // ═══════════════════════════════════════════════════════════
    // BOOT — Initialize the application
    // ═══════════════════════════════════════════════════════════

    function boot() {
        StateManager.load();
        UIController.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    // Expose navigateTo globally specifically for inline onclick handlers in HTML (e.g. empty states)
    window.navigateTo = (page) => UIController.navigateTo(page);

})();
