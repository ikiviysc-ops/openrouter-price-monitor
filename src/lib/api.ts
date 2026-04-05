import modelsData from './models.json';

export async function fetchOpenRouterModels() {
  try {
    console.log('Fetching OpenRouter models from API...');
    
    // Use proxy to avoid CORS issues
    const response = await fetch('/api/openrouter/api/v1/models');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    console.log('API response status:', response.status);
    
    const data = await response.json();
    console.log('API response data length:', data.data.length);
    
    // Extract necessary fields for all models
    const simplifiedModels = data.data.map((model: any) => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      description: model.description || 'No description available',
      pricing: model.pricing,
      context_length: model.context_length,
      architecture: model.architecture,
      supported_parameters: model.supported_parameters,
      created: model.created
    }));
    
    console.log('Simplified models count:', simplifiedModels.length);
    console.log('First few models:', simplifiedModels.slice(0, 3));
    
    return simplifiedModels;
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    // Fallback to local file
    console.log('Falling back to local models file...');
    console.log('Models data length:', modelsData.length);
    
    const simplifiedModels = modelsData.map((model: any) => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      description: model.description || 'No description available',
      pricing: model.pricing,
      context_length: model.context_length,
      architecture: model.architecture,
      supported_parameters: model.supported_parameters,
      created: model.created
    }));
    
    console.log('Simplified models count:', simplifiedModels.length);
    console.log('First few models:', simplifiedModels.slice(0, 3));
    
    return simplifiedModels;
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
    console.log('API response received, models count:', data.data.length);
    
    // Extract necessary fields
    const simplifiedModels = data.data.map((model: any) => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      description: model.description || 'No description available',
      pricing: model.pricing,
      context_length: model.context_length,
      architecture: model.architecture,
      supported_parameters: model.supported_parameters,
      created: model.created
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
