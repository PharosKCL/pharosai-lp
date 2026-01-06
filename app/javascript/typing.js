let isTyping = false;
let typingTimeout = null;

function startTyping() {
  // Only run on the index page
  if (window.location.pathname !== '/' && window.location.pathname !== '/home/index') {
    return;
  }
  
  // Prevent multiple instances from running
  if (isTyping) return;
  
  const text = "Navigating the path to\n      AI powered cancer care.";
  let index = 0;
  const speed = 100; // typing speed in milliseconds
  const typingText = document.getElementById("typing-text");
  
  // Check if element exists
  if (!typingText) return;
  
  // Clear any existing timeout
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  
  isTyping = true;
  
  // Reset if already typed
  typingText.textContent = '';
  typingText.parentElement.classList.remove('blink-off');
  
  // Set fixed dimensions to reserve space
  typingText.style.height = '300px';
  typingText.style.minHeight = '300px';
  typingText.style.width = '800px';
  typingText.style.maxWidth = '800px';
  typingText.style.display = 'inline-block';
  typingText.style.boxSizing = 'border-box';
  
  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      typingTimeout = setTimeout(type, speed);
    } else {
      // Remove the cursor after typing is complete
      typingText.parentElement.classList.add('blink-off');
      isTyping = false; // Reset flag when done
      typingTimeout = null;
    }
  }

  type();
}

// Run on initial page load
document.addEventListener('DOMContentLoaded', startTyping);

// Run on Turbo page load (for Rails 7 with Turbo)
document.addEventListener('turbo:load', startTyping);

// Also run on Turbo visit (when navigating back)
document.addEventListener('turbo:visit', () => {
  isTyping = false; // Reset flag on navigation
});

