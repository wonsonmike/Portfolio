// Troubleshooting
console.log(CONFIG.EMAILJS_PUBLIC_KEY);

// EmailJS Configuration - Load from config.js
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

// Configuration from config.js
const SERVICE_ID = CONFIG.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = CONFIG.EMAILJS_TEMPLATE_ID;
const RECIPIENT_EMAIL = CONFIG.EMAILJS_RECIPIENT_EMAIL;

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('.submit-button');
  const messageDiv = document.getElementById('form-message');
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  // Prepare template parameters
  const templateParams = {
    to_email: RECIPIENT_EMAIL,
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  try {
    // Send email via EmailJS
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    
    if (response.status === 200) {
      // Success message
      messageDiv.className = 'form-message success';
      messageDiv.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
      messageDiv.style.display = 'block';
      
      // Reset form
      form.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }
  } catch (error) {
    // Error message
    messageDiv.className = 'form-message error';
    messageDiv.innerHTML = '✗ Failed to send message. Please try emailing directly: wonsonmwork@gmail.com';
    messageDiv.style.display = 'block';
    
    console.error('EmailJS error:', error);
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
});
