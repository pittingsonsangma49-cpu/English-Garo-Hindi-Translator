// src/api/gemini.js

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export async function translateToGaro(text, dictionary) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  // Build context from dictionary so Gemini uses correct Garo words
  const dictContext = buildDictionaryContext(dictionary)

  const prompt = `
You are an expert Garo language translator.
Use ONLY the following Garo vocabulary when translating.
If a word is not in the vocabulary list, transliterate it phonetically into Garo script.

GARO VOCABULARY REFERENCE:
${dictContext}

GARO GRAMMAR RULES:
1. Counted nouns: NOUN + CLASSIFIER-NUMBER (e.g. achak mang-sa = one dog)
2. Classifiers: mang=animals, sak=people, gong=money, king=books/paper, ge=everything else
3. Numbers: sa=1, gni=2, gittam=3, bri=4, bonga=5, dok=6, sni=7, chet=8, sku=9, chiking=10
4. Verb endings: present=-enga, past=-aha, future=-gen
5. Negation: add ong·ja after the verb
6. Questions: add maia (what) or bano (where) or sawa (who) at the end

TRANSLATE THIS TEXT TO GARO:
"${text}"

Return ONLY the Garo translation. No explanation. No romanization guide.
  `

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
    })
  })

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Translation failed'
}

export async function translateFromGaro(garoText, dictionary) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const dictContext = buildDictionaryContext(dictionary)

  const prompt = `
You are an expert Garo language translator.
Use the following Garo vocabulary reference to translate accurately.

GARO VOCABULARY REFERENCE:
${dictContext}

TRANSLATE THIS GARO TEXT TO ENGLISH:
"${garoText}"

Return ONLY the English translation. No explanation.
  `

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
    })
  })

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Translation failed'
}

// Builds a compact vocabulary string from the dictionary for prompt injection
function buildDictionaryContext(dictionary) {
  const skip = new Set(['_meta', 'classifier_engine'])
  const lines = []

  for (const [category, content] of Object.entries(dictionary)) {
    if (skip.has(category) || typeof content !== 'object') continue
    for (const [key, value] of Object.entries(content)) {
      if (key.startsWith('_')) continue
      const garo  = typeof value === 'object' ? value.garo  : value
      const hindi = typeof value === 'object' ? value.hindi : ''
      lines.push(`${key} = ${garo} (Hindi: ${hindi})`)
    }
  }

  return lines.join('\n')
}