/**
 * Deep Dream Analysis Engine - Enhanced with AI Integration
 * Backend logic for comprehensive dream interpretation
 */

/**
 * Perform comprehensive dream analysis with enhanced metrics
 */
function performDeepDreamAnalysis(transcript, voiceAnalysis, segments) {
    const foundSymbols = extractSymbols(transcript);
    const emotionCounts = analyzeEmotions(transcript);
    const wordCount = transcript.split(/\s+/).length;
    const sentenceCount = (transcript.match(/[.!?]+/g) || []).length;
    const dominantEmotion = getDominantEmotion(emotionCounts);
    const theme = determineDreamTheme(foundSymbols, emotionCounts);
    const complexity = calculateDreamComplexity(foundSymbols, emotionCounts);

    return {
        segments, 
        symbols: foundSymbols, 
        emotionCounts: emotionCounts, 
        dominantEmotion: dominantEmotion, 
        theme: theme,
        complexity: complexity,
        wordCount: wordCount, 
        sentenceCount: sentenceCount,
        patterns: extractThemes(transcript),
        confidence: voiceAnalysis?.confidence || 0.7,
        qualityLevel: voiceAnalysis?.quality || 'Good Quality'
    };
}

/**
 * Generate comprehensive dream interpretation report with multiple formats
 */
function generateInterpretation(scenes, analysis, dreamSymbolsObj) {
    let interpretation = [`🔮 Dream Interpretation\n${'='.repeat(50)}\n\n`];
    interpretation.push('⚠️ DISCLAIMER: This interpretation is based on common dream symbolism\n');
    interpretation.push('and psychological theory. It is not a substitute for professional\n');
    interpretation.push('psychological or medical advice. Dream meanings are highly personal.\n\n');
    interpretation.push('─'.repeat(50) + '\n\n');
    
    // Dream Overview
    interpretation.push(`📊 Dream Overview:`);
    interpretation.push(`  Theme: ${analysis.theme}`);
    interpretation.push(`  Complexity: ${analysis.complexity}`);
    interpretation.push(`  Symbols Found: ${analysis.symbols.size}`);
    interpretation.push(`  Recognition Quality: ${analysis.qualityLevel} (${(analysis.confidence * 100).toFixed(0)}%)\n`);
    
    // Analyze all scenes for symbolic content
    const foundSymbols = new Map();
    
    if (scenes && scenes.length > 0) {
        scenes.forEach(scene => {
            const sceneName = typeof scene === 'string' ? scene : scene.name;
            const sceneLower = sceneName.toLowerCase();
            Object.keys(dreamSymbolsObj || dreamSymbols || {}).forEach(symbol => {
                if (sceneLower.includes(symbol)) {
                    if (!foundSymbols.has(symbol)) {
                        foundSymbols.set(symbol, []);
                    }
                    foundSymbols.get(symbol).push(sceneName);
                }
            });
        });
    }

    if (foundSymbols.size === 0 && analysis.symbols.size === 0) {
        interpretation.push('No common dream symbols detected in your transcript.\n\n');
        interpretation.push('💭 General Interpretation:\n');
        interpretation.push('Your dream appears to be highly personal and unique. Consider:\n');
        interpretation.push('• What emotions did you feel during the dream?\n');
        interpretation.push('• Are there recurring themes or patterns?\n');
        interpretation.push('• How does this dream connect to your waking life?\n');
        interpretation.push('• What stands out as most significant?\n\n');
    } else {
        interpretation.push('🌟 Symbolic Meanings Found:\n\n');
        
        // Use analysis.symbols which are extracted from text
        analysis.symbols.forEach((meaning, symbol) => {
            interpretation.push(`📌 ${symbol.toUpperCase()}`);
            interpretation.push(`   Meaning: ${meaning}`);
            if (foundSymbols.has(symbol)) {
                interpretation.push(`   Context: "${foundSymbols.get(symbol)[0]}"`);
            }
            interpretation.push('');
        });

        interpretation.push('\n');
    }

    // Emotional Analysis
    interpretation.push('😊 Emotional Content:\n');
    const emotionEntries = Object.entries(analysis.emotionCounts || {})
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (emotionEntries.length > 0) {
        emotionEntries.forEach(([emotion, count]) => {
            interpretation.push(`• ${emotion}: ${count} occurrence${count > 1 ? 's' : ''}`);
        });
    } else {
        interpretation.push('• Neutral or balanced emotional tone');
    }
    interpretation.push('\n');

    // Pattern Analysis
    interpretation.push('🔄 Theme Patterns:\n');
    if (analysis.patterns && Object.keys(analysis.patterns).length > 0) {
        Object.entries(analysis.patterns).forEach(([pattern, count]) => {
            if (count > 0) {
                interpretation.push(`• ${pattern}: ${count} occurrence${count > 1 ? 's' : ''}`);
            }
        });
    } else {
        interpretation.push('• Unique dream without obvious recurring patterns');
    }
    interpretation.push('\n');

    interpretation.push('💡 Reflection Questions:');
    interpretation.push('• What real-life situations mirror these dream elements?');
    interpretation.push('• Which moments evoke the strongest emotions?');
    interpretation.push('• What patterns repeat in your waking life?');
    interpretation.push('• How does your subconscious commu nicating with you?');

    return interpretation.join('\n');
}

/**
 * Analyze transitions in the dream graph (for graph visualization)
 */
function analyzeTransitionsReport(scenes) {
    let analysis = [`🔍 Transition Analysis\n${'='.repeat(50)}\n`];
    
    if (!scenes || scenes.length === 0) {
        analysis.push('No scene transitions detected.');
        return analysis.join('\n');
    }
    
    scenes.forEach(scene => {
        const sceneName = typeof scene === 'string' ? scene : (scene.name || 'Unknown');
        const edges = scene.edges || [];
        
        if (edges.length === 0) {
            analysis.push(`• "${sceneName}": No outgoing transitions (possible ending point)`);
        } else {
            // Find max edge safely
            let maxEdge = edges[0];
            for (let i = 1; i < edges.length; i++) {
                if (edges[i].probability > maxEdge.probability) {
                    maxEdge = edges[i];
                }
            }
            
            // Get destination name safely
            let destName = 'Unknown';
            if (maxEdge.to) {
                destName = typeof maxEdge.to === 'string' ? maxEdge.to : (maxEdge.to.name || 'Unknown');
            }
            
            analysis.push(
                `• "${sceneName}"\n  → Most likely: "${destName}" (${(maxEdge.probability * 100).toFixed(0)}%)`
            );
        }
    });

    return analysis.join('\n\n');
}

/**
 * Generate integrated analysis combining all approaches
 */
function synthesizeAnalysis(transcript, voiceAnalysis, sceneGraph) {
    const transcriptAnalysis = analyzeTranscript(transcript);
    const dreamAnalysis = performDeepDreamAnalysis(
        transcript, 
        voiceAnalysis, 
        transcriptAnalysis.segments
    );

    return {
        transcript: transcriptAnalysis,
        dream: dreamAnalysis,
        graph: sceneGraph,
        timestamp: new Date().toISOString(),
        aiReady: true // Flag that this can be sent to AI interpretation
    };
}

/**
 * Generate summary statistics for the dream
 */
function generateDreamStatistics(analysis) {
    const stats = {
        totalSymbols: analysis.symbols.size,
        uniqueSymbols: new Set(analysis.symbols.keys()).size,
        dominant_emotion: analysis.dominantEmotion,
        emotion_diversity: Object.values(analysis.emotionCounts || {}).filter(c => c > 0).length,
        narrative_length: analysis.wordCount,
        narrative_structure: analysis.sentenceCount,
        theme: analysis.theme,
        complexity: analysis.complexity,
        recognitionQuality: analysis.qualityLevel,
        recommendedForAI: analysis.symbols.size > 3 && analysis.wordCount > 20
    };

    return stats;
}
