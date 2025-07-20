import { ActionConstant } from "../constants/actionConstants";

function onReady(callback: () => void) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback(); // DOM already loaded
    }
}

onReady(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === ActionConstant.RequestPageChange) {
            sendPeoplesMarks();
            // Sending a response received back
            sendResponse({ status: 'received' });
        }
    });
    
    const target = document.getElementsByClassName('all-players-cards-selected')[0];

    if (target) {
        const observer = new MutationObserver(sendPeoplesMarks);
    
        // Configure what to observe
        const config = {
            childList: true,       // detects additions/removals of child nodes
            attributes: true,      // detects attribute changes
            subtree: true,         // observe all descendants
            characterData: true    // detect text changes
        };
    
        observer.observe(target, config);
    } else {
        console.warn('MutationObserver target not found');
    }
    
    async function getPeopleWithMarks() {
        const contentSection = document.getElementsByClassName('player-area');

        const myMap = new Map<string, string>();
    
        Array.from(contentSection).forEach((element) => {
    
            if (element instanceof HTMLElement) {
    
                const personName = element.getElementsByClassName('label-name')[0].textContent?.trim() || '';
                const cardValueElement = element.getElementsByClassName('small-card-id')[0];
    
                const span = cardValueElement.querySelector('span');
    
                if (span instanceof HTMLSpanElement) {
                    const text: string = span.textContent?.trim() || '';
    
                    myMap.set(personName, text);
                }
            }
        });
    
        return myMap;
    }
    
    async function sendPeoplesMarks() {
        var data = await getPeopleWithMarks();
        const arr = Array.from(data.entries());
        chrome.runtime.sendMessage({ type: ActionConstant.PageChanged, elements: arr });
    }
});

