#!/usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://openrouter.ai/api/v1/models';
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'lib', 'models.json');

async function fetchModels() {
  try {
    console.log('Fetching OpenRouter models from API...');
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`API response received, models count: ${data.models.length}`);
    
    // Extract only the necessary fields
    const simplifiedModels = data.models.map((model) => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      description: model.description || 'No description available',
      pricing: model.pricing
    }));
    
    console.log(`Simplified models count: ${simplifiedModels.length}`);
    console.log(`First few models: ${JSON.stringify(simplifiedModels.slice(0, 3), null, 2)}`);
    
    // Write to file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(simplifiedModels, null, 2));
    console.log(`Models data written to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    process.exit(1);
  }
}

fetchModels();
