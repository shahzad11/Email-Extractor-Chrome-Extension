// Function to scrape emails and sender names
function scrapeEmails() {
  let emails = [];
  let emailElements = document.querySelectorAll('tr.zA'); // Select all email rows

  emailElements.forEach(emailElement => {
    let senderElement = emailElement.querySelector('.yW span[email]');
    let emailElement = senderElement ? senderElement.getAttribute('email') : null;

    if (senderElement && emailElement) {
      let name = senderElement.innerText;
      let email = emailElement;

      // Only add unique contacts
      if (!emails.some(e => e.email === email)) {
        emails.push({ name, email });
      }
    }
  });

  return emails;
}

// Function to send the scraped data to popup.js
function sendEmails() {
  let emails = scrapeEmails();
  chrome.runtime.sendMessage({ action: 'updateEmails', emails: emails });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeEmails') {
    sendEmails();
    sendResponse({ status: 'done' });
  }
});

// Function to observe URL changes
function observeUrlChanges() {
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(() => sendEmails(), 2000); // Wait for the page to load completely
    }
  }).observe(document, { subtree: true, childList: true });
}

// Initialize scraping on page load
window.addEventListener('load', () => {
  observeUrlChanges();
  sendEmails();
});
