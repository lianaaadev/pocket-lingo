// When installed, initialize with empty vocabulary and show NEW badge
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.local.set({ vocabulary: [] }, () => {
            console.log('Pocket Lingo initialized with empty vocabulary');
        });
        
        chrome.action.setBadgeText({ text: 'NEW' });
        chrome.action.setBadgeBackgroundColor({ color: '#667eea' });

        setTimeout(() => {
            chrome.action.setBadgeText({ text: '' });
        }, 5000);
    }
});

// When the content script sends a message to get the vocabulary count, return the count
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getVocabularyCount') {
        chrome.storage.local.get(['vocabulary'], (result) => {
            const count = result.vocabulary ? result.vocabulary.length : 0;
            sendResponse({ count });
        });
        return true; // Keep message channel open for async response
    }
});

// When the vocabulary changes, update the number of words in the badge
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.vocabulary) {
        const vocabulary = changes.vocabulary.newValue || [];
        const count = vocabulary.length;
        
        if (count > 0) {
            chrome.action.setBadgeText({ text: count.toString() });
            chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
        } else {
            chrome.action.setBadgeText({ text: '' });
        }
    }
}); 