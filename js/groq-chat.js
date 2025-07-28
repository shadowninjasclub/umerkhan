// Groq Chat Integration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Check if config file exists and load API key from it
let apiKey = '';
try {
    if (typeof CONFIG !== 'undefined' && CONFIG.GROQ_API_KEY) {
        apiKey = CONFIG.GROQ_API_KEY;
        console.log('API key loaded from config file');
    }
} catch (error) {
    console.log('No config file detected, will prompt for API key');
}

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const apiKeyForm = document.getElementById('apiKeyForm');
const chatInterface = document.getElementById('chatInterface');

// Chat history to maintain context
let chatHistory = [
    { role: 'system', content: 'You are a friendly and knowledgeable AI assistant for Umer Khan, a martial arts instructor with expertise in Ninjutsu (Black Belt) and Judo (Blue Belt). Provide helpful, accurate information about martial arts, training techniques, and Umer\'s services. Be concise but friendly in your responses. If asked about scheduling or specific services, recommend contacting Umer directly through the contact form on the website.' }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check for API key from config file first
    if (apiKey) {
        // If API key exists in config, store it and show chat
        sessionStorage.setItem('groqApiKey', apiKey);
        showChatInterface();
    } else {
        // Otherwise, check for stored API key in session
        const storedApiKey = sessionStorage.getItem('groqApiKey');
        if (storedApiKey) {
            // If key exists in session storage, show chat interface
            showChatInterface();
        }
    }
    
    // Add event listener for API key form
    if (apiKeyForm) {
        apiKeyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const apiKey = apiKeyInput.value.trim();
            if (apiKey) {
                // Store key in session storage (not localStorage for security)
                sessionStorage.setItem('groqApiKey', apiKey);
                showChatInterface();
                apiKeyInput.value = '';
            }
        });
    }
    
    // Add event listener for send button
    sendBtn.addEventListener('click', handleSendMessage);
    
    // Add event listener for Enter key in input
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });
});

// Function to show chat interface and hide API key form
function showChatInterface() {
    if (apiKeyForm) apiKeyForm.style.display = 'none';
    if (chatInterface) chatInterface.style.display = 'block';
}

// Function to handle sending messages
function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input
    userInput.value = '';
    
    // Add to chat history
    chatHistory.push({ role: 'user', content: message });
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Send to Groq API
    sendMessageToGroq(message);
}

// Function to add message to chat UI
function addMessageToChat(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(role === 'user' ? 'user-message' : 'ai-message');
    
    // Process content for markdown-like formatting (basic)
    content = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = content;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show loading indicator
function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'ai-message', 'loading');
    loadingDiv.id = 'loadingIndicator';
    
    loadingDiv.innerHTML = 'Thinking <div class="loading-dots"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(loadingDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

// Function to send message to Groq API
async function sendMessageToGroq(message) {
    // Get API key from session storage
    const apiKey = sessionStorage.getItem('groqApiKey');
    
    if (!apiKey) {
        hideLoadingIndicator();
        addMessageToChat('ai', 'API key not found. Please reload the page and enter your Groq API key.');
        return;
    }
    
    try {
        // Use configuration from config if available
        const model = (typeof CONFIG !== 'undefined' && CONFIG.GROQ_MODEL) ? CONFIG.GROQ_MODEL : 'llama3-8b-8192';
        const maxTokens = (typeof CONFIG !== 'undefined' && CONFIG.MAX_TOKENS) ? CONFIG.MAX_TOKENS : 1024;
        const temperature = (typeof CONFIG !== 'undefined' && CONFIG.TEMPERATURE) ? CONFIG.TEMPERATURE : 0.7;
        
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: chatHistory,
                temperature: temperature,
                max_tokens: maxTokens
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            // Handle error
            hideLoadingIndicator();
            addMessageToChat('ai', 'Sorry, I encountered an error. Please check your API key or try again later.');
            console.error('Groq API Error:', data.error);
            return;
        }
        
        // Get AI response
        const aiMessage = data.choices[0].message.content;
        
        // Add to chat history
        chatHistory.push({ role: 'assistant', content: aiMessage });
        
        // Limit history to prevent token limit issues
        if (chatHistory.length > 15) {
            // Keep system message and last 12 messages
            chatHistory = [
                chatHistory[0], 
                ...chatHistory.slice(chatHistory.length - 12)
            ];
        }
        
        // Hide loading and show message
        hideLoadingIndicator();
        addMessageToChat('assistant', aiMessage);
        
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('ai', 'Sorry, I encountered a connection error. Please check your internet connection and try again.');
        console.error('Error:', error);
    }
} 