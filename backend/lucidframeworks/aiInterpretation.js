/**
 * AI-Powered Dream Interpretation Engine
 * Advanced psychological analysis and dream meaning interpretation
 * Uses symbol recognition, emotional analysis, and thematic pattern matching
 */

/**
 * Psychological frameworks for dream interpretation
 */
const psychologicalPerspectives = {
    'jungian': {
        name: 'Jungian Perspective',
        description: 'Explores archetypes and the collective unconscious',
        keywords: ['shadow', 'anima/animus', 'archetype', 'collective', 'synchronicity', 'individuation']
    },
    'freudian': {
        name: 'Freudian Perspective',
        description: 'Focuses on desire, repression, and wish fulfillment',
        keywords: ['repression', 'desire', 'wish-fulfillment', 'latent', 'manifest', 'symbolism']
    },
    'cognitive': {
        name: 'Cognitive Approach',
        description: 'Views dreams as problem-solving and memory consolidation',
        keywords: ['problem-solving', 'memory', 'processing', 'decision-making', 'learning', 'integration']
    },
    'emotional': {
        name: 'Emotional Processing',
        description: 'Dreams as way to process and resolve emotions',
        keywords: ['emotional', 'processing', 'resolution', 'integration', 'healing', 'balance']
    }
};

/**
 * Archetypal symbols and their deep meanings
 */
const archetypes = {
    'hero': {
        symbols: ['warrior', 'fighter', 'brave', 'challenge', 'quest', 'mountain', 'enemy'],
        meaning: 'Your courageous self facing challenges and obstacles',
        growth: 'Overcoming adversity and discovering inner strength'
    },
    'sage': {
        symbols: ['wise', 'teacher', 'library', 'knowledge', 'wisdom', 'mystery', 'owl', 'book'],
        meaning: 'Your search for truth and understanding',
        growth: 'Gaining clarity and deepening knowledge'
    },
    'innocent': {
        symbols: ['child', 'baby', 'garden', 'peace', 'joy', 'safety', 'haven', 'play'],
        meaning: 'Your desire for happiness and simplicity',
        growth: 'Finding contentment and appreciating joy'
    },
    'lover': {
        symbols: ['heart', 'passion', 'connection', 'intimacy', 'dancing', 'beauty', 'embrace'],
        meaning: 'Your capacity for love and deep connection',
        growth: 'Deepening relationships and emotional intimacy'
    },
    'shadow': {
        symbols: ['darkness', 'monster', 'demon', 'enemy', 'fear', 'death', 'danger', 'trap'],
        meaning: 'Your repressed or disowned aspects',
        growth: 'Integration and acceptance of all parts of self'
    },
    'magician': {
        symbols: ['magic', 'transformation', 'power', 'butterfly', 'phoenix', 'creation', 'illusion'],
        meaning: 'Your potential for transformation and mastery',
        growth: 'Manifesting change and realizing potential'
    },
    'caregiver': {
        symbols: ['nurture', 'help', 'support', 'mother', 'healing', 'comfort', 'protection'],
        meaning: 'Your compassionate and nurturing side',
        growth: 'Expressing care while maintaining boundaries'
    },
    'explorer': {
        symbols: ['journey', 'adventure', 'forest', 'mountain', 'road', 'discovery', 'unknown'],
        meaning: 'Your desire for freedom and new experiences',
        growth: 'Expanding horizons and embracing adventure'
    }
};

/**
 * Life domains that dreams often relate to
 */
const lifeDomains = {
    'relationships': {
        keywords: ['meeting', 'person', 'people', 'family', 'lover', 'friend', 'connection', 'embrace'],
        themes: ['intimacy', 'conflict', 'support', 'abandonment', 'reunion'],
        messages: ['Your dreams are highlighting relationship dynamics', 'Consider how you relate to others', 'Examine your need for connection']
    },
    'career': {
        keywords: ['work', 'office', 'school', 'achievement', 'ladder', 'goal', 'building', 'competition'],
        themes: ['ambition', 'stress', 'success', 'failure', 'advancement'],
        messages: ['Your subconscious is processing work concerns', 'Consider your professional aspirations', 'Examine your drive and motivation']
    },
    'health': {
        keywords: ['body', 'illness', 'doctor', 'healing', 'strength', 'weakness', 'falling', 'drowning'],
        themes: ['vitality', 'vulnerability', 'healing', 'restoration', 'balance'],
        messages: ['Your dreams may reflect health awareness', 'Consider your physical well-being', 'Listen to your body\\'s messages']
    },
    'spirituality': {
        keywords: ['angel', 'heaven', 'temple', 'light', 'sky', 'transcendence', 'magic', 'divine'],
        themes: ['meaning', 'purpose', 'connection', 'enlightenment', 'faith'],
        messages: ['Your spiritual journey is unfolding', 'Seek deeper meaning and purpose', 'Connect with something greater than yourself']
    },
    'creativity': {
        keywords: ['create', 'build', 'art', 'music', 'dance', 'color', 'beauty', 'imagination'],
        themes: ['expression', 'flow', 'inspiration', 'creation', 'potential'],
        messages: ['Your creative energy is active', 'Express yourself authentically', 'Allow inspiration to flow']
    },
    'identity': {
        keywords: ['mirror', 'self', 'transformation', 'becoming', 'change', 'growth', 'shadow'],
        themes: ['self-discovery', 'change', 'integration', 'authenticity', 'evolution'],
        messages: ['You\'re exploring who you are', 'Embrace personal growth and change', 'Integrate all aspects of yourself']
    }
};

/**
 * Generate AI-driven dream interpretation
 */
function generateAIInterpretation(analysis) {
    const interpretation = {
        title: `AI Dream Analysis: ${analysis.theme}`,
        perspectives: [],
        archetypeMatch: null,
        domainAnalysis: [],
        insights: [],
        recommendations: []
    };

    // 1. Determine applicable psychological perspectives
    interpretation.perspectives = determineApplicablePerspectives(analysis);

    // 2. Match to archetypes
    interpretation.archetypeMatch = matchArchetypes(analysis.symbols);

    // 3. Identify life domain
    interpretation.domainAnalysis = identifyLifeDomains(analysis);

    // 4. Generate deep insights
    interpretation.insights = generateDeepInsights(analysis, interpretation);

    // 5. Provide recommendations
    interpretation.recommendations = generateRecommendations(analysis, interpretation);

    return interpretation;
}

/**
 * Determine which psychological perspectives apply
 */
function determineApplicablePerspectives(analysis) {
    const applicablePerspectives = [];
    const dominant = analysis.dominantEmotion;

    // Emotional processing - always relevant
    applicablePerspectives.push({
        perspective: psychologicalPerspectives.emotional.name,
        description: psychologicalPerspectives.emotional.description,
        relevance: 'Your dream is processing emotions and experiences',
        interpretation: generateEmotionalPerspective(analysis)
    });

    // Check for transformation = Jungian
    if (analysis.theme.includes('Transformation')) {
        applicablePerspectives.push({
            perspective: psychologicalPerspectives.jungian.name,
            description: psychologicalPerspectives.jungian.description,
            relevance: 'Archetypal symbols suggest deeper psychological patterns',
            interpretation: 'You\'re undergoing inner transformation and individuation'
        });
    }

    // Check for problem-solving = Cognitive
    if (analysis.theme.includes('Ambition') || analysis.theme.includes('Achievement')) {
        applicablePerspectives.push({
            perspective: psychologicalPerspectives.cognitive.name,
            description: psychologicalPerspectives.cognitive.description,
            relevance: 'Your mind is working through goals and challenges',
            interpretation: 'Your brain is consolidating learning and planning solutions'
        });
    }

    // Complex dreams often show Freudian elements
    if (analysis.complexity === 'Very Complex' || analysis.complexity === 'Complex') {
        applicablePerspectives.push({
            perspective: psychologicalPerspectives.freudian.name,
            description: psychologicalPerspectives.freudian.description,
            relevance: 'Multiple symbolic layers suggest deeper meanings',
            interpretation: 'Examine what desires or fears may be symbolically expressed'
        });
    }

    return applicablePerspectives;
}

/**
 * Generate emotional perspective interpretation
 */
function generateEmotionalPerspective(analysis) {
    const topEmotions = Object.entries(analysis.emotionCounts)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([emotion, _]) => emotion);

    if (topEmotions.length === 0) return 'Neutral emotional tone allows for objective processing';

    return `Your dream emphasizes ${topEmotions.join(', ')}. These emotions are being processed and integrated into your psyche.`;
}

/**
 * Match dream symbols to archetypal patterns
 */
function matchArchetypes(symbols) {
    const matches = new Map();
    const symbolNames = Array.from(symbols.keys());

    Object.entries(archetypes).forEach(([archetypeName, archetype]) => {
        const matchCount = symbolNames.filter(s => 
            archetype.symbols.some(as => s.toLowerCase().includes(as) || as.includes(s.toLowerCase()))
        ).length;

        if (matchCount > 0) {
            matches.set(archetypeName, {
                archetype: archetypeName,
                meaning: archetype.meaning,
                growth: archetype.growth,
                matchStrength: matchCount / symbolNames.length,
                matchCount: matchCount
            });
        }
    });

    // Return strongest matches (up to 3)
    return Array.from(matches.values())
        .sort((a, b) => b.matchStrength - a.matchStrength)
        .slice(0, 3);
}

/**
 * Identify life domains reflected in dream
 */
function identifyLifeDomains(analysis) {
    const domains = [];
    const symbolNames = Array.from(analysis.symbols.keys());

    Object.entries(lifeDomains).forEach(([domainName, domain]) => {
        const keywordMatches = symbolNames.filter(s =>
            domain.keywords.some(k => s.toLowerCase().includes(k) || k.includes(s.toLowerCase()))
        ).length;

        if (keywordMatches > 0) {
            domains.push({
                domain: domainName,
                relevantThemes: domain.themes,
                message: domain.messages[Math.floor(Math.random() * domain.messages.length)],
                strength: keywordMatches
            });
        }
    });

    return domains.sort((a, b) => b.strength - a.strength);
}

/**
 * Generate deep psychological insights
 */
function generateDeepInsights(analysis, interpretation) {
    const insights = [];

    // Insight 1: Primary theme analysis
    insights.push({
        type: 'Theme Analysis',
        insight: `Your dream centers on "${analysis.theme}" - a significant psychological theme. This suggests your unconscious is drawing attention to this area of your life.`,
        actionable: 'Reflect on how this theme manifests in your waking life.'
    });

    // Insight 2: Symbol significance
    if (analysis.symbols.size > 0) {
        const topSymbols = Array.from(analysis.symbols.entries()).slice(0, 3);
        const symbolDescriptions = topSymbols.map(([s, d]) => `${s} (${d.substring(0, 40)}...)`).join(', ');
        insights.push({
            type: 'Symbol Significance',
            insight: `Key symbols include: ${symbolDescriptions}. Each carries psychological weight and personal meaning.`,
            actionable: 'Consider what each symbol personally represents to you.'
        });
    }

    // Insight 3: Emotional undertones
    const topEmotion = Object.entries(analysis.emotionCounts)
        .sort((a, b) => b[1] - a[1])[0];
    if (topEmotion) {
        insights.push({
            type: 'Emotional Undertones',
            insight: `The emotion "${topEmotion[0]}" is prominent. This indicates your unconscious is processing feelings related to ${topEmotion[0]}.`,
            actionable: 'Journal about situations in your life that trigger this emotion.'
        });
    }

    // Insight 4: Pattern recognition
    if (interpretation.archetypeMatch && interpretation.archetypeMatch.length > 0) {
        const primaryArchetype = interpretation.archetypeMatch[0];
        insights.push({
            type: 'Archetypal Pattern',
            insight: `You're embodying the "${primaryArchetype.archetype}" archetype. ${primaryArchetype.meaning}`,
            actionable: `Work toward: ${primaryArchetype.growth}`
        });
    }

    // Insight 5: Complexity consideration
    insights.push({
        type: 'Dream Complexity',
        insight: `This is a ${analysis.complexity.toLowerCase()} dream with multiple layers of meaning. ${
            analysis.complexity === 'Very Complex' ? 'Consider journaling to unpack the layers.' :
            analysis.complexity === 'Complex' ? 'Multiple themes are interacting.' :
            'The meaning is relatively straightforward.'
        }`,
        actionable: 'Give yourself time to process and understand the full significance.'
    });

    return insights;
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(analysis, interpretation) {
    const recommendations = [];

    // 1. Processing recommendation
    recommendations.push({
        category: 'Dream Processing',
        action: 'Journal about this dream',
        details: 'Write freely about the dream, your feelings, and what it might mean in your life. Don\'t edit or judge.'
    });

    // 2. Theme-specific recommendation
    if (analysis.theme.includes('Anxiety') || analysis.theme.includes('Fear')) {
        recommendations.push({
            category: 'Emotional Work',
            action: 'Explore the source of anxiety',
            details: 'What in your waking life might be triggering these feelings? Consider addressing root causes.'
        });
    }

    if (analysis.theme.includes('Transformation') || analysis.theme.includes('Change')) {
        recommendations.push({
            category: 'Personal Development',
            action: 'Embrace and facilitate change',
            details: 'Your subconscious is ready for transformation. Take concrete steps toward your goals.'
        });
    }

    if (analysis.theme.includes('Freedom') || analysis.theme.includes('Aspiration')) {
        recommendations.push({
            category: 'Goal Setting',
            action: 'Define your aspirations clearly',
            details: 'Your dream reflects your desires. Make them concrete with specific goals and action plans.'
        });
    }

    // 3. Symbolic work
    if (analysis.symbols.size > 0) {
        recommendations.push({
            category: 'Symbolic Exploration',
            action: 'Research your symbols',
            details: 'Look up what your key symbols mean to you personally. Symbolism is unique to each person.'
        });
    }

    // 4. Life domain recommendation
    if (interpretation.domainAnalysis.length > 0) {
        const domain = interpretation.domainAnalysis[0];
        recommendations.push({
            category: 'Life Area Focus',
            action: `Attend to your ${domain.domain}`,
            details: domain.message
        });
    }

    // 5. General practice
    recommendations.push({
        category: 'Dream Practice',
        action: 'Track patterns',
        details: 'Keep a dream journal to identify recurring themes and symbols. Patterns reveal deeper truths.'
    });

    recommendations.push({
        category: 'Mindfulness',
        action: 'Practice lucid dreaming techniques',
        details: 'With practice, you can become aware during dreams and actively explore your inner world.'
    });

    return recommendations;
}

/**
 * Generate comprehensive AI dream report
 */
function generateComprehensiveReport(analysis) {
    const aiInterpretation = generateAIInterpretation(analysis);

    let report = `<div class="ai-dream-report">
        <h2>🤖 Advanced AI Dream Interpretation</h2>
        
        <div class="report-section">
            <h3>📊 Dream Overview</h3>
            <p><strong>Theme:</strong> ${analysis.theme}</p>
            <p><strong>Complexity:</strong> ${analysis.complexity}</p>
            <p><strong>Dominant Emotion:</strong> ${analysis.dominantEmotion}</p>
            <p><strong>Symbols Detected:</strong> ${analysis.symbols.size}</p>
        </div>`;

    // Psychological perspectives
    if (aiInterpretation.perspectives.length > 0) {
        report += `<div class="report-section">
            <h3>🧠 Psychological Perspectives</h3>`;
        aiInterpretation.perspectives.forEach(persp => {
            report += `<div class="perspective-item">
                <h4>${persp.perspective}</h4>
                <p>${persp.relevance}</p>
                <p><em>${persp.interpretation}</em></p>
            </div>`;
        });
        report += `</div>`;
    }

    // Archetypes
    if (aiInterpretation.archetypeMatch.length > 0) {
        report += `<div class="report-section">
            <h3>👥 Archetypal Patterns</h3>`;
        aiInterpretation.archetypeMatch.forEach(arch => {
            report += `<div class="archetype-item">
                <h4>${arch.archetype.charAt(0).toUpperCase() + arch.archetype.slice(1)}</h4>
                <p><strong>Meaning:</strong> ${arch.meaning}</p>
                <p><strong>Growth Path:</strong> ${arch.growth}</p>
            </div>`;
        });
        report += `</div>`;
    }

    // Life domains
    if (aiInterpretation.domainAnalysis.length > 0) {
        report += `<div class="report-section">
            <h3>🎯 Life Areas Reflected</h3>`;
        aiInterpretation.domainAnalysis.forEach(domain => {
            report += `<div class="domain-item">
                <h4>${domain.domain.charAt(0).toUpperCase() + domain.domain.slice(1)}</h4>
                <p>${domain.message}</p>
            </div>`;
        });
        report += `</div>`;
    }

    // Deep insights
    if (aiInterpretation.insights.length > 0) {
        report += `<div class="report-section">
            <h3>💡 Deep Insights</h3>`;
        aiInterpretation.insights.forEach(insight => {
            report += `<div class="insight-item">
                <h4>${insight.type}</h4>
                <p>${insight.insight}</p>
                <p><strong>Action:</strong> ${insight.actionable}</p>
            </div>`;
        });
        report += `</div>`;
    }

    // Recommendations
    if (aiInterpretation.recommendations.length > 0) {
        report += `<div class="report-section">
            <h3>🚀 Recommendations</h3>`;
        aiInterpretation.recommendations.forEach(rec => {
            report += `<div class="recommendation-item">
                <h4>${rec.category}: ${rec.action}</h4>
                <p>${rec.details}</p>
            </div>`;
        });
        report += `</div>`;
    }

    report += `<div class="report-footer">
        <p>Remember: Dream interpretation is deeply personal. These AI insights are meant to guide your reflection, not define your experience.</p>
    </div></div>`;

    return report;
}
