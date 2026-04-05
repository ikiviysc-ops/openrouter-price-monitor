import modelsData from './models.json';

export async function fetchOpenRouterModels() {
  try {
    console.log('Reading OpenRouter models from local file...');
    console.log('Models data length:', modelsData.length);
    
    // Extract necessary fields
    const simplifiedModels = modelsData.map((model: any) => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      description: model.description || 'No description available',
      pricing: model.pricing
    }));
    
    console.log('Simplified models count:', simplifiedModels.length);
    console.log('First few models:', simplifiedModels.slice(0, 3));
    
    return simplifiedModels;
  } catch (error) {
    console.error('Error reading OpenRouter models:', error);
    throw error;
  }
}

// Function to manually refresh models data
export async function refreshOpenRouterModels() {
  try {
    console.log('Attempting to refresh OpenRouter models from API...');
    
    // Try direct API call
    const response = await fetch('https://openrouter.ai/api/v1/models');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response received, models count:', data.models.length);
    
    // Extract necessary fields
    const simplifiedModels = data.models.map((model: any) => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      description: model.description || 'No description available',
      pricing: model.pricing
    }));
    
    console.log('Simplified models count:', simplifiedModels.length);
    
    // Save to local file (this won't work in browser, but useful for Node.js environment)
    if (typeof window === 'undefined') {
      const fs = require('fs');
      const path = require('path');
      const outputPath = path.join(__dirname, 'models.json');
      fs.writeFileSync(outputPath, JSON.stringify(simplifiedModels, null, 2));
      console.log(`Models data written to ${outputPath}`);
    }
    
    return simplifiedModels;
  } catch (error) {
    console.error('Error refreshing OpenRouter models:', error);
    // Return existing data as fallback
    return fetchOpenRouterModels();
  }
}
