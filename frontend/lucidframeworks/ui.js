/**
 * Frontend UI Logic - Enhanced Version
 * Handles DOM interactions, canvas rendering, voice recognition, and AI interpretation
 */

// Global State
let dreamGraph = new DreamGraph();
let dreamTracker = null;
let recognition = null;
let isListening = false;
let fullTranscript = '';
let lastVoiceAnalysis = null;
let lastDreamAnalysis = null;
let extractedScenes = [];
let extractedTransitions = [];
let currentDreamSession = null;

// Canvas Setup - Initialized after DOM loads
let canvas = null;
let ctx = null;
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let offset = { x: 0, y: 0 };

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    // Initialize canvas safely
    canvas = document.getElementById('graphCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
    } else {
        console.error('Canvas element not found');
    }
    
    // Setup voice recognition FIRST
    setupVoice();
    
    // Setup canvas interaction (must be after canvas is initialized)
    setupCanvasInteraction();
    
    // Then attach event listeners
    attachEventListeners();
    
    // Initialize dream tracker
    dreamTracker = initializeDreamTracker();
    displayDreamTrackerStats();

    // Add to your UI initialization
document.getElementById('sceneList').addEventListener('click', (e) => {
    const sceneItem = e.target.closest('.scene-item');
    if (sceneItem) {
        const sceneId = parseInt(sceneItem.querySelector('.scene-id').textContent.replace('Scene ', ''));
        const scene = dreamGraph.getScene(sceneId);
        
        if (scene) {
            // Center the camera on the selected scene
            offset.x = (canvas.width / 2) - scene.x;
            offset.y = (canvas.height / 2) - scene.y;
            drawGraph();
            
            // Temporary highlight effect
            ctx.strokeStyle = '#ff9800';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(scene.x + offset.x, scene.y + offset.y, 45, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
});
});

window.addEventListener('resize', resizeCanvas);

/**
 * Attach all event listeners
 */
function attachEventListeners() {
    // Voice buttons
    const startVoiceBtn = document.getElementById('startVoiceBtn');
    if (startVoiceBtn) {
        startVoiceBtn.addEventListener('click', startVoiceRecognition);
    }
    
    const stopVoiceBtn = document.getElementById('stopVoiceBtn');
    if (stopVoiceBtn) {
        stopVoiceBtn.addEventListener('click', stopVoiceRecognition);
    }
    
    // Scene and transition buttons
    const addSceneBtn = document.getElementById('addSceneBtn');
    if (addSceneBtn) {
        addSceneBtn.addEventListener('click', uiAddScene);
    }
    
    const addTransitionBtn = document.getElementById('addTransitionBtn');
    if (addTransitionBtn) {
        addTransitionBtn.addEventListener('click', uiAddTransition);
    }
    
    // Action buttons
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', uiAnalyzeTransitions);
    }
    
    const interpretBtn = document.getElementById('interpretBtn');
    if (interpretBtn) {
        interpretBtn.addEventListener('click', uiInterpretDream);
    }
    
    const historyBtn = document.getElementById('historyBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', displayDreamHistory);
    }
    
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportDreamData);
    }
    
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearDreamData);
    }
    
    const addExtractedBtn = document.getElementById('addExtractedBtn');
    if (addExtractedBtn) {
        addExtractedBtn.addEventListener('click', uiAddExtractedScenes);
    }
    

}

/**
 * Voice Recognition Setup with Enhanced Features
 */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function setupVoice() {
    if (!SpeechRecognition) {
        console.warn('[v0] Speech Recognition not supported - text fallback enabled');
        const startBtn = document.getElementById('startVoiceBtn');
        if (startBtn) {
            startBtn.innerHTML = '<span aria-hidden="true">&#9998;</span> Type Dream Instead';
        }
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        isListening = true;
        fullTranscript = '';
        const startBtn = document.getElementById('startVoiceBtn');
        const stopBtn = document.getElementById('stopVoiceBtn');
        const statusDiv = document.getElementById('voiceStatus');
        const transcript = document.getElementById('voiceTranscript');
        
        if (startBtn) startBtn.classList.add('hidden');
        if (stopBtn) stopBtn.classList.remove('hidden');
        if (statusDiv) statusDiv.classList.remove('hidden');
        if (transcript) {
            transcript.textContent = 'Listening...';
            transcript.classList.remove('empty');
        }
        
        updateStatus('Listening...', 'info');
    };

    recognition.onresult = function(event) {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const confidence = event.results[i][0].confidence;
            if (event.results[i].isFinal) {
                fullTranscript += event.results[i][0].transcript + ' ';
            } else {
                interim += event.results[i][0].transcript;
            }
        }
        const displayText = (fullTranscript + interim) || 'Listening...';
        document.getElementById('voiceTranscript').textContent = displayText;
    };

    recognition.onerror = function(event) {
        console.error('[VOICE] Recognition error:', event.error);
        isListening = false;
        updateStatus('Error: ' + event.error, 'error');
        const transcript = document.getElementById('voiceTranscript');
        if (transcript) transcript.textContent = 'Error: ' + event.error;
    };

    recognition.onend = function() {
        const wasListening = isListening;
        isListening = false;
        const startBtn = document.getElementById('startVoiceBtn');
        const stopBtn = document.getElementById('stopVoiceBtn');
        const statusDiv = document.getElementById('voiceStatus');
        
        if (startBtn) startBtn.classList.remove('hidden');
        if (stopBtn) stopBtn.classList.add('hidden');
        if (statusDiv) statusDiv.classList.add('hidden');
        
        // Only process if we were actually listening (not an abort/restart)
        if (wasListening && fullTranscript.trim().length > 5) {
            updateStatus('Processing voice input...', 'info');
            uiProcessTranscript(fullTranscript);
        } else if (wasListening) {
            updateStatus('No speech detected', 'warning');
        }
    };
}

function startVoiceRecognition() {
    // If speech recognition is not supported, show text input fallback
    if (!recognition) {
        showTextInputFallback();
        return;
    }
    
    if (isListening) {
        return;
    }
    
    try {
        fullTranscript = '';
        // Don't call abort before start - it triggers onend prematurely
        recognition.start();
    } catch (e) {
        // If already started or other error, try abort + restart
        try {
            recognition.abort();
            setTimeout(() => {
                fullTranscript = '';
                recognition.start();
            }, 200);
        } catch (e2) {
            console.error('[v0] Voice recognition failed:', e2);
            isListening = false;
            showTextInputFallback();
        }
    }
}

function showTextInputFallback() {
    const transcript = document.getElementById('voiceTranscript');
    if (!transcript) return;
    
    transcript.classList.remove('empty');
    transcript.innerHTML = '';
    transcript.contentEditable = 'true';
    transcript.setAttribute('role', 'textbox');
    transcript.setAttribute('aria-label', 'Type your dream description here');
    transcript.style.cursor = 'text';
    transcript.textContent = '';
    transcript.focus();
    
    // Show a submit button
    const startBtn = document.getElementById('startVoiceBtn');
    if (startBtn) {
        startBtn.textContent = 'Process Text';
        startBtn.onclick = function() {
            const text = transcript.textContent.trim();
            if (text.length > 5) {
                fullTranscript = text;
                transcript.contentEditable = 'false';
                uiProcessTranscript(text);
            } else {
                updateStatus('Please type a longer dream description', 'warning');
            }
        };
    }
    
    updateStatus('Voice not supported -- type your dream instead', 'warning');
}

function stopVoiceRecognition() {
    if (recognition && isListening) {
        recognition.stop();
    }
}

/**
 * Process transcript using backend analysis - Enhanced
 */
function uiProcessTranscript(transcript) {
    // Analyze with enhanced voice processor
    const voiceAnalysis = analyzeTranscript(transcript);
    
    if (!voiceAnalysis) {
        alert('Transcript too short or unclear');
        return;
    }

    lastVoiceAnalysis = voiceAnalysis;
    extractedScenes = voiceAnalysis.scenes;
    extractedTransitions = voiceAnalysis.transitions;
    
    // Auto-record dream to tracker
    if (dreamTracker && extractedScenes.length > 0) {
        const sceneNames = extractedScenes.map(s => typeof s === 'string' ? s : s.scene);
        currentDreamSession = dreamTracker.recordDream(sceneNames);
        console.log('Dream recorded to tracker:', currentDreamSession);
    }

    // Display confidence and quality
    displayVoiceQuality(voiceAnalysis);
    displayExtractedData();
    uiAnalyzeDreamWithAI(transcript, voiceAnalysis);
}

/**
 * Display voice recognition quality metrics
 */
function displayVoiceQuality(voiceAnalysis) {
    const qualitySection = document.getElementById('voiceQuality') || createVoiceQualityElement();
    
    const confidencePercent = Math.round(voiceAnalysis.confidence * 100);
    const confidenceColor = voiceAnalysis.confidence > 0.75 ? '#4caf50' : 
                           voiceAnalysis.confidence > 0.5 ? '#ff9800' : '#f44336';
    
    qualitySection.innerHTML = `
        <div style="padding: 12px; background: rgba(76, 175, 80, 0.1); border-radius: 8px; margin-top: 12px;">
            <div style="margin-bottom: 8px;"><strong>🎯 Recognition Quality: ${voiceAnalysis.qualityLevel}</strong></div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="flex: 1; height: 24px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${confidencePercent}%; height: 100%; background: ${confidenceColor}; transition: width 0.3s;"></div>
                </div>
                <span style="font-weight: bold; color: ${confidenceColor};">${confidencePercent}%</span>
            </div>
            <div style="margin-top: 8px; font-size: 0.9em; color: var(--color-text-secondary);">
                <div>Words: ${voiceAnalysis.wordCount} | Sentences: ${voiceAnalysis.sentenceCount}</div>
            </div>
        </div>
    `;
}

function createVoiceQualityElement() {
    // Append to the voice card container, not the hidden voiceStatus
    const container = document.getElementById('voiceStatus')?.closest('.card') || document.getElementById('voiceStatus');
    const qualityDiv = document.createElement('div');
    qualityDiv.id = 'voiceQuality';
    container.appendChild(qualityDiv);
    return qualityDiv;
}

/**
 * Display extracted data UI
 */
function displayExtractedData() {
    const extractedData = document.getElementById('extractedData');
    const extractedList = document.getElementById('extractedList');

    if (extractedScenes.length === 0) {
        extractedData.classList.add('hidden');
        return;
    }

    extractedList.innerHTML = extractedScenes.map((sceneObj, idx) => {
        const sceneName = typeof sceneObj === 'string' ? sceneObj : sceneObj.scene;
        const confidence = sceneObj.confidence || 0.8;
        return `
            <li class="extracted-item">
                <div class="extracted-item-label">Scene ${idx + 1}</div>
                <div class="extracted-item-text">${escapeHtml(sceneName)}</div>
                <div class="confidence-badge" style="font-size: 0.8em; color: var(--color-text-secondary);">
                    Confidence: ${Math.round(confidence * 100)}%
                </div>
            </li>
        `;
    }).join('');

    extractedData.classList.remove('hidden');
}

/**
 * Analyze dream with AI and display results - Enhanced
 */
function uiAnalyzeDreamWithAI(transcript, voiceAnalysis) {
    const analysisSection = document.getElementById('dreamAnalysisSection');
    const analysisContent = document.getElementById('dreamAnalysisContent');
    
    analysisSection.classList.remove('hidden');
    analysisContent.innerHTML = '<div style="text-align: center; padding: 20px;"><div class="loading-spinner"></div> Advanced Dream Analysis...</div>';

    requestAnimationFrame(() => {
        const voiceData = analyzeTranscript(transcript);
        const segments = segmentDreamTranscript(transcript);
        const analysis = performDeepDreamAnalysis(transcript, voiceData, segments);
        
        lastDreamAnalysis = analysis;
        uiDisplayDreamAnalysis(analysis, segments);
    });
}

/**
 * Display dream analysis results UI - Enhanced
 */
function uiDisplayDreamAnalysis(analysis, segments) {
    const content = document.getElementById('dreamAnalysisContent');
    let html = '';

    // Overview
    html += `<div class="ai-insights">
        <div class="insight-title">📊 Dream Overview</div>
        <div class="insight-item"><strong>Theme:</strong> ${analysis.theme}</div>
        <div class="insight-item"><strong>Complexity:</strong> ${analysis.complexity} (${analysis.wordCount} words)</div>
        <div class="insight-item"><strong>Dominant Emotion:</strong> <span class="emotion-indicator emotion-${analysis.dominantEmotion}">${analysis.dominantEmotion.toUpperCase()}</span></div>
        <div class="insight-item"><strong>Recognition Quality:</strong> ${analysis.qualityLevel} (${Math.round(analysis.confidence * 100)}%)</div>
    </div>`;

    // Segments (limit display to first 5)
    if (segments.length > 0) {
        html += `<div style="margin-top: 16px;"><strong style="color: var(--color-primary);">🔍 Key Segments (${segments.length})</strong>`;
        segments.slice(0, 5).forEach((seg, i) => {
            html += `<div class="dream-segment" style="margin-top: 8px;">
                <div class="segment-label">${seg.type.toUpperCase()}</div>
                <div class="segment-text">"${escapeHtml(seg.text.substring(0, 100))}${seg.text.length > 100 ? '...' : ''}"</div>
            </div>`;
        });
        if (segments.length > 5) html += `<div style="padding: 8px; color: var(--color-text-secondary);">+ ${segments.length - 5} more segments</div>`;
        html += `</div>`;
    }

    // Symbols
    if (analysis.symbols.size > 0) {
        html += `<div class="ai-insights" style="margin-top: 16px;"><div class="insight-title">✨ Symbols Found (${analysis.symbols.size})</div>`;
        let symbolCount = 0;
        analysis.symbols.forEach((meaning, symbol) => {
            if (symbolCount++ < 8) {
                html += `<div class="insight-item"><strong>${symbol}:</strong> ${meaning.substring(0, 80)}...</div>`;
            }
        });
        html += `</div>`;
    }

    // Emotions
    if (Object.keys(analysis.emotionCounts || {}).length > 0) {
        html += `<div class="ai-insights" style="margin-top: 16px;"><div class="insight-title">😊 Emotions Detected</div>`;
        let emotionCount = 0;
        Object.entries(analysis.emotionCounts).forEach(([emotion, count]) => {
            if (count > 0 && emotionCount++ < 5) {
                html += `<div class="insight-item"><strong>${emotion}:</strong> ${count} occurrence${count > 1 ? 's' : ''}</div>`;
            }
        });
        html += `</div>`;
    }

    // Insights
    html += `<div class="ai-insights" style="margin-top: 16px;">
        <div class="insight-title">🧠 Psychological Insights</div>
        ${generatePsychologicalInsights(analysis)}
    </div>`;
    
    // Add AI interpretation button
    html += `<div style="margin-top: 16px; text-align: center;">
        <button onclick="uiGenerateAIDreamReport()" style="padding: 12px 24px; background: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1em;">
            🤖 Generate Full AI Dream Report
        </button>
    </div>`;

    content.innerHTML = html;
    
    // Show dream tracking stats and predictions
    setTimeout(() => {
        displayDreamTrackerStats();
        displayPredictedNextDream();
    }, 100);
}

/**
 * Generate comprehensive AI dream interpretation report
 */
function uiGenerateAIDreamReport() {
    if (!lastDreamAnalysis) {
        alert('Please analyze a dream first');
        return;
    }

    const reportSection = document.getElementById('aiReportSection') || createAIReportElement();
    const reportContent = reportSection.querySelector('.ai-report-content');
    
    reportContent.innerHTML = '<div style="text-align: center; padding: 20px;"><div class="loading-spinner"></div> Generating AI Report...</div>';

    requestAnimationFrame(() => {
        const report = generateComprehensiveReport(lastDreamAnalysis);
        reportContent.innerHTML = report;
    });
}

function createAIReportElement() {
    const section = document.createElement('div');
    section.id = 'aiReportSection';
    section.innerHTML = `
        <div style="margin-top: 24px; padding: 20px; background: var(--color-bg-1); border-radius: 12px; border-left: 4px solid var(--color-primary);">
            <div class="ai-report-content"></div>
        </div>
    `;
    document.getElementById('dreamAnalysisSection').after(section);
    return section;
}

/**
 * Add scene from UI
 */
function uiAddScene() {
    const desc = document.getElementById('sceneDesc').value.trim();
    if (!desc) {
        alert('Please enter a scene description');
        return;
    }

    const canvas = document.getElementById('graphCanvas');
    dreamGraph.addScene(desc, Math.random() * (canvas.width - 200) + 100, Math.random() * (canvas.height - 200) + 100);
    
    document.getElementById('sceneDesc').value = '';
    
    // Apply force layout
    for (let i = 0; i < 50; i++) {
        applyForceLayout(dreamGraph.scenes, canvas.width, canvas.height);
    }
    
    updateSceneSelects();
    updateSceneList();
    drawGraph();
}

/**
 * Add transition from UI
 */
function uiAddTransition() {
    const fromId = parseInt(document.getElementById('fromScene').value);
    const toId = parseInt(document.getElementById('toScene').value);
    const prob = parseFloat(document.getElementById('probability').value);

    if (!fromId || !toId) {
        alert('Please select both source and destination scenes');
        return;
    }

    try {
        dreamGraph.addTransition(fromId, toId, prob);
        document.getElementById('probability').value = 0.5;
        drawGraph();
    } catch (e) {
        alert(e.message);
    }
}

/**
 * Update scene select dropdowns
 */
function updateSceneSelects() {
    const fromSelect = document.getElementById('fromScene');
    const toSelect = document.getElementById('toScene');
    const scenes = dreamGraph.getAllScenes();
    
    const options = scenes.map(s => 
        `<option value="${s.id}">Scene ${s.id}: ${s.name}</option>`
    ).join('');

    fromSelect.innerHTML = '<option value="">Select source scene</option>' + options;
    toSelect.innerHTML = '<option value="">Select destination scene</option>' + options;
}

/**
 * Update scene list display
 */
function updateSceneList() {
    const list = document.getElementById('sceneList');
    const scenes = dreamGraph.getAllScenes();
    
    if (scenes.length === 0) {
        list.innerHTML = '<div class="empty-state">No scenes yet. Add your first dream scene!</div>';
        return;
    }

    list.innerHTML = scenes.map(scene => `
        <div class="scene-item">
            <div class="scene-id">Scene ${scene.id}</div>
            <div class="scene-name">${scene.name}</div>
        </div>
    `).join('');
}

/**
 * Add extracted scenes to graph
 */
function uiAddExtractedScenes() {
    if (extractedScenes.length === 0) {
        alert('No scenes extracted from transcript');
        return;
    }

    const canvas = document.getElementById('graphCanvas');
    let addedCount = 0;

    // Add all extracted scenes
    extractedScenes.forEach(sceneName => {
        dreamGraph.addScene(sceneName, Math.random() * (canvas.width - 200) + 100, Math.random() * (canvas.height - 200) + 100);
        addedCount++;
    });

    // Add transitions between scenes
    const scenes = dreamGraph.getAllScenes();
    extractedTransitions.forEach(transition => {
        if (scenes.length > 0) {
            const fromScene = scenes[scenes.length - 1];
            const toScene = scenes.find(s => 
                s.name.toLowerCase().includes(transition.destination.toLowerCase().split(' ')[0]) ||
                transition.destination.toLowerCase().includes(s.name.toLowerCase())
            );

            if (toScene && fromScene.id !== toScene.id) {
                try {
                    dreamGraph.addTransition(fromScene.id, toScene.id, transition.probability);
                } catch (e) {
                    console.warn(e.message);
                }
            }
        }
    });

    // Apply layout
    for (let i = 0; i < 50; i++) {
        applyForceLayout(dreamGraph.scenes, canvas.width, canvas.height);
    }

    updateSceneSelects();
    updateSceneList();
    drawGraph();

    document.getElementById('voiceTranscript').textContent = '';
    document.getElementById('voiceTranscript').classList.add('empty');
    document.getElementById('extractedData').classList.add('hidden');
    document.getElementById('dreamAnalysisSection').classList.add('hidden');
    fullTranscript = '';

    alert(`Added ${addedCount} scenes from voice transcript!`);
}

/**
 * Analyze transitions and display results
 */
function uiAnalyzeTransitions() {
    const scenes = dreamGraph.getAllScenes();
    if (scenes.length === 0) {
        alert('Add scenes first to analyze');
        return;
    }

    const report = analyzeTransitionsReport(scenes);
    const output = document.getElementById('sequenceOutput');
    output.classList.remove('hidden');
    
    // Ensure report is a string
    const reportString = typeof report === 'string' ? report : String(report);
    output.textContent = reportString;
    
    // Auto-save dream to tracker
    if (dreamTracker && scenes.length > 0) {
        const sceneNames = scenes.map(s => s.name);
        dreamTracker.recordDream(sceneNames);
        displayDreamTrackerStats();
        displayPredictedNextDream();
    }
}

/**
 * Interpret dream and display results
 */
function uiInterpretDream() {
    const scenes = dreamGraph.getAllScenes();
    if (scenes.length === 0) {
        alert('Add dream scenes first to interpret');
        return;
    }

    // Build a proper analysis object from available data or perform fresh analysis
    const analysis = lastDreamAnalysis || {
        theme: 'Unknown',
        complexity: 'Unknown',
        symbols: new Map(),
        qualityLevel: 'N/A',
        confidence: 0,
        emotionCounts: {},
        patterns: {}
    };

    const report = generateInterpretation(scenes, analysis, dreamSymbols);
    const output = document.getElementById('sequenceOutput');
    output.classList.remove('hidden');
    output.textContent = report;
}

// ============================================
// CANVAS RENDERING
// ============================================

function resizeCanvas() {
    if (!canvas) {
        console.error('Canvas not initialized');
        return;
    }
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawGraph();
}

// Theme-aware canvas colors
const canvasColors = {
    nodeFills: [
        'rgba(99, 102, 241, 0.3)',   // indigo
        'rgba(244, 114, 182, 0.3)',   // pink
        'rgba(34, 211, 238, 0.3)',    // cyan
        'rgba(251, 191, 36, 0.3)',    // amber
        'rgba(52, 211, 153, 0.3)'    // emerald
    ],
    nodeStrokes: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(244, 114, 182, 0.8)',
        'rgba(34, 211, 238, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(52, 211, 153, 0.8)'
    ],
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    labelBg: 'rgba(16, 16, 42, 0.85)',
    primary: '#8b5cf6'
};

function drawGraph() {
    if (!ctx || !canvas) {
        console.error('Canvas context not initialized');
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scenes = dreamGraph.getAllScenes();

    if (scenes.length === 0) {
        ctx.fillStyle = canvasColors.textSecondary;
        ctx.font = '16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Add scenes to visualize your dream graph', canvas.width / 2, canvas.height / 2);
        return;
    }

    // Draw edges
    scenes.forEach(scene => {
        scene.edges.forEach(edge => {
            drawEdge(scene, edge);
        });
    });

    // Draw nodes
    scenes.forEach((scene, index) => {
        drawNode(scene, index);
    });
}

function drawEdge(scene, edge) {
    const from = { x: scene.x + offset.x, y: scene.y + offset.y };
    const to = { x: edge.to.x + offset.x, y: edge.to.y + offset.y };

    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const arrowEnd = {
        x: to.x - 40 * Math.cos(angle),
        y: to.y - 40 * Math.sin(angle)
    };

    // Draw line
    ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 + edge.probability * 0.7})`;
    ctx.lineWidth = 2 + edge.probability * 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(arrowEnd.x, arrowEnd.y);
    ctx.stroke();

    // Draw arrow head
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(arrowEnd.x, arrowEnd.y);
    ctx.lineTo(
        arrowEnd.x - 10 * Math.cos(angle - Math.PI / 6),
        arrowEnd.y - 10 * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        arrowEnd.x - 10 * Math.cos(angle + Math.PI / 6),
        arrowEnd.y - 10 * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    // Draw probability label
    const midX = (from.x + arrowEnd.x) / 2;
    const midY = (from.y + arrowEnd.y) / 2;
    ctx.fillStyle = canvasColors.labelBg;
    ctx.beginPath();
    ctx.roundRect(midX - 22, midY - 12, 44, 24, 6);
    ctx.fill();
    ctx.fillStyle = canvasColors.text;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(edge.probability.toFixed(2), midX, midY + 4);
}

function drawNode(scene, index) {
    const x = scene.x + offset.x;
    const y = scene.y + offset.y;
    const colorIdx = index % canvasColors.nodeFills.length;

    // Outer glow
    ctx.shadowColor = canvasColors.nodeStrokes[colorIdx];
    ctx.shadowBlur = 12;

    // Draw node circle
    ctx.fillStyle = canvasColors.nodeFills[colorIdx];
    ctx.strokeStyle = canvasColors.nodeStrokes[colorIdx];
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Draw node label
    ctx.fillStyle = canvasColors.text;
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`S${scene.id}`, x, y + 5);

    // Draw scene name below
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = canvasColors.textSecondary;
    const text = scene.name.length > 15 ? scene.name.substring(0, 15) + '...' : scene.name;
    ctx.fillText(text, x, y + 55);
}

// ============================================
// CANVAS INTERACTION
// ============================================

let draggedScene = null;
let dragOffset = { x: 0, y: 0 };

function setupCanvasInteraction() {
    if (!canvas) return;

    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        draggedScene = findSceneAtPosition(dreamGraph.scenes, mouseX, mouseY, offset);
        
        if (draggedScene) {
            dragOffset.x = mouseX - (draggedScene.x + offset.x);
            dragOffset.y = mouseY - (draggedScene.y + offset.y);
            canvas.style.cursor = 'grabbing';
        } else {
            isDragging = true;
            dragStart = { x: e.clientX - offset.x, y: e.clientY - offset.y };
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (draggedScene) {
            draggedScene.x = mouseX - offset.x - dragOffset.x;
            draggedScene.y = mouseY - offset.y - dragOffset.y;
            
            draggedScene.x = Math.max(80, Math.min(canvas.width - 80, draggedScene.x));
            draggedScene.y = Math.max(80, Math.min(canvas.height - 80, draggedScene.y));
            
            drawGraph();
        } else if (isDragging) {
            offset.x = e.clientX - dragStart.x;
            offset.y = e.clientY - dragStart.y;
            drawGraph();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        draggedScene = null;
        canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        draggedScene = null;
        canvas.style.cursor = 'grab';
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Update status message with optional styling
 */
function updateStatus(message, type = 'info') {
    const statusElement = document.getElementById('statusText');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    
    // Clear previous classes
    statusElement.className = '';
    
    // Add status styling
    switch(type) {
        case 'error':
            statusElement.style.color = '#f44336';
            break;
        case 'success':
            statusElement.style.color = '#4caf50';
            break;
        case 'warning':
            statusElement.style.color = '#ff9800';
            break;
        case 'info':
        default:
            statusElement.style.color = 'var(--color-text-secondary)';
    }
}

// ============================================
// DREAM TRACKING & PREDICTION
// ============================================

/**
 * Display dream tracker statistics
 */
function displayDreamTrackerStats() {
    if (!dreamTracker) return;
    
    const stats = dreamTracker.getStatistics();
    const output = document.getElementById('sequenceOutput');
    
    let html = `<div style="padding: 16px; background: var(--color-surface); border-radius: 8px; margin-top: 16px;">
        <div style="font-weight: 600; font-size: 1.1em; margin-bottom: 12px; color: var(--color-primary);">📊 Dream Tracking Statistics</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.95em;">
            <div>
                <span style="color: var(--color-text-secondary);">Dreams Recorded:</span>
                <div style="font-size: 1.4em; font-weight: bold; color: var(--color-primary);">${stats.totalDreamsRecorded}</div>
            </div>
            <div>
                <span style="color: var(--color-text-secondary);">Unique Scenes:</span>
                <div style="font-size: 1.4em; font-weight: bold; color: var(--color-primary);">${stats.uniqueScenes}</div>
            </div>
            <div>
                <span style="color: var(--color-text-secondary);">Scene Transitions:</span>
                <div style="font-size: 1.4em; font-weight: bold; color: var(--color-primary);">${stats.totalTransitions}</div>
            </div>
            <div>
                <span style="color: var(--color-text-secondary);">Avg Scenes/Dream:</span>
                <div style="font-size: 1.4em; font-weight: bold; color: var(--color-primary);">${stats.averageScenesPerDream}</div>
            </div>
        </div>
        <div style="margin-top: 12px; padding: 8px; background: var(--color-bg-1); border-radius: 4px;">
            <div style="font-size: 0.9em;"><strong>Most Frequent Scene:</strong> "${escapeHtml(stats.mostFrequentScene)}"</div>
            <div style="font-size: 0.9em; margin-top: 8px;"><strong>Most Common Transition:</strong> ${stats.mostCommonTransition}</div>
        </div>
    </div>`;
    
    if (output) {
        output.innerHTML += html;
    }
}

/**
 * Display predicted next dream
 */
function displayPredictedNextDream() {
    if (!dreamTracker || dreamTracker.getAllDreams().length < 2) return;
    
    const prediction = dreamTracker.predictNextDream();
    const output = document.getElementById('sequenceOutput');
    
    let html = `<div style="padding: 16px; background: linear-gradient(135deg, rgba(103, 58, 183, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%); border-radius: 8px; margin-top: 16px; border-left: 4px solid var(--color-primary);">
        <div style="font-weight: 600; font-size: 1.1em; margin-bottom: 12px; color: var(--color-primary);">🔮 Predicted Next Dream</div>
        <div style="font-size: 0.95em; margin-bottom: 12px;">
            <strong>Confidence Level:</strong> ${(prediction.confidence * 100).toFixed(0)}%
            <div style="width: 100%; height: 8px; background: var(--color-bg-1); border-radius: 4px; margin-top: 4px; overflow: hidden;">
                <div style="width: ${prediction.confidence * 100}%; height: 100%; background: var(--color-primary); border-radius: 4px; transition: width 0.3s;"></div>
            </div>
        </div>
        <div style="margin-bottom: 12px;">
            <div style="font-size: 0.9em; color: var(--color-text-secondary); margin-bottom: 4px;"><strong>Most Likely Scenes:</strong></div>`;
    
    prediction.prediction.forEach((item, idx) => {
        html += `<div style="padding: 8px; background: var(--color-surface); border-radius: 4px; margin-top: 4px; display: flex; justify-content: space-between;">
            <span>${idx + 1}. ${escapeHtml(item.scene)}</span>
            <span style="font-weight: bold; color: var(--color-primary);">${(item.likelihood * 100).toFixed(0)}%</span>
        </div>`;
    });
    
    html += `</div>
        <div style="margin-top: 12px; padding: 8px; background: var(--color-bg-1); border-radius: 4px; font-size: 0.9em; font-style: italic; color: var(--color-text-secondary);">
            💭 ${escapeHtml(prediction.reasoning)}
        </div>
    </div>`;
    
    if (output) {
        output.innerHTML += html;
    }
}

/**
 * Display dream history
 */
function displayDreamHistory() {
    if (!dreamTracker) return;
    
    const history = dreamTracker.getDreamHistory();
    if (history.length === 0) {
        alert('No dreams recorded yet. Analyze a dream to start tracking history.');
        return;
    }
    
    const output = document.getElementById('sequenceOutput');
    let html = `<div style="padding: 16px; background: var(--color-surface); border-radius: 8px;">
        <div style="font-weight: 600; font-size: 1.1em; margin-bottom: 12px; color: var(--color-primary);">📜 Dream History</div>
        <div style="max-height: 500px; overflow-y: auto;">`;
    
    history.forEach(dream => {
        html += `<div style="padding: 12px; background: var(--color-bg-1); border-radius: 4px; margin-bottom: 8px;">
            <div style="font-weight: 600; color: var(--color-primary);">Dream #${dream.index}</div>
            <div style="font-size: 0.85em; color: var(--color-text-secondary); margin-top: 4px;">
                ${dream.date} at ${dream.time}
            </div>
            <div style="font-size: 0.9em; margin-top: 8px;">
                <strong>Scenes:</strong> ${dream.sceneCount} 
                <strong style="margin-left: 16px;">Transitions:</strong> ${dream.transitionCount}
            </div>
            <div style="font-size: 0.85em; margin-top: 4px; color: var(--color-text-secondary);">
                ${dream.scenes.slice(0, 3).map(s => `"${escapeHtml(s)}"`).join(' → ')}${dream.scenes.length > 3 ? '...' : ''}
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    output.classList.remove('hidden');
    output.innerHTML = html;
}

/**
 * Export dream data
 */
// Alias for event listener compatibility
function exportDreamData() { return enhancedExport(); }

function enhancedExport() {
    if (!dreamTracker) return;
    
    const stats = dreamTracker.getStatistics();
    const history = dreamTracker.getDreamHistory();
    
    const exportContent = {
        userName: "Dreamer",
        exportDate: new Date().toLocaleString(),
        summaryStats: stats,
        fullJournal: history,
        metadata: {
            version: "2.0-Enhanced",
            engine: "Lucid Framework AI"
        }
    };

    const blob = new Blob([JSON.stringify(exportContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dream_Journal_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

/**
 * Clear all dream data
 */
function clearDreamData() {
    if (!dreamTracker) return;
    
    if (confirm('Are you sure you want to clear all recorded dreams? This cannot be undone.')) {
        dreamTracker.clear();
        alert('All dream data has been cleared.');
        const output = document.getElementById('sequenceOutput');
        if (output) {
            output.innerHTML = '';
            output.style.display = 'none';
        }
    }
}
