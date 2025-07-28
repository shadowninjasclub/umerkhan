# Umer Khan - Martial Arts Instructor Portfolio

A responsive, modern personal portfolio website for martial arts instructor Umer Khan, featuring a ninja-inspired design theme.

## Features

- Fully responsive design that works on all devices
- Ninja-themed dark UI with red accents and glowing effects
- Custom cursor animations
- Smooth scroll and parallax effects
- Interactive portfolio with filtering capabilities
- Animated skill bars and timeline
- Contact form with validation
- AI Chatbot powered by Groq API
- SEO optimized structure
- Supabase integration for data storage

## Sections

- Hero section with animated tagline
- About section with instructor bio
- Skills section showcasing martial arts proficiency and weapon mastery
- Education and training timeline
- Professional experience timeline
- Portfolio/gallery with filtering
- Services offered
- Hobbies and interests
- Contact section with form
- AI Assistant chatbot page

## Technologies Used

- HTML5
- CSS3 (with CSS variables and flexbox/grid layouts)
- JavaScript (ES6+)
- Font Awesome icons
- Google Fonts
- Web3Forms API for contact form
- Groq API for AI chatbot
- Supabase for database functionality

## AI Chatbot Integration

The website features an AI assistant powered by Groq's API:

- The chatbot uses Llama3-8b-8192 model by default
- Conversation context is maintained throughout the chat session
- API keys are handled securely

### Setting up the Chatbot (Choose one method)

#### Method 1: Config File (Recommended for Development)

1. Rename `js/config.sample.js` to `js/config.js` and add your Groq API key:
```javascript
const CONFIG = {
    GROQ_API_KEY: "your-api-key-here",
    GROQ_MODEL: "llama3-8b-8192",
    MAX_TOKENS: 1024,
    TEMPERATURE: 0.7
};
```
2. The `js/config.js` file is already in `.gitignore` to prevent committing API keys to the repository

#### Method 2: User Input (Recommended for Production)

1. Deploy the website without including the config.js file
2. Users will be prompted to enter their own Groq API key
3. Keys are only stored in the browser's session storage and are never saved on servers
4. Users need to sign up at [Groq](https://console.groq.com) and create their own API key

## Supabase Integration

This website uses Supabase for the following features:
- Newsletter subscription storage
- Contact form submission backup
- User data management

### Supabase Setup

1. The website is already configured with your Supabase project URL and API key
2. You need to create the following tables in your Supabase dashboard:
   - `subscribers` table with columns: `id`, `email`, `subscribed_at`
   - `contact_submissions` table with columns: `id`, `name`, `email`, `subject`, `message`, `submitted_at`

## Installation and Setup

1. Clone this repository
2. No build process required - this is a static website
3. Add your images to the `img` directory as specified in the `img/README.txt` file
4. Open `index.html` in your browser to view the website

## Customization

- Colors and theme variables can be modified in `css/style.css`
- Content can be edited directly in `index.html`
- Additional functionality can be added in `js/main.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Credits

- Fonts: Google Fonts (Poppins, Cinzel)
- Icons: Font Awesome
- Form Processing: Web3Forms
- Database: Supabase
- AI Assistant: Groq API 