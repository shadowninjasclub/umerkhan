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

## Technologies Used

- HTML5
- CSS3 (with CSS variables and flexbox/grid layouts)
- JavaScript (ES6+)
- Font Awesome icons
- Google Fonts
- Web3Forms API for contact form
- Supabase for database functionality

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