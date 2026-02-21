/**
 * Expanded Dream Symbol Mapping and Analysis
 * Comprehensive symbol interpretations with detailed psychological meanings
 */

const dreamSymbols = {
    // Nature & Landscapes
    'forest': 'Exploration of the unconscious, feeling lost or searching for direction, mystery, growth, wilderness',
    'ocean': 'Vast emotions, the collective unconscious, life mysteries, vastness, feeling overwhelmed, depth',
    'mountain': 'Challenges to overcome, goals, spiritual elevation, achievement, major obstacles, perspective',
    'river': 'Life flow, emotions in motion, journey, change, going with the flow, direction, boundaries',
    'desert': 'Desolation, emptiness, isolation, harsh conditions, spiritual journey, barrenness',
    'island': 'Isolation, independence, refuge, being cut off, unique perspective, safety',
    'cave': 'Unconscious mind, hidden aspects, inner exploration, fear of the unknown, safety',
    'valley': 'Low points, depression, vulnerability, rest, peaceful spaces, between states',
    'cliff': 'Danger, edge of possibilities, risk, fear of falling, perspective, threshold',
    'garden': 'Growth, cultivation, paradise, peace, beauty, personal space, harmony',
    'meadow': 'Peace, freedom, openness, simplicity, natural growth, tranquility',
    'swamp': 'Confusion, being stuck, murky emotions, difficult situations, uncertainty',
    'volcano': 'Explosive emotions, suppressed anger, powerful forces, transformation, eruption',
    'storm': 'Emotional turmoil, conflict, powerful change, chaos, release, intensity',
    
    // Sky & Weather
    'sky': 'Possibility, freedom, consciousness, perspective, vast potential, unlimited',
    'clouds': 'Confusion, obscured vision, temporary obstruction, transition, flux',
    'sun': 'Consciousness, clarity, warmth, life force, positive energy, success, truth',
    'moon': 'Intuition, feminine energy, cycles, hidden aspects, dreams, night consciousness',
    'stars': 'Hope, guidance, aspirations, divine connection, distant goals, wonder',
    'rain': 'Cleansing, renewal, sadness, washing away, emotional release, growth',
    'snow': 'Purity, coldness, isolation, peace, transformation, fresh start, silence',
    'wind': 'Change, direction, communication, invisible forces, freedom, movement',
    'tornado': 'Destructive forces, turbulent emotions, chaos, rapid change, devastation',
    'lightning': 'Sudden realization, illumination, power, fear, transformation, strike',
    'fog': 'Confusion, lack of clarity, mystery, transitions, obscured vision',
    'mist': 'Confusion, uncertainty, hidden things, transition, illusion',
    
    // Water & Elements
    'water': 'Emotions, the subconscious mind, purification, flow, adaptability, life itself',
    'fire': 'Passion, transformation, anger, purification, energy, destruction, rebirth',
    'earth': 'Grounding, foundation, stability, nature, material concerns, reality',
    'ice': 'Emotional coldness, frozen situations, preservation, brittleness, stagnation',
    'mud': 'Feeling stuck, murky situations, getting dirty, difficult circumstances',
    
    // Animals - Mammals
    'bird': 'Freedom, perspective, spiritual messages, imagination, escape, transcendence',
    'owl': 'Wisdom, intuition, seeing what is hidden, mystery, knowledge, night sight',
    'snake': 'Transformation, healing, hidden fears, power, wisdom, danger, sexuality',
    'lion': 'Courage, power, strength, dominance, personal power, pride, royalty',
    'tiger': 'Strength, danger, passion, wildness, untamed aspects, predatory nature',
    'bear': 'Power, protection, solitude, introspection, primal strength, mothering',
    'wolf': 'Instinct, danger, loyalty, pack mentality, wilderness, predatory nature',
    'deer': 'Gentleness, grace, sensitivity, vulnerability, intuition, springtime',
    'elephant': 'Memory, wisdom, strength, gentleness, family, loyalty, intelligence',
    'horse': 'Freedom, power, grace, journey, strength, wildness, sexual energy',
    'cat': 'Independence, intuition, mystery, grace, aloofness, feminine power',
    'dog': 'Loyalty, friendship, protection, instinct, unconditional love, faithfulness',
    'rabbit': 'Luck, quick thinking, fertility, escape, abundance, vulnerability',
    'fox': 'Cleverness, cunning, trickery, adaptability, intelligence, stealth',
    'monkey': 'Playfulness, intelligence, mischief, foolishness, primal nature',
    'pig': 'Greed, stubbornness, earthiness, sensuality, dirt, intelligence',
    'cow': 'Nourishment, passivity, plenty, motherhood, domesticity, earth',
    'sheep': 'Innocence, conformity, following, gentleness, wool, warmth',
    'dragon': 'Power, mystery, magic, danger, transformation, ancient wisdom',
    'phoenix': 'Rebirth, resurrection, renewal, transformation from ashes, immortality',
    'butterfly': 'Transformation, beauty, change, fragility, freedom, metamorphosis',
    'spider': 'Creativity, interconnection, entanglement, fate, patience, web of life',
    'bee': 'Cooperation, productivity, sweetness, community, busy work, cooperation',
    'fish': 'Emotions, unconscious mind, adaptability, freedom, opportunities',
    'frog': 'Transformation, rebirth, cleansing, jumping forward, fertility, transitions',
    'crow': 'Intelligence, mystery, magic, communication, transformation, magic',
    'dove': 'Peace, love, purity, spirituality, innocence, gentleness',
    'eagle': 'Vision, freedom, power, perspective, nobility, divine sight',
    'raven': 'Wisdom, mystery, magic, death, transformation, intelligence',
    'turtle': 'Slow progress, protection, grounding, ancient wisdom, shell, defense',
    'whale': 'Vastness, depth, emotions, power, songs, communication, intelligence',
    'shark': 'Danger, power, predatory nature, survival, competition, aggression',
    'crocodile': 'Danger, predator, primal, treachery, lurking danger, power',
    'snake': 'Transformation, shedding, rebirth, sexuality, danger, slyness',
    
    // People & Relationships
    'child': 'Innocence, new beginnings, inner child, vulnerability, growth, potential',
    'baby': 'New beginnings, potential, helplessness, dependency, purity, innocence',
    'mother': 'Nurturing, care, protection, origin, security, feminine aspects, love',
    'father': 'Authority, protection, guidance, masculine aspects, discipline, power',
    'family': 'Unity, belonging, dynamics, conflict resolution, roots, support',
    'friend': 'Support, companionship, trust, aspects of self, relationships',
    'lover': 'Intimacy, desire, connection, aspects of self, vulnerability, passion',
    'stranger': 'Unknown aspects of self, danger, opportunity, mystery',
    'enemy': 'Shadow self, conflict, unresolved issues, defensive aspects, opposition',
    'teacher': 'Learning, wisdom, guidance, authority, knowledge, mentorship',
    'doctor': 'Healing, diagnosis, intervention, health concerns, care, medicine',
    'king': 'Authority, power, confidence, leadership, divine right',
    'queen': 'Power, femininity, creativity, nurturing, authority, sovereignty',
    
    // Objects & Buildings
    'house': 'The self, security, psyche, family, foundation, different aspects of personality',
    'door': 'New opportunities, transitions, choices, thresholds, boundaries, openings',
    'window': 'Perspective, clarity, view of world, insight, observation, light',
    'mirror': 'Self-reflection, self-image, truth, illusion, how you see yourself',
    'stairs': 'Progress, ascension or descent, effort, journey, spiritual ascent',
    'bridge': 'Transition, connection between states, crossing, challenge, joining',
    'wall': 'Barriers, protection, limitations, boundaries, separation, division',
    'room': 'Specific aspects of self, compartmentalization, privacy, consciousness',
    'basement': 'Unconscious mind, hidden things, foundation, fears, shadow',
    'attic': 'Mind, ideals, forgotten memories, spiritual aspects, higher consciousness',
    'kitchen': 'Nourishment, creativity, domestic life, transformation, warmth',
    'bedroom': 'Intimacy, privacy, unconscious, rest, regress, sexuality',
    'bathroom': 'Cleansing, private functions, elimination, purification, privacy',
    'hallway': 'Transition, passage, journey, opportunity, movement, connection',
    'school': 'Learning, education, testing, social dynamics, development',
    'library': 'Knowledge, wisdom, secrets, information, study, learning',
    'temple': 'Spirituality, sacred space, faith, inner holiness, sanctuary',
    'prison': 'Feeling trapped, limitations, punishment, constraints, confinement',
    'tower': 'Isolation, perspective, power, observation, separation, strength',
    
    // Transportation
    'car': 'Personal direction, journey, control, autonomy, movement through life',
    'train': 'Life direction, predetermined path, community, power, commitment',
    'airplane': 'Escape, freedom, perspective, rapid progress, ambition, transcendence',
    'boat': 'Emotional journey, life flow, navigation, spiritual travel, exploration',
    'ship': 'Major life journey, navigation of emotions, voyage, transitions, adventure',
    'bicycle': 'Balance, personal power, freedom, childhood, simplicity',
    'motorcycle': 'Speed, recklessness, power, independence, danger',
    'bus': 'Community, shared journey, public life, collective movement',
    
    // Objects & Items
    'road': 'Life path, journey, direction, choices, destiny, direction',
    'path': 'Life direction, choices, journey, spiritual path, personal development',
    'crossroad': 'Choices, decision making, crossroads in life, direction',
    'ladder': 'Ascension, reaching goals, connection between worlds, progress',
    'rope': 'Connection, safety net, lifeline, binding, escape, support',
    'chain': 'Bondage, connection, restraint, oppression, unity, binding',
    'key': 'Solution, opportunity, access, secrets, power, unlocking',
    'lock': 'Barriers, secrets, protection, confinement, mystery, closed',
    'jewel': 'Precious aspects of self, value, treasure, spirituality, inner wealth',
    'treasure': 'Valuable aspects of self, abundance, hidden potential, worth',
    'money': 'Power, value, energy, resources, self-worth, exchange',
    'weapon': 'Power, aggression, protection, conflict, defensive mechanisms',
    'book': 'Knowledge, secrets, stories, wisdom, information, learning',
    'letter': 'Communication, messages, news, clarity, revelation, connection',
    'clock': 'Time, mortality, pressure, urgency, schedule, time running out',
    'map': 'Direction, journey, guidance, life path, navigation, planning',
    'crown': 'Achievement, authority, sovereignty, self-worth, success, power',
    'ring': 'Commitment, eternity, wholeness, cycles, contracts, bonds',
    'table': 'Social interaction, sharing, gathering, family, stability',
    'bed': 'Rest, unconscious, intimacy, vulnerability, death, passivity',
    'throne': 'Power, authority, control, kingship, sovereignty, achievement',
    'crystal': 'Clarity, spiritual energy, precious, reflection, purity, fragility',
    
    // Colors
    'red': 'Passion, energy, anger, danger, vitality, love, intensity, power',
    'blue': 'Calm, sadness, truth, peace, spirituality, depth, communication',
    'green': 'Growth, healing, nature, renewal, fertility, hope, balance',
    'yellow': 'Joy, happiness, optimism, clarity, enlightenment, warmth',
    'black': 'Mystery, death, unconscious, shadow, unknown, power, void',
    'white': 'Purity, innocence, peace, blank slate, divine, emptiness, new',
    'purple': 'Spirituality, magic, intuition, mystery, transformation, royalty',
    'orange': 'Energy, enthusiasm, warmth, creativity, spontaneity, vitality',
    'gold': 'Wealth, enlightenment, divine, precious, value, success',
    'silver': 'Reflection, intuition, dreams, illusion, feminine energy, protection',
    
    // Actions & Verbs
    'flying': 'Freedom, escape, perspective, elevation, spiritual ascension, transcendence',
    'falling': 'Loss of control, anxiety, fear of failure, letting go, humility, descent',
    'running': 'Escape, urgency, fear, chase, movement away, avoidance',
    'hiding': 'Shame, fear, secrets, protection, vulnerability, avoidance',
    'dying': 'Transformation, change, ending, fear, new beginning, transition',
    'drowning': 'Overwhelm, emotional flooding, loss of control, despair, immersion',
    'climbing': 'Effort, progression, achievement, overcoming obstacles, ascent',
    'dancing': 'Joy, freedom, celebration, creativity, self-expression, harmony',
    'fighting': 'Conflict, resistance, power struggle, internal battle, opposition',
    'swimming': 'Navigating emotions, movement through feelings, adaptability',
    'singing': 'Joy, self-expression, harmony, celebration, freedom, communication',
    'eating': 'Nourishment, consumption, desire, satisfaction, taking in, greed',
    'drinking': 'Nourishment, taking in, absorption, thirst, need, indulgence',
    'playing': 'Enjoyment, freedom, creativity, lightness, childhood, spontaneity',
    'laughing': 'Joy, release, humor, relief, connection, expression',
    'crying': 'Emotion, release, sadness, overwhelm, cleansing, expression',
    'kissing': 'Affection, passion, forgiveness, peace, acceptance, intimacy',
    'building': 'Creation, construction, progress, planning, manifestation',
    'destroying': 'Clearing away, anger, endings, catharsis, transformation',
    
    // Spiritual & Mythological
    'angel': 'Guidance, protection, spiritual aspects, goodness, divine intervention',
    'demon': 'Shadow self, fears, inner darkness, temptation, evil aspects',
    'ghost': 'Past, unresolved issues, haunting memories, spirit, unseen',
    'monster': 'Fears, shadow self, unknown dangers, inner demons, fear',
    'heaven': 'Aspiration, peace, ultimate goal, fulfillment, paradise',
    'hell': 'Suffering, punishment, fear, darkness, overwhelming situation',
    'void': 'Nothingness, emptiness, unconscious, unknown, potential',
};

const symbolMap = {
    // Nature
    'forest': ['exploration', 'mystery', 'lost', 'wonder', 'growth', 'wilderness'],
    'ocean': ['emotion', 'vast', 'mystery', 'overwhelm', 'depth', 'collective'],
    'mountain': ['challenge', 'goal', 'determination', 'obstacle', 'achievement'],
    'river': ['flow', 'emotion', 'journey', 'change', 'boundaries'],
    'desert': ['isolation', 'desolation', 'harsh', 'spiritual', 'emptiness'],
    'island': ['isolation', 'independence', 'refuge', 'unique'],
    'cave': ['unconscious', 'hidden', 'exploration', 'fear', 'safety'],
    'valley': ['low', 'depression', 'vulnerability', 'rest', 'peace'],
    'cliff': ['danger', 'risk', 'fear', 'perspective', 'threshold'],
    'garden': ['growth', 'peace', 'beauty', 'harmony', 'cultivation'],
    'meadow': ['peace', 'freedom', 'simplicity', 'tranquility'],
    'swamp': ['stuck', 'confusion', 'murky', 'difficult'],
    'volcano': ['emotion', 'anger', 'powerful', 'transformation'],
    'storm': ['turmoil', 'conflict', 'chaos', 'emotional', 'release'],
    // Sky
    'sky': ['possibility', 'freedom', 'consciousness', 'perspective'],
    'clouds': ['confusion', 'obscured', 'transition', 'temporary'],
    'sun': ['consciousness', 'clarity', 'warmth', 'success', 'truth'],
    'moon': ['intuition', 'feminine', 'cycles', 'hidden', 'dreams'],
    'stars': ['hope', 'guidance', 'aspiration', 'divine'],
    'rain': ['cleansing', 'renewal', 'sadness', 'release'],
    'snow': ['purity', 'coldness', 'isolation', 'peace', 'transformation'],
    'wind': ['change', 'direction', 'freedom', 'communication'],
    'tornado': ['destructive', 'chaos', 'turbulent', 'change'],
    'lightning': ['sudden', 'illumination', 'power', 'transformation'],
    'fog': ['confusion', 'unclear', 'mystery', 'transition'],
    // Animals
    'bird': ['freedom', 'perspective', 'spiritual', 'escape', 'transcendence'],
    'owl': ['wisdom', 'intuition', 'hidden', 'knowledge', 'mystery'],
    'snake': ['transformation', 'healing', 'fear', 'power', 'wisdom'],
    'lion': ['courage', 'power', 'strength', 'dominance', 'pride'],
    'tiger': ['strength', 'danger', 'passion', 'wildness'],
    'bear': ['power', 'protection', 'solitude', 'strength'],
    'wolf': ['instinct', 'danger', 'loyalty', 'wildness'],
    'deer': ['gentleness', 'grace', 'sensitivity', 'vulnerability'],
    'elephant': ['memory', 'wisdom', 'strength', 'family'],
    'horse': ['freedom', 'power', 'grace', 'strength'],
    'cat': ['independence', 'intuition', 'mystery', 'grace'],
    'dog': ['loyalty', 'friendship', 'protection', 'love'],
    'rabbit': ['luck', 'fertility', 'escape', 'abundance'],
    'fox': ['cleverness', 'cunning', 'intelligence', 'stealth'],
    'dragon': ['power', 'magic', 'transformation', 'wisdom'],
    'butterfly': ['transformation', 'beauty', 'change', 'metamorphosis'],
    'spider': ['creativity', 'interconnection', 'fate', 'patience'],
    'bee': ['cooperation', 'productivity', 'community'],
    'fish': ['emotion', 'unconscious', 'adaptability', 'opportunity'],
    'frog': ['transformation', 'rebirth', 'fertility', 'transition'],
    'crow': ['intelligence', 'mystery', 'magic', 'transformation'],
    'dove': ['peace', 'love', 'purity', 'spirituality'],
    'eagle': ['vision', 'freedom', 'power', 'nobility'],
    'whale': ['vastness', 'depth', 'emotion', 'intelligence'],
    // Buildings
    'house': ['self', 'psyche', 'security', 'family', 'foundation'],
    'door': ['opportunity', 'choice', 'transition', 'threshold'],
    'window': ['perspective', 'clarity', 'view', 'insight', 'observation'],
    'mirror': ['reflection', 'self-image', 'truth', 'illusion'],
    'stairs': ['progress', 'effort', 'journey', 'ascension'],
    'bridge': ['connection', 'crossing', 'transition', 'challenge'],
    'basement': ['unconscious', 'hidden', 'fear', 'foundation'],
    'attic': ['mind', 'ideals', 'forgotten', 'spiritual'],
    'kitchen': ['nourishment', 'creativity', 'transformation'],
    'bedroom': ['intimacy', 'unconscious', 'rest', 'sexuality'],
    'bathroom': ['cleansing', 'private', 'elimination', 'purification'],
    'school': ['learning', 'education', 'testing', 'development'],
    'temple': ['spirituality', 'sacred', 'faith', 'sanctuary'],
    'prison': ['trapped', 'limitation', 'constraint', 'confinement'],
    'tower': ['isolation', 'perspective', 'power', 'observation'],
    // Transportation
    'car': ['personal', 'direction', 'journey', 'control', 'autonomy'],
    'train': ['direction', 'predetermined', 'commitment', 'community'],
    'airplane': ['escape', 'freedom', 'rapid', 'ambition', 'transcendence'],
    'boat': ['emotional', 'journey', 'navigation', 'exploration'],
    'motorcycle': ['speed', 'independence', 'power', 'danger'],
    // Objects
    'road': ['path', 'direction', 'journey', 'choice', 'destiny'],
    'path': ['direction', 'choice', 'journey', 'development'],
    'crossroad': ['choice', 'decision', 'direction'],
    'ladder': ['ascension', 'goals', 'progress'],
    'rope': ['connection', 'safety', 'lifeline', 'escape'],
    'chain': ['bondage', 'connection', 'restraint', 'unity'],
    'key': ['solution', 'opportunity', 'access', 'power', 'unlocking'],
    'lock': ['barrier', 'secret', 'protection', 'confinement'],
    'treasure': ['value', 'abundance', 'potential', 'worth'],
    'money': ['power', 'value', 'resources', 'self-worth'],
    'book': ['knowledge', 'wisdom', 'information', 'learning'],
    'letter': ['communication', 'message', 'news', 'revelation'],
    'clock': ['time', 'mortality', 'pressure', 'urgency'],
    'map': ['direction', 'journey', 'guidance', 'navigation'],
    'crown': ['achievement', 'authority', 'success', 'power'],
    // Actions
    'flying': ['freedom', 'escape', 'elevation', 'transcendence', 'aspiration'],
    'falling': ['loss', 'anxiety', 'fear', 'loss-of-control', 'descent'],
    'running': ['escape', 'urgency', 'fear', 'chase', 'avoidance'],
    'hiding': ['shame', 'fear', 'secret', 'protection', 'vulnerability'],
    'dying': ['transformation', 'change', 'ending', 'transition'],
    'drowning': ['overwhelm', 'emotional', 'loss-of-control', 'despair'],
    'climbing': ['effort', 'progression', 'achievement', 'ascent'],
    'dancing': ['joy', 'freedom', 'celebration', 'creativity'],
    'fighting': ['conflict', 'resistance', 'power', 'struggle'],
    'swimming': ['emotion', 'navigation', 'movement', 'adaptability'],
    'singing': ['joy', 'expression', 'harmony', 'celebration'],
    'eating': ['nourishment', 'consumption', 'desire', 'satisfaction'],
    'playing': ['enjoyment', 'freedom', 'creativity', 'spontaneity'],
    'laughing': ['joy', 'release', 'relief', 'expression'],
    'crying': ['emotion', 'release', 'sadness', 'cleansing'],
    'kissing': ['affection', 'passion', 'forgiveness', 'intimacy'],
    'building': ['creation', 'progress', 'manifestation'],
    'destroying': ['clearing', 'anger', 'ending', 'transformation'],
    // Colors
    'red': ['passion', 'energy', 'anger', 'danger', 'love', 'intensity'],
    'blue': ['calm', 'sadness', 'truth', 'peace', 'communication'],
    'green': ['growth', 'healing', 'renewal', 'balance', 'hope'],
    'yellow': ['joy', 'happiness', 'optimism', 'clarity', 'warmth'],
    'black': ['mystery', 'death', 'unconscious', 'shadow', 'void'],
    'white': ['purity', 'innocence', 'peace', 'divine', 'new'],
    'purple': ['spirituality', 'magic', 'intuition', 'transformation'],
    'orange': ['energy', 'enthusiasm', 'creativity', 'vitality'],
    'gold': ['wealth', 'enlightenment', 'precious', 'success'],
    // People
    'child': ['innocence', 'vulnerability', 'growth', 'potential'],
    'baby': ['new', 'helplessness', 'dependency', 'purity'],
    'mother': ['nurturing', 'protection', 'origin', 'security'],
    'father': ['authority', 'guidance', 'masculine', 'discipline'],
    'family': ['unity', 'belonging', 'dynamics', 'support'],
};

const emotionWords = {
    'joy': ['joy', 'happy', 'delighted', 'thrilled', 'cheerful', 'blissful', 'jubilant', 'elated', 'ecstatic', 'wonderful'],
    'sadness': ['sad', 'depressed', 'unhappy', 'sorrowful', 'melancholic', 'gloomy', 'somber', 'despondent', 'miserable', 'blue'],
    'anger': ['angry', 'furious', 'rage', 'mad', 'irritated', 'enraged', 'incensed', 'livid', 'hostile', 'bitter'],
    'fear': ['scared', 'afraid', 'terrified', 'frightened', 'anxious', 'panicked', 'apprehensive', 'dreadful', 'worried', 'nervous'],
    'excitement': ['excited', 'enthusiastic', 'eager', 'energetic', 'vibrant', 'stimulated', 'keen', 'thrilled', 'exhilarated'],
    'peace': ['calm', 'peaceful', 'serene', 'relaxed', 'tranquil', 'composed', 'placid', 'still', 'centered'],
    'confusion': ['confused', 'disoriented', 'puzzled', 'bewildered', 'uncertain', 'lost', 'perplexed', 'baffled'],
    'love': ['loved', 'cherished', 'appreciated', 'adored', 'affectionate', 'tender', 'caring', 'compassionate'],
    'trust': ['trust', 'confident', 'assured', 'secure', 'faith', 'belief', 'assured', 'reliant'],
    'doubt': ['doubt', 'skeptical', 'uncertain', 'hesitant', 'distrustful', 'suspicious', 'unsure'],
    'shame': ['shame', 'embarrassed', 'humiliated', 'ashamed', 'mortified', 'disgraced'],
    'guilt': ['guilt', 'regret', 'remorse', 'apologetic', 'repentant', 'sorry'],
    'pride': ['proud', 'accomplished', 'satisfied', 'honorable', 'dignified', 'confident'],
    'envy': ['envious', 'jealous', 'covetous', 'resentful', 'wanting'],
    'wonder': ['wonder', 'amazed', 'astonished', 'awed', 'awestruck', 'captivated', 'marveled'],
    'boredom': ['bored', 'disinterested', 'apathetic', 'dull', 'restless', 'unengaged'],
    'longing': ['longing', 'yearning', 'craving', 'desiring', 'wistful', 'pining'],
    'hope': ['hope', 'hopeful', 'optimistic', 'encouraged', 'inspired', 'positive'],
    'despair': ['despair', 'hopeless', 'defeated', 'discouraged', 'despairing'],
    'courage': ['courage', 'brave', 'bold', 'fearless', 'valiant', 'courageous'],
    'weakness': ['weak', 'vulnerable', 'fragile', 'powerless', 'helpless', 'exhausted'],
    'gratitude': ['grateful', 'thankful', 'appreciative', 'blessed', 'grateful'],
    'resentment': ['resentful', 'bitter', 'grudging', 'hostile', 'antagonistic'],
    'compassion': ['compassionate', 'empathetic', 'sympathetic', 'kind', 'caring', 'understanding'],
    'passion': ['passionate', 'fervent', 'ardent', 'zealous', 'intense', 'devoted'],
    'emptiness': ['empty', 'hollow', 'void', 'numb', 'vacant', 'desolate'],
    'fullness': ['fulfilled', 'complete', 'abundant', 'satisfied', 'rich', 'whole'],
    'isolation': ['isolated', 'abandoned', 'alone', 'rejected', 'outcast', 'lonely'],
    'connection': ['connected', 'bonded', 'included', 'belonging', 'united', 'together'],
    'vulnerability': ['vulnerable', 'exposed', 'defenseless', 'open', 'at-risk'],
    'strength': ['strong', 'powerful', 'capable', 'resilient', 'mighty', 'fortified'],
    'tension': ['tense', 'stressed', 'uptight', 'strained', 'rigid', 'tight'],
    'relief': ['relieved', 'released', 'unburdened', 'free', 'relaxed', 'unloaded'],
    'clarity': ['clear', 'lucid', 'vivid', 'distinct', 'transparent', 'obvious'],
    'obscurity': ['obscure', 'vague', 'unclear', 'murky', 'hazy', 'hidden'],
    'liberation': ['liberated', 'free', 'emancipated', 'unbound', 'released'],
    'entrapment': ['trapped', 'caught', 'snared', 'confined', 'bound', 'stuck'],
    'transformation': ['transformed', 'changing', 'evolving', 'metamorphosing', 'becoming'],
    'stagnation': ['stagnant', 'stuck', 'immobile', 'static', 'fixed', 'unchanging'],
    'awakening': ['awakened', 'aware', 'conscious', 'enlightened', 'awake', 'alert'],
    'ignorance': ['ignorant', 'unaware', 'unconscious', 'oblivious', 'blind']
};

/**
 * Get symbol meanings from transcript
 */
function extractSymbols(transcript) {
    const textLower = transcript.toLowerCase();
    const foundSymbols = new Map();
    
    Object.entries(symbolMap).forEach(([symbol, keywords]) => {
        if (textLower.includes(symbol)) {
            foundSymbols.set(symbol, dreamSymbols[symbol]);
        }
    });
    
    return foundSymbols;
}

/**
 * Analyze emotions in transcript - Enhanced to work with new emotionWords structure
 */
function analyzeEmotions(transcript) {
    const textLower = transcript.toLowerCase();
    const emotions = {};
    const emotionCounts = {};
    
    // Count matches for each emotion category
    Object.entries(emotionWords).forEach(([emotionType, words]) => {
        emotionCounts[emotionType] = 0;
        words.forEach(word => {
            if (textLower.includes(word)) {
                emotionCounts[emotionType]++;
            }
        });
    });
    
    return emotionCounts;
}

/**
 * Determine dominant emotion from emotion analysis
 */
function getDominantEmotion(emotionCounts) {
    let maxCount = 0;
    let dominant = 'neutral';
    
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
        if (count > maxCount) {
            maxCount = count;
            dominant = emotion;
        }
    });
    
    return maxCount > 0 ? dominant : 'neutral';
}

/**
 * Determine dream theme based on symbols and emotions - Enhanced
 */
function determineDreamTheme(foundSymbols, emotionCounts) {
    // Check for specific symbol combinations
    const symbols = Array.from(foundSymbols.keys());
    
    if (symbols.some(s => ['falling', 'drowning', 'trapped', 'prison'].includes(s))) {
        return 'Anxiety or Feeling Trapped';
    }
    if (symbols.some(s => ['flying', 'floating', 'light', 'eagle', 'bird'].includes(s))) {
        return 'Freedom and Aspiration';
    }
    if (symbols.some(s => ['water', 'ocean', 'river', 'swimming'].includes(s))) {
        return 'Emotional Journey';
    }
    if (symbols.some(s => ['death', 'ending', 'transformation', 'butterfly', 'phoenix'].includes(s))) {
        return 'Transformation and Change';
    }
    if (symbols.some(s => ['house', 'room', 'door', 'mirror'].includes(s))) {
        return 'Self-Exploration';
    }
    if (symbols.some(s => ['mountain', 'climbing', 'ladder', 'reaching'].includes(s))) {
        return 'Ambition and Achievement';
    }
    if (symbols.some(s => ['forest', 'wilderness', 'lost', 'searching'].includes(s))) {
        return 'Life Quest and Discovery';
    }
    if (symbols.some(s => ['fire', 'storm', 'volcano', 'tornado'].includes(s))) {
        return 'Emotional Power and Release';
    }
    
    // Check emotion dominance
    if (emotionCounts['fear'] > 2 || emotionCounts['anxiety'] > 2) {
        return 'Anxiety or Fear';
    }
    if (emotionCounts['joy'] > 2 || emotionCounts['excitement'] > 2 || emotionCounts['love'] > 2) {
        return 'Positive Growth';
    }
    
    return 'Exploration';
}

/**
 * Calculate dream complexity based on number of unique symbols and emotions
 */
function calculateDreamComplexity(foundSymbols, emotionCounts) {
    const symbolCount = foundSymbols.size;
    const emotionTypes = Object.values(emotionCounts).filter(count => count > 0).length;
    const totalEmotionMatches = Object.values(emotionCounts).reduce((a, b) => a + b, 0);
    
    const complexityScore = symbolCount + emotionTypes + (totalEmotionMatches / 2);
    
    if (complexityScore > 15) return 'Very Complex';
    if (complexityScore > 10) return 'Complex';
    if (complexityScore > 5) return 'Moderate';
    return 'Simple';
}

/**
 * Generate enhanced psychological insights with AI-like interpretation
 */
function generatePsychologicalInsights(analysis) {
    const themeInsights = {
        'Anxiety or Feeling Trapped': '⚠️ Your unconscious is processing feelings of constraint or anxiety. Consider what limitations you\'re experiencing.',
        'Freedom and Aspiration': '✈️ Desires for freedom and personal growth are prominent. You\'re working toward expansion.',
        'Emotional Journey': '💧 Deep emotional processing is occurring. Your psyche is navigating complex feelings.',
        'Transformation and Change': '🔄 Major life transitions are on your mind. Transformation and renewal are themes.',
        'Self-Exploration': '🪞 You\'re examining yourself closely. This is a time of self-discovery and understanding.',
        'Ambition and Achievement': '🎯 Goal-oriented energy is present. You\'re motivated toward achievement.',
        'Life Quest and Discovery': '🔍 You\'re on a journey of exploration and discovery. New insights await.',
        'Emotional Power and Release': '⚡ Intense emotional energy is being processed. This dream may be cathartic.',
        'Positive Growth': '🌱 Positive emotions suggest personal development and satisfaction.',
        'Exploration': '🌍 Your psyche is exploring various themes and possibilities.',
    };

    const emotionInsights = {
        'fear': '😰 Fear patterns detected. What triggers your anxiety? Explore with curiosity, not judgment.',
        'anxiety': '😟 Anxiety is prominent. Consider grounding techniques and what underlying concerns exist.',
        'anger': '😠 Anger or energy is being expressed. Identify what needs change or boundaries.',
        'sadness': '😢 Sadness is present. Allow yourself to process these feelings fully.',
        'joy': '😊 Positive emotions indicate growth and fulfillment in your waking life.',
        'peace': '🧘 Inner peace and calm are present. You\'re in harmony with yourself.',
        'confusion': '❓ Uncertainty is being processed. Your mind is working through unclear situations.',
        'love': '💖 Love and connection themes are strong. Relationships are important in your psyche.',
        'transformation': '🦋 Change is in progress. Trust the transformation process.',
        'strength': '💪 Inner strength is manifesting. You\'re tapping into your power.',
        'vulnerability': '🤝 Openness and vulnerability are present. This can lead to authentic connection.',
        'hope': '🌟 Hope is shining through. Positive expectations are present.',
    };

    let insights = `<div class="insight-item">${themeInsights[analysis.theme] || themeInsights['Exploration']}</div>`;
    
    // Add top emotion insights
    const topEmotions = Object.entries(analysis.emotionCounts)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([emotion, _]) => emotion);
    
    topEmotions.forEach(emotion => {
        if (emotionInsights[emotion]) {
            insights += `<div class="insight-item">${emotionInsights[emotion]}</div>`;
        }
    });
    
    // Add complexity insight
    if (analysis.complexity === 'Very Complex') {
        insights += `<div class="insight-item">🧠 Very complex dream - significant psychological material is being processed. Consider journaling in depth.</div>`;
    } else if (analysis.complexity === 'Complex') {
        insights += `<div class="insight-item">🧩 Layered dream - multiple themes and emotions are interacting meaningfully.</div>`;
    }
    
    // Add general guidance
    insights += `<div class="insight-item">💡 Remember: These are interpretive guides. Your intuition about your dreams is equally valid. Consider what resonates deeply with you.</div>`;

    return insights;
}

/**
 * Generate detailed dream report with comprehensive analysis
 */
function generateDreamReport(transcript, analysis) {
    let report = `<div class="dream-report">
        <h3>Dream Analysis Report</h3>
        <div class="report-section">
            <h4>🎨 Theme: ${analysis.theme}</h4>
            <p>Your dream centers around ${analysis.theme.toLowerCase()}.</p>
        </div>
        <div class="report-section">
            <h4>🔍 Symbols Detected (${analysis.symbols.size}):</h4>
            <ul>`;
    
    analysis.symbols.forEach((meaning, symbol) => {
        report += `<li><strong>${symbol}:</strong> ${meaning}</li>`;
    });
    
    report += `</ul>
        </div>
        <div class="report-section">
            <h4>😊 Emotions Detected:</h4>
            <ul>`;
    
    Object.entries(analysis.emotionCounts).forEach(([emotion, count]) => {
        if (count > 0) {
            report += `<li><strong>${emotion}:</strong> ${count} occurrences</li>`;
        }
    });
    
    report += `</ul>
        </div>
        <div class="report-section">
            <h4>💭 Complexity Level: ${analysis.complexity}</h4>
        </div>
        <div class="report-section">
            <h4>✨ Psychological Insights:</h4>
            ${analysis.insights}
        </div>
    </div>`;
    
    return report;
}
