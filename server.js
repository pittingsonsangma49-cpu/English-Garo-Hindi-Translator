import express from 'express';
import translate from 'google-translate-api';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ─── Setup ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// ─── Load Garo Dictionary once at startup ─────────────────────────────────────

let garoDictionary = null;

try {
  const dictPath = path.join(__dirname, 'garo_dictionary.json');
  garoDictionary = JSON.parse(fs.readFileSync(dictPath, 'utf-8'));
  console.log('✅ Garo dictionary loaded successfully.');
} catch (err) {
  console.error('❌ Could not load garo_dictionary.json:', err.message);
}

// ─── Classifier Logic ─────────────────────────────────────────────────────────

const NUMBERS = {
  1: 'sa', 2: 'gni', 3: 'gittam', 4: 'bri', 5: 'bonga',
  6: 'dok', 7: 'sni', 8: 'chet', 9: 'sku', 10: 'chiking',
};

const CLASSIFIER_CATEGORIES = {
  mang: ['animals', 'birds', 'insects_and_aquatic', 'animal_actions_and_parts'],
  sak:  ['family_members', 'occupations', 'social_people'],
  gong: ['at_the_market'],
  king: ['education'],
  ge:   ['fruits', 'vegetables_and_roots', 'household_items',
         'clothing_and_wearables', 'kitchen_and_cooking',
         'travel_and_transport', 'materials_and_textures'],
};

/**
 * Returns the correct classifier for a given dictionary category.
 * Falls back to "ge" (general objects) if no match found.
 */
function getClassifier(category) {
  for (const [classifier, categories] of Object.entries(CLASSIFIER_CATEGORIES)) {
    if (categories.includes(category)) return classifier;
  }
  return 'ge';
}

/**
 * Builds a counted Garo phrase: NOUN CLASSIFIER-NUMBER
 * e.g. countNoun('achak', 2, 'animals') => 'achak mang-gni'
 */
function countNoun(garoWord, count, category) {
  const classifier = getClassifier(category);
  const number = NUMBERS[count];
  if (!number) throw new Error(`Count ${count} out of range (1-10).`);
  return `${garoWord} ${classifier}-${number}`;
}

// ─── Dictionary Lookup Helper ─────────────────────────────────────────────────

/**
 * Searches every category in the dictionary for a matching English word.
 * Returns the entry + which category it was found in, or null if not found.
 *
 * @param {string} searchTerm - English word to look up (case-insensitive)
 * @returns {{ category: string, key: string, garo: string, hindi: string } | null}
 */
function lookupWord(searchTerm) {
  if (!garoDictionary) return null;

  const term = searchTerm.toLowerCase().trim();
  const skip = new Set(['_meta', 'classifier_engine']);

  for (const [category, content] of Object.entries(garoDictionary)) {
    if (skip.has(category) || typeof content !== 'object') continue;

    for (const [key, value] of Object.entries(content)) {
      if (key.startsWith('_')) continue;

      if (key.toLowerCase() === term) {
        const garo  = typeof value === 'object' ? value.garo  : value;
        const hindi = typeof value === 'object' ? value.hindi : '';
        return { category, key, garo, hindi };
      }
    }
  }
  return null;
}

// ─── Existing Route — Google Translate (unchanged) ────────────────────────────

app.post('/translate', async (req, res) => {
  const { text, from, to } = req.body;
  try {
    const result = await translate(text, { from, to });
    res.json({ translatedText: result.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── New Route — Garo Dictionary Lookup ──────────────────────────────────────

/**
 * POST /garo-translate
 *
 * Body: { "word": "dog" }
 *   or  { "word": "dog", "count": 3 }   ← include count for classifier phrase
 *
 * Response (found in dictionary):
 * {
 *   "found": true,
 *   "source": "dictionary",
 *   "english": "dog",
 *   "garo": "Achak",
 *   "hindi": "कुत्ता",
 *   "category": "animals",
 *   "classifier": "mang",
 *   "counted": "achak mang-gittam"   ← only present if count was provided
 * }
 *
 * Response (not found in dictionary — falls back to Google Translate for Hindi):
 * {
 *   "found": false,
 *   "source": "google_translate",
 *   "english": "sunset",
 *   "garo": null,
 *   "hindi": "सूर्यास्त",
 *   "note": "This word is not in the Garo dictionary yet."
 * }
 */
app.post('/garo-translate', async (req, res) => {
  const { word, count } = req.body;

  if (!word || typeof word !== 'string') {
    return res.status(400).json({ error: 'Please provide a "word" in the request body.' });
  }

  // ── Step 1: Look up in Garo dictionary first ──
  const entry = lookupWord(word);

  if (entry) {
    const response = {
      found:      true,
      source:     'dictionary',
      english:    entry.key,
      garo:       entry.garo,
      hindi:      entry.hindi,
      category:   entry.category,
      classifier: getClassifier(entry.category),
    };

    // ── Step 2: If a count was provided, build the classifier phrase ──
    if (count && Number.isInteger(count) && count >= 1 && count <= 10) {
      try {
        response.counted = countNoun(entry.garo, count, entry.category);
      } catch (e) {
        response.counted = null;
        response.countError = e.message;
      }
    }

    return res.json(response);
  }

  // ── Step 3: Word not in dictionary — fall back to Google Translate for Hindi only ──
  // NOTE: Never use Google Translate for Garo — it does not support the language.
  try {
    const hindiResult = await translate(word, { from: 'en', to: 'hi' });
    return res.json({
      found:    false,
      source:   'google_translate',
      english:  word,
      garo:     null,
      hindi:    hindiResult.text,
      note:     'This word is not in the Garo dictionary yet. Garo translation unavailable.',
    });
  } catch (error) {
    return res.status(500).json({
      found:  false,
      source: 'error',
      error:  error.message,
    });
  }
});

// ─── New Route — Get full category from dictionary ────────────────────────────

/**
 * GET /garo-category/:category
 *
 * Returns all words in a category.
 * e.g. GET /garo-category/fruits
 *
 * Response:
 * {
 *   "category": "fruits",
 *   "classifier": "ge",
 *   "words": [
 *     { "english": "mango", "garo": "Te·gachu", "hindi": "आम" },
 *     ...
 *   ]
 * }
 */
app.get('/garo-category/:category', (req, res) => {
  if (!garoDictionary) {
    return res.status(500).json({ error: 'Dictionary not loaded.' });
  }

  const category = req.params.category.toLowerCase();
  const content  = garoDictionary[category];

  if (!content || typeof content !== 'object') {
    return res.status(404).json({ error: `Category "${category}" not found.` });
  }

  const words = [];
  for (const [key, value] of Object.entries(content)) {
    if (key.startsWith('_')) continue;
    words.push({
      english: key,
      garo:    typeof value === 'object' ? value.garo  : value,
      hindi:   typeof value === 'object' ? value.hindi : '',
    });
  }

  res.json({
    category,
    classifier: content._classifier || getClassifier(category),
    words,
  });
});

// ─── New Route — List all available categories ────────────────────────────────

/**
 * GET /garo-categories
 *
 * Returns all category names in the dictionary.
 */
app.get('/garo-categories', (req, res) => {
  if (!garoDictionary) {
    return res.status(500).json({ error: 'Dictionary not loaded.' });
  }

  const skip = new Set(['_meta', 'classifier_engine']);
  const categories = Object.keys(garoDictionary).filter(k => !skip.has(k));
  res.json({ categories });
});

// ─── Catch-all — Serve frontend ───────────────────────────────────────────────

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
