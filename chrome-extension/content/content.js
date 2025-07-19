let selectedText = '';
let isDoubleClicking = false;

const SAVE_BUTTON_BG_COLOR = "#382f2f";
const SAVE_BUTTON_TEXT_COLOR = "#ffcece";

document.addEventListener('dblclick', handleDoubleClick);

function handleDoubleClick(event) {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text && text.length > 0 && text.length <= 200) {
        selectedText = text;
        showSaveButton(event);
    }
}

function showSaveButton(event) {
    removeSaveButton();
    
    const saveBtn = document.createElement('div');
    saveBtn.id = 'pocket-lingo-save-btn';
    saveBtn.innerHTML = "🌟 Pocket this"
    saveBtn.style.cssText = `
        position: fixed;
        top: ${event.clientY - 60}px;
        left: ${event.clientX}px;
        background: ${SAVE_BUTTON_BG_COLOR};
        backdrop-filter: blur(10px);
        color: ${SAVE_BUTTON_TEXT_COLOR};
        padding: 10px 16px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border: 1px solid rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        letter-spacing: -0.01em;
    `;
    
    saveBtn.addEventListener('mouseenter', () => {
        saveBtn.style.transform = 'translateY(-1px) scale(1.02)';
        saveBtn.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    saveBtn.addEventListener('mouseleave', () => {
        saveBtn.style.transform = 'translateY(0) scale(1)';
        saveBtn.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)';
        saveBtn.style.background = SAVE_BUTTON_BG_COLOR;
    });
    
    saveBtn.addEventListener('click', () => {
        saveVocabulary(selectedText.toLowerCase());
        removeSaveButton();
    });
    
    document.body.appendChild(saveBtn);
    
    setTimeout(() => {
        removeSaveButton();
    }, 3000);
}

function removeSaveButton() {
    const existingBtn = document.getElementById('pocket-lingo-save-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
}

function saveVocabulary(text) {
    const vocabularyItem = {
        text: text,
        date: new Date().toISOString(),
        url: window.location.href,
        title: document.title
    };
    
    chrome.storage.local.get(['vocabulary'], (result) => {
        const vocabulary = result.vocabulary || [];
        
        const exists = vocabulary.some(item => 
            item.text.toLowerCase() === text.toLowerCase()
        );
        
        if (!exists) {
            vocabulary.unshift(vocabularyItem);
            
            chrome.storage.local.set({ vocabulary }, () => {
                showSuccessMessage();
            });
        } else {
            showAlreadyExistsMessage();
        }
    });
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.id = 'pocket-lingo-message';
    message.innerHTML = '✅ Saved to Pocket Lingo!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Remove message after 2 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 2000);
}

function showAlreadyExistsMessage() {
    const message = document.createElement('div');
    message.id = 'pocket-lingo-message';
    message.innerHTML = 'ℹ️ Word already saved in Pocket Lingo';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #17a2b8;
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 2 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 2000);
}

// Clean up when page unloads
window.addEventListener('beforeunload', () => {
    removeSaveButton();
}); 