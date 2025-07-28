// Configuration file for API keys and settings
// This file helps manage environment variables while keeping secrets secure
// In production, users will provide their own API keys
// In development, it can use keys from a .env file (which should never be committed to git)

const Config = {
    // Default to null - will be provided by user in production
    groqApiKey: null,
    
    // Groq API endpoint
    groqApiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    
    // Default model
    groqModel: 'llama3-8b-8192'
};

// DO NOT include actual API keys here in the repository
// This just demonstrates how you would use them locally during development
// using values from your .env file that is not committed to git

// Export the configuration
window.AppConfig = Config; 