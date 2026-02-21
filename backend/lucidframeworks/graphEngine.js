/**
 * Dream Graph Data Structure and Layout Engine
 * Backend logic for managing dream graph visualization
 */

class DreamGraph {
    constructor() {
        this.scenes = [];
        this.sceneIdCounter = 0;
    }

    addScene(description, x, y) {
        const scene = {
            id: ++this.sceneIdCounter,
            name: description,
            edges: [],
            x: x || Math.random() * 400 + 100,
            y: y || Math.random() * 400 + 100
        };
        this.scenes.push(scene);
        return scene;
    }

    addTransition(fromId, toId, probability) {
        if (fromId === toId) {
            throw new Error('Source and destination must be different');
        }

        if (probability < 0 || probability > 1) {
            throw new Error('Probability must be between 0.0 and 1.0');
        }

        const fromScene = this.scenes.find(s => s.id === fromId);
        const toScene = this.scenes.find(s => s.id === toId);

        if (!fromScene || !toScene) {
            throw new Error('Scene not found');
        }

        fromScene.edges.push({
            to: toScene,
            probability: probability
        });

        return fromScene;
    }

    getScene(id) {
        return this.scenes.find(s => s.id === id);
    }

    getAllScenes() {
        return this.scenes;
    }

    clear() {
        this.scenes = [];
        this.sceneIdCounter = 0;
    }
}

/**
 * Apply force-directed layout to prevent overlaps
 */
function applyForceLayout(scenes, canvasWidth, canvasHeight) {
    const repulsionStrength = 5000;
    const minDistance = 100;
    
    for (let i = 0; i < scenes.length; i++) {
        let fx = 0, fy = 0;
        
        for (let j = 0; j < scenes.length; j++) {
            if (i === j) continue;
            
            const dx = scenes[i].x - scenes[j].x;
            const dy = scenes[i].y - scenes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < minDistance && distance > 0) {
                const force = repulsionStrength / (distance * distance);
                fx += (dx / distance) * force;
                fy += (dy / distance) * force;
            }
        }
        
        scenes[i].x += fx * 0.01;
        scenes[i].y += fy * 0.01;
        
        // Keep within bounds
        scenes[i].x = Math.max(80, Math.min(canvasWidth - 80, scenes[i].x));
        scenes[i].y = Math.max(80, Math.min(canvasHeight - 80, scenes[i].y));
    }
}

/**
 * Check if a point is inside a circle (scene node)
 */
function isPointInCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    return (dx * dx + dy * dy) <= (radius * radius);
}

/**
 * Find scene at mouse position
 */
function findSceneAtPosition(scenes, x, y, offset) {
    for (let i = scenes.length - 1; i >= 0; i--) {
        const scene = scenes[i];
        const sx = scene.x + offset.x;
        const sy = scene.y + offset.y;
        if (isPointInCircle(x, y, sx, sy, 35)) {
            return scene;
        }
    }
    return null;
}

/**
 * Serialize graph to JSON
 */
function serializeGraph(graph) {
    return JSON.stringify({
        scenes: graph.scenes,
        sceneIdCounter: graph.sceneIdCounter
    });
}

/**
 * Deserialize graph from JSON
 */
function deserializeGraph(jsonStr) {
    const data = JSON.parse(jsonStr);
    const graph = new DreamGraph();
    graph.scenes = data.scenes;
    graph.sceneIdCounter = data.sceneIdCounter;
    return graph;
}
