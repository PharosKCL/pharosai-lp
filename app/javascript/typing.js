let isTyping = false;
let typingTimeout = null;

function startTyping() {
  // Only run on the index page
  if (window.location.pathname !== '/' && window.location.pathname !== '/home/index') {
    // Reset flag when not on index page
    isTyping = false;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
    return;
  }
  
  const text = "Navigating the path to\n      AI powered cancer care.";
  let index = 0;
  const speed = 100; // typing speed in milliseconds
  const typingText = document.getElementById("typing-text");
  
  // Check if element exists
  if (!typingText) return;
  
  // Clear any existing timeout and reset flag
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
  isTyping = false; // Reset flag to allow restart
  
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

// Also run on Turbo render (when content is rendered)
document.addEventListener('turbo:render', startTyping);

// Reset flag when navigating away
document.addEventListener('turbo:visit', () => {
  isTyping = false;
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
});

