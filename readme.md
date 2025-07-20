# Planning Peeker 🔍🃏

# <img src="assets/icon.png" alt="Planning Peeker Icon" width="40" height="40" style="vertical-align: middle;"/> Planning Peeker 🔍🃏

**Planning Peeker** is a Chrome extension that lets you peek at Planning Poker marks before the cards are officially flipped.

> Great for facilitators, testers, or anyone curious enough to peek behind the scenes during sprint planning!

---

## 💡 Features

- 🔍 View unflipped Planning Poker marks.
- 🖱️ Simple UI with one-click refresh.
- 🔄 UI automatically updates in real-time when someone selects a mark, ensuring all cases are seamlessly handled.
- 💨 Fast and lightweight extension.
- 🎨 Clean and responsive design.

---

## 🚀 Getting Started

1. Clone or download this repository.
2. Build the project bu running `npm run build`.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer Mode** (top right).
5. Click **Load unpacked** and select the 'dist' folder inside the project folder.

---

## 🛠️ Project Structure

```bash
src/
├── popup/             # Popup UI logic
├── assets/            # Styles, images, etc.
├── background/        # Background processing that chooses appropriate tab to direct calls to
├── content/           # Content script that is being integrated on the wep page
└── manifest.json      # Chrome extension manifest
