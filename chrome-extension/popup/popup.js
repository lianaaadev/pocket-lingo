const wordInput = document.getElementById('wordInput');
const addWordBtn = document.getElementById('addWordBtn');
const vocabularyList = document.getElementById('vocabularyList');
const wordCount = document.getElementById('wordCount');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');

// On load
document.addEventListener('DOMContentLoaded', () => {
    loadVocabulary();
    setupEventListeners();
});

function setupEventListeners() {
    addWordBtn.addEventListener('click', addWord);
    
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addWord();
        }
    });
    
    exportBtn.addEventListener('click', exportVocabulary);
    
    clearBtn.addEventListener('click', clearAllVocabulary);
}

function addWord() {
    const word = wordInput.value.trim();
    if (!word) return;
    
    const vocabularyItem = {
        text: word,
        date: new Date().toISOString(),
        url: 'manually added'
    };
    
    chrome.storage.local.get(['vocabulary'], (result) => {
        const vocabulary = result.vocabulary || [];
        vocabulary.unshift(vocabularyItem);
        
        chrome.storage.local.set({ vocabulary }, () => {
            wordInput.value = '';
            loadVocabulary();
        });
    });
}

function loadVocabulary() {
    chrome.storage.local.get(['vocabulary'], (result) => {
        const vocabulary = result.vocabulary || [];
        displayVocabulary(vocabulary);
        updateWordCount(vocabulary.length);
    });
}

function displayVocabulary(vocabulary) {
    vocabularyList.innerHTML = '';
    
    if (vocabulary.length === 0) {
        vocabularyList.innerHTML = `
            <div class="empty-state">
                <p>📝 No vocabulary saved yet</p>
                <p>Double-click text on any webpage or add words manually above</p>
            </div>
        `;
        return;
    }
    
    vocabulary.forEach((item, index) => {
        const itemElement = createVocabularyItem(item, index);
        vocabularyList.appendChild(itemElement);
    });
}

function createVocabularyItem(item, index) {
    const div = document.createElement('div');
    div.className = 'vocabulary-item';
    
    const date = new Date(item.date).toLocaleDateString();
    const time = new Date(item.date).toLocaleTimeString();
    
    div.innerHTML = `
        <div class="vocabulary-content">
            <div class="vocabulary-text">${escapeHtml(item.text)}</div>
            <div class="vocabulary-date">${date} at ${time}</div>
        </div>
        <button class="delete-btn" data-index="${index}" title="Delete">🗑️</button>
    `;
    
    // Add delete functionality
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteVocabularyItem(index));
    
    return div;
}

function deleteVocabularyItem(index) {
    chrome.storage.local.get(['vocabulary'], (result) => {
        const vocabulary = result.vocabulary || [];
        vocabulary.splice(index, 1);
        
        chrome.storage.local.set({ vocabulary }, () => {
            loadVocabulary();
        });
    });
}

function clearAllVocabulary() {
    if (confirm('Are you sure you want to delete all saved vocabulary? This action cannot be undone.')) {
        chrome.storage.local.set({ vocabulary: [] }, () => {
            loadVocabulary();
        });
    }
}

function exportVocabulary() {
    chrome.storage.local.get(['vocabulary'], (result) => {
        const vocabulary = result.vocabulary || [];
        
        if (vocabulary.length === 0) {
            alert('No vocabulary to export!');
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            totalWords: vocabulary.length,
            vocabulary: vocabulary
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pocket-lingo-vocabulary-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

function syncVocabulary() {
    chrome.storage.local.get(['vocabulary'], (result) => {
        const vocabulary = result.vocabulary || [];
        console.log(vocabulary);
    });
}

function updateWordCount(count) {
    wordCount.textContent = `${count} word${count !== 1 ? 's' : ''} saved`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
} 