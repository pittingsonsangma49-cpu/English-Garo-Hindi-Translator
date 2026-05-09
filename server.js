import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Fuse from 'fuse.js';
import translate from 'google-translate-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// ─── Data Loading ───────────────────────────────────────────────────────────
const dictionary = JSON.parse(fs.readFileSync(path.join(__dirname, 'dictionary.json'), 'utf8'));
let garoDictionary = null;

try {
  const garoDictionaryPath = path.join(__dirname, 'garo_dictionary.json');
  garoDictionary = JSON.parse(fs.readFileSync(garoDictionaryPath, 'utf8'));
  console.log('✅ Garo dictionary loaded successfully.');
} catch (err) {
  console.error('❌ Could not load garo_dictionary.json:', err.message);
}

const fuse = new Fuse(dictionary, {
  keys: ['english', 'garo', 'hindi'],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

// ─── Classifier and Number Logic ────────────────────────────────────────────
const NUMBERS = {
  1: 'Sa', 2: 'Gni', 3: 'Gittam', 4: 'Bri', 5: 'Bonga',
  6: 'Dok', 7: 'Sni', 8: 'Chet', 9: 'Sku', 10: 'Chiking',
};

const CLASSIFIER_CATEGORIES = {
  Mang: ['animals', 'birds', 'insects_and_aquatic', 'animal_actions_and_parts'],
  Sak: ['family_members', 'occupations', 'social_people'],
  Gong: ['at_the_market', 'money_and_currency'],
  King: ['education', 'books_paper_leaves', 'flat_thin_objects'],
  Ge: ['fruits', 'vegetables_and_roots', 'household_items', 'clothing_and_wearables', 'kitchen_and_cooking', 'travel_and_transport', 'materials_and_textures'],
};

function getClassifier(category) {
  if (!category) return 'Ge';
  const normalized = category.toLowerCase();
  for (const [classifier, categories] of Object.entries(CLASSIFIER_CATEGORIES)) {
    if (categories.includes(normalized)) return classifier;
  }
  return 'Ge';
}

function countNoun(garoWord, count, category) {
  const classifier = getClassifier(category);
  const number = NUMBERS[count];
  if (!number) throw new Error(`Count ${count} out of range (1-10).`);
  return `${classifier} ${number} ${garoWord}`;
}

function lookupWord(searchTerm) {
  if (!garoDictionary) return null;
  const term = searchTerm.toLowerCase().trim();
  const skip = new Set(['_meta', 'classifier_engine']);

  for (const [category, content] of Object.entries(garoDictionary)) {
    if (skip.has(category) || typeof content !== 'object') continue;
    for (const [key, value] of Object.entries(content)) {
      if (key.startsWith('_')) continue;
      if (key.toLowerCase() === term) {
        const garo = typeof value === 'object' ? value.garo : value;
        const hindi = typeof value === 'object' ? value.hindi : '';
        return { category, key, garo, hindi };
      }
    }
  }
  return null;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[-_]+/g, ' ')
    .replace(/[\s]+/g, ' ');
}

function translateToGaro(text) {
  const normalized = normalizeText(text);
  const words = normalized.split(' ').filter(Boolean);
  let translated = normalized;
  const breakdown = {};

  const countingMatch = normalized.match(/^(one|two|three|four|five|six|seven|eight|nine|ten)\s+(\w+)$/);
  if (countingMatch) {
    const [, numWord, noun] = countingMatch;
    const numMap = { one: 'Gni', two: 'Gni', three: 'Gittam', four: 'Bri', five: 'Bonga', six: 'Dok', seven: 'Sni', eight: 'Chet', nine: 'Sku', ten: 'Chiking' };
    const nounEntry = dictionary.find(item => item.english.toLowerCase() === noun);
    if (nounEntry) {
      translated = `${getClassifier(nounEntry.category)} ${numMap[numWord]} ${nounEntry.garo}`;
      breakdown.classifier = `${getClassifier(nounEntry.category)} (${nounEntry.category} classifier)`;
      breakdown.grammar = 'Natural Garo classifier-number-noun order';
      return { translated, breakdown };
    }
  }

  if (words.length === 3 && words[1] === 'am') {
    const pronounMap = { i: 'Anga', you: 'Na·a', he: 'Ua', she: 'Ua', we: 'An·ching', they: 'Uamang' };
    const verbMap = { eating: 'cha·enga', going: 're·ang·a', sleeping: 'tus·enga', coming: 're·ba·a', speaking: 'agan·enga' };
    if (pronounMap[words[0]] && verbMap[words[2]]) {
      translated = `${pronounMap[words[0]]} ${verbMap[words[2]]}`;
      breakdown.grammar = 'SOV structure: Subject-Object-Verb';
      breakdown.tense = 'Present continuous';
      return { translated, breakdown };
    }
  }

  const translatedWords = words.map((word) => {
    const result = fuse.search(word);
    if (result.length > 0) return result[0].item.garo;
    return word;
  });

  translated = translatedWords.join(' ');
  breakdown.morphology = 'Morphology-aware lookup with word-level mapping';
  return { translated, breakdown };
}

async function handleTranslate(req, res) {
  const { text, from, to } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required for translation.' });
  }

  try {
    const target = (to || 'garo').toLowerCase();
    if (target === 'garo') {
      const { translated, breakdown } = translateToGaro(text);
      return res.json({ translatedText: translated, breakdown });
    }

    if (target === 'hi' || target === 'hindi') {
      const result = await translate(text, { from: from || 'en', to: 'hi' });
      return res.json({ translatedText: result.text, breakdown: { source: 'Hindi fallback via Google Translate' } });
    }

    return res.status(400).json({ error: 'Unsupported target language.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

app.post('/api/translate', handleTranslate);
app.post('/translate', handleTranslate);

app.get('/api/dictionary', (req, res) => {
  const { query, category } = req.query;
  let results = dictionary;

  if (query) {
    results = fuse.search(query).map((r) => r.item);
  }
  if (category) {
    results = results.filter((item) => String(item.category).toLowerCase() === category.toLowerCase());
  }

  res.json(results.slice(0, 100));
});

app.get('/api/phrases', (req, res) => {
  const phrases = dictionary.filter((item) => String(item.category).toLowerCase() === 'phrase');
  res.json(phrases);
});

app.post('/garo-translate', async (req, res) => {
  const { word, count } = req.body;

  if (!word || typeof word !== 'string') {
    return res.status(400).json({ error: 'Please provide a "word" in the request body.' });
  }

  const entry = lookupWord(word);
  if (entry) {
    const response = {
      found: true,
      source: 'dictionary',
      english: entry.key,
      garo: entry.garo,
      hindi: entry.hindi,
      category: entry.category,
      classifier: getClassifier(entry.category),
    };

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

  try {
    const hindiResult = await translate(word, { from: 'en', to: 'hi' });
    return res.json({
      found: false,
      source: 'google_translate',
      english: word,
      garo: null,
      hindi: hindiResult.text,
      note: 'This word is not in the Garo dictionary yet. Garo translation unavailable.',
    });
  } catch (error) {
    return res.status(500).json({ found: false, source: 'error', error: error.message });
  }
});

app.get('/garo-category/:category', (req, res) => {
  if (!garoDictionary) {
    return res.status(500).json({ error: 'Dictionary not loaded.' });
  }

  const category = req.params.category.toLowerCase();
  const content = garoDictionary[category];
  if (!content || typeof content !== 'object') {
    return res.status(404).json({ error: `Category "${category}" not found.` });
  }

  const words = [];
  for (const [key, value] of Object.entries(content)) {
    if (key.startsWith('_')) continue;
    words.push({
      english: key,
      garo: typeof value === 'object' ? value.garo : value,
      hindi: typeof value === 'object' ? value.hindi : '',
    });
  }

  res.json({
    category,
    classifier: content._classifier || getClassifier(category),
    words,
  });
});

app.get('/garo-categories', (req, res) => {
  if (!garoDictionary) {
    return res.status(500).json({ error: 'Dictionary not loaded.' });
  }

  const skip = new Set(['_meta', 'classifier_engine']);
  const categories = Object.keys(garoDictionary).filter((key) => !skip.has(key));
  res.json({ categories });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
