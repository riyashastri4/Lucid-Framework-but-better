/**
 * Enhanced Voice Recognition and Transcript Processing
 * Backend logic for processing voice input with confidence tracking and error handling
 */

// Confidence tracking for recognition quality
const recognitionConfidence = {
    high: 0.85,      // Strong confidence in recognition
    medium: 0.65,    // Reasonable confidence
    low: 0.45,       // Needs clarification
    minimal: 0.25    // Uncertain recognition
};

// Probability keywords for parsing uncertainty in dream descriptions
const probabilityKeywords = {
    'always': 1.0, 'definitely': 0.95, 'absolutely': 0.98, 'certainly': 0.95,
    'usually': 0.8, 'typically': 0.8, 'generally': 0.75, 'often': 0.7,
    'sometimes': 0.5, 'occasionally': 0.5, 'at times': 0.5,
    'rarely': 0.2, 'seldom': 0.2, 'hardly': 0.15, 'never': 0.0, 
    'might': 0.4, 'may': 0.45, 'could': 0.5, 'maybe': 0.5, 
    'likely': 0.7, 'probably': 0.6, 'seem to': 0.6, 'appears to': 0.65
};

// Common filler words and speech artifacts to clean
const fillerWords = [
    'um', 'uh', 'ummm', 'like', 'you know', 'i mean', 'basically', 'literally',
    'actually', 'right', 'so', 'er', 'ah', 'hmm', 'well'
];

/**
 * Clean transcript minimally - only normalize whitespace
 * Don't remove filler words - they contain meaning in dreams
 */
function cleanTranscript(transcript) {
    if (!transcript) return '';
    
    // Only normalize excessive whitespace, preserve all content
    return transcript.trim().replace(/\s+/g, ' ');
}

/**
 * Assess confidence level of recognition based on length, structure, and keywords
 */
function assessRecognitionConfidence(transcript) {
    let confidenceScore = 0.5; // baseline
    
    const wordCount = transcript.trim().split(/\s+/).length;
    const sentenceCount = (transcript.match(/[.!?]/g) || []).length;
    const hasAction = /\b(walk|run|fly|swim|climb|fall|swim|jump|float|move|see|find|encounter)\b/i.test(transcript);
    const hasEmotion = /\b(scared|happy|sad|confused|excited|anxious|peaceful|terrified|amazed|angry|afraid)\b/i.test(transcript);
    const hasScene = /\b(house|forest|water|ocean|mountain|room|building|place|landscape)\b/i.test(transcript);
    
    // Adjust confidence based on content quality
    if (wordCount > 20) confidenceScore += 0.15;
    if (wordCount > 50) confidenceScore += 0.1;
    if (sentenceCount >= 2) confidenceScore += 0.1;
    if (hasAction) confidenceScore += 0.1;
    if (hasEmotion) confidenceScore += 0.1;
    if (hasScene) confidenceScore += 0.1;
    
    // Penalize for common recognition errors
    if (transcript.includes('?')) confidenceScore -= 0.05; // Questions often indicate uncertainty
    if (/\d{4,}/.test(transcript)) confidenceScore -= 0.1; // Long numbers are often misrecognized
    
    return Math.min(1, confidenceScore);
}

/**
 * Get confidence level description
 */
function getConfidenceLevel(score) {
    if (score >= 0.85) return 'High';
    if (score >= 0.65) return 'Medium';
    if (score >= 0.45) return 'Low';
    return 'Minimal';
}

/**
 * Segment dream transcript into logical parts with enhanced analysis
 */
function segmentDreamTranscript(transcript) {
    const sentences = transcript.match(/[^.!?]+[.!?]+/g) || [transcript];
    const segments = [];

    sentences.forEach((sentence, idx) => {
        const sentenceLower = sentence.toLowerCase();
        let type = 'narrative';
        let emphasis = 'normal';

        // Detect emphasis (ALL CAPS or repeated punctuation)
        if (/[!]{2,}|[?]{2,}/.test(sentence)) {
            emphasis = 'strong';
        }

        // Categorize by content type
        if (/then|next|after|suddenly|transitions?|becomes?|leads?|flows?|changes?/i.test(sentenceLower)) {
            type = 'transition';
        } else if (/walk|run|fly|swim|climb|fall|jump|see|find|encounter|chase|move|travel/i.test(sentenceLower)) {
            type = 'action';
        } else if (/scared|happy|sad|confused|excited|anxious|peaceful|terrified|amazed|angry|afraid|horrified|joyful/i.test(sentenceLower)) {
            type = 'emotion';
        } else if (/describe|look|appear|seem|feel|is|are/i.test(sentenceLower)) {
            type = 'description';
        } else if (/i|we|they|someone|people|person/i.test(sentenceLower)) {
            type = 'participant';
        }

        segments.push({
            index: idx,
            type: type,
            emphasis: emphasis,
            text: sentence.trim(),
            wordCount: sentence.trim().split(/\s+/).length
        });
    });

    return segments;
}

/**
 * Extract scenes from transcript - simplified and more effective
 */
function extractScenes(transcript) {
    const extractedScenes = [];
    const seenScenes = new Set();
    const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);

    sentences.forEach((sentence, sentenceIdx) => {
        const sentenceTrim = sentence.trim();
        const sentenceLower = sentenceTrim.toLowerCase();
        
        // Simpler patterns that catch natural speech better
        const patterns = [
            /i\s+(?:see|saw|find|found|was\s+in|enter|visit|visited|reach|encounter)\s+(?:the\s+)?([a-z][^.!?]*?)(?:\s+(?:was|and|then|with)|[.!?]|$)/i,
            /there\s+(?:was|were|is|are|'s)\s+(?:a\s+|an\s+)?([a-z][^.!?]*?)(?:\s+(?:and|with|that)|[.!?]|$)/i,
            /(?:in|at|inside|within|through|across)\s+(?:the\s+)?([a-z][^.!?]*?)(?:\s+(?:and|I|was)|[.!?]|$)/i,
            /the\s+([a-z][^.!?]*?)(?:\s+(?:was|were|seemed|and)|[.!?]|$)/i,
            /(?:walk|ran|flew|swim|climb|float|travel)(?:ing)?\s+(?:through|to|into|across)\s+(?:the\s+)?([a-z][^.!?]*?)(?:[.!?]|$)/i
        ];
        
        patterns.forEach(pattern => {
            let match = sentenceLower.match(pattern);
            if (match && match[1]) {
                let scene = match[1]
                    .trim()
                    .replace(/[,;:!?]+$/, '')
                    .substring(0, 100);
                    
                if (scene.length > 2 && !seenScenes.has(scene.toLowerCase())) {
                    if (!/^(it|he|she|was|were|is|are|and|or|but)$/i.test(scene)) {
                        seenScenes.add(scene.toLowerCase());
                        
                        let confidence = 0.6;
                        if (/forest|ocean|water|mountain|house|room|door|building|beach|desert|cave|sky|garden|field|city|street|park|tree|river|lake|wall|window|bedroom|kitchen|person|animal|child|family|friend|darkness|light|cloud|stairs|bridge|road|path/i.test(scene)) {
                            confidence = 0.85;
                        }
                        
                        extractedScenes.push({
                            scene: scene,
                            index: sentenceIdx,
                            confidence: confidence
                        });
                    }
                }
            }
        });
    });

    return extractedScenes;
}

/**
 * Extract transitions - simplified for better detection
 */
function extractTransitions(transcript) {
    const extractedTransitions = [];
    const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);

    sentences.forEach((sentence, sentenceIdx) => {
        const sentenceLower = sentence.toLowerCase();

        // Simpler transition patterns that catch natural speech
        const patterns = [
            /(?:then|next|after)\s+(?:i\s+)?(?:go|went|move|visit|end up)\s+(?:to|in|into)?(?:\s+the\s+)?([a-z][^.!?,]*?)(?:[,.]|$)/i,
            /(?:transforms?|becomes?|turns?)\s+into\s+(?:the\s+)?([a-z][^.!?,]*?)(?:[,.]|$)/i,
            /(?:ended up|found myself)\s+(?:in|at|inside)\s+(?:the\s+)?([a-z][^.!?,]*?)(?:[,.]|$)/i,
            /next\s+(?:i\s+)?(?:was|am)\s+(?:in|at)\s+(?:the\s+)?([a-z][^.!?,]*?)(?:[,.]|$)/i
        ];

        patterns.forEach(pattern => {
            let match = sentenceLower.match(pattern);
            if (match && match[1]) {
                let destination = match[1]
                    .trim()
                    .replace(/[,;:!?]+$/, '')
                    .substring(0, 80);
                    
                if (destination.length > 2 && !/^(and|or|but)$/i.test(destination)) {
                    let probability = 0.5;

                    for (const [keyword, prob] of Object.entries(probabilityKeywords)) {
                        if (sentenceLower.includes(keyword)) {
                            probability = prob;
                            break;
                        }
                    }

                    const percentMatch = sentenceLower.match(/(\d+)\s*%/);
                    if (percentMatch) {
                        probability = Math.min(1, parseInt(percentMatch[1]) / 100);
                    }

                    extractedTransitions.push({ 
                        destination, 
                        probability,
                        index: sentenceIdx,
                        confidence: 0.75
                    });
                }
            }
        });
    });

    return extractedTransitions;
}

/**
 * Extract themes and motifs from entire transcript
 */
function extractThemes(transcript) {
    const themes = new Map();
    const textLower = transcript.toLowerCase();
    
    // Theme patterns with keywords
    const themePatterns = {
        'fear': ['scary', 'afraid', 'frightened', 'terrified', 'fearful', 'dread', 'horrified', 'panic'],
        'adventure': ['explore', 'discover', 'journey', 'quest', 'travel', 'adventure', 'wander', 'seek'],
        'chase': ['chase', 'running from', 'escaping', 'pursued', 'hunted', 'fleeing'],
        'transformation': ['transform', 'change', 'become', 'turn into', 'metamorphos', 'evolve', 'shift'],
        'flying': ['fly', 'flying', 'float', 'floating', 'soar', 'airborne', 'sky'],
        'falling': ['fall', 'falling', 'drop', 'descend', 'plunge', 'tumble'],
        'searching': ['search', 'find', 'look for', 'seek', 'hunt', 'discover', 'searching'],
        'meeting': ['meet', 'encounter', 'see', 'find', 'come across', 'person', 'people'],
        'emotion': ['happy', 'sad', 'angry', 'scared', 'confused', 'loved', 'peaceful', 'anxious']
    };
    
    Object.entries(themePatterns).forEach(([theme, keywords]) => {
        const count = keywords.reduce((sum, keyword) => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            return sum + (textLower.match(regex) || []).length;
        }, 0);
        if (count > 0) {
            themes.set(theme, count);
        }
    });
    
    return themes;
}

/**
 * Analyze entire transcript and extract all data with confidence metrics
 */
function analyzeTranscript(transcript) {
    if (!transcript || transcript.trim().length < 5) {
        return null;
    }

    // Clean transcript
    const cleanedTranscript = cleanTranscript(transcript);
    
    // Assess confidence
    const confidence = assessRecognitionConfidence(cleanedTranscript);
    const confidenceLevel = getConfidenceLevel(confidence);
    
    // Extract all components
    const scenes = extractScenes(cleanedTranscript);
    const transitions = extractTransitions(cleanedTranscript);
    const segments = segmentDreamTranscript(cleanedTranscript);
    const themes = extractThemes(cleanedTranscript);
    
    // Calculate statistics
    const wordCount = cleanedTranscript.trim().split(/\s+/).length;
    const sentenceCount = (cleanedTranscript.match(/[.!?]/g) || []).length;

    return {
        scenes,
        transitions,
        segments,
        themes: Object.fromEntries(themes),
        rawText: cleanedTranscript,
        originalText: transcript,
        confidence: confidence,
        confidenceLevel: confidenceLevel,
        wordCount: wordCount,
        sentenceCount: sentenceCount,
        quality: confidence > 0.75 ? 'High Quality' : confidence > 0.50 ? 'Good Quality' : 'Needs Review'
    };
}
