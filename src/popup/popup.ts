document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const refreshButton = document.getElementById('refreshButton') as HTMLButtonElement;

    async function visualizePeopleWithData(peopleMap: Array<[string, string]>) {
        const peekedContent = document.getElementById('marksContainer');

        if (!peekedContent) {
            return;
        }

        peekedContent.innerHTML = ''; // Removes all content

        Array.from(peopleMap).forEach((element) => {

            const divWrapper = document.createElement('div');
            divWrapper.className = "vision-wrapper";

            const nameSpan = document.createElement('span');
            nameSpan.className = "vision-name";
            nameSpan.textContent = element[0];

            const markSpan = document.createElement('span');
            markSpan.className = "vision-mark";
            markSpan.textContent = element[1];

            divWrapper.appendChild(nameSpan);
            divWrapper.appendChild(markSpan);

            peekedContent.appendChild(divWrapper);
        });
    }

    async function requestMarks() {
        chrome.runtime.sendMessage({ type: "REQUEST_PAGE_CHANGED" });
    }

    // Event listeners
    refreshButton.addEventListener('click', requestMarks);
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        if (message.type === "PAGE_CHANGED") {
            await visualizePeopleWithData(message.elements);
        }
    });
});

