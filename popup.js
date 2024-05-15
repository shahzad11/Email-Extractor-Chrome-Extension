document.getElementById('scrapeButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: scrapeEmailsFromContent
    }, (results) => {
      if (results && results[0] && results[0].result) {
        const emails = results[0].result;
        console.log(emails);
        const uniqueEmails = removeDuplicates(emails);
        localStorage.setItem('scrapedEmails', JSON.stringify(uniqueEmails));
        document.getElementById('exportButton').style.display = 'block';

        // Format and display the email addresses
        const emailTable = createEmailTable(uniqueEmails);
        document.getElementById('status').innerHTML = `Scraped ${uniqueEmails.length} unique contacts:<br>${emailTable}`;
      }
    });
  });
});

document.getElementById('exportButton').addEventListener('click', () => {
  const emails = JSON.parse(localStorage.getItem('scrapedEmails'));
  if (emails && emails.length > 0) {
    exportToCSV(emails);

    // Clear the local storage after exporting data
    localStorage.removeItem('scrapedEmails');
    document.getElementById('exportButton').style.display = 'none';
    document.getElementById('status').innerHTML = 'Data exported successfully. Scrape again for fresh data.';
  }
});

function scrapeEmailsFromContent() {
  const emailDetails = [];
  const emailRows = document.querySelectorAll('tr.zA'); // Gmail inbox rows
  emailRows.forEach(row => {
    const senderElement = row.querySelector('.yW span[email]');
    const emailElement = senderElement ? senderElement.getAttribute('email') : null;
    if (senderElement && emailElement) {
      const name = senderElement.textContent.trim();
      emailDetails.push({ name, email: emailElement });
    }
  });
  return emailDetails;
}

function removeDuplicates(emails) {
  const seen = new Set();
  return emails.filter(email => {
    const duplicate = seen.has(email.email);
    seen.add(email.email);
    return !duplicate;
  });
}

function exportToCSV(data) {
  const csvContent = "data:text/csv;charset=utf-8," + data.map(e => `${e.name},${e.email}`).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "email_contacts.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function createEmailTable(emails) {
  let table = '<table><tr><th>Name</th><th>Email</th></tr>';
  emails.forEach(email => {
    table += `<tr><td>${email.name}</td><td>${email.email}</td></tr>`;
  });
  table += '</table>';
  return table;
}
