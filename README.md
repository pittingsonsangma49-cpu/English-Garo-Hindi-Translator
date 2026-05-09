# 🏔️ Garo Language Education Portal

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000.svg)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4.svg)](https://ai.google.dev/)

A comprehensive multilingual education platform for the **A'chik Garo** language, designed to preserve and teach indigenous languages of Northeast India. Built for scalability to support all regional languages and ready for government education portal deployment.

## 🌟 Features

### 📚 **Complete Language Learning Suite**
- **Real-time Translation**: English ↔ Garo ↔ Hindi with AI-powered accuracy
- **Dictionary Browser**: 700+ vocabulary entries with semantic search
- **Phrase Library**: Common expressions with practice mode
- **Verb Conjugation**: Interactive tense and mood learning
- **Grammar Reference**: Complete morphological and syntactic guide

### 🤖 **AI-Powered Translation Engine**
- **Google Gemini Integration**: Context-aware translations using dictionary knowledge
- **Dictionary-First Approach**: Prioritizes verified vocabulary over generic AI
- **Semantic Understanding**: Maintains cultural and linguistic accuracy
- **Fallback Intelligence**: Graceful degradation for unknown terms

### 🏗️ **Noun Classifier System**
- **Garo Morphology**: Proper noun counting with classifiers (mang/sak/gong/king/ge)
- **Cultural Accuracy**: Maintains traditional counting patterns
- **Interactive Learning**: Visual classifier badges and counting examples

### 📱 **Modern Web Architecture**
- **Responsive Design**: Mobile-first approach for rural accessibility
- **Progressive Web App**: Offline-capable for remote areas
- **Fast Performance**: Vite build system with optimized bundles
- **Accessibility**: WCAG-compliant design for inclusive education

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pittingsonsangma49-cpu/English-Garo-Hindi-Translator.git
cd English-Garo-Hindi-Translator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3001`

## 📖 Usage Guide

### Translation Page
- **Single Words**: Instant dictionary lookup with classifier information
- **Sentences**: AI-powered translation with cultural context
- **Direction Toggle**: Switch between English→Garo and Garo→English
- **Character Limits**: 2000 character limit for optimal AI performance

### Dictionary Browser
- **Category Navigation**: Explore by semantic categories (animals, food, colors, etc.)
- **Search Functionality**: Fuzzy search across English, Garo, and Hindi
- **Counting Feature**: See how nouns are counted with classifiers
- **Classifier Badges**: Visual indicators for noun categories

### Learning Features
- **Phrase Practice**: Hide/reveal translations for active learning
- **Verb Tables**: Complete conjugation reference with examples
- **Grammar Sections**: Interactive explanations with examples
- **Progress Tracking**: Built-in foundation for user accounts

## 🏛️ Architecture

### Frontend Stack
```
React 18.2.0 + Vite 5.4.21
├── TailwindCSS 4.3.0 (Utility-first styling)
├── React Router 7.15.0 (SPA navigation)
├── Axios/Fetch API (HTTP requests)
└── Custom Components (Reusable UI library)
```

### Backend Stack
```
Node.js + Express 4.18.2
├── RESTful API endpoints
├── Dictionary management
├── AI integration layer
└── Static file serving
```

### Data Architecture
```
garo_dictionary.json (700+ entries)
├── _meta: Version and language metadata
├── classifier_engine: Noun classification rules
├── categories: Semantic word groupings
│   ├── _classifier: Category classifier type
│   ├── _examples: Sample sentences
│   └── word entries: { garo, hindi } pairs
└── src/garo_classifier.js: Classification logic
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/garo-translate` | POST | Single word lookup with counting |
| `/garo-categories` | GET | List all dictionary categories |
| `/garo-category/:cat` | GET | Words in specific category |
| `/garo-sentence` | POST | AI-powered sentence translation |
| `/translate` | POST | Legacy translation endpoint |

## 🎯 Garo Language Features

### Noun Classification System
Garo uses **classifiers** for counting nouns, following the pattern: `NOUN + CLASSIFIER-NUMBER`

| Classifier | Use Case | Example |
|------------|----------|---------|
| **mang** | Animals, birds, insects | `achak mang-sa` (one dog) |
| **sak** | People, humans | `manderang sak-sa` (one person) |
| **gong** | Money, currency | `takka gong-sa` (one rupee) |
| **king** | Books, paper, leaves | `kitap king-sa` (one book) |
| **ge** | General objects | `chik ge-sa` (one thing) |

### Sentence Structure
Garo follows **Subject-Object-Verb (SOV)** word order:
- English: `I rice eat` → Garo: `Anga mi cha·enga`
- Different from English (SVO) and Hindi (SOV but different particles)

### Verb Morphology
- **Present**: `-enga` (eating: `cha·enga`)
- **Past**: `-aha` (ate: `cha·aha`)
- **Future**: `-gen` (will eat: `cha·gen`)
- **Negative**: `ong·ja` (not eating: `cha·ong·ja`)

## 🔧 Development

### Project Structure
```
├── src/
│   ├── main.jsx              # App entry point with routing
│   ├── api/
│   │   └── gemini.js         # AI translation service
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation component
│   │   ├── Footer.jsx        # Footer component
│   │   └── WordCard.jsx      # Reusable word display
│   └── pages/
│       ├── Translation.jsx   # Main translation interface
│       ├── CommonWords.jsx   # Dictionary browser
│       ├── Phrases.jsx       # Phrase learning
│       ├── Verbs.jsx         # Verb conjugation
│       └── Grammar.jsx       # Grammar reference
├── server.js                 # Express backend
├── garo_dictionary.json      # Language data
├── src/garo_classifier.js    # Classification logic
└── .env                      # API keys (not in repo)
```

### Environment Variables
```bash
# .env file (create this)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🌍 Cultural Impact

### Northeast India Language Preservation
This portal serves as a foundation for preserving **A'chik Garo** and other indigenous languages of Northeast India:

- **Garo**: Meghalaya's primary indigenous language (1.2M speakers)
- **Future Languages**: Bodo, Mising, Karbi, Dimasa, Khasi, etc.
- **Cultural Heritage**: Traditional knowledge, stories, and wisdom

### Educational Applications
- **School Integration**: Government curriculum support
- **Teacher Training**: Professional development resources
- **Community Learning**: Self-paced education for all ages
- **Research Tools**: Linguistic analysis and documentation

## 🤝 Contributing

### Adding New Words
1. Edit `garo_dictionary.json`
2. Follow existing structure: `"english_word": { "garo": "...", "hindi": "..." }`
3. Add to appropriate category
4. Include `_examples` for common phrases
5. Test with classifier system

### Code Contributions
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Follow existing code style and patterns
4. Add tests for new functionality
5. Submit pull request with detailed description

### Language Expansion
The architecture supports adding new languages:
1. Create `language_dictionary.json`
2. Add `src/language_classifier.js`
3. Update API routes for new language
4. Add language selector to UI

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Garo Language Community**: For preserving linguistic heritage
- **Northeast India**: For rich cultural diversity
- **Google Gemini AI**: For enabling accurate translations
- **Open Source Community**: For development tools and frameworks

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: [Report bugs or request features](https://github.com/pittingsonsangma49-cpu/English-Garo-Hindi-Translator/issues)
- **Email**: Contact repository maintainer
- **Documentation**: See inline code comments for technical details

---

**Built with ❤️ for the preservation of indigenous languages and cultural heritage of Northeast India.**
