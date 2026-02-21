/**
 * Dream Tracker - Track and analyze dreams over time
 * Automatic transition analysis and dream sequence prediction
 */

class DreamTracker {
    constructor() {
        this.dreams = [];
        this.transitions = new Map(); // from -> to: count
        this.sceneFrequency = new Map(); // scene -> count
        this.dreamSequences = []; // historical sequences
        this.loadFromStorage();
    }

    /**
     * Record a new dream with all extracted data
     */
    recordDream(scenesList, timestamp = new Date()) {
        const dream = {
            id: Date.now(),
            timestamp: timestamp,
            scenes: scenesList.map(s => typeof s === 'string' ? s : s.scene),
            rawScenes: scenesList,
            transitions: this.extractTransitions(scenesList),
            sceneCount: scenesList.length,
            timestamp_iso: timestamp.toISOString()
        };

        this.dreams.push(dream);
        this.updateTransitionMap(dream.transitions);
        this.updateSceneFrequency(dream.scenes);
        this.dreamSequences.push(dream.scenes);
        
        this.saveToStorage();
        return dream;
    }

    /**
     * Extract transitions from scenes
     */
    extractTransitions(scenes) {
        const transitions = [];
        for (let i = 0; i < scenes.length - 1; i++) {
            const from = typeof scenes[i] === 'string' ? scenes[i] : scenes[i].scene;
            const to = typeof scenes[i + 1] === 'string' ? scenes[i + 1] : scenes[i + 1].scene;
            transitions.push({ from, to });
        }
        return transitions;
    }

    /**
     * Update transition map
     */
    updateTransitionMap(transitions) {
        transitions.forEach(t => {
            const key = `${t.from}||${t.to}`;
            this.transitions.set(key, (this.transitions.get(key) || 0) + 1);
        });
    }

    /**
     * Update frequency map
     */
    updateSceneFrequency(scenes) {
        scenes.forEach(scene => {
            this.sceneFrequency.set(scene, (this.sceneFrequency.get(scene) || 0) + 1);
        });
    }

    /**
     * Get all recorded dreams
     */
    getAllDreams() {
        return this.dreams;
    }

    /**
     * Get recent dreams (last N dreams)
     */
    getRecentDreams(count = 5) {
        return this.dreams.slice(-count);
    }

    /**
     * Analyze transitions and return statistics
     */
    analyzeTransitions() {
        const analysis = {
            totalDreams: this.dreams.length,
            totalScenes: this.sceneFrequency.size,
            totalTransitions: this.transitions.size,
            topScenes: this.getTopScenes(5),
            topTransitions: this.getTopTransitions(5),
            mostCommonSequences: this.findCommonSequences(3),
            dreamPattern: this.identifyPattern()
        };
        return analysis;
    }

    /**
     * Get top recurring scenes
     */
    getTopScenes(limit = 5) {
        return Array.from(this.sceneFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([scene, count]) => ({ scene, count }));
    }

    /**
     * Get top transitions
     */
    getTopTransitions(limit = 5) {
        return Array.from(this.transitions.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([trans, count]) => {
                const [from, to] = trans.split('||');
                return { from, to, count };
            });
    }

    /**
     * Find common multi-scene sequences
     */
    findCommonSequences(length = 3) {
        const sequences = new Map();
        
        for (const dream of this.dreams) {
            for (let i = 0; i <= dream.scenes.length - length; i++) {
                const seq = dream.scenes.slice(i, i + length).join(' -> ');
                sequences.set(seq, (sequences.get(seq) || 0) + 1);
            }
        }

        return Array.from(sequences.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([seq, count]) => ({ sequence: seq, count }));
    }

    /**
     * Identify dream pattern type
     */
    identifyPattern() {
        if (this.dreams.length < 2) return 'insufficient_data';
        
        // Check for recurring scenes
        const avgSceneCount = this.dreams.reduce((sum, d) => sum + d.sceneCount, 0) / this.dreams.length;
        const recurringScenes = this.sceneFrequency.size;
        
        if (recurringScenes === this.sceneFrequency.size && recurringScenes < 5) {
            return 'cyclical'; // Same scenes repeat in cycles
        }
        if (avgSceneCount > 8) {
            return 'narrative_heavy'; // Complex narratives
        }
        if (this.transitions.size > this.sceneFrequency.size * 2) {
            return 'highly_connected'; // Many transitions
        }
        return 'mixed';
    }

    /**
     * Predict next dream based on patterns
     */
    predictNextDream() {
        if (this.dreams.length === 0) {
            return {
                prediction: [],
                confidence: 0,
                reasoning: 'No dreams recorded yet. Record a dream to start predictions.'
            };
        }

        if (this.dreams.length === 1) {
            return {
                prediction: this.dreams[0].scenes,
                confidence: 0.3,
                reasoning: 'Only one dream recorded. Suggesting the previous dream pattern.'
            };
        }

        // Get last dream
        const lastDream = this.dreams[this.dreams.length - 1];
        const lastScenes = lastDream.scenes;

        // Find likely next scenes based on transitions
        const nextSceneCandidates = new Map();

        // Strategy 1: Direct transitions from last scene
        if (lastScenes.length > 0) {
            const lastScene = lastScenes[lastScenes.length - 1];
            for (const [trans, count] of this.transitions.entries()) {
                const [from, to] = trans.split('||');
                if (from === lastScene) {
                    nextSceneCandidates.set(to, (nextSceneCandidates.get(to) || 0) + count);
                }
            }
        }

        // Strategy 2: Common opening scenes (scenes that frequently start dreams)
        const openingScenes = new Map();
        for (const dream of this.dreams) {
            if (dream.scenes.length > 0) {
                openingScenes.set(dream.scenes[0], (openingScenes.get(dream.scenes[0]) || 0) + 1);
            }
        }

        // If direct transitions don't help, use opening scenes
        if (nextSceneCandidates.size === 0 && openingScenes.size > 0) {
            for (const [scene, count] of openingScenes.entries()) {
                nextSceneCandidates.set(scene, count * 0.5); // Lower weight for opening scenes
            }
        }

        // Strategy 3: Most common scenes overall
        if (nextSceneCandidates.size === 0) {
            for (const [scene, count] of this.sceneFrequency.entries()) {
                if (!lastScenes.includes(scene)) {
                    nextSceneCandidates.set(scene, count * 0.3);
                }
            }
        }

        // Select top 3-5 candidates as predicted sequence
        const sortedCandidates = Array.from(nextSceneCandidates.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const totalWeight = sortedCandidates.reduce((sum, [_, w]) => sum + w, 0);
        const confidence = Math.min(0.95, Math.max(0.4, totalWeight / (this.dreams.length * 3)));

        const prediction = sortedCandidates.map(([scene, weight]) => ({
            scene,
            likelihood: weight / totalWeight
        }));

        return {
            prediction,
            confidence,
            reasoning: this.generateReasoningText(lastScenes, sortedCandidates),
            basedOn: `${this.dreams.length} dreams recorded`
        };
    }

    /**
     * Generate human-readable reasoning for prediction
     */
    generateReasoningText(lastScenes, candidates) {
        if (candidates.length === 0) return 'No clear pattern identified.';

        const topScene = candidates[0][0];
        const topTransitions = Array.from(this.transitions.entries())
            .filter(([trans]) => trans.split('||')[0] === lastScenes[lastScenes.length - 1])
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        if (topTransitions.length > 0) {
            const topDest = topTransitions[0][0].split('||')[1];
            return `Your dreams frequently transition to "${topDest}" after "${lastScenes[lastScenes.length - 1]}". Most likely candidate: "${topScene}"`;
        }

        const frequency = this.sceneFrequency.get(topScene) || 0;
        return `"${topScene}" appears ${frequency} times in your dreams. It's one of your most common scenes.`;
    }

    /**
     * Get detailed dream history
     */
    getDreamHistory() {
        return this.dreams.map((dream, idx) => ({
            index: idx + 1,
            date: new Date(dream.timestamp).toLocaleDateString(),
            time: new Date(dream.timestamp).toLocaleTimeString(),
            sceneCount: dream.sceneCount,
            scenes: dream.scenes,
            transitionCount: dream.transitions.length,
            summary: `${dream.sceneCount} scenes, ${dream.transitions.length} transitions`
        }));
    }

    /**
     * Clear all data
     */
    clear() {
        this.dreams = [];
        this.transitions.clear();
        this.sceneFrequency.clear();
        this.dreamSequences = [];
        this.saveToStorage();
    }

    /**
     * Save to local storage
     */
    saveToStorage() {
        const data = {
            dreams: this.dreams,
            transitions: Array.from(this.transitions.entries()),
            sceneFrequency: Array.from(this.sceneFrequency.entries()),
            dreamSequences: this.dreamSequences
        };
        localStorage.setItem('dreamTracker', JSON.stringify(data));
    }

    /**
     * Load from local storage
     */
    loadFromStorage() {
        const stored = localStorage.getItem('dreamTracker');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.dreams = data.dreams || [];
                this.transitions = new Map(data.transitions || []);
                this.sceneFrequency = new Map(data.sceneFrequency || []);
                this.dreamSequences = data.dreamSequences || [];
            } catch (e) {
                console.error('Error loading dream tracker data:', e);
            }
        }
    }

    /**
     * Export dream data as JSON
     */
    exportData() {
        return {
            exportDate: new Date().toISOString(),
            summary: this.analyzeTransitions(),
            dreams: this.dreams,
            prediction: this.predictNextDream(),
            history: this.getDreamHistory()
        };
    }

    /**
     * Get statistics for display
     */
    getStatistics() {
        return {
            totalDreamsRecorded: this.dreams.length,
            uniqueScenes: this.sceneFrequency.size,
            totalTransitions: this.transitions.size,
            averageScenesPerDream: this.dreams.length > 0 
                ? (this.dreams.reduce((sum, d) => sum + d.sceneCount, 0) / this.dreams.length).toFixed(1)
                : 0,
            mostFrequentScene: this.sceneFrequency.size > 0 
                ? Array.from(this.sceneFrequency.entries()).sort((a, b) => b[1] - a[1])[0][0]
                : 'None',
            mostCommonTransition: this.transitions.size > 0
                ? Array.from(this.transitions.entries()).sort((a, b) => b[1] - a[1])[0][0]
                : 'None'
        };
    }
}

// Global instance
let dreamTracker = null;

function initializeDreamTracker() {
    if (!dreamTracker) {
        dreamTracker = new DreamTracker();
    }
    return dreamTracker;
}
/**
 * Assigns tags to dreams based on detected symbols
 */
function generateDreamTags(symbolsMap) {
    const tags = [];
    const symbolList = Array.from(symbolsMap.keys());

    if (symbolList.includes('flying') || symbolList.includes('sky')) tags.push('Lucid-Potential');
    if (symbolList.includes('water') || symbolList.includes('ocean')) tags.push('Emotional-Heavy');
    if (symbolList.includes('forest') || symbolList.includes('path')) tags.push('Transition-Phase');
    if (tags.length === 0) tags.push('Abstract');

    return tags;
}
