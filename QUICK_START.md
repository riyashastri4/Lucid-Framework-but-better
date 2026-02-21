# Quick Reference - Dream Tracking & Prediction

## Start Using (30 Seconds)

```
1. Go to lucidframeworks.html
2. Click 🎙️ "Start Listening"
3. Say a dream: "I was in a forest with trees, then I flew over mountains"
4. Click ⏹️ "Stop Listening"
5. Dream auto-saved! ✓ See predictions appear below
```

---

## What You'll See

### Immediately After First Dream
```
✅ Dream recorded
✅ Graph shows scenes
✅ Analysis displays
(Predictions need 2+ dreams)
```

### After 2+ Dreams
```
📊 Dream Tracking Statistics
▸ Dreams Recorded: 2
▸ Unique Scenes: 4
▸ Scene Transitions: 3

🔮 Predicted Next Dream (75% confident)
1. Mountain      75%
2. Forest        60%
3. Lake          45%
```

### After 5+ Dreams
```
Much better predictions!
Clear patterns emerge
Confidence usually 70-85%
```

---

## All Functions

| Click | What Happens |
|------|----------|
| 🎙️ Start Listening | Record dream via microphone |
| ⏹️ Stop Listening | Stop recording |
| ➕ Add Dream Scene | Manually type in scene |
| 🔗 Add Transition | Connect scenes together |
| ⚡ Analyze Transitions | Save, analyze, show predictions |
| 🔮 Interpret Dream | Get psychology interpretation |
| 📜 Dream History | View all past dreams |
| 💾 Export Data | Download as dream_data_YYYY-MM-DD.json |
| 🗑️ Clear Data | DELETE all dreams (permanent!) |

---

## Useful Commands in Browser Console

```javascript
// Check if dream tracker is working
console.log(dreamTracker.getAllDreams());

// Get current statistics
console.log(dreamTracker.getStatistics());

// See prediction for next dream
console.log(dreamTracker.predictNextDream());

// Export all data
console.log(dreamTracker.exportData());

// Check what's stored
console.log(JSON.parse(localStorage.getItem('dreamTracker')));
```

---

## Examples

### Example 1: Simple 2-Scene Dreams
```
Dream 1: "I was in a house, then I went to the beach"
Dream 2: "I was in a house, then I went to the beach"

Prediction: 100% "You always dream house → beach!"
```

### Example 2: Varying Dreams
```
Dream 1: forest → mountain
Dream 2: forest → lake
Dream 3: forest → river

Prediction: "You usually start in forest (100%), 
             then go to mountain/lake/river (each 33%)"
```

### Example 3: Complex Narrative
```
Dream 1: castle → hallway → throne room → escaping
Dream 2: castle → garden → maze → escaping  
Dream 3: castle → dungeons → prison → escaping

Prediction: "Pattern: castle (100%) → somewhere (varied) 
             → escaping (100%)"
```

---

## Tips & Tricks

### Better Predictions
- ✓ Record dreams over multiple days/weeks
- ✓ Use voice input (more natural = better)
- ✓ Be specific: "dark castle" vs just "castle"
- ✓ Describe transitions: "then I flew to..."

### Save Your Data
```
Every week:
1. Click 💾 Export Data
2. Save the JSON file somewhere safe
3. Backup to cloud storage if needed
```

### Clear Bad Data
```
If corrupted:
1. Open Browser DevTools (F12)
2. Go to Application → LocalStorage
3. Find key: "dreamTracker"
4. Delete it
5. Page will restart
```

---

## How Prediction Works

### Step 1: Collect
- Every dream you describe is saved
- Scenes extracted automatically
- Transitions recorded

### Step 2: Analyze
- System finds patterns: which scenes go together?
- Counts: "forest appears 3x, mountain appears 2x"
- Maps: "forest→mountain happens 2x, forest→lake happens 1x"

### Step 3: Predict
- Look at your last dream
- Check what usually comes next
- If multiple options, show all with likelihood %
- Give reasoning for prediction

---

## Confidence Score Meaning

| Score | Meaning |
|-------|---------|
| 90-100% | Very strong pattern, likely prediction |
| 75-89% | Clear pattern, good prediction |
| 60-74% | Moderate pattern, reasonable guess |
| 40-59% | Weak pattern, maybe helpful |
| 0-39% | Too little data, not reliable |

---

## Common Questions

**Q: Where is my data saved?**
A: Browser LocalStorage (stays on your computer)

**Q: Can I sync across devices?**
A: Not automatically - export/import manually

**Q: Do predictions work with just 1 dream?**
A: No, need 2+ dreams for patterns to form

**Q: Can I delete one dream?**
A: Not easily - export data, edit JSON, reimport

**Q: Will this work on mobile?**
A: Yes, if browser supports Web Speech API

**Q: What if I clear my browser cache?**
A: Data is deleted - export first!

---

## Keyboard Shortcuts

```
F12              Open browser console
Ctrl+Shift+J     Also opens console  
Ctrl+Shift+I     Open DevTools
```

---

## Troubleshooting

### Dreams Not Saving?
```
1. Check if LocalStorage is enabled
2. F12 → Application → LocalStorage → look for "dreamTracker"
3. If missing, reload page
```

### Predictions Say "Insufficient Data"?
```
1. You need 2+ dreams recorded
2. Record at least 2 different dreams
3. Then predictions will appear
```

### Microphone Not Working?
```
1. Check browser has microphone permission
2. Try Chrome or Edge (best support)
3. Check HTTPS is used (required for voice)
```

### Export Not Working?
```
1. Check browser allows downloads
2. Try a different browser
3. Manually copy data from console
```

---

## Recording Tips

### What To Say
✓ "I was in a dark forest with tall trees"
✓ "Then I saw a lake with blue water"
✓ "Then I flew over mountains"
✓ "And finally I landed in a castle"

### What NOT To Say
✗ "um, like, forest, you know, thing"
✗ "I think maybe a house or something"
✗ "Don't remember exactly but like..."

### Best Practices
1. Speak clearly and slowly
2. Use full sentences: "I was in X" not just "X"
3. Describe transitions: "then I went to" / "suddenly"
4. Include details: "dark forest" not just "forest"

---

## Data Privacy

✓ **All data stays on your laptop**
✓ **Never sent to servers**
✓ **Never shared with anyone**
✓ **You control when to export/backup**
✓ **You can delete anytime**

---

## Get More Details

- See: `DREAM_TRACKER_GUIDE.md` for detailed guide
- See: `IMPLEMENTATION_SUMMARY.md` for technical details
- See: `VOICE_FIX_SUMMARY.md` for voice improvements

---

**Start tracking your dreams today! 🌙✨**
