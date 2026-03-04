require('dotenv').config({ path: '.env.local' });
const fs = require('fs').promises;
const path = require('path');

class ContentTranslator {
  constructor() {
    this.languages = ['zh', 'de', 'fr', 'nl', 'es', 'it', 'ja'];
    this.languageNames = {
      zh: 'Chinese (Simplified)',
      de: 'German',
      fr: 'French',
      nl: 'Dutch',
      es: 'Spanish',
      it: 'Italian',
      ja: 'Japanese'
    };
  }

  // Translate a single piece of text using the AI provider
  async translateText(text, targetLang, context = '') {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.');
      return text;
    }

    const prompt = `Translate the following English text to ${this.languageNames[targetLang]}.
    ${context ? `Context: ${context}` : ''}

    Important:
    - Maintain the tone and style (friendly, informative travel content)
    - Keep proper nouns (place names) in their commonly used form for the target language
    - For food items, use the local French name with explanation if needed
    - Be culturally appropriate for ${this.languageNames[targetLang]} speakers

    Text to translate:
    "${text}"

    Return ONLY the translated text, nothing else.`;

    try {
      if (process.env.ANTHROPIC_API_KEY) {
        return await this._callClaude(prompt);
      } else {
        return await this._callOpenAI(prompt);
      }
    } catch (error) {
      console.error(`Translation failed for ${targetLang}:`, error.message);
      return text;
    }
  }

  async _callClaude(prompt) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const textBlock = data.content?.find(block => block.type === 'text');
    return textBlock?.text || '';
  }

  async _callOpenAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-nano-2025-08-07',
        max_completion_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  // Translate city basic info
  async translateCityBasics(citySlug) {
    console.log(`\nTranslating city basics for: ${citySlug}`);

    try {
      // Read enhanced city data (try enhanced first, then standard)
      let cityData;
      const enhancedPath = path.join(__dirname, '..', 'data', 'enhanced', `${citySlug}.json`);
      const standardPath = path.join(__dirname, '..', 'data', 'cities', `${citySlug}.json`);

      try {
        cityData = JSON.parse(await fs.readFile(enhancedPath, 'utf8'));
      } catch {
        cityData = JSON.parse(await fs.readFile(standardPath, 'utf8'));
      }

      const cityName = cityData.name?.en || cityData.name || citySlug;

      const translations = {
        name: { en: cityName },
        description: { en: cityData.description?.en || cityData.description || '' },
        highlights: { en: cityData.highlights || [] }
      };

      for (const lang of this.languages) {
        console.log(`  Translating to ${this.languageNames[lang]}...`);

        translations.description[lang] = await this.translateText(
          translations.description.en,
          lang,
          `City description for ${cityName}, a French destination`
        );

        if (translations.highlights.en.length > 0) {
          translations.highlights[lang] = [];
          for (const highlight of translations.highlights.en) {
            const translated = await this.translateText(
              highlight,
              lang,
              `Tourist highlight for ${cityName}`
            );
            translations.highlights[lang].push(translated);
          }
        }

        translations.name[lang] = await this.getCityNameTranslation(cityName, lang);

        // Rate limit delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const translationPath = path.join(__dirname, '..', 'translations', 'cities', `${citySlug}.json`);
      await fs.mkdir(path.dirname(translationPath), { recursive: true });
      await fs.writeFile(translationPath, JSON.stringify(translations, null, 2));

      console.log(`  Saved translations for ${citySlug}`);
      return translations;

    } catch (error) {
      console.error(`  Error translating ${citySlug}:`, error.message);
      return null;
    }
  }

  // Get standard city name translations for major French cities
  async getCityNameTranslation(cityName, lang) {
    const cityNames = {
      'Paris': {
        zh: '巴黎', de: 'Paris', fr: 'Paris', nl: 'Parijs',
        es: 'Paris', it: 'Parigi', ja: 'パリ'
      },
      'Lyon': {
        zh: '里昂', de: 'Lyon', fr: 'Lyon', nl: 'Lyon',
        es: 'Lyon', it: 'Lione', ja: 'リヨン'
      },
      'Marseille': {
        zh: '马赛', de: 'Marseille', fr: 'Marseille', nl: 'Marseille',
        es: 'Marsella', it: 'Marsiglia', ja: 'マルセイユ'
      },
      'Nice': {
        zh: '尼斯', de: 'Nizza', fr: 'Nice', nl: 'Nice',
        es: 'Niza', it: 'Nizza', ja: 'ニース'
      },
      'Bordeaux': {
        zh: '波尔多', de: 'Bordeaux', fr: 'Bordeaux', nl: 'Bordeaux',
        es: 'Burdeos', it: 'Bordeaux', ja: 'ボルドー'
      },
      'Strasbourg': {
        zh: '斯特拉斯堡', de: 'Straßburg', fr: 'Strasbourg', nl: 'Straatsburg',
        es: 'Estrasburgo', it: 'Strasburgo', ja: 'ストラスブール'
      },
      'Toulouse': {
        zh: '图卢兹', de: 'Toulouse', fr: 'Toulouse', nl: 'Toulouse',
        es: 'Toulouse', it: 'Tolosa', ja: 'トゥールーズ'
      },
      'Avignon': {
        zh: '阿维尼翁', de: 'Avignon', fr: 'Avignon', nl: 'Avignon',
        es: 'Avignon', it: 'Avignone', ja: 'アヴィニョン'
      },
      'Lille': {
        zh: '里尔', de: 'Lille', fr: 'Lille', nl: 'Rijsel',
        es: 'Lille', it: 'Lilla', ja: 'リール'
      },
      'Nantes': {
        zh: '南特', de: 'Nantes', fr: 'Nantes', nl: 'Nantes',
        es: 'Nantes', it: 'Nantes', ja: 'ナント'
      }
    };

    return cityNames[cityName]?.[lang] || cityName;
  }

  // Translate food items
  async translateFood(foodSlug) {
    console.log(`\nTranslating food: ${foodSlug}`);

    try {
      let foodData;
      const enhancedPath = path.join(__dirname, '..', 'data', 'enhanced', 'food', `${foodSlug}.json`);
      const standardPath = path.join(__dirname, '..', 'data', 'food', `${foodSlug}.json`);

      try {
        foodData = JSON.parse(await fs.readFile(enhancedPath, 'utf8'));
      } catch {
        foodData = JSON.parse(await fs.readFile(standardPath, 'utf8'));
      }

      const dishName = foodData.name?.en || foodData.name || foodSlug;
      const dishFr = foodData.name?.fr || '';

      const translations = {
        name: {
          en: dishName,
          fr: dishFr
        },
        description: { en: foodData.description?.en || foodData.description || '' },
        ingredients: { en: foodData.ingredients || [] }
      };

      for (const lang of this.languages) {
        if (lang === 'fr' && dishFr) {
          // Skip French for name if we already have it
          translations.name[lang] = translations.name[lang] || dishFr;
        } else {
          translations.name[lang] = await this.translateText(
            dishName,
            lang,
            'French food dish name - keep recognizable'
          );
        }

        console.log(`  Translating to ${this.languageNames[lang]}...`);

        translations.description[lang] = await this.translateText(
          translations.description.en,
          lang,
          `Description of French dish ${dishName}`
        );

        if (translations.ingredients.en.length > 0) {
          translations.ingredients[lang] = [];
          for (const ingredient of translations.ingredients.en) {
            const translated = await this.translateText(
              ingredient,
              lang,
              'Food ingredient'
            );
            translations.ingredients[lang].push(translated);
          }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const translationPath = path.join(__dirname, '..', 'translations', 'food', `${foodSlug}.json`);
      await fs.mkdir(path.dirname(translationPath), { recursive: true });
      await fs.writeFile(translationPath, JSON.stringify(translations, null, 2));

      console.log(`  Saved translations for ${foodSlug}`);
      return translations;

    } catch (error) {
      console.error(`  Error translating ${foodSlug}:`, error.message);
      return null;
    }
  }

  // Main translation runner
  async translateBatch(type = 'cities', limit = 3) {
    console.log(`\nStarting batch translation for ${type} (limit: ${limit})`);

    if (type === 'cities') {
      const cities = ['paris', 'lyon', 'marseille', 'nice', 'bordeaux'].slice(0, limit);

      for (const city of cities) {
        await this.translateCityBasics(city);
        console.log(`  Waiting 2 seconds before next city...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    if (type === 'food') {
      const foods = ['croissant', 'coq-au-vin', 'ratatouille', 'bouillabaisse', 'crepes'].slice(0, limit);

      for (const food of foods) {
        await this.translateFood(food);
        console.log(`  Waiting 2 seconds before next dish...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\nBatch translation complete!');
  }
}

// CLI usage
if (require.main === module) {
  const translator = new ContentTranslator();
  const args = process.argv.slice(2);

  const command = args[0] || 'help';
  const type = args[1] || 'cities';
  const limit = parseInt(args[2]) || 3;

  const commands = {
    help: () => {
      console.log(`
Go2France Content Translator
==============================

Usage:
  node translate-content.js batch [type] [limit]  - Translate content in batches
  node translate-content.js city [slug]           - Translate single city
  node translate-content.js food [slug]           - Translate single food item

Examples:
  node translate-content.js batch cities 3        - Translate 3 cities
  node translate-content.js batch food 5          - Translate 5 food items
  node translate-content.js city paris            - Translate Paris only
  node translate-content.js food croissant        - Translate Croissant only
      `);
    },

    batch: async () => {
      await translator.translateBatch(type, limit);
    },

    city: async () => {
      const citySlug = type;
      await translator.translateCityBasics(citySlug);
    },

    food: async () => {
      const foodSlug = type;
      await translator.translateFood(foodSlug);
    }
  };

  const handler = commands[command] || commands.help;

  if (command === 'help') {
    handler();
  } else {
    handler().catch(console.error);
  }
}

module.exports = ContentTranslator;
