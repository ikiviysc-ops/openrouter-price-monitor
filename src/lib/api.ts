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