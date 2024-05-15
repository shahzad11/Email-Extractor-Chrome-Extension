# Email Scraper Chrome Extension

This Chrome extension scrapes email addresses and contact details (name and email) from your Gmail inbox. The scraped data can then be exported to a CSV file for easy management.

## Features

- Scrapes sender details (name and email) from all emails listed in your Gmail inbox.
- Includes both read and unread emails.
- Removes duplicate entries.
- Allows export of scraped data to a CSV file.

## Installation

1. Clone the repository or download the ZIP file.
2. Extract the contents if you downloaded the ZIP file.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on the "Load unpacked" button and select the folder containing the extension's files.
6. The extension should now appear in your list of installed extensions.

## Usage

1. Open your Gmail inbox.
2. Click on the Email Scraper extension icon in the Chrome toolbar.
3. In the popup window, click the "Scrape Emails" button.
4. Wait for the extension to scrape the contact information from the current page.
5. If you have multiple pages in your inbox, navigate to the next page and click "Scrape Emails" again. Repeat as necessary.
6. Once scraping is complete, click the "Export to CSV" button to download the scraped data.

## Development

### Folder Structure

email-scraper/
├── background.js
├── content.js
├── icons/
│ ├── icon16.png
│ ├── icon48.png
│ └── icon128.png
├── manifest.json
├── popup.html
├── popup.css
└── popup.js


### Manifest File

The `manifest.json` file configures the extension, defining its permissions, background script, content scripts, and the popup.

### Popup Interface

The popup interface (`popup.html` and `popup.css`) provides the user interface for interacting with the extension. The `popup.js` file contains the logic for scraping emails and exporting the data.

## Credits

This extension is programmed by Shahzad Ahmad Mirza.

- Personal Website: [shahzadmirza.com](https://shahzadmirza.com)
- Official Website: [designsvalley.com](https://designsvalley.com)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
