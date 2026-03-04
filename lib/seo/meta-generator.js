class MetaGenerator {
  constructor() {
    this.titleVariants = [
      "Discover {city} | Ultimate France Travel Guide",
      "Best Things to Do in {city} | Travel Tips & Attractions",
      "{city} Travel Guide 2026 | Top Attractions & Hotels",
      "Visit {city}, France | Complete Tourist Guide",
      "{city} Tourism | What to See, Eat & Do"
    ];

    this.descriptionVariants = [
      "Your complete guide to {city}, France. Discover top attractions, best restaurants, hotels, and travel tips for the perfect trip.",
      "Explore {city} with our detailed travel guide. Find the best things to do, places to eat, and where to stay in this amazing French destination.",
      "Planning a trip to {city}? Get insider tips on attractions, food, accommodation, and activities in this beautiful French city.",
      "Discover what makes {city} special. Our comprehensive guide covers must-see sights, local cuisine, hotels, and travel advice.",
      "Everything you need to know about visiting {city}, France. From top attractions to hidden gems, plan your perfect getaway."
    ];

    this.categoryTitleVariants = {
      attractions: [
        "Top 10 Attractions in {city} | Must-See Sights & Activities",
        "Best Things to See in {city} | Ultimate Attractions Guide",
        "{city} Attractions Guide | Top Sights & Activities",
        "Must-Visit Places in {city} | Top Tourist Attractions",
        "Explore {city} | Best Attractions & Sightseeing Spots"
      ],
      restaurants: [
        "Top 10 Restaurants in {city} | Best Food & Dining Guide",
        "Best Places to Eat in {city} | Restaurant & Food Guide",
        "{city} Food Guide | Top Restaurants & Local Cuisine",
        "Where to Eat in {city} | Best Restaurants & Bistros",
        "Foodie Guide to {city} | Top Dining & Restaurant Picks"
      ],
      hotels: [
        "Top 10 Hotels in {city} | Best Places to Stay & Deals",
        "Best Hotels in {city} | Accommodation & Booking Guide",
        "{city} Hotels Guide | Where to Stay & Book Online",
        "Hotels in {city} | Best Accommodation Options & Prices",
        "Stay in {city} | Top Hotels & Accommodation Guide"
      ],
      food: [
        "Food Guide to {city} | Best Restaurants & Local Cuisine",
        "What to Eat in {city} | Food & Restaurant Recommendations",
        "{city} Dining Guide | Best Food & Restaurant Picks",
        "Taste {city} | Ultimate Food & Restaurant Guide",
        "Culinary Guide to {city} | Best Food & Dining Options"
      ]
    };
  }

  // Get random variant based on city/page for consistency
  getVariantIndex(seed, variantsLength) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % variantsLength;
  }

  // Generate main city page meta
  generateCityMeta(cityData, category = null) {
    const cityName = cityData.name?.en || cityData.name || '';
    const baseKey = `${cityData.slug}${category ? `_${category}` : ''}`;

    let titleVariants, descVariants;

    if (category && this.categoryTitleVariants[category]) {
      titleVariants = this.categoryTitleVariants[category];
      descVariants = this.getCategoryDescriptions(category);
    } else {
      titleVariants = this.titleVariants;
      descVariants = this.descriptionVariants;
    }

    const titleIndex = this.getVariantIndex(baseKey, titleVariants.length);
    const descIndex = this.getVariantIndex(baseKey + '_desc', descVariants.length);

    const title = titleVariants[titleIndex].replace(/{city}/g, cityName);
    const description = descVariants[descIndex].replace(/{city}/g, cityName);

    return {
      title,
      description,
      keywords: this.generateKeywords(cityData, category),
      openGraph: {
        title,
        description,
        type: 'website',
        images: [
          {
            url: cityData.image,
            width: 1200,
            height: 630,
            alt: `${cityName}, France`
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        image: cityData.image
      },
      canonical: this.generateCanonicalUrl(cityData.slug, category),
      variant_used: {
        title_variant: titleIndex + 1,
        desc_variant: descIndex + 1
      }
    };
  }

  // Generate meta for top-10 pages
  generateTop10Meta(cityName, citySlug, category, content) {
    const baseKey = `top10_${citySlug}_${category}`;
    const titleVariants = [
      `Top 10 ${category} in ${cityName} | Best ${category} Guide`,
      `Best ${category} in ${cityName} | Top 10 Must-Try List`,
      `${cityName} ${category} | Top 10 Best Places & Tips`,
      `Ultimate ${category} Guide ${cityName} | Top 10 Picks`,
      `Top 10 ${category} ${cityName} | Best Places to Visit`
    ];

    const titleIndex = this.getVariantIndex(baseKey, titleVariants.length);
    const title = titleVariants[titleIndex];

    const description = content?.meta_description ||
      `Discover the top 10 best ${category} in ${cityName}, France. Our curated list includes the must-visit places with tips and recommendations.`;

    return {
      title,
      description,
      keywords: `top 10 ${category} ${cityName}, best ${category} ${cityName}, ${cityName} travel guide, France ${category}`,
      openGraph: {
        title,
        description,
        type: 'article'
      },
      canonical: `https://go2-france.com/top-10/${category}/${citySlug}/`,
      variant_used: {
        title_variant: titleIndex + 1
      }
    };
  }

  // Generate meta for travel guides
  generateGuideMeta(cityName, citySlug, guideType, content) {
    const baseKey = `guide_${citySlug}_${guideType}`;
    const titleVariants = [
      `${guideType} Guide to ${cityName} | Travel Tips & Advice`,
      `${cityName} ${guideType} Travel Guide | Complete Planning Tips`,
      `How to Visit ${cityName} | ${guideType} Travel Guide`,
      `${cityName} Travel | ${guideType} Guide & Tips`,
      `Complete ${guideType} Guide to ${cityName}, France`
    ];

    const titleIndex = this.getVariantIndex(baseKey, titleVariants.length);
    const title = titleVariants[titleIndex];

    const description = content?.meta_description ||
      `Complete ${guideType} travel guide for ${cityName}, France. Get expert tips, recommendations, and planning advice for your trip.`;

    return {
      title,
      description,
      keywords: `${cityName} ${guideType} guide, ${cityName} travel tips, ${guideType} travel ${cityName}, France travel guide`,
      openGraph: {
        title,
        description,
        type: 'article'
      },
      canonical: `https://go2-france.com/guides/${guideType}/${citySlug}/`,
      variant_used: {
        title_variant: titleIndex + 1
      }
    };
  }

  // Generate keywords based on city and category
  generateKeywords(cityData, category = null) {
    const cityName = cityData.name?.en || cityData.name || '';
    const baseKeywords = [
      cityName,
      `${cityName} France`,
      `visit ${cityName}`,
      `${cityName} travel`,
      `${cityName} tourism`,
      (cityData.region || '').toLowerCase(),
      'France travel',
      'France tourism'
    ].filter(Boolean);

    if (category) {
      baseKeywords.push(
        `${cityName} ${category}`,
        `best ${category} ${cityName}`,
        `${category} ${cityName} France`
      );
    }

    if (cityData.tags) {
      baseKeywords.push(...cityData.tags);
    }

    return baseKeywords.join(', ');
  }

  // Generate canonical URL
  generateCanonicalUrl(citySlug, category = null) {
    const baseUrl = 'https://go2-france.com';
    if (category) {
      return `${baseUrl}/city/${citySlug}/${category}/`;
    }
    return `${baseUrl}/city/${citySlug}/`;
  }

  // Get category-specific descriptions
  getCategoryDescriptions(category) {
    const descriptions = {
      attractions: [
        "Discover the top attractions in {city}, France. From must-see monuments to charming neighborhoods, explore the best sights and activities.",
        "Explore {city}'s top attractions and activities. Get insider tips on the best places to visit and things to do in this French destination.",
        "Find the best attractions in {city} with our comprehensive guide. Discover museums, cathedrals, parks, and unique experiences.",
        "Your guide to {city}'s must-see attractions. Explore historical sites, cultural landmarks, and local experiences.",
        "Discover what makes {city} special with our attractions guide. From historic monuments to modern entertainment."
      ],
      restaurants: [
        "Discover the best restaurants in {city}, France. From bistros to fine dining, explore the local cuisine and top dining spots.",
        "Your guide to dining in {city}. Find the best restaurants, local food, and culinary experiences in this French destination.",
        "Explore {city}'s food scene with our restaurant guide. Discover local cuisine, patisseries, and the best places to eat.",
        "Find the best food in {city} with our comprehensive dining guide. From local favorites to Michelin-starred restaurants.",
        "Taste the flavors of {city} with our food and restaurant guide. Discover authentic French cuisine and dining experiences."
      ],
      hotels: [
        "Find the best hotels in {city}, France. Compare accommodations, read reviews, and book the perfect place to stay.",
        "Your accommodation guide to {city}. Discover the best hotels, boutique stays, and places to stay for every budget.",
        "Book your stay in {city} with our hotel guide. Find the best accommodations from budget to luxury options.",
        "Discover where to stay in {city} with our comprehensive hotel guide. Find the perfect accommodation for your trip.",
        "Your guide to {city} hotels and accommodations. Find the best places to stay with reviews and booking information."
      ],
      food: [
        "Explore the food scene in {city}, France. Discover local dishes, patisseries, and the best culinary experiences.",
        "Your guide to {city} cuisine. From traditional French dishes to local specialties, discover the best food experiences.",
        "Taste {city} with our comprehensive food guide. Discover local cuisine, must-try dishes, and food culture.",
        "Discover the flavors of {city} with our food guide. From bistros to markets, explore the local cuisine.",
        "Your culinary guide to {city}. Explore local food, traditional dishes, and the best eating experiences."
      ]
    };

    return descriptions[category] || this.descriptionVariants;
  }

  // Generate structured data (JSON-LD)
  generateStructuredData(cityData, category = null, content = null) {
    const cityName = cityData.name?.en || cityData.name || '';
    const desc = cityData.description?.en || cityData.description || '';

    const baseStructure = {
      "@context": "https://schema.org",
      "@type": "TravelGuide",
      "name": `${cityName} Travel Guide`,
      "description": desc,
      "about": {
        "@type": "Place",
        "name": cityName,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "France",
          "addressRegion": cityData.region || ''
        }
      },
      "inLanguage": "en",
      "url": this.generateCanonicalUrl(cityData.slug, category)
    };

    if (cityData.location) {
      baseStructure.about.geo = {
        "@type": "GeoCoordinates",
        "latitude": cityData.location.lat,
        "longitude": cityData.location.lng
      };
    }

    if (content && content.items) {
      baseStructure.mentions = content.items.map(item => ({
        "@type": "TouristAttraction",
        "name": item.name,
        "description": item.description
      }));
    }

    return baseStructure;
  }
}

module.exports = MetaGenerator;
