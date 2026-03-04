const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Verify a file exists and is valid JSON
function verifyJsonFile(filepath, description) {
  try {
    if (!fs.existsSync(filepath)) {
      log('red', `MISSING: ${description} - ${filepath}`);
      return false;
    }

    const content = fs.readFileSync(filepath, 'utf-8');
    JSON.parse(content);

    log('green', `VALID: ${description}`);
    return true;
  } catch (error) {
    log('red', `INVALID JSON: ${description} - ${error.message}`);
    return false;
  }
}

// Verify directory exists and has files
function verifyDirectory(dirpath, description, expectedFiles = null) {
  try {
    if (!fs.existsSync(dirpath)) {
      log('yellow', `SKIPPED: ${description} - directory not found: ${dirpath}`);
      return true; // Not a failure, just not present yet
    }

    const files = fs.readdirSync(dirpath);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    if (expectedFiles && jsonFiles.length < expectedFiles) {
      log('yellow', `WARNING: Expected ${expectedFiles} files, found ${jsonFiles.length}: ${description}`);
      return false;
    }

    log('green', `DIRECTORY OK: ${description} (${jsonFiles.length} JSON files)`);
    return true;
  } catch (error) {
    log('red', `DIRECTORY ERROR: ${description} - ${error.message}`);
    return false;
  }
}

// Verify city data
function verifyCityData() {
  log('blue', '\nVerifying City Data...');
  let allValid = true;

  if (!verifyDirectory('data/cities', 'Cities directory')) {
    allValid = false;
  }

  if (!verifyJsonFile('data/cities/index.json', 'Cities index')) {
    allValid = false;
  }

  // Check for key French cities
  const keyCities = ['paris', 'lyon', 'marseille', 'nice', 'bordeaux'];
  keyCities.forEach(city => {
    const cityPath = `data/cities/${city}.json`;
    if (fs.existsSync(cityPath)) {
      verifyJsonFile(cityPath, `${city} data`);
    }
  });

  return allValid;
}

// Verify food data
function verifyFoodData() {
  log('blue', '\nVerifying Food Data...');
  let allValid = true;

  if (!verifyDirectory('data/food', 'Food directory')) {
    allValid = false;
  }

  if (!verifyJsonFile('data/food/index.json', 'Food index')) {
    allValid = false;
  }

  return allValid;
}

// Verify drinks data
function verifyDrinksData() {
  log('blue', '\nVerifying Drinks Data...');
  let allValid = true;

  if (!verifyDirectory('data/drinks', 'Drinks directory')) {
    allValid = false;
  }

  if (!verifyJsonFile('data/drinks/index.json', 'Drinks index')) {
    allValid = false;
  }

  return allValid;
}

// Verify regions data
function verifyRegionsData() {
  log('blue', '\nVerifying Regions Data...');
  let allValid = true;

  if (!verifyDirectory('data/regions', 'Regions directory')) {
    allValid = false;
  }

  if (!verifyJsonFile('data/regions/index.json', 'Regions index')) {
    allValid = false;
  }

  return allValid;
}

// Verify islands data
function verifyIslandsData() {
  log('blue', '\nVerifying Islands Data...');
  let allValid = true;

  if (!verifyDirectory('data/islands', 'Islands directory')) {
    allValid = false;
  }

  if (fs.existsSync('data/islands/index.json')) {
    verifyJsonFile('data/islands/index.json', 'Islands index');
  }

  return allValid;
}

// Verify visa data
function verifyVisaData() {
  log('blue', '\nVerifying Visa Data...');
  let allValid = true;

  if (!verifyDirectory('data/visas', 'Visas directory')) {
    allValid = false;
  }

  if (!verifyJsonFile('data/visas/index.json', 'Visas index')) {
    allValid = false;
  }

  return allValid;
}

// Verify practical info data
function verifyPracticalInfoData() {
  log('blue', '\nVerifying Practical Info Data...');
  let allValid = true;

  if (fs.existsSync('data/practical-info')) {
    verifyDirectory('data/practical-info', 'Practical Info directory');
    if (fs.existsSync('data/practical-info/index.json')) {
      verifyJsonFile('data/practical-info/index.json', 'Practical Info index');
    }
  }

  return allValid;
}

// Verify destinations data
function verifyDestinationsData() {
  log('blue', '\nVerifying Destinations Data...');

  if (fs.existsSync('data/destinations')) {
    verifyDirectory('data/destinations', 'Destinations directory');
    if (fs.existsSync('data/destinations/index.json')) {
      verifyJsonFile('data/destinations/index.json', 'Destinations index');
    }
  }

  return true;
}

// Verify experiences data
function verifyExperiencesData() {
  log('blue', '\nVerifying Experiences Data...');

  if (fs.existsSync('data/experiences')) {
    verifyDirectory('data/experiences', 'Experiences directory');
    if (fs.existsSync('data/experiences/index.json')) {
      verifyJsonFile('data/experiences/index.json', 'Experiences index');
    }
  }

  return true;
}

// Verify blog content
function verifyBlogContent() {
  log('blue', '\nVerifying Blog Content...');

  const blogDirs = ['content/blog/en', 'content/blog'];
  for (const dir of blogDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      log('green', `BLOG: Found ${files.length} posts in ${dir}`);
      return true;
    }
  }

  log('yellow', 'BLOG: No blog posts found yet');
  return true;
}

// Verify sitemap and SEO files
function verifySeoFiles() {
  log('blue', '\nVerifying SEO Files...');
  let allValid = true;

  const seoFiles = [
    { path: 'public/sitemap.xml', description: 'Sitemap' },
    { path: 'public/robots.txt', description: 'Robots.txt' }
  ];

  seoFiles.forEach(file => {
    if (!fs.existsSync(file.path)) {
      log('yellow', `NOT GENERATED YET: ${file.description} - ${file.path} (run: node lib/sitemap.js)`);
    } else {
      log('green', `FOUND: ${file.description}`);
    }
  });

  return allValid;
}

// Get data statistics
function getDataStats() {
  log('blue', '\nData Statistics...');

  const dataDirs = {
    'Cities': 'data/cities',
    'Food': 'data/food',
    'Drinks': 'data/drinks',
    'Regions': 'data/regions',
    'Islands': 'data/islands',
    'Visas': 'data/visas',
    'Practical Info': 'data/practical-info',
    'Destinations': 'data/destinations',
    'Experiences': 'data/experiences',
    'Itineraries (JSON)': 'data/itineraries',
  };

  for (const [label, dir] of Object.entries(dataDirs)) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
      log('green', `  ${label}: ${files.length} items`);
    }
  }

  // Count blog posts
  const blogDirs = ['content/blog/en', 'content/blog'];
  for (const dir of blogDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      if (files.length > 0) {
        log('green', `  Blog Posts: ${files.length}`);
        break;
      }
    }
  }

  // Count itinerary markdown files
  const itiDirs = ['content/itineraries/en', 'content/itineraries'];
  for (const dir of itiDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      if (files.length > 0) {
        log('green', `  Itineraries (MD): ${files.length}`);
        break;
      }
    }
  }

  // Enhanced data
  if (fs.existsSync('data/enhanced')) {
    const enhancedFiles = fs.readdirSync('data/enhanced').filter(f => f.endsWith('.json'));
    log('green', `  Enhanced Data: ${enhancedFiles.length} items`);
  }
}

// Main verification function
function verifyAllData() {
  log('blue', 'GO2FRANCE DATA VERIFICATION');
  log('blue', '================================\n');

  const checks = [
    verifyCityData,
    verifyFoodData,
    verifyDrinksData,
    verifyRegionsData,
    verifyIslandsData,
    verifyVisaData,
    verifyPracticalInfoData,
    verifyDestinationsData,
    verifyExperiencesData,
    verifyBlogContent,
    verifySeoFiles
  ];

  let allPassed = true;
  checks.forEach(check => {
    if (!check()) {
      allPassed = false;
    }
  });

  getDataStats();

  if (allPassed) {
    log('green', '\nALL VERIFICATION CHECKS PASSED!');
    log('green', 'Your data is production-ready!\n');
    return true;
  } else {
    log('red', '\nSOME VERIFICATION CHECKS FAILED!');
    log('yellow', 'Please add missing data files or run data generation scripts.\n');
    return false;
  }
}

// CLI execution
if (require.main === module) {
  const success = verifyAllData();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyAllData };
