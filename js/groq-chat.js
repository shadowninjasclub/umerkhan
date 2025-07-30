// Groq Chat Integration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama3-8b-8192';

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const apiKeyModal = document.getElementById('apiKeyModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const openApiKeyModalBtn = document.getElementById('openApiKeyModalBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const modelSelect = document.getElementById('modelSelect');

// Chat history and API key storage
let chatHistory = [
    { role: 'system', content: 'You are a friendly and knowledgeable AI assistant for Umer Khan, a martial arts instructor with expertise in Ninjutsu (Black Belt) and Judo (Blue Belt). Contact Information: Phone: 03101870059, Email: UmerkhanULM@gmail.com, Address: Islamabad Homes phase 2, Sector H-15 Islamabad. Skills: Martial arts Skills, Teaching & Coaching Skills, Fitness & Health Knowledge, Event Management, Organization skills, Administrative skills, Communication skills, Leadership skills, MS Office Expert, Data Entry Operator, Data Analyzer. Combat Specializations: Combat Fight Techniques, Ninjutsu Weapon Master, Traditional Archery Expert, Judo Grip Fight Expert, Sword Master. Summary: Energetic and committed martial arts teacher with more than 5 years of experience training students of all ages in different martial arts styles. Skilled in fitness training, organizing events, and engaging with students. Experienced in creating lesson plans that improve students\' fitness and martial arts skills. A dedicated leader who enjoys teaching discipline, respect, and confidence to students. Education: Fs Ninja Academy (March 2015 – February 2023: Mastered Ninjutsu, achieved Black Belt with Excellent Performance, participated in many tournaments and won medals), Islamabad Judo Academy (August 2016 – Ongoing: Achieved Blue Belt with Excellent Performance, played in many different Judo National Tournaments and won Several Silver and Gold Medals), Wasif Ali Shaheed Model School for boys (April 2018 – April 2020: Passed Matric with A Grade), IQRA College of Technology and Skills (September 2022 – Ongoing: Studying DAE in Computer Science Final year). Professional Experience: Ali Toys G-11 as Salesman & Manager (May 2018 – January 2023: began as Salesman, excelling in customer service and exceeding sales targets, promoted to Manager within a year), Fs Ninja Academy HQ as Co-Instructor (December 2020 – August 2024: transitioned from student to teaching students of all skill levels, focus on enhancing martial arts techniques, discipline, and physical fitness through well-developed lesson plans), Pak Ninja Federation as Executive Board Member (December 2022–Ongoing: contributing to development and promotion of Ninjutsu throughout the region), Shadow Ninjas Club G-13 as CEO & Instructor (June 2023 – Ongoing: started Ninjutsu-focused martial arts academy in G-13 Islamabad, enhancing students\' skills and fitness through tailored training programs), Shadow Ninjas Club I-14 as CEO & Instructor (August 2024 – Ongoing: started Ninjutsu-focused martial arts academy in I-14 Islamabad), Islamabad Archery Association as Executive Board Member (September 2024 –Ongoing: helping guide the group and promote archery in the community), The Pine Field School as Martial Arts Instructor (February 2024–Ongoing: working on contract basis, teaching one class every Friday, focus on martial arts, self-defense, and gymnastics). Hobbies: Martial arts training, Learn something new, Playing sports, Gym, Reading Books, Music, Gaming, Programming. Languages: URDU, ENGLISH, PUNJABI. Provide helpful, accurate information about martial arts, training techniques, and Umer\'s services. Be concise but friendly in your responses. If asked about scheduling or specific services, recommend contacting Umer directly through the contact form on the website.' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem('groqApiKey');
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
    } else {
        // Show API key modal if no key is saved
        showApiKeyModal();
    }

    // Load saved chat history
    loadChatHistory();

    // Event listeners for chat
    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Event listeners for API key management
    saveApiKeyBtn.addEventListener('click', saveApiKey);
    openApiKeyModalBtn.addEventListener('click', showApiKeyModal);
    closeModalBtn.addEventListener('click', hideApiKeyModal);

    // Clear history button
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearChatHistory);
    }

    // Check for API key on first load
    checkApiKey();
});

// Function to check if API key exists
function checkApiKey() {
    const apiKey = getApiKey();
    if (!apiKey) {
        addMessageToChat('ai', 'Please enter your Groq API key to start chatting. Click the "API Key" button in the top right to set it up.');
        return false;
    }
    return true;
}

// Function to get API key
function getApiKey() {
    return localStorage.getItem('groqApiKey');
}

// Function to save API key
function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        localStorage.setItem('groqApiKey', apiKey);
        hideApiKeyModal();
        addMessageToChat('ai', 'API key saved successfully! You can now chat with the AI assistant.');
    } else {
        alert('Please enter a valid API key');
    }
}

// Function to show API key modal
function showApiKeyModal() {
    apiKeyModal.style.display = 'flex';
}

// Function to hide API key modal
function hideApiKeyModal() {
    apiKeyModal.style.display = 'none';
}

// Function to save chat history to localStorage
function saveChatHistory() {
    // Skip first system message when saving to localStorage
    const historyToSave = chatHistory.slice(1);
    localStorage.setItem('chatHistory', JSON.stringify(historyToSave));
}

// Function to load chat history from localStorage
function loadChatHistory() {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        
        // Add saved messages to UI and chat history (keeping the system message)
        chatHistory = [chatHistory[0], ...parsedHistory];
        
        // Display messages in UI
        parsedHistory.forEach(msg => {
            addMessageToChat(msg.role, msg.content);
        });
    }
}

// Function to clear chat history
function clearChatHistory() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        // Clear localStorage
        localStorage.removeItem('chatHistory');
        
        // Reset chat history (keep system message)
        chatHistory = [chatHistory[0]];
        
        // Clear UI
        chatMessages.innerHTML = '';
        addMessageToChat('ai', 'Chat history has been cleared.');
    }
}

// Function to handle sending messages
function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Check if API key is set
    if (!checkApiKey()) {
        showApiKeyModal();
        return;
    }
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input
    userInput.value = '';
    
    // Add to chat history
    chatHistory.push({ role: 'user', content: message });
    
    // Save to localStorage
    saveChatHistory();
    
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

// Function to get selected model
function getSelectedModel() {
    return modelSelect ? modelSelect.value : DEFAULT_MODEL;
}

// Function to send message to Groq API
async function sendMessageToGroq(message) {
    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            hideLoadingIndicator();
            addMessageToChat('ai', 'API key is not set. Please click the API Key button to set your Groq API key.');
            showApiKeyModal();
            return;
        }

        const model = getSelectedModel();
        
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: chatHistory,
                temperature: 0.7,
                max_tokens: 1024
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            // Handle error
            hideLoadingIndicator();
            const errorMessage = `Error: ${data.error.message || 'Unknown error'}. Please check your API key.`;
            addMessageToChat('ai', errorMessage);
            console.error('Groq API Error:', data.error);
            return;
        }
        
        // Get AI response
        const aiMessage = data.choices[0].message.content;
        
        // Add to chat history
        chatHistory.push({ role: 'assistant', content: aiMessage });
        
        // Save to localStorage
        saveChatHistory();
        
        // Limit history to prevent token limit issues
        if (chatHistory.length > 15) {
            // Keep system message and last 12 messages
            chatHistory = [
                chatHistory[0], 
                ...chatHistory.slice(chatHistory.length - 12)
            ];
            
            // Update saved history
            saveChatHistory();
        }
        
        // Hide loading and show message
        hideLoadingIndicator();
        addMessageToChat('assistant', aiMessage);
        
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('ai', 'Sorry, I encountered a connection error. Please check your internet connection and API key, then try again.');
        console.error('Error:', error);
    }
} 