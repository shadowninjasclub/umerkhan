// Supabase Configuration
const supabaseUrl = 'https://prmprovhlzsfidoyuvqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybXByb3ZobHpzZmlkb3l1dnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTgyMTMsImV4cCI6MjA2ODk5NDIxM30.ksMtB1fIDAgSEChFJz4aIedjsw1-Z5h42aZ-BYXM03s';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to handle newsletter subscriptions
async function subscribeToNewsletter(email) {
    try {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email: email, subscribed_at: new Date() }]);
            
        if (error) throw error;
        return { success: true, message: 'Successfully subscribed to newsletter!' };
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
}

// Function to save contact form submissions to Supabase
async function saveContactSubmission(formData) {
    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([{ 
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                submitted_at: new Date()
            }]);
            
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error saving contact submission:', error);
        return { success: false };
    }
}

// Function to track page visits
async function trackPageVisit() {
    try {
        const { data, error } = await supabase
            .from('page_visits')
            .insert([{ 
                visited_at: new Date(),
                user_agent: navigator.userAgent,
                page: window.location.pathname
            }]);
    } catch (error) {
        console.error('Error tracking page visit:', error);
    }
}

// Initialize tracking when the page loads
document.addEventListener('DOMContentLoaded', () => {
    trackPageVisit();
}); 